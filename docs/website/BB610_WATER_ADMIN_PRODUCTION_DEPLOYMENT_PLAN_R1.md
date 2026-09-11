# BB610 WATER — ADMIN PRODUCTION DEPLOYMENT PLAN R1

- **Prepared after:** R19 runtime acceptance
- **Runtime acceptance:** PASS
- **Live WATER production:** NOT CHANGED
- **Purpose:** exact deployment/cutover sequence for the accepted Admin persistence stack

## 1. Deployment principle

R19 proves the application stack with PostgreSQL, migrations, API, Admin v2, public commercial contract, rollback and backup/restore.

Production deployment must reuse that proven stack. Do not redesign Admin or introduce another catalog store.

Recommended deployment boundary:

- keep current `water.bb610.com.ua` production website unchanged until the separate commercial-data cutover gate;
- deploy WATER Admin/API as an isolated service on the existing BB610 server environment after host-capacity confirmation;
- keep PostgreSQL private and reachable only by the Admin API;
- expose Admin/API only through HTTPS reverse proxy;
- use the existing BB610 operational backup/monitoring approach where available rather than adding a second infrastructure pattern.

## 2. Proposed host layout

If the current BB610 VPS is confirmed as the runtime host:

```text
/opt/bb610-water-admin/
  app/                  # service release / compose files
  admin-ui/             # promoted Admin v2 static UI
  backups/              # optional local staging area only; off-host copy required

/etc/bb610-water-admin/
  admin.env             # root/service-readable secrets, mode 600

/var/lib/bb610-water-admin/
  postgres/             # durable PostgreSQL volume/bind mount
```

If infrastructure policy uses another managed PostgreSQL host, only `BB610_ADMIN_DATABASE_URL` changes; the application contract remains unchanged.

## 3. Proposed hostnames

Subject to owner/DNS approval:

- Admin UI: `https://admin.water.bb610.com.ua/`
- Admin/Public API: `https://api.water.bb610.com.ua/`
- public contract: `https://api.water.bb610.com.ua/public/commercial`

These hostnames are a deployment proposal, not an already approved DNS change.

## 4. Network / TLS

Production requirements:

- PostgreSQL port 5432 is **not Internet-exposed**;
- API listens on private Docker/network interface or loopback behind reverse proxy;
- only HTTPS is exposed externally;
- Admin CORS origin is restricted to the approved Admin hostname;
- public commercial `GET` remains read-only;
- SSH/firewall rules follow existing BB610 VPS policy;
- TLS uses the existing reverse-proxy/ACME mechanism if already present.

Do not use the isolated CI `POSTGRES_HOST_AUTH_METHOD=trust` setting in production.

## 5. Secrets

Required production secrets/configuration:

- PostgreSQL user/password/database;
- `BB610_ADMIN_JWT_SECRET` generated from strong random bytes;
- temporary first-admin bootstrap email/password;
- exact CORS origin;
- JWT issuer/TTL;
- login throttle policy.

Rules:

1. store in deployment secret storage or `/etc/bb610-water-admin/admin.env` with restrictive permissions;
2. never commit real values;
3. bootstrap only the initial named admin;
4. create named operational accounts through Admin API;
5. remove/rotate bootstrap password and clear bootstrap env values after verification;
6. rotating JWT secret intentionally invalidates existing sessions and must be treated as a controlled operation.

## 6. Database provisioning

Use PostgreSQL 16 or a compatible supported production version.

Deployment:

1. create dedicated database/user;
2. attach durable storage;
3. verify storage capacity and filesystem ownership;
4. run `alembic upgrade head` before starting the new application version;
5. verify `/health`;
6. confirm initial catalog checksum/state before any commercial edits.

Expected initial commercial invariant:

- 21 rows;
- 15 APPROVED;
- 6 PRICE_ON_REQUEST;
- F1-P/F2-P remain null/null.

## 7. Application deployment

Use `services/water-admin-api/` as the deployable API source.

Recommended sequence:

1. pin deployment to an approved Git commit/release;
2. build the existing Dockerfile;
3. start PostgreSQL privately;
4. apply Alembic migration;
5. start API;
6. verify `/health`;
7. serve the accepted Admin UI behind the Admin hostname;
8. set Admin `apiBase` to the HTTPS API hostname in deployment configuration;
9. login with bootstrap named admin;
10. create permanent named roles/users;
11. logout/login and verify session revocation;
12. remove bootstrap credentials from runtime config and restart if required.

