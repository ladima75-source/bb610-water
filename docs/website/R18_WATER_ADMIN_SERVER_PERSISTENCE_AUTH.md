# BB610 WATER — R18 / WATER ADMIN SERVER PERSISTENCE + AUTH

- **Status:** REVIEW
- **Base:** R17 Admin v1 UX/function concept = PASS
- **Production WATER site:** NOT CHANGED
- **Task:** `TASK_18_WATER_ADMIN_SERVER_PERSISTENCE_AUTH.md`

## 1. Result

R18 turns the accepted Admin v1 concept into a server-persisted authenticated commercial-management implementation without redesigning the Admin hierarchy or commercial model.

Implemented paths:
- Admin review UI: `docs/website/admin/review/v2/`
- API/service: `services/water-admin-api/`
- Canonical seed: `services/water-admin-api/seed_catalog.json`
- Public staging integration: `docs/website/staging/data/commercial.js`

## 2. Storage / canonical commercial truth

PostgreSQL is the intended production store.

The server stores complete immutable catalog snapshots in `catalog_versions`.

Latest version = current draft.
Latest `catalog_publications` entry = current published version.

Initial seed preserves R17 exactly:
- 7 models;
- 3 zones;
- 21 model×zone rows;
- 15 APPROVED rows with exact accepted prices;
- 6 PRICE_ON_REQUEST rows for F1-P/F2-P × Z4/Z8/Z12;
- no inferred F1-P/F2-P prices;
- no F1-PH/F2-PH naming.

Alembic migration: `migrations/versions/0001_initial_admin_schema.py`.

## 3. Authentication / authorization

Implemented:
- Argon2 password hashing;
- environment-only JWT signing secret;
- bearer token kept only in Admin tab memory;
- configurable expiry;
- unique token `jti`;
- server-side logout revocation;
- durable login throttling keyed by normalized email + client IP hash;
- named roles enforced by API.

Roles:
- viewer = read catalog/versions/audit;
- editor = viewer + draft save;
- admin = editor + publish + rollback + user creation.

CSRF is not applicable because auth does not use ambient browser cookies. Production HTTPS remains mandatory.

## 4. Draft / publish

Editing is not instantly public.

Workflow:
1. authenticated operator edits;
2. client preview/validation;
3. server validates complete catalog;
4. draft save creates a new immutable version;
5. public version stays unchanged;
6. admin requests publish diff;
7. server compares published snapshot vs latest draft;
8. admin explicitly confirms;
9. server creates a NEW immutable published version and appends publication pointer.

`baseVersion` optimistic locking prevents silent concurrent overwrite on save/publish/rollback.

## 5. Publish diff

`GET /admin/publish-diff` returns changed:
- model/zone;
- field;
- old published value/state;
- new draft value/state.

It covers prices, HMI price, APPROVED↔PRICE_ON_REQUEST, active/hidden, model metadata and zone metadata.

Admin v2 shows the diff before confirmation.

## 6. Immutable audit/history

Append-only `catalog_audit_events` records:
- id;
- actor;
- actor role;
- server timestamp;
- resulting catalog version;
- action;
- affected model/zone/field;
- old/new data where applicable.

Events include:
- DRAFT_SAVE;
- PRICE_CHANGE;
- AVAILABILITY_CHANGE;
- MODEL_CHANGE;
- ZONE_CHANGE;
- PUBLISH;
- ROLLBACK;
- USER_CREATE;
- LOGOUT;
- seed/bootstrap events.

Normal Admin API has no audit update/delete action.

## 7. Versioning / rollback

Draft saves are immutable snapshots.

Publish creates a new immutable published version from the reviewed draft.

Rollback is admin-only and does not move a pointer backward to mutate history. It creates a NEW version from the historical snapshot, publishes that new version, and appends ROLLBACK audit.

## 8. Public commercial contract

`GET /public/commercial` is read-only and returns only the last explicitly published version.

Buyer projection excludes `internalNote` and preserves:
- current model codes;
- current zone codes;
- HMI behavior;
- PRICE_ON_REQUEST;
- active/hidden semantics.

No draft is visible through this endpoint.

## 9. Staging integration / failure fallback

Canonical staging now attempts the non-production public endpoint from `docs/website/staging/data/commercial.js`.

