from __future__ import annotations

import hashlib
import json
import os
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Literal

import jwt
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pwdlib import PasswordHash
from sqlalchemy import Boolean, DateTime, Integer, JSON, String, Text, create_engine, delete, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

DATABASE_URL = os.getenv("BB610_ADMIN_DATABASE_URL", "sqlite:///./water_admin_review.db")
JWT_SECRET = os.getenv("BB610_ADMIN_JWT_SECRET", "")
JWT_ISSUER = os.getenv("BB610_ADMIN_JWT_ISSUER", "bb610-water-admin")
JWT_TTL_MIN = int(os.getenv("BB610_ADMIN_JWT_TTL_MIN", "60"))
BOOTSTRAP_EMAIL = os.getenv("BB610_ADMIN_BOOTSTRAP_EMAIL", "")
BOOTSTRAP_PASSWORD = os.getenv("BB610_ADMIN_BOOTSTRAP_PASSWORD", "")
CORS_ORIGINS = [x.strip() for x in os.getenv("BB610_ADMIN_CORS_ORIGINS", "http://localhost:8000,http://127.0.0.1:8000").split(",") if x.strip()]
LOGIN_MAX_FAILURES = int(os.getenv("BB610_ADMIN_LOGIN_MAX_FAILURES", "5"))
LOGIN_BLOCK_MIN = int(os.getenv("BB610_ADMIN_LOGIN_BLOCK_MIN", "15"))
SEED_PATH = Path(__file__).with_name("seed_catalog.json")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://") and "+psycopg" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

engine = create_engine(DATABASE_URL, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "admin_users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(512))
    role: Mapped[str] = mapped_column(String(32), default="viewer")
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class LoginThrottle(Base):
    __tablename__ = "auth_login_throttle"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    key_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    failures: Mapped[int] = mapped_column(Integer, default=0)
    blocked_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class RevokedToken(Base):
    __tablename__ = "revoked_tokens"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    jti: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    revoked_by: Mapped[str] = mapped_column(String(320))
    revoked_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class CatalogVersion(Base):
    __tablename__ = "catalog_versions"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    version: Mapped[int] = mapped_column(Integer, unique=True, index=True)
    parent_version: Mapped[int | None] = mapped_column(Integer, nullable=True)
    snapshot: Mapped[dict[str, Any]] = mapped_column(JSON)
    checksum: Mapped[str] = mapped_column(String(64))
    created_by: Mapped[str] = mapped_column(String(320))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    note: Mapped[str] = mapped_column(Text, default="")


class Publication(Base):
    __tablename__ = "catalog_publications"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    version: Mapped[int] = mapped_column(Integer, index=True)
    published_by: Mapped[str] = mapped_column(String(320))
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class AuditEvent(Base):
    __tablename__ = "catalog_audit_events"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    event_type: Mapped[str] = mapped_column(String(64), index=True)
    actor: Mapped[str] = mapped_column(String(320), index=True)
    actor_role: Mapped[str] = mapped_column(String(32))
    version: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)


class SaveRequest(BaseModel):
    catalog: dict[str, Any]
    baseVersion: int
    note: str = ""
    confirmWarnings: bool = False


class PublishRequest(BaseModel):
    baseVersion: int
    reason: str = ""
    confirmWarnings: bool = False


class RollbackRequest(BaseModel):
    baseVersion: int
    reason: str = "Rollback"


class UserCreate(BaseModel):
    email: str
    password: str
    role: Literal["viewer", "editor", "admin"]


