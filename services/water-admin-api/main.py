from __future__ import annotations

import hashlib
import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Literal

import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pwdlib import PasswordHash
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, JSON, String, Text, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

DATABASE_URL = os.getenv("BB610_ADMIN_DATABASE_URL", "sqlite:///./water_admin_review.db")
JWT_SECRET = os.getenv("BB610_ADMIN_JWT_SECRET", "")
JWT_ISSUER = os.getenv("BB610_ADMIN_JWT_ISSUER", "bb610-water-admin")
JWT_TTL_MIN = int(os.getenv("BB610_ADMIN_JWT_TTL_MIN", "60"))
BOOTSTRAP_EMAIL = os.getenv("BB610_ADMIN_BOOTSTRAP_EMAIL", "")
BOOTSTRAP_PASSWORD = os.getenv("BB610_ADMIN_BOOTSTRAP_PASSWORD", "")
CORS_ORIGINS = [x.strip() for x in os.getenv("BB610_ADMIN_CORS_ORIGINS", "http://localhost:8000,http://127.0.0.1:8000").split(",") if x.strip()]
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
    version: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

class SaveRequest(BaseModel):
    catalog: dict[str, Any]
    baseVersion: int
    note: str = ""
    confirmWarnings: bool = False

class RollbackRequest(BaseModel):
    baseVersion: int
    note: str = "Rollback"

class UserCreate(BaseModel):
    email: str
    password: str
    role: Literal["viewer", "editor", "admin"]

app = FastAPI(title="BB610 WATER Admin API", version="1.0")
app.add_middleware(CORSMiddleware, allow_origins=CORS_ORIGINS, allow_credentials=False, allow_methods=["GET","POST"], allow_headers=["Authorization","Content-Type"])


def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def canonical_json(data: dict[str, Any]) -> str:
    return json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def checksum(data: dict[str, Any]) -> str:
    return hashlib.sha256(canonical_json(data).encode("utf-8")).hexdigest()


def issue_token(user: User) -> str:
    if not JWT_SECRET:
        raise HTTPException(503, "Authentication secret is not configured")
    now = datetime.now(timezone.utc)
    payload = {"sub": user.email, "role": user.role, "iss": JWT_ISSUER, "iat": now, "exp": now + timedelta(minutes=JWT_TTL_MIN)}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(db_session)) -> User:
    if not JWT_SECRET:
        raise HTTPException(503, "Authentication secret is not configured")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"], issuer=JWT_ISSUER)
    except jwt.PyJWTError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid or expired token")
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


def latest_version(db: Session) -> CatalogVersion:
    row = db.scalar(select(CatalogVersion).order_by(CatalogVersion.version.desc()).limit(1))
    if not row:
        raise HTTPException(500, "Catalog is not initialized")
    return row


def public_projection(catalog: dict[str, Any]) -> dict[str, Any]:
    models = {m["id"]: m for m in catalog["models"]}
    zones = {z["id"]: z for z in catalog["zones"]}
    rows = []
    for r in catalog["rows"]:
        model_active = bool(models.get(r["modelId"], {}).get("active"))
        zone_active = bool(zones.get(r["zoneId"], {}).get("active"))
        active = bool(r.get("active")) and model_active and zone_active
        rows.append({
            "modelId": r["modelId"], "zoneId": r["zoneId"], "active": active,
            "priceState": r["priceState"], "prices": r["prices"], "currency": r.get("currency", "UAH"),
            "buyerNote": r.get("buyerNote", ""), "effectiveFrom": r.get("effectiveFrom")
        })
    return {
        "schemaVersion": catalog.get("schemaVersion", "1.0"), "currency": catalog.get("currency", "UAH"),
        "options": catalog.get("options", {}),
        "models": [{k: v for k, v in m.items() if k != "internalNote"} for m in catalog["models"] if m.get("active")],
        "zones": [z for z in catalog["zones"] if z.get("active")], "rows": rows
    }