Read order:
1. accepted source-controlled seed renders immediately;
2. fetch current published API snapshot;
3. successful response is cached as browser last-known-good;
4. if API later fails, use last-known-good;
5. if no cache exists, keep accepted source seed.

The cache is only public-read continuity; it is never Admin persistence.

No failure path fabricates zero prices. PRICE_ON_REQUEST remains `Ціна уточнюється`.

## 10. Backup / recovery

Implemented helpers:
- `services/water-admin-api/scripts/backup.sh`
- `services/water-admin-api/scripts/restore.sh`

Backup uses PostgreSQL custom dump + SHA-256 sidecar.
Restore requires explicit destructive confirmation and verifies checksum when available.

Authenticated snapshot exports:
- `GET /admin/export/draft`
- `GET /admin/export/published`

Detailed guide: `BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`.

## 11. Review / run instructions

### Static review shell
Commit-pinned URL is reported in the final handoff.

The remote static shell will show the login UI but cannot authenticate unless it can reach a configured review API. It does not fake persistence/authentication.

### Functional local review
1. Create private `services/water-admin-api/.env` from `.env.example`.
2. Put strong local-only values in it.
3. In `services/water-admin-api/` run:
   `docker compose --env-file .env -f docker-compose.review.yml up --build`
4. Confirm `http://localhost:8080/health`.
5. From repository root run `python -m http.server 8000`.
6. Open `http://localhost:8000/docs/website/admin/review/v2/`.
7. Login with the bootstrap account configured in the private `.env`.

## 12. QA status

Repository implementation QA:

| Scenario | Status |
|---|---|
| unauthenticated Admin API denied | IMPLEMENTED |
| login + token expiry | IMPLEMENTED |
| logout revocation | IMPLEMENTED |
| login brute-force throttling | IMPLEMENTED |
| viewer/editor/admin permission split | IMPLEMENTED |
| exact 15 APPROVED + 6 PRICE_ON_REQUEST seed | IMPLEMENTED |
| no inferred F1-P/F2-P prices | IMPLEMENTED |
| no legacy F1-PH/F2-PH | IMPLEMENTED |
| server-side price validation | IMPLEMENTED |
| HMI below base explicit confirmation | IMPLEMENTED |
| draft save does not publish | IMPLEMENTED |
| publish diff | IMPLEMENTED |
| publish creates new immutable version | IMPLEMENTED |
| detailed audit actor + role + timestamp | IMPLEMENTED |
| stale-write conflict | IMPLEMENTED |
| rollback as new published version | IMPLEMENTED |
| public contract strips internal model note | IMPLEMENTED |
| public API failure fallback | IMPLEMENTED |
| Alembic migration | IMPLEMENTED |
| database backup/restore helpers | IMPLEMENTED |
| non-production runtime acceptance | **PENDING DEPLOYMENT/RUN** |
| backup restore drill | **PENDING DEPLOYMENT/RUN** |
| live production cutover | **NOT AUTHORIZED** |

Because the API/database stack has not been deployed and executed in a non-production runtime through this chat, R18 remains REVIEW rather than PASS. No claim of runtime acceptance is made.

## 13. Documentation

Created:
- `docs/website/BB610_WATER_ADMIN_SERVER_ARCHITECTURE_R1.md`
- `docs/website/BB610_WATER_ADMIN_DEPLOYMENT_R1.md`
- `docs/website/BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`
- `docs/website/R18_WATER_ADMIN_SERVER_PERSISTENCE_AUTH.md`

Updated:
- `docs/website/BB610_WATER_ADMIN_OPERATIONS_R1.md`
- `docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md`

## 14. Remaining production gate

Only deployment/cutover work remains for Admin persistence:
- provision durable PostgreSQL;
- deploy API/Admin behind HTTPS;
- inject production secrets;
- create named users/roles and rotate bootstrap access;
- restrict origins/network;
- execute runtime acceptance and restore drill;
- separately authorize live WATER public-data cutover.

PULS screenshot blockers and six missing F1-P/F2-P price rows remain separate product-data blockers.

## 15. Production confirmation

Root production WATER HTML/CSS/JS, CNAME, DNS and live `water.bb610.com.ua` were not changed.

**R18 = REVIEW.**
