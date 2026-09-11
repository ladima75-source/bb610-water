# BB610 WATER — ADMIN BACKUP / RECOVERY R1

## Scope
Covers commercial Admin PostgreSQL persistence and public continuity. Does not replace infrastructure-provider snapshot/backup policy.

## Backup
Repository helper:
`services/water-admin-api/scripts/backup.sh`

Requires `BB610_ADMIN_DATABASE_URL` and `pg_dump`.

The script creates:
- PostgreSQL custom-format dump;
- SHA-256 checksum sidecar.

Recommended production policy:
- encrypted daily database backup;
- retain at least 14 daily + 3 monthly copies;
- keep at least one copy outside the primary host/provider failure domain;
- monitor backup success;
- run periodic restore drill.

## Catalog export
Authenticated read endpoints:
- `GET /admin/export/draft`;
- `GET /admin/export/published`.

These provide portable JSON snapshots with version/checksum. They are secondary recovery artifacts; database backup remains authoritative for users, audit and publication history.

## Restore
Repository helper:
`services/water-admin-api/scripts/restore.sh <backup.dump>`

Safeguards:
- requires explicit `BB610_ADMIN_RESTORE_CONFIRM=YES`;
- verifies checksum when sidecar exists;
- restores with `--clean --if-exists`.

Restore must be performed in a controlled maintenance window against the intended database target.

## Recovery verification
After restore:
1. run `alembic upgrade head`;
2. start API;
3. check `/health`;
4. authenticate a named admin user;
5. compare latest draft and published versions;
6. inspect audit tail;
7. call `/public/commercial` and compare checksum/version with expected published snapshot;
8. verify the public configurator can consume that snapshot in non-production;
9. only then reopen writes.

## Commercial rollback
For an incorrect but structurally healthy catalog publication, do NOT restore the database.

Use Admin rollback:
- choose historical version;
- API creates a new version from its snapshot;
- that new version becomes published;
- ROLLBACK audit event records actor, role, target and resulting version.

This preserves all subsequent history.

## Public continuity if Admin/API is unavailable
The public staging adapter keeps three layers:
1. current API published snapshot;
2. browser last-known-good published snapshot;
3. source-controlled accepted seed fallback.

The configurator must therefore never replace unavailable data with zero or fabricated prices. PRICE_ON_REQUEST remains `Ціна уточнюється`.

Production cutover must retain equivalent last-known-good/fallback semantics before live activation.
