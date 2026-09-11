# BB610 WATER — ADMIN PERSISTENCE ARCHITECTURE R1

## Status

Implementation architecture for the accepted WATER Admin v1 UX. Production WATER website remains unchanged.

## 1. Components

### Admin UI
`docs/website/admin/review/v2/`

Preserves the accepted R17 admin interaction model and adds authenticated server operations:
- login;
- role-aware editing;
- immutable-version save;
- audit/history read;
- admin publish;
- admin rollback.

### Admin API
`services/water-admin-api/`

FastAPI service exposing:
- `POST /auth/token`;
- `GET /auth/me`;
- `GET /admin/catalog`;
- `POST /admin/catalog/versions`;
- `GET /admin/versions`;
- `GET /admin/audit`;
- `POST /admin/catalog/rollback/{version}`;
- `POST /admin/catalog/publish/{version}`;
- `POST /admin/users` (admin only);
- `GET /public/commercial`.

### Persistence
PostgreSQL is the intended production store.

Tables:
1. `admin_users` — authenticated operators and roles;
2. `catalog_versions` — immutable complete catalog snapshots;
3. `catalog_publications` — append-only publication pointer events;
4. `catalog_audit_events` — append-only detailed audit events.

No endpoint edits or deletes historical version/audit records.

## 2. Authentication and authorization

Passwords are Argon2 hashes via `pwdlib`.

Signed bearer JWTs:
- secret only from environment;
- configurable issuer;
- configurable TTL;
- no secret/password stored in repository.

Roles:
- `viewer`: read catalog, versions, audit;
- `editor`: viewer + create new catalog versions;
- `admin`: editor + publish, rollback, user creation.

The review UI keeps its bearer token only in tab memory. A reload requires login again.

Production deployment additionally requires HTTPS/TLS and protected API/admin host routing.

## 3. Versioning and optimistic concurrency

Admin loads version `N`.

Save sends:
- complete canonical catalog snapshot;
- `baseVersion=N`;
- optional note;
- warning confirmation flag.

If another actor has already saved version `N+1`, API returns `409` and rejects the stale save. No silent last-write-wins overwrite is allowed.

A successful save creates version `N+1`; version `N` remains immutable.

## 4. Immutable audit/history

Every save appends:
- high-level `CATALOG_SAVE` event;
- `PRICE_CHANGE` per changed base/HMI price or price state;
- `AVAILABILITY_CHANGE` per row availability change;
- `MODEL_CHANGE` for changed model metadata/capabilities;
- `ZONE_CHANGE` for changed zone metadata.

Every event stores server timestamp, authenticated actor, resulting catalog version, and old/new values in payload where applicable.

Rollback and publish also append their own events.

The normal Admin API exposes no update/delete method for audit records.

## 5. Rollback

Rollback never rewrites an old version.

Admin selects historical version `K`. API verifies current `baseVersion`, then creates a new version `N+1` whose snapshot is copied from `K`. Audit records both the prior current version and rollback target.

This preserves a complete linear operational history.

## 6. Publication model

Saving and publishing are separate actions.

Only `admin` can publish.

Publish appends a `catalog_publications` row referencing an immutable catalog version. `GET /public/commercial` projects only the latest explicitly published version and strips internal model notes.

This endpoint is the production cutover target for public commercial data. The live WATER website is NOT switched to it in this stage.

## 7. Validation boundary

Server validates independently from browser UI:
- required seven models and three zone codes;
- unique 21 model×zone rows;
- valid references;
- `APPROVED` / `PRICE_ON_REQUEST` states;
- non-negative integer UAH prices;
- both prices required for `APPROVED`;
- warning/confirmation if HMI < base.

Browser validation is convenience only; server validation is authoritative.

## 8. Seed and migration invariant

`services/water-admin-api/seed_catalog.json` is the accepted R17/R16 state.

Invariant:
- 15 rows `APPROVED` with the exact accepted prices;
- 6 rows `PRICE_ON_REQUEST` for F1-P/F2-P × Z4/Z8/Z12;
- no inferred F1-P/F2-P price;
- no F1-PH/F2-PH legacy naming.

First database initialization creates immutable catalog version 1 and publication 1 from this seed.

## 9. Deployment boundary

Implemented in repository but NOT deployed to production in this stage.

Before production activation:
1. provision durable PostgreSQL with backup policy;
2. deploy API behind HTTPS;
3. inject strong database/JWT/bootstrap secrets through deployment secret storage;
4. create real admin users and roles;
5. rotate/remove bootstrap credentials;
6. restrict CORS to approved Admin origin;
7. verify restore from database backup;
8. owner approves public WATER cutover to `/public/commercial`.

Root production WATER files/CNAME remain untouched until that explicit cutover approval.
