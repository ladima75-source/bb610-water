from __future__ import annotations

import copy
import json
import os
import subprocess
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import jwt
import requests

BASE = os.getenv("R19_API_BASE", "http://127.0.0.1:8080")
ADMIN_EMAIL = os.environ["BB610_ADMIN_BOOTSTRAP_EMAIL"]
ADMIN_PASSWORD = os.environ["BB610_ADMIN_BOOTSTRAP_PASSWORD"]
JWT_SECRET = os.environ["BB610_ADMIN_JWT_SECRET"]
JWT_ISSUER = os.getenv("BB610_ADMIN_JWT_ISSUER", "bb610-water-admin")
ROOT = Path(__file__).resolve().parents[3]
NODE_SMOKE = Path(__file__).with_name("r19_ui_smoke.mjs")
EVIDENCE = Path(os.getenv("R19_EVIDENCE_PATH", "/tmp/r19-runtime-evidence.json"))


def check(cond: bool, msg: str):
    if not cond:
        raise AssertionError(msg)


def req(method: str, path: str, token: str | None = None, **kwargs):
    headers = dict(kwargs.pop("headers", {}))
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return requests.request(method, BASE + path, headers=headers, timeout=15, **kwargs)


def login(email: str, password: str):
    r = req("POST", "/auth/token", data={"username": email, "password": password})
    check(r.status_code == 200, f"login failed {email}: {r.status_code} {r.text}")
    return r.json()


def row(catalog: dict, model: str, zone: str):
    return next(r for r in catalog["rows"] if r["modelId"] == model and r["zoneId"] == zone)


def invariant(catalog: dict):
    rows = catalog["rows"]
    approved = sum(1 for r in rows if r["priceState"] == "APPROVED")
    por = sum(1 for r in rows if r["priceState"] == "PRICE_ON_REQUEST")
    check(len(rows) == 21, f"expected 21 rows, got {len(rows)}")
    check((approved, por) == (15, 6), f"expected 15 APPROVED + 6 POR, got {approved}+{por}")
    for model in ("F1-P", "F2-P"):
        for zone in ("Z4(8)", "Z8(12)", "Z12(16)"):
            r = row(catalog, model, zone)
            check(r["priceState"] == "PRICE_ON_REQUEST", f"{model}/{zone} must remain POR")
            check(r["prices"] == {"base": None, "hmi": None}, f"{model}/{zone} invented price")
    text = json.dumps(catalog, ensure_ascii=False)
    check("F1-PH" not in text and "F2-PH" not in text, "legacy naming leaked")
    return {"rows": len(rows), "approved": approved, "priceOnRequest": por}


def run_node(mode: str, extra_env: dict | None = None):
    env = os.environ.copy()
    if extra_env:
        env.update(extra_env)
    subprocess.run(["node", str(NODE_SMOKE), mode], cwd=ROOT, env=env, check=True)