## 8. Non-production acceptance on the target VPS

Before public cutover, rerun the R19 acceptance logic against the deployed review environment:

- migration status;
- unauthenticated denial;
- login/throttle/logout;
- viewer/editor/admin role enforcement;
- draft save;
- public unchanged before publish;
- publish diff;
- publish;
- audit actor/role/time;
- stale-write conflict;
- rollback as new published version;
- final 15+6 invariant.

Use harmless availability-only mutation exactly as R19 or another owner-approved no-price test.

Return catalog to accepted state before proceeding.

## 9. Production backup policy

Minimum operational baseline:

- daily PostgreSQL custom-format `pg_dump`;
- SHA-256 sidecar for each dump;
- encrypted/off-host replication to an owner-approved backup destination;
- suggested retention: 30 daily + 12 monthly unless existing BB610 policy is stronger;
- periodic restore drill into a separate disposable database;
- catalog published snapshot export retained alongside release evidence.

Use the existing scripts and recovery guide as the base:

- `services/water-admin-api/scripts/backup.sh`
- `services/water-admin-api/scripts/restore.sh`
- `docs/website/BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`

## 10. Deployment monitoring

At minimum monitor:

- API `/health`;
- process/container restart state;
- PostgreSQL health/disk usage;
- failed-login/throttle spikes;
- backup completion and age;
- HTTP 5xx rate;
- published version/checksum after planned commercial publication.

Do not expose application secrets in logs.

## 11. Phase A — deploy Admin without changing public WATER

This phase is permitted only after owner approval to deploy Admin infrastructure; it still does **not** change the public WATER commercial source.

1. deploy PostgreSQL + API + Admin HTTPS;
2. create named users;
3. run target-environment R19 acceptance;
4. run backup/restore drill;
5. leave `water.bb610.com.ua` on its current source-controlled commercial data.

Result: Admin is operational, but live WATER remains unchanged.

## 12. Phase B — owner-approved commercial-data cutover

Requires separate explicit owner authorization.

Before cutover:

1. confirm published API catalog is the accepted current catalog;
2. verify checksum / 15+6 invariant;
3. confirm last-known-good fallback works;
4. take database backup and preserve source-controlled fallback;
5. confirm Admin/API monitoring is green.

Cutover action:

- configure the live WATER public configurator to read the production `GET /public/commercial` endpoint using the already proven runtime/fallback adapter;
- do not change product semantics or pricing during this cutover.

Verification immediately after cutover:

- I/F1/F1-P/F1-PE/F2/F2-P/F2-PE resolve correctly;
- three zone configurations work;
- HMI selection works;
- six PRICE_ON_REQUEST paths show `Ціна уточнюється`;
- no zero/fabricated prices;
- hidden configurations are disabled intentionally;
- contact handoff remains correct.

## 13. Cutover rollback

If public API integration has a problem:

1. keep database/publication history intact;
2. restore live configurator to the source-controlled accepted fallback endpoint/data path;
3. if commercial content itself is wrong, use Admin rollback to create a new published version from the known-good catalog;
4. verify expected checksum/state;
5. investigate before reattempting cutover.

No database history should be manually rewritten.

## 14. Production go/no-go checklist

Admin infrastructure GO requires:

- [ ] durable PostgreSQL provisioned;
- [ ] HTTPS Admin/API deployed;
- [ ] production secrets injected securely;
- [ ] named users/roles created;
- [ ] bootstrap access rotated/removed;
- [ ] CORS/network restrictions applied;
- [ ] target-environment runtime acceptance PASS;
- [ ] scheduled backup configured;
- [ ] restore drill PASS;
- [ ] monitoring enabled.

Public WATER commercial cutover additionally requires:

- [ ] explicit owner approval;
- [ ] accepted published catalog verified;
- [ ] backup taken immediately before cutover;
- [ ] API failure/LKG behavior verified;
- [ ] post-cutover configurator smoke PASS.

## 15. Current decision boundary

R19 validates the software/runtime architecture. It does **not** authorize:

- production DNS changes;
- exposing Admin publicly;
- changing `water.bb610.com.ua` commercial source;
- changing production root HTML/CSS/JS/CNAME.

Those actions remain separate owner-approved deployment/cutover gates.
