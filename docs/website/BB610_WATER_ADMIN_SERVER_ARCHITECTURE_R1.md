# BB610 WATER — ADMIN SERVER ARCHITECTURE R1

## Status
Implementation for TASK 18. Admin v1 UX is preserved; server persistence/auth/publication is the new layer.

## Runtime
- Admin UI: `docs/website/admin/review/v2/`
- API: `services/water-admin-api/app.py`
- Database: PostgreSQL
- Migrations: Alembic `services/water-admin-api/migrations/`
- Seed: `services/water-admin-api/seed_catalog.json`

## Canonical state
The server database is the mutable commercial source once deployed. The accepted seed remains exactly 7 models × 3 zones with 15 APPROVED and 6 PRICE_ON_REQUEST rows.

`catalog_versions` stores immutable snapshots. Latest version is the current draft. `catalog_publications` is append-only and points to the currently published immutable version.

## Auth
Bearer JWT session model:
- Argon2 password hashes;
- token secret/issuer/TTL from environment;
- unique `jti` per session;
- logout writes `jti` to durable revocation table;
- revoked/expired tokens are denied;
- login throttling is stored server-side by email+client-IP hash.

CSRF is not applicable because credentials are not carried in browser cookies; Admin sends an Authorization bearer token held only in tab memory. Production TLS remains mandatory.

Roles:
- viewer: read only;
- editor: read + save draft;
- admin: editor + publish + rollback + user creation.

## Draft / publish
Save creates a new immutable draft version and never changes public output.

`GET /admin/publish-diff` compares latest draft with current published snapshot, including price, price-state, availability, model and zone changes.

Only admin can publish. Publish verifies `baseVersion`, revalidates server-side, creates a NEW immutable published version, then appends a publication record.

## Audit
`catalog_audit_events` is append-only through the normal application API and records:
- event id;
- actor;
- actor role;
- timestamp;
- resulting catalog version;
- action;
- affected field/model/zone;
- old/new data where applicable.

Event types include DRAFT_SAVE, PRICE_CHANGE, AVAILABILITY_CHANGE, MODEL_CHANGE, ZONE_CHANGE, PUBLISH, ROLLBACK, USER_CREATE, LOGOUT and bootstrap/seed events.

## Versioning / rollback
All writes use optimistic locking with `baseVersion`.

A stale draft save/publish/rollback returns 409 and must be refreshed.

Rollback never rewrites history. Admin chooses a historical snapshot; API creates a new immutable version from it and immediately publishes that new version.

## Public contract
`GET /public/commercial` is unauthenticated read-only buyer-safe data from the last published version only.

It excludes `internalNote` and preserves:
- 7 current model codes;
- 3 current zone codes;
- HMI base/with-HMI semantics;
- PRICE_ON_REQUEST;
- active/hidden configuration behavior.

## Staging failure model
`docs/website/staging/data/commercial.js` now:
1. starts from the accepted source-controlled safe seed;
2. requests non-production `/public/commercial`;
3. caches the last successful published response in browser localStorage;
4. on API failure uses last-known-good if available;
5. otherwise remains on the accepted seed fallback.

Admin/browser storage is never canonical persistence. The localStorage cache is only a public read continuity cache.

## Secrets
No real password, database password or JWT secret is committed. Production values must be injected by deployment secret storage.
