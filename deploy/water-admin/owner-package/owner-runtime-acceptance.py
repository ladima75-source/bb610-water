#!/usr/bin/env python3
from __future__ import annotations

import copy
import json
import os
import secrets
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

BASE = os.getenv("BB610_OWNER_ACCEPT_API", "http://127.0.0.1:18080").rstrip("/")
OWNER_EMAIL = os.getenv("BB610_OWNER_EMAIL", "admin.bb610@gmail.com")
OWNER_PASSWORD = os.environ.get("BB610_OWNER_BOOTSTRAP_PASSWORD", "")
EVIDENCE = os.getenv("BB610_OWNER_ACCEPT_EVIDENCE", "/tmp/bb610-water-owner-acceptance.json")

if not OWNER_PASSWORD:
    raise SystemExit("BB610_OWNER_BOOTSTRAP_PASSWORD is required for acceptance")


def request(method: str, path: str, token: str | None = None, json_body=None, form=None):
    headers = {"Accept": "application/json"}
    body = None
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if json_body is not None:
        body = json.dumps(json_body, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json"
    elif form is not None:
        body = urllib.parse.urlencode(form).encode("utf-8")
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    req = urllib.request.Request(BASE + path, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            raw = r.read().decode("utf-8")
            return r.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8")
        try:
            payload = json.loads(raw) if raw else None
        except Exception:
            payload = raw
        return e.code, payload


def must(cond: bool, msg: str):
    if not cond:
        raise AssertionError(msg)


def login(email: str, password: str):
    code, payload = request("POST", "/auth/token", form={"username": email, "password": password})
    must(code == 200, f"login failed for {email}: {code} {payload}")
    return payload["access_token"]


def find_row(catalog, model, zone):
    return next(r for r in catalog["rows"] if r["modelId"] == model and r["zoneId"] == zone)


def invariant(catalog):
    rows = catalog["rows"]
    must(len(rows) == 21, f"expected 21 rows, got {len(rows)}")
    approved = sum(r["priceState"] == "APPROVED" for r in rows)
    por = sum(r["priceState"] == "PRICE_ON_REQUEST" for r in rows)
    must((approved, por) == (15, 6), f"expected 15 APPROVED + 6 PRICE_ON_REQUEST, got {approved}+{por}")
    for model in ("F1-P", "F2-P"):
        for zone in ("Z4(8)", "Z8(12)", "Z12(16)"):
            row = find_row(catalog, model, zone)
            must(row["priceState"] == "PRICE_ON_REQUEST", f"{model}/{zone} state changed")
            must(row["prices"] == {"base": None, "hmi": None}, f"{model}/{zone} price invented")
    text = json.dumps(catalog, ensure_ascii=False)
    must("F1-PH" not in text and "F2-PH" not in text, "legacy product code leaked")
    return {"rows": 21, "approved": approved, "priceOnRequest": por}


def main():
    suffix = str(int(time.time()))
    viewer_email = f"owner-accept-viewer-{suffix}@example.invalid"
    editor_email = f"owner-accept-editor-{suffix}@example.invalid"
    viewer_pass = secrets.token_urlsafe(24)
    editor_pass = secrets.token_urlsafe(24)
    evidence = {"startedAt": datetime.now(timezone.utc).isoformat(), "checks": {}, "temporaryUsers": [viewer_email, editor_email]}

    code, health = request("GET", "/health")
    must(code == 200 and health.get("ok") is True, f"health failed: {code} {health}")
    evidence["healthBefore"] = health

    owner_token = login(OWNER_EMAIL, OWNER_PASSWORD)
    code, session = request("GET", "/auth/session", owner_token)
    must(code == 200 and session.get("role") == "admin" and session.get("email") == OWNER_EMAIL, f"owner session failed: {session}")
    evidence["checks"]["ownerLoginAdmin"] = True

    code, initial = request("GET", "/admin/catalog", owner_token)
    must(code == 200, f"initial catalog failed: {code} {initial}")
    initial_version = initial["version"]
    initial_checksum = initial["checksum"]
    initial_catalog = copy.deepcopy(initial["catalog"])
    evidence["initialVersion"] = initial_version
    evidence["initialChecksum"] = initial_checksum
    evidence["initialInvariant"] = invariant(initial_catalog)

    for email, password, role in ((viewer_email, viewer_pass, "viewer"), (editor_email, editor_pass, "editor")):
        code, payload = request("POST", "/admin/users", owner_token, json_body={"email": email, "password": password, "role": role})
        must(code == 200, f"create {role} failed: {code} {payload}")

    viewer_token = login(viewer_email, viewer_pass)
    editor_token = login(editor_email, editor_pass)
    code, _ = request("GET", "/admin/catalog", viewer_token)
    must(code == 200, "viewer cannot read catalog")
    code, _ = request("POST", "/admin/catalog/versions", viewer_token, json_body={"catalog": initial_catalog, "baseVersion": initial_version})
    must(code == 403, f"viewer write was not denied: {code}")
    code, _ = request("POST", "/admin/catalog/publish", editor_token, json_body={"baseVersion": initial_version, "reason": "owner acceptance role check"})
    must(code == 403, f"editor publish was not denied: {code}")
    evidence["checks"]["roles"] = True

    test_catalog = copy.deepcopy(initial_catalog)
    test_row = find_row(test_catalog, "I", "Z4(8)")
    test_row["active"] = False
    test_row["buyerNote"] = "OWNER DEPLOYMENT ACCEPTANCE — rollback required"
    test_row["updatedAt"] = datetime.now(timezone.utc).isoformat()

    code, saved = request("POST", "/admin/catalog/versions", owner_token, json_body={
        "catalog": test_catalog,
        "baseVersion": initial_version,
        "note": "OWNER DEPLOYMENT ACCEPTANCE draft",
        "confirmWarnings": False,
    })
    must(code == 200, f"draft save failed: {code} {saved}")
    draft_version = saved["version"]
    evidence["draftVersion"] = draft_version

    code, public_before = request("GET", "/public/commercial")
    must(code == 200 and public_before["checksum"] == initial_checksum, "draft leaked into public catalog")
    evidence["checks"]["draftNotPublic"] = True

    code, diff = request("GET", "/admin/publish-diff", owner_token)
    must(code == 200, f"publish diff failed: {code} {diff}")
    must(any(c.get("modelId") == "I" and c.get("zoneId") == "Z4(8)" and c.get("field") == "active" and c.get("new") is False for c in diff.get("changes", [])), "expected availability diff missing")
    evidence["checks"]["diff"] = True

    code, published = request("POST", "/admin/catalog/publish", owner_token, json_body={"baseVersion": draft_version, "reason": "OWNER DEPLOYMENT ACCEPTANCE publish"})
    must(code == 200, f"publish failed: {code} {published}")
    published_version = published["publishedVersion"]
    evidence["publishedVersion"] = published_version

    code, public_test = request("GET", "/public/commercial")
    must(code == 200 and public_test["version"] == published_version, "published version not visible")
    must(find_row(public_test["catalog"], "I", "Z4(8)")["active"] is False, "published test change missing")

    code, audit = request("GET", "/admin/audit", owner_token)
    must(code == 200, f"audit failed: {code}")
    must(any(x.get("type") == "PUBLISH" and x.get("actor") == OWNER_EMAIL and x.get("role") == "admin" for x in audit), "owner publish audit missing")
    must(any(x.get("type") == "AVAILABILITY_CHANGE" and x.get("actor") == OWNER_EMAIL for x in audit), "owner availability audit missing")
    evidence["checks"]["audit"] = True

    code, rollback = request("POST", f"/admin/catalog/rollback/{initial_version}", owner_token, json_body={"baseVersion": published_version, "reason": "OWNER DEPLOYMENT ACCEPTANCE restore baseline"})
    must(code == 200, f"rollback failed: {code} {rollback}")
    final_version = rollback["publishedVersion"]
    evidence["rollbackPublishedVersion"] = final_version

    code, final_public = request("GET", "/public/commercial")
    must(code == 200, "final public catalog failed")
    must(final_public["checksum"] == initial_checksum, f"rollback checksum mismatch: {final_public['checksum']} != {initial_checksum}")
    evidence["finalInvariant"] = invariant(final_public["catalog"])
    evidence["finalChecksum"] = final_public["checksum"]
    evidence["checks"]["rollbackRestoredBaseline"] = True

    evidence["finishedAt"] = datetime.now(timezone.utc).isoformat()
    with open(EVIDENCE, "w", encoding="utf-8") as f:
        json.dump(evidence, f, ensure_ascii=False, indent=2)
    print("OWNER runtime acceptance PASS")
    print(json.dumps({
        "initialVersion": initial_version,
        "draftVersion": draft_version,
        "publishedVersion": published_version,
        "rollbackPublishedVersion": final_version,
        "finalChecksum": final_public["checksum"],
        "finalInvariant": evidence["finalInvariant"],
        "temporaryUsers": evidence["temporaryUsers"],
        "evidence": EVIDENCE,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"OWNER runtime acceptance FAILED: {exc}", file=sys.stderr)
        raise