app = FastAPI(title="BB610 WATER Admin API", version="1.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)


def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def canonical_json(data: dict[str, Any]) -> str:
    return json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def checksum(data: dict[str, Any]) -> str:
    return hashlib.sha256(canonical_json(data).encode("utf-8")).hexdigest()


def latest_version(db: Session) -> CatalogVersion:
    row = db.scalar(select(CatalogVersion).order_by(CatalogVersion.version.desc()).limit(1))
    if not row:
        raise HTTPException(500, "Catalog is not initialized")
    return row


def current_publication(db: Session) -> Publication | None:
    return db.scalar(select(Publication).order_by(Publication.id.desc()).limit(1))


def add_audit(db: Session, event_type: str, actor: str, actor_role: str, version: int | None, payload: dict[str, Any]):
    db.add(AuditEvent(event_type=event_type, actor=actor, actor_role=actor_role, version=version, payload=payload))


def token_payload(token: str, verify_exp: bool = True) -> dict[str, Any]:
    if not JWT_SECRET:
        raise HTTPException(503, "Authentication secret is not configured")
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"], issuer=JWT_ISSUER, options={"verify_exp": verify_exp})
    except jwt.PyJWTError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")


def issue_token(user: User) -> str:
    now = utcnow()
    payload = {
        "sub": user.email,
        "role": user.role,
        "jti": uuid.uuid4().hex,
        "iss": JWT_ISSUER,
        "iat": now,
        "exp": now + timedelta(minutes=JWT_TTL_MIN),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(db_session)) -> User:
    payload = token_payload(token)
    jti = payload.get("jti")
    if not jti or db.scalar(select(RevokedToken).where(RevokedToken.jti == jti)):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Session is revoked")
    user = db.scalar(select(User).where(User.email == payload.get("sub"), User.active.is_(True)))
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User is inactive or missing")
    return user


def require_role(*roles: str):
    def dep(user: User = Depends(current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Insufficient role")
        return user
    return dep


def login_key(request: Request, email: str) -> str:
    ip = request.client.host if request.client else "unknown"
    return hashlib.sha256(f"{email.strip().lower()}|{ip}".encode()).hexdigest()


def validate_catalog(catalog: dict[str, Any]) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    required_models = {"I", "F1", "F1-P", "F1-PE", "F2", "F2-P", "F2-PE"}
    required_zones = {"Z4(8)", "Z8(12)", "Z12(16)"}
    model_ids = {m.get("id") for m in catalog.get("models", [])}
    zone_ids = {z.get("id") for z in catalog.get("zones", [])}
    if not required_models.issubset(model_ids):
        errors.append("Missing required model codes")
    if not required_zones.issubset(zone_ids):
        errors.append("Missing required zone codes")
    seen: set[str] = set()
    for row in catalog.get("rows", []):
        key = f'{row.get("modelId")}|{row.get("zoneId")}'
        if key in seen:
            errors.append(f"Duplicate row {key}")
        seen.add(key)
        if row.get("modelId") not in model_ids or row.get("zoneId") not in zone_ids:
            errors.append(f"Unknown row reference {key}")
        state = row.get("priceState")
        base = (row.get("prices") or {}).get("base")
        hmi = (row.get("prices") or {}).get("hmi")
        if state not in {"APPROVED", "PRICE_ON_REQUEST"}:
            errors.append(f"Invalid priceState for {key}")
        for label, value in (("base", base), ("hmi", hmi)):
            if value is not None and (not isinstance(value, int) or value < 0):
                errors.append(f"{key} {label} must be a non-negative integer UAH amount")
        if state == "APPROVED" and (base is None or hmi is None):
            errors.append(f"{key} APPROVED requires both prices")
        if base is not None and hmi is not None and hmi < base:
            warnings.append(f"{key}: HMI price is lower than base price")
    expected = {f"{m}|{z}" for m in required_models for z in required_zones}
    missing = expected - seen
    if missing:
        errors.append("Missing model-zone rows: " + ", ".join(sorted(missing)))
    return errors, warnings


def public_projection(catalog: dict[str, Any]) -> dict[str, Any]:
    models = {m["id"]: m for m in catalog["models"]}
    zones = {z["id"]: z for z in catalog["zones"]}
    rows = []
    for row in catalog["rows"]:
        active = bool(row.get("active")) and bool(models.get(row["modelId"], {}).get("active")) and bool(zones.get(row["zoneId"], {}).get("active"))
        rows.append({
            "modelId": row["modelId"],
            "zoneId": row["zoneId"],
            "active": active,
            "priceState": row["priceState"],
            "prices": row["prices"],
            "currency": row.get("currency", "UAH"),
            "buyerNote": row.get("buyerNote", ""),
            "effectiveFrom": row.get("effectiveFrom"),
        })
    return {
        "schemaVersion": catalog.get("schemaVersion", "1.0"),
        "currency": catalog.get("currency", "UAH"),
        "options": catalog.get("options", {}),
        "models": [{k: v for k, v in m.items() if k != "internalNote"} for m in catalog["models"] if m.get("active")],
        "zones": [z for z in catalog["zones"] if z.get("active")],
        "rows": rows,
    }


def catalog_diff(old: dict[str, Any], new: dict[str, Any]) -> list[dict[str, Any]]:
    changes: list[dict[str, Any]] = []
    old_rows = {(r["modelId"], r["zoneId"]): r for r in old.get("rows", [])}
    new_rows = {(r["modelId"], r["zoneId"]): r for r in new.get("rows", [])}
    for key, nr in new_rows.items():
        orow = old_rows.get(key, {})
        if orow.get("active") != nr.get("active"):
            changes.append({"modelId": key[0], "zoneId": key[1], "field": "active", "old": orow.get("active"), "new": nr.get("active")})
        if orow.get("priceState") != nr.get("priceState"):
            changes.append({"modelId": key[0], "zoneId": key[1], "field": "priceState", "old": orow.get("priceState"), "new": nr.get("priceState")})
        for option in ("base", "hmi"):
            ov = (orow.get("prices") or {}).get(option)
            nv = (nr.get("prices") or {}).get(option)
            if ov != nv:
                changes.append({"modelId": key[0], "zoneId": key[1], "field": f"price.{option}", "old": ov, "new": nv})
    old_models = {m["id"]: m for m in old.get("models", [])}
    for nm in new.get("models", []):
        om = old_models.get(nm["id"])
        if om != nm:
            changes.append({"modelId": nm["id"], "zoneId": None, "field": "model", "old": om, "new": nm})
    old_zones = {z["id"]: z for z in old.get("zones", [])}
    for nz in new.get("zones", []):
        oz = old_zones.get(nz["id"])
        if oz != nz:
            changes.append({"modelId": None, "zoneId": nz["id"], "field": "zone", "old": oz, "new": nz})
    return changes


def audit_diff(db: Session, old: dict[str, Any], new: dict[str, Any], actor: User, version: int):
    for change in catalog_diff(old, new):
        field = change["field"]
        kind = "PRICE_CHANGE" if field.startswith("price.") or field == "priceState" else "AVAILABILITY_CHANGE" if field == "active" else "MODEL_CHANGE" if field == "model" else "ZONE_CHANGE"
        add_audit(db, kind, actor.email, actor.role, version, change)


def bootstrap():
    with SessionLocal() as db:
        if not db.scalar(select(CatalogVersion).limit(1)):
            seed = json.loads(SEED_PATH.read_text(encoding="utf-8"))
            row = CatalogVersion(version=1, parent_version=None, snapshot=seed, checksum=checksum(seed), created_by="system:seed", note="R17 PASS seed")
            db.add(row)
            db.flush()
            db.add(Publication(version=1, published_by="system:seed"))
            add_audit(db, "SEED", "system:seed", "system", 1, {"checksum": row.checksum})
        if BOOTSTRAP_EMAIL and BOOTSTRAP_PASSWORD and not db.scalar(select(User).where(User.email == BOOTSTRAP_EMAIL)):
            db.add(User(email=BOOTSTRAP_EMAIL, password_hash=password_hash.hash(BOOTSTRAP_PASSWORD), role="admin", active=True))
            add_audit(db, "USER_BOOTSTRAP", "system:bootstrap", "system", None, {"email": BOOTSTRAP_EMAIL, "role": "admin"})
        db.commit()


@app.on_event("startup")
def on_startup():
    bootstrap()


@app.get("/health")
def health(db: Session = Depends(db_session)):
    latest = latest_version(db)
    pub = current_publication(db)
    return {"ok": True, "latestDraftVersion": latest.version, "publishedVersion": pub.version if pub else None}


@app.post("/auth/token")
def login(request: Request, form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(db_session)):
    key = login_key(request, form.username)
    throttle = db.scalar(select(LoginThrottle).where(LoginThrottle.key_hash == key))
    now = utcnow()
    if throttle and throttle.blocked_until and throttle.blocked_until > now:
        raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, "Too many failed attempts. Try again later.")
    user = db.scalar(select(User).where(User.email == form.username, User.active.is_(True)))
    ok = bool(user and password_hash.verify(form.password, user.password_hash))
    if not ok:
        if not throttle:
            throttle = LoginThrottle(key_hash=key, failures=0, blocked_until=None, updated_at=now)
            db.add(throttle)
        throttle.failures += 1
        throttle.updated_at = now
        if throttle.failures >= LOGIN_MAX_FAILURES:
            throttle.blocked_until = now + timedelta(minutes=LOGIN_BLOCK_MIN)
        db.commit()
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    if throttle:
        db.delete(throttle)
        db.commit()
    return {"access_token": issue_token(user), "token_type": "bearer", "role": user.role, "actor": user.email, "expiresInMinutes": JWT_TTL_MIN}


@app.post("/auth/logout")
def logout(token: str = Depends(oauth2_scheme), user: User = Depends(current_user), db: Session = Depends(db_session)):
    payload = token_payload(token, verify_exp=False)
    exp = datetime.fromtimestamp(payload["exp"], tz=timezone.utc)
    db.add(RevokedToken(jti=payload["jti"], expires_at=exp, revoked_by=user.email))
    add_audit(db, "LOGOUT", user.email, user.role, None, {"jti": payload["jti"]})
    db.commit()
    return {"ok": True}


@app.get("/auth/session")
def session(user: User = Depends(current_user)):
    return {"email": user.email, "role": user.role}


@app.post("/admin/users")
def create_user(body: UserCreate, actor: User = Depends(require_role("admin")), db: Session = Depends(db_session)):
    if db.scalar(select(User).where(User.email == body.email)):
        raise HTTPException(409, "User already exists")
    db.add(User(email=body.email, password_hash=password_hash.hash(body.password), role=body.role, active=True))
    add_audit(db, "USER_CREATE", actor.email, actor.role, None, {"email": body.email, "role": body.role})
    db.commit()
    return {"ok": True}


@app.get("/admin/catalog")
def get_catalog(user: User = Depends(require_role("viewer", "editor", "admin")), db: Session = Depends(db_session)):
    latest = latest_version(db)
    pub = current_publication(db)
    return {"version": latest.version, "publishedVersion": pub.version if pub else None, "checksum": latest.checksum, "catalog": latest.snapshot}


@app.get("/admin/versions")
def versions(user: User = Depends(require_role("viewer", "editor", "admin")), db: Session = Depends(db_session)):
    pub = current_publication(db)
    rows = db.scalars(select(CatalogVersion).order_by(CatalogVersion.version.desc()).limit(100)).all()
    return [{"version": r.version, "parentVersion": r.parent_version, "createdBy": r.created_by, "createdAt": r.created_at, "checksum": r.checksum, "note": r.note, "published": bool(pub and pub.version == r.version)} for r in rows]


@app.get("/admin/audit")
def audit(user: User = Depends(require_role("viewer", "editor", "admin")), db: Session = Depends(db_session)):
    rows = db.scalars(select(AuditEvent).order_by(AuditEvent.id.desc()).limit(1000)).all()
    return [{"id": r.id, "type": r.event_type, "actor": r.actor, "role": r.actor_role, "version": r.version, "payload": r.payload, "createdAt": r.created_at} for r in rows]


@app.post("/admin/catalog/versions")
def save_draft(body: SaveRequest, actor: User = Depends(require_role("editor", "admin")), db: Session = Depends(db_session)):
    latest = latest_version(db)
    if body.baseVersion != latest.version:
        raise HTTPException(409, {"message": "Catalog changed since it was loaded", "latestVersion": latest.version})
    errors, warnings = validate_catalog(body.catalog)
    if errors:
        raise HTTPException(422, {"errors": errors, "warnings": warnings})
    if warnings and not body.confirmWarnings:
        raise HTTPException(409, {"message": "Confirmation required", "warnings": warnings})
    new_version = latest.version + 1
    snap = json.loads(json.dumps(body.catalog))
    snap["history"] = []
    row = CatalogVersion(version=new_version, parent_version=latest.version, snapshot=snap, checksum=checksum(snap), created_by=actor.email, note=body.note or "Draft save")
    db.add(row)
    audit_diff(db, latest.snapshot, snap, actor, new_version)
    add_audit(db, "DRAFT_SAVE", actor.email, actor.role, new_version, {"parentVersion": latest.version, "checksum": row.checksum, "warnings": warnings, "note": body.note})
    db.commit()
    return {"ok": True, "version": new_version, "checksum": row.checksum, "warnings": warnings}


@app.get("/admin/publish-diff")
def publish_diff(user: User = Depends(require_role("viewer", "editor", "admin")), db: Session = Depends(db_session)):
    draft = latest_version(db)
    pub = current_publication(db)
    if not pub:
        return {"draftVersion": draft.version, "publishedVersion": None, "changes": [{"field": "initialPublication", "old": None, "new": "catalog"}]}
    published = db.scalar(select(CatalogVersion).where(CatalogVersion.version == pub.version))
    if not published:
        raise HTTPException(500, "Published version is missing")
    return {"draftVersion": draft.version, "publishedVersion": published.version, "changes": catalog_diff(published.snapshot, draft.snapshot)}


@app.post("/admin/catalog/publish")
def publish(body: PublishRequest, actor: User = Depends(require_role("admin")), db: Session = Depends(db_session)):
    draft = latest_version(db)
    if body.baseVersion != draft.version:
        raise HTTPException(409, {"message": "Draft changed since publish review", "latestVersion": draft.version})
    errors, warnings = validate_catalog(draft.snapshot)
    if errors:
        raise HTTPException(422, {"errors": errors, "warnings": warnings})
    if warnings and not body.confirmWarnings:
        raise HTTPException(409, {"message": "Confirmation required", "warnings": warnings})
    new_version = draft.version + 1
    snap = json.loads(json.dumps(draft.snapshot))
    published = CatalogVersion(version=new_version, parent_version=draft.version, snapshot=snap, checksum=checksum(snap), created_by=actor.email, note=f"Published: {body.reason}".strip())
    db.add(published)
    db.flush()
    db.add(Publication(version=new_version, published_by=actor.email))
    add_audit(db, "PUBLISH", actor.email, actor.role, new_version, {"draftVersion": draft.version, "checksum": published.checksum, "reason": body.reason, "warnings": warnings})
    db.commit()
    return {"ok": True, "publishedVersion": new_version, "checksum": published.checksum, "warnings": warnings}


@app.post("/admin/catalog/rollback/{target_version}")
def rollback(target_version: int, body: RollbackRequest, actor: User = Depends(require_role("admin")), db: Session = Depends(db_session)):
    latest = latest_version(db)
    if body.baseVersion != latest.version:
        raise HTTPException(409, {"message": "Catalog changed since rollback review", "latestVersion": latest.version})
    target = db.scalar(select(CatalogVersion).where(CatalogVersion.version == target_version))
    if not target:
        raise HTTPException(404, "Target version not found")
    new_version = latest.version + 1
    snap = json.loads(json.dumps(target.snapshot))
    row = CatalogVersion(version=new_version, parent_version=latest.version, snapshot=snap, checksum=checksum(snap), created_by=actor.email, note=f"Rollback published from v{target_version}: {body.reason}")
    db.add(row)
    db.flush()
    db.add(Publication(version=new_version, published_by=actor.email))
    audit_diff(db, latest.snapshot, snap, actor, new_version)
    add_audit(db, "ROLLBACK", actor.email, actor.role, new_version, {"fromVersion": latest.version, "targetVersion": target_version, "reason": body.reason, "checksum": row.checksum})
    db.commit()
    return {"ok": True, "publishedVersion": new_version, "rolledBackFrom": target_version}


@app.get("/admin/export/draft")
def export_draft(user: User = Depends(require_role("viewer", "editor", "admin")), db: Session = Depends(db_session)):
    row = latest_version(db)
    return {"version": row.version, "checksum": row.checksum, "catalog": row.snapshot}


@app.get("/admin/export/published")
def export_published(user: User = Depends(require_role("viewer", "editor", "admin")), db: Session = Depends(db_session)):
    pub = current_publication(db)
    if not pub:
        raise HTTPException(404, "No published catalog")
    row = db.scalar(select(CatalogVersion).where(CatalogVersion.version == pub.version))
    return {"version": row.version, "checksum": row.checksum, "catalog": row.snapshot}


@app.get("/public/commercial")
def public_commercial(db: Session = Depends(db_session)):
    pub = current_publication(db)
    if not pub:
        raise HTTPException(503, "No published catalog")
    row = db.scalar(select(CatalogVersion).where(CatalogVersion.version == pub.version))
    if not row:
        raise HTTPException(500, "Published catalog version is missing")
    return {"version": row.version, "checksum": row.checksum, "catalog": public_projection(row.snapshot)}