def validate_catalog(catalog: dict[str, Any]) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    required_models = {"I","F1","F1-P","F1-PE","F2","F2-P","F2-PE"}
    required_zones = {"Z4(8)","Z8(12)","Z12(16)"}
    model_ids = {m.get("id") for m in catalog.get("models", [])}
    zone_ids = {z.get("id") for z in catalog.get("zones", [])}
    if not required_models.issubset(model_ids): errors.append("Missing required model codes")
    if not required_zones.issubset(zone_ids): errors.append("Missing required zone codes")
    seen: set[str] = set()
    for r in catalog.get("rows", []):
        key = f'{r.get("modelId")}|{r.get("zoneId")}'
        if key in seen: errors.append(f"Duplicate row {key}")
        seen.add(key)
        if r.get("modelId") not in model_ids or r.get("zoneId") not in zone_ids: errors.append(f"Unknown row reference {key}")
        state = r.get("priceState")
        base = (r.get("prices") or {}).get("base")
        hmi = (r.get("prices") or {}).get("hmi")
        if state not in {"APPROVED","PRICE_ON_REQUEST"}: errors.append(f"Invalid priceState for {key}")
        for label, value in (("base", base), ("hmi", hmi)):
            if value is not None and (not isinstance(value, int) or value < 0): errors.append(f"{key} {label} must be a non-negative integer UAH amount")
        if state == "APPROVED" and (base is None or hmi is None): errors.append(f"{key} APPROVED requires both prices")
        if base is not None and hmi is not None and hmi < base: warnings.append(f"{key}: HMI price is lower than base price")
    expected = {f"{m}|{z}" for m in required_models for z in required_zones}
    missing = expected - seen
    if missing: errors.append("Missing model-zone rows: " + ", ".join(sorted(missing)))
    return errors, warnings


def add_audit(db: Session, event_type: str, actor: str, version: int | None, payload: dict[str, Any]):
    db.add(AuditEvent(event_type=event_type, actor=actor, version=version, payload=payload))


def bootstrap():
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        if not db.scalar(select(CatalogVersion).limit(1)):
            seed = json.loads(SEED_PATH.read_text(encoding="utf-8"))
            row = CatalogVersion(version=1, parent_version=None, snapshot=seed, checksum=checksum(seed), created_by="system:seed", note="R17 PASS seed")
            db.add(row); db.flush()
            db.add(Publication(version=1, published_by="system:seed"))
            add_audit(db, "SEED", "system:seed", 1, {"checksum": row.checksum})
        if BOOTSTRAP_EMAIL and BOOTSTRAP_PASSWORD and not db.scalar(select(User).where(User.email == BOOTSTRAP_EMAIL)):
            db.add(User(email=BOOTSTRAP_EMAIL, password_hash=password_hash.hash(BOOTSTRAP_PASSWORD), role="admin", active=True))
            add_audit(db, "USER_BOOTSTRAP", "system:bootstrap", None, {"email": BOOTSTRAP_EMAIL, "role": "admin"})
        db.commit()

@app.on_event("startup")
def on_startup():
    bootstrap()

@app.get("/health")
def health(db: Session = Depends(db_session)):
    latest = latest_version(db)
    pub = db.scalar(select(Publication).order_by(Publication.id.desc()).limit(1))
    return {"ok": True, "latestVersion": latest.version, "publishedVersion": pub.version if pub else None}