def main():
    evidence: dict = {"startedAt": datetime.now(timezone.utc).isoformat(), "checks": {}}

    # health / unauth
    h = req("GET", "/health")
    check(h.status_code == 200 and h.json()["ok"] is True, f"health failed: {h.text}")
    evidence["health"] = h.json()
    check(req("GET", "/admin/catalog").status_code == 401, "unauthenticated admin route was not denied")
    evidence["checks"]["unauthDenied"] = True

    # throttling sanity on an intentionally nonexistent account
    throttle_codes = []
    for _ in range(6):
        r = req("POST", "/auth/token", data={"username": "r19-throttle@example.test", "password": "wrong"})
        throttle_codes.append(r.status_code)
    check(throttle_codes[:5] == [401] * 5 and throttle_codes[5] == 429, f"unexpected throttle sequence: {throttle_codes}")
    evidence["checks"]["loginThrottle"] = throttle_codes

    # admin sessions A/B
    a = login(ADMIN_EMAIL, ADMIN_PASSWORD)
    b = login(ADMIN_EMAIL, ADMIN_PASSWORD)
    ta, tb = a["access_token"], b["access_token"]
    s = req("GET", "/auth/session", token=ta)
    check(s.status_code == 200 and s.json()["role"] == "admin", f"admin session failed: {s.text}")
    evidence["checks"]["adminLogin"] = True

    # expired token path (real decoder/endpoint)
    expired = jwt.encode({
        "sub": ADMIN_EMAIL,
        "role": "admin",
        "jti": "r19-expired",
        "iss": JWT_ISSUER,
        "iat": datetime.now(timezone.utc) - timedelta(minutes=2),
        "exp": datetime.now(timezone.utc) - timedelta(minutes=1),
    }, JWT_SECRET, algorithm="HS256")
    check(req("GET", "/auth/session", token=expired).status_code == 401, "expired token accepted")
    evidence["checks"]["sessionExpiry"] = True

    # create and test roles
    for email, role in (("r19-viewer@example.test", "viewer"), ("r19-editor@example.test", "editor")):
        r = req("POST", "/admin/users", token=ta, json={"email": email, "password": "R19-Temp-Role-Password!", "role": role})
        check(r.status_code in (200, 409), f"create {role} failed: {r.status_code} {r.text}")
    tv = login("r19-viewer@example.test", "R19-Temp-Role-Password!")["access_token"]
    te = login("r19-editor@example.test", "R19-Temp-Role-Password!")["access_token"]
    check(req("GET", "/admin/catalog", token=tv).status_code == 200, "viewer cannot read")

    initial = req("GET", "/admin/catalog", token=ta).json()
    initial_public = req("GET", "/public/commercial").json()
    seed_catalog = copy.deepcopy(initial["catalog"])
    inv0 = invariant(seed_catalog)
    check(initial["version"] == 1 and initial["publishedVersion"] == 1, f"unexpected initial versions {initial}")
    check("internalNote" not in json.dumps(initial_public["catalog"], ensure_ascii=False), "public endpoint leaked internalNote")
    evidence["initialInvariant"] = inv0
    evidence["initialChecksum"] = initial["checksum"]

    viewer_save = req("POST", "/admin/catalog/versions", token=tv, json={"catalog": seed_catalog, "baseVersion": 1})
    check(viewer_save.status_code == 403, f"viewer save not forbidden: {viewer_save.status_code}")
    editor_publish = req("POST", "/admin/catalog/publish", token=te, json={"baseVersion": 1, "reason": "forbidden role test"})
    check(editor_publish.status_code == 403, f"editor publish not forbidden: {editor_publish.status_code}")
    evidence["checks"]["roleEnforcement"] = True

    # Admin v2 real browser-like static JS smoke against live API
    run_node("admin-login", {"R19_ADMIN_EMAIL": ADMIN_EMAIL, "R19_ADMIN_PASSWORD": ADMIN_PASSWORD})
    evidence["checks"]["adminV2Runtime"] = True

    # Harmless TEST draft: hide I/Z4 only.
    test_catalog = copy.deepcopy(seed_catalog)
    test_row = row(test_catalog, "I", "Z4(8)")
    test_row["active"] = False
    test_row["buyerNote"] = "R19 TEST — rollback required"
    test_row["updatedAt"] = datetime.now(timezone.utc).isoformat()

    save = req("POST", "/admin/catalog/versions", token=ta, json={
        "catalog": test_catalog,
        "baseVersion": 1,
        "note": "R19 TEST draft — hide I/Z4(8)",
        "confirmWarnings": False,
    })
    check(save.status_code == 200 and save.json()["version"] == 2, f"draft save failed: {save.status_code} {save.text}")
    evidence["draftVersion"] = save.json()["version"]

    # Public unchanged before publish.
    prepub = req("GET", "/public/commercial").json()
    check(prepub["version"] == 1, f"draft changed public version: {prepub['version']}")
    check(row(prepub["catalog"], "I", "Z4(8)")["active"] is True, "draft leaked to public")
    evidence["checks"]["draftDoesNotPublish"] = True

    # Concurrency: session B holds stale baseVersion=1.
    stale = req("POST", "/admin/catalog/versions", token=tb, json={
        "catalog": seed_catalog,
        "baseVersion": 1,
        "note": "R19 stale write should fail",
    })
    check(stale.status_code == 409, f"stale save was not rejected: {stale.status_code} {stale.text}")
    evidence["checks"]["concurrencyConflict"] = True

    diff = req("GET", "/admin/publish-diff", token=ta)
    check(diff.status_code == 200, f"publish diff failed: {diff.text}")
    changes = diff.json()["changes"]
    check(any(c.get("modelId") == "I" and c.get("zoneId") == "Z4(8)" and c.get("field") == "active" and c.get("new") is False for c in changes), f"active diff missing: {changes}")
    evidence["publishDiff"] = changes

    pub = req("POST", "/admin/catalog/publish", token=ta, json={"baseVersion": 2, "reason": "R19 TEST publish"})
    check(pub.status_code == 200 and pub.json()["publishedVersion"] == 3, f"publish failed: {pub.status_code} {pub.text}")
    public_test = req("GET", "/public/commercial").json()
    check(public_test["version"] == 3, "published version not visible")
    check(row(public_test["catalog"], "I", "Z4(8)")["active"] is False, "published hidden row not visible")
    evidence["testPublishedVersion"] = 3

    # Canonical staging against live review API: hidden row behavior.
    run_node("staging-hidden")
    evidence["checks"]["stagingHiddenBehavior"] = True

    aud = req("GET", "/admin/audit", token=ta).json()
    match = [x for x in aud if x["type"] == "AVAILABILITY_CHANGE" and x["version"] == 2 and x["payload"].get("modelId") == "I" and x["payload"].get("zoneId") == "Z4(8)"]
    check(match and match[0]["actor"] == ADMIN_EMAIL and match[0]["role"] == "admin" and match[0]["createdAt"], f"audit evidence missing: {match}")
    check(any(x["type"] == "PUBLISH" and x["version"] == 3 and x["actor"] == ADMIN_EMAIL for x in aud), "publish audit missing")
    evidence["checks"]["auditActorRoleTimestamp"] = True

    versions = req("GET", "/admin/versions", token=ta).json()
    check(any(v["version"] == 3 and v["published"] for v in versions), "published version not marked")
    evidence["checks"]["versioning"] = True

    # Roll back to accepted v1. Rollback itself must create NEW v4 and publish it.
    rb = req("POST", "/admin/catalog/rollback/1", token=ta, json={"baseVersion": 3, "reason": "R19 restore accepted catalog"})
    check(rb.status_code == 200 and rb.json()["publishedVersion"] == 4, f"rollback failed: {rb.status_code} {rb.text}")
    final_admin = req("GET", "/admin/catalog", token=ta).json()
    final_public = req("GET", "/public/commercial").json()
    check(final_admin["version"] == 4 and final_admin["publishedVersion"] == 4, f"final versions wrong: {final_admin['version']}/{final_admin['publishedVersion']}")
    check(final_admin["catalog"] == seed_catalog, "final draft catalog differs from accepted seed")
    check(final_public["checksum"] == initial_public["checksum"], "final public checksum differs from initial accepted catalog")
    invf = invariant(final_admin["catalog"])
    evidence["finalInvariant"] = invf
    evidence["finalChecksum"] = final_public["checksum"]
    evidence["rollbackPublishedVersion"] = 4

    # Staging after rollback must return accepted pricing and POR rendering.
    run_node("staging-baseline")
    evidence["checks"]["stagingAfterRollback"] = True

    # Logout/revocation on token A.
    out = req("POST", "/auth/logout", token=ta)
    check(out.status_code == 200, f"logout failed: {out.text}")
    check(req("GET", "/auth/session", token=ta).status_code == 401, "revoked token remained usable")
    evidence["checks"]["logoutRevocation"] = True

    evidence["finishedAt"] = datetime.now(timezone.utc).isoformat()
    EVIDENCE.write_text(json.dumps(evidence, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(evidence, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
