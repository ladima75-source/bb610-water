# BB610 WATER — R18 / ADMIN PERSISTENCE + AUTH + SAFE PUBLICATION

- **Status:** REVIEW
- **Base:** R17 Admin v1 UX/functionality = PASS
- **Production WATER website:** NOT CHANGED
- **Goal:** production-grade authenticated persistence and publication layer without redesigning accepted Admin v1

## 1. Implemented architecture

Backend service:
`services/water-admin-api/`

Review Admin UI:
`docs/website/admin/review/v2/`

Architecture reference:
`docs/website/BB610_WATER_ADMIN_PERSISTENCE_ARCHITECTURE_R1.md`

The accepted Admin v1 hierarchy and operational layout remain intact. R18 adds server responsibilities rather than replacing the UX.

## 2. Persistence/auth status

### Implemented in code
- FastAPI authenticated API;
- PostgreSQL persistence target;
- Alembic versioned schema migration;
- Argon2 password hashes;
- signed JWT bearer access tokens with environment-only secret;
- roles `viewer`, `editor`, `admin`;
- immutable catalog snapshots;
- optimistic concurrency via `baseVersion`;
- immutable per-field price/availability/model/zone audit events with actor + timestamp + resulting version;
- append-only publication records;
- rollback by creating a new catalog version from a prior immutable snapshot;
- explicit admin-only publish action;
- buyer-safe `GET /public/commercial` endpoint from the last explicitly published version;
- server-side catalog validation independent of browser validation.

### Not deployed in this task
- no production database provisioned;
- no production API/admin hostname activated;
- no real production users created;
- no production secrets configured;
- live WATER website not switched to the API.

Therefore persistence/auth implementation status is:

**IMPLEMENTED / NOT YET PRODUCTION-DEPLOYED**

## 3. Seed migration invariant

`services/water-admin-api/seed_catalog.json` preserves the accepted R17/R16 state exactly:
- 7 models;
- 3 zones;
- 21 model×zone rows;
- 15 `APPROVED` rows with the same accepted UAH values;
- 6 `PRICE_ON_REQUEST` rows for F1-P/F2-P × Z4/Z8/Z12;
- no inferred F1-P/F2-P prices;
- no legacy F1-PH/F2-PH naming.

First database bootstrap creates catalog version 1 and publication 1 from this seed.

## 4. Authorization contract

`viewer`
- read catalog;
- read versions;
- read audit.

`editor`
- viewer permissions;
- create new immutable catalog versions.

`admin`
- editor permissions;
- publish a version;
- rollback to historical content by creating a new version;
- create additional users.

No frontend password/token/secret is committed.

## 5. Version/history behavior

Every successful save:
1. checks that `baseVersion` equals latest server version;
2. validates complete catalog server-side;
3. rejects stale writes with HTTP 409;
4. requires explicit warning confirmation for HMI < base price;
5. creates a new immutable catalog snapshot;
6. appends `PRICE_CHANGE`, `AVAILABILITY_CHANGE`, `MODEL_CHANGE`, `ZONE_CHANGE` events as applicable;
7. appends a `CATALOG_SAVE` event.

History is read-only through normal API endpoints.

Rollback does not mutate history. It creates a new version from the selected old snapshot and appends rollback/audit events.

## 6. Safe public publication

Saving does not automatically alter public data.

Only an authenticated `admin` may publish a catalog version.

Publication creates an append-only publication record. `GET /public/commercial` returns the projection of the latest explicitly published immutable version.

Internal model notes are not included in the public projection.

This eliminates manual source-file editing for future public commercial changes after the separately approved production cutover.

The current live WATER site remains source-controlled and unchanged until owner approval for that cutover.

## 7. Review URL / verification instructions

Static Admin shell:
`docs/website/admin/review/v2/index.html`

The shell intentionally requires a live API; it does not fake authentication or persistence.

### Local review procedure
1. In `services/water-admin-api/`, copy `.env.example` to `.env` outside Git and enter local review secrets.
2. Run:
   `docker compose --env-file .env -f docker-compose.review.yml up --build`
3. Confirm API:
   `http://localhost:8080/health`
4. From repository root serve static files on port 8000, for example:
   `python -m http.server 8000`
5. Open:
   `http://localhost:8000/docs/website/admin/review/v2/`
6. Login using the bootstrap account configured in the local `.env`.

## 8. QA scenarios / result

Implementation review covers the required persistence flows:

| Scenario | Implementation status |
|---|---|
| Authenticated login | IMPLEMENTED |
| Invalid login rejection | IMPLEMENTED |
| viewer read-only authorization | IMPLEMENTED |
| editor save authorization | IMPLEMENTED |
| admin publish/rollback authorization | IMPLEMENTED |
| 7 models / 3 zones / 21 rows seed | IMPLEMENTED |
| 15 APPROVED prices preserved | IMPLEMENTED |
| 6 PRICE_ON_REQUEST preserved | IMPLEMENTED |
| Server price validation | IMPLEMENTED |
| HMI-below-base warning confirmation | IMPLEMENTED |
| Optimistic concurrency / stale save rejection | IMPLEMENTED |
| Immutable version creation | IMPLEMENTED |
| Per-price immutable audit actor/timestamp | IMPLEMENTED |
| Availability/model/zone audit | IMPLEMENTED |
| Rollback creates new version | IMPLEMENTED |
| Explicit publish separation from save | IMPLEMENTED |
| Public buyer-safe serialization | IMPLEMENTED |
| Versioned database schema migration | IMPLEMENTED |
| Production deployment runtime acceptance | PENDING DEPLOYMENT |
| Backup/restore acceptance | PENDING DEPLOYMENT |
| Live WATER cutover | NOT AUTHORIZED |

No claim is made that the production environment has been runtime-tested because it has not been deployed in this task.

## 9. Production acceptance gate

Before production activation:
- provision durable PostgreSQL and backups;
- deploy API/Admin behind HTTPS;
- configure strong deployment secrets;
- create real users/roles and remove bootstrap credentials;
- restrict CORS/network exposure;
- perform runtime login/save/audit/version/publish/rollback tests;
- verify database backup/restore;
- separately approve and execute public WATER cutover to `/public/commercial`.

These deployment/cutover items are recorded in `BB610_WATER_WEBSITE_COMPLETION_REGISTER.md`.

## 10. Production confirmation

Root production `index.html`, production CSS/JS, CNAME and live `water.bb610.com.ua` were not changed.

**R18 = REVIEW.**