@app.post("/auth/token")
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(db_session)):
    user = db.scalar(select(User).where(User.email == form.username, User.active.is_(True)))
    if not user or not password_hash.verify(form.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    return {"access_token": issue_token(user), "token_type": "bearer", "role": user.role, "actor": user.email}

@app.get("/auth/me")
def me(user: User = Depends(current_user)):
    return {"email": user.email, "role": user.role}

@app.post("/admin/users")
def create_user(body: UserCreate, actor: User = Depends(require_role("admin")), db: Session = Depends(db_session)):
    if db.scalar(select(User).where(User.email == body.email)):
        raise HTTPException(409, "User already exists")
    user = User(email=body.email, password_hash=password_hash.hash(body.password), role=body.role, active=True)
    db.add(user); add_audit(db, "USER_CREATE", actor.email, None, {"email": body.email, "role": body.role}); db.commit()
    return {"ok": True}

@app.get("/admin/catalog")
def get_catalog(user: User = Depends(require_role("viewer","editor","admin")), db: Session = Depends(db_session)):
    latest = latest_version(db)
    pub = db.scalar(select(Publication).order_by(Publication.id.desc()).limit(1))
    return {"version": latest.version, "publishedVersion": pub.version if pub else None, "checksum": latest.checksum, "catalog": latest.snapshot}

@app.get("/admin/versions")
def versions(user: User = Depends(require_role("viewer","editor","admin")), db: Session = Depends(db_session)):
    rows = db.scalars(select(CatalogVersion).order_by(CatalogVersion.version.desc()).limit(100)).all()
    return [{"version": r.version, "parentVersion": r.parent_version, "createdBy": r.created_by, "createdAt": r.created_at, "checksum": r.checksum, "note": r.note} for r in rows]

@app.get("/admin/audit")
def audit(user: User = Depends(require_role("viewer","editor","admin")), db: Session = Depends(db_session)):
    rows = db.scalars(select(AuditEvent).order_by(AuditEvent.id.desc()).limit(500)).all()
    return [{"id": r.id, "type": r.event_type, "actor": r.actor, "version": r.version, "payload": r.payload, "createdAt": r.created_at} for r in rows]

@app.post("/admin/catalog/versions")
def save_version(body: SaveRequest, actor: User = Depends(require_role("editor","admin")), db: Session = Depends(db_session)):
    latest = latest_version(db)
    if body.baseVersion != latest.version:
        raise HTTPException(409, {"message": "Catalog changed since it was loaded", "latestVersion": latest.version})
    errors, warnings = validate_catalog(body.catalog)
    if errors: raise HTTPException(422, {"errors": errors, "warnings": warnings})
    if warnings and not body.confirmWarnings: raise HTTPException(409, {"message": "Confirmation required", "warnings": warnings})
    new_version = latest.version + 1
    snap = body.catalog.copy(); snap["history"] = []
    row = CatalogVersion(version=new_version, parent_version=latest.version, snapshot=snap, checksum=checksum(snap), created_by=actor.email, note=body.note)
    db.add(row); add_audit(db, "CATALOG_SAVE", actor.email, new_version, {"parentVersion": latest.version, "checksum": row.checksum, "warnings": warnings, "note": body.note}); db.commit()
    return {"ok": True, "version": new_version, "checksum": row.checksum, "warnings": warnings}

@app.post("/admin/catalog/rollback/{target_version}")
def rollback(target_version: int, body: RollbackRequest, actor: User = Depends(require_role("admin")), db: Session = Depends(db_session)):
    latest = latest_version(db)
    if body.baseVersion != latest.version: raise HTTPException(409, {"message":"Catalog changed since it was loaded", "latestVersion": latest.version})
    target = db.scalar(select(CatalogVersion).where(CatalogVersion.version == target_version))
    if not target: raise HTTPException(404, "Target version not found")
    new_version = latest.version + 1
    snap = json.loads(json.dumps(target.snapshot))
    row = CatalogVersion(version=new_version, parent_version=latest.version, snapshot=snap, checksum=checksum(snap), created_by=actor.email, note=f"{body.note}: v{target_version}")
    db.add(row); add_audit(db, "CATALOG_ROLLBACK", actor.email, new_version, {"fromVersion": latest.version, "targetVersion": target_version, "checksum": row.checksum}); db.commit()
    return {"ok": True, "version": new_version, "rolledBackFrom": target_version}

@app.post("/admin/catalog/publish/{version}")
def publish(version: int, actor: User = Depends(require_role("admin")), db: Session = Depends(db_session)):
    target = db.scalar(select(CatalogVersion).where(CatalogVersion.version == version))
    if not target: raise HTTPException(404, "Version not found")
    errors, warnings = validate_catalog(target.snapshot)
    if errors: raise HTTPException(422, {"errors": errors, "warnings": warnings})
    db.add(Publication(version=version, published_by=actor.email)); add_audit(db, "CATALOG_PUBLISH", actor.email, version, {"checksum": target.checksum, "warnings": warnings}); db.commit()
    return {"ok": True, "publishedVersion": version, "checksum": target.checksum}

@app.get("/public/commercial")
def public_commercial(db: Session = Depends(db_session)):
    pub = db.scalar(select(Publication).order_by(Publication.id.desc()).limit(1))
    if not pub: raise HTTPException(503, "No published catalog")
    version = db.scalar(select(CatalogVersion).where(CatalogVersion.version == pub.version))
    if not version: raise HTTPException(500, "Published catalog version is missing")
    return {"version": version.version, "checksum": version.checksum, "catalog": public_projection(version.snapshot)}
