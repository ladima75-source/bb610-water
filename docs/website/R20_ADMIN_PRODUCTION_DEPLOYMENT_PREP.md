# BB610 WATER — R20 / ADMIN PRODUCTION DEPLOYMENT PREP

- **Status:** PASS / READY FOR PRODUCTION DEPLOYMENT
- **Date:** 2026-09-11
- **Base:** R19 PASS commit `3c00741704586d8ee0ff2638a541db8d6f880954`
- **Task:** `TASK_20_ADMIN_PRODUCTION_DEPLOYMENT_PREP.md`
- **R17 Admin UX:** preserved
- **R18/R19 backend:** preserved
- **Live `water.bb610.com.ua`:** NOT CHANGED
- **DNS / CNAME:** NOT CHANGED
- **Public commercial-data cutover:** PREPARED BUT NOT ACTIVE

## 1. Result

A complete reproducible production deployment package is prepared for the existing BB610 VPS. It uses the already accepted Admin UX and backend without redesigning or replacing them.

The package contains:

- PostgreSQL 16 production service;
- accepted WATER Admin API build;
- accepted Admin v2 static UI installation;
- host Nginx HTTPS/reverse-proxy template;
- persistent PostgreSQL storage layout;
- environment-only secrets template;
- application and database healthchecks;
- automatic container restart policy;
- named Admin bootstrap and password rotation procedure;
- protected backup + SHA-256;
- disposable restore drill;
- systemd daily backup timer;
- security/network constraints;
- production operator runbook;
- disabled reversible future public-data cutover artifact;
- production-like CI acceptance workflow.

The package has been started and tested as a production-like stack. It is not only a documentation proposal.

## 2. Production topology

```text
Existing BB610 VPS
|
|-- Host Nginx + existing ACME/certificate mechanism
|     |
|     |-- https://admin.water.bb610.com.ua/
|     |      -> /opt/bb610-water-admin/admin-ui/
|     |         accepted R17 Admin v2 static UI
|     |
|     `-- https://api.water.bb610.com.ua/
|            -> 127.0.0.1:18080
|               Docker Compose API
|                 |
|                 `-> private Docker network
|                     PostgreSQL 16
|                     no host/public 5432
|
|-- /etc/bb610-water-admin/admin.env
|      production secrets/config, mode 0600
|
|-- /var/lib/bb610-water-admin/postgres/
|      persistent PostgreSQL data
|
`-- /var/backups/bb610-water-admin/
       protected dumps + SHA-256
       + optional off-host sync hook
```

This deliberately reuses the existing BB610 server/reverse-proxy environment instead of creating an unrelated second hosting stack.

## 3. Proposed production URLs

After a separately authorized DNS/TLS deployment:

- Admin: `https://admin.water.bb610.com.ua/`
- API: `https://api.water.bb610.com.ua/`
- public commercial endpoint: `https://api.water.bb610.com.ua/public/commercial`

These names are proposed and packaged, but no DNS record or live Nginx host has been activated by R20.

## 4. Package artifacts

Deployment package:

`deploy/water-admin/`

Files:

- `deploy/water-admin/docker-compose.production.yml`
- `deploy/water-admin/.env.production.example`
- `deploy/water-admin/nginx/bb610-water-admin.conf`
- `deploy/water-admin/scripts/install-admin-ui.sh`
- `deploy/water-admin/scripts/backup.sh`
- `deploy/water-admin/scripts/restore-disposable.sh`
- `deploy/water-admin/scripts/rotate-admin-password.sh`
- `deploy/water-admin/systemd/bb610-water-admin-backup.service`
- `deploy/water-admin/systemd/bb610-water-admin-backup.timer`
- `deploy/water-admin/public-cutover/public-commercial-endpoint.js.disabled`
- `deploy/water-admin/README.md`

Validation workflow:

- `.github/workflows/r20-production-package-validation.yml`

Production runbook:

- `docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`

## 5. Runtime/service design

### PostgreSQL

- image: `postgres:16-alpine`;
- restart: `unless-stopped`;
- healthcheck: `pg_isready`;
- storage: host bind mount under `/var/lib/bb610-water-admin/postgres`;
- only private Compose backend network;
- no `ports:` entry, therefore no public/host 5432 exposure from this package;
- bounded Docker JSON logs.

### API

- builds the accepted R18/R19 `services/water-admin-api/Dockerfile`;
- waits for healthy PostgreSQL;
- runs existing Alembic migration/start command from accepted image;
- host bind: `127.0.0.1:18080:8080` only;
- restart: `unless-stopped`;
- `/health` healthcheck;
- `no-new-privileges`;
- temporary filesystem for `/tmp`;
- bounded Docker logs.

### Admin

- installs the accepted R17 Admin v2 static files without UX change;
- production `config.js` is generated at deployment time;
- API base becomes `https://api.water.bb610.com.ua`;
- served by host Nginx, not a second web server stack.

## 6. HTTPS / reverse proxy

`deploy/water-admin/nginx/bb610-water-admin.conf` defines independent Admin/API virtual hosts.

Admin host includes:

- HTTPS;
- HSTS is intentionally not forced by this isolated template because it should follow the existing BB610 host-wide certificate/security policy;
- `X-Content-Type-Options`;
- `X-Frame-Options: DENY`;
- `Referrer-Policy`;
- restrictive `Permissions-Policy`;
- CSP with `connect-src https://api.water.bb610.com.ua`;
- no-store cache behavior for Admin/config.

API host includes:

- HTTPS;
- reverse proxy only to host loopback `127.0.0.1:18080`;
- request-size bound;
- security headers;
- proxy timeouts;
- Nginx login rate limiting on `/auth/token`, supplementing accepted application throttling.

The final template passes `nginx -t` against Nginx 1.27 in production-like validation.

## 7. Secrets and named bootstrap

No real production credential is committed.

Template location:

`deploy/water-admin/.env.production.example`

Production target:

`/etc/bb610-water-admin/admin.env`

Required permissions: root-owned mode `0600`.

Contains only deployment variables for:

- PostgreSQL user/database/password;
- JWT secret/issuer/TTL;
- throttling;
- exact CORS origin;
- named bootstrap email/password;
- local API port;
- data/backup roots.

Bootstrap rule:

1. use a real named responsible Admin identity;
2. bootstrap once;
3. confirm login;
4. rotate password with `rotate-admin-password.sh`;
5. clear bootstrap email/password from production env;
6. restart API;
7. retain only named accountable users.

The production-like validation proved bootstrap login followed by password rotation: the old password returned 401 and the rotated password logged in successfully.

## 8. Backup / restore

### Backup

`deploy/water-admin/scripts/backup.sh`:

- runs `pg_dump` against the Compose PostgreSQL service;
- custom dump format;
- writes SHA-256 sidecar;
- uses protected directory/file modes;
- defaults to 30-day local retention;
- invokes optional `/usr/local/sbin/bb610-water-admin-offhost-sync` for existing BB610 off-host storage.

### Schedule

Systemd timer:

- daily 02:35 UTC;
- persistent;
- randomized delay 300 seconds;
- hardened one-shot service.

### Restore

`restore-disposable.sh` never overwrites the active DB. It creates a separate database and verifies:

- schema/data restore works;
- versions/publications/audit are readable;
- exactly 21 commercial rows;
- 15 APPROVED;
- 6 PRICE_ON_REQUEST;
- all six F1-P/F2-P values null/null;
- no F1-PH/F2-PH.

The disposable DB must be dropped only after inspection.

## 9. Health / restart

Production package includes both DB and API healthchecks.

R20 production-like validation performed a real API process crash by killing the container host PID. Docker automatically recovered the same service under `restart: unless-stopped`.

Evidence:

- `RestartCount=1`;
- `/health` returned `ok=true` after recovery;
- final commercial invariant remained intact after recovery.

Result: **PASS**.

## 10. Commercial invariant

Initial live API response in R20 validation:

- published version: 1;
- rows: 21;
- APPROVED: 15;
- PRICE_ON_REQUEST: 6;
- F1-P/F2-P null/null: 6;
- legacy F1-PH/F2-PH: 0;
- checksum:
  `aed501904237d25e0b430fd01b4905c2bbc79805076c41e4abaf317ec5f6ae07`.

After Admin bootstrap/password rotation, backup/restore and forced API crash/restart, the final public contract again passed the exact structural invariant.

No commercial value was changed by R20.

## 11. Production-like validation

Accepted validation workflow:

- `R20 Production Deployment Package Validation`
- run #4
- run ID: `34610231529`
- job ID: `103298569144`
- tested commit: `80446f94193b215aa98c7234fa6e6955ea1f883f`
- conclusion: `success`
- every job step: `success`

Validated:

1. package files and shell syntax;
2. `docker compose config` render;
3. persistent directory layout;
4. real PostgreSQL 16 container;
5. real API image build/start/Alembic;
6. `/health`;
7. exact commercial seed invariant;
8. Admin v2 install + production config generation;
9. named bootstrap login;
10. named password rotation;
11. real `pg_dump`;
12. checksum verification;
13. restore into a separate PostgreSQL database;
14. restored commercial invariant;
15. clean `nginx -t`;
16. process-crash automatic API restart;
17. final public invariant after restart;
18. teardown.

Generated validation passwords/secrets were masked in Actions logs.

Artifact ID for run #4:

`10267838995`

## 12. Future public-data cutover

Prepared file:

`deploy/water-admin/public-cutover/public-commercial-endpoint.js.disabled`

It contains the production API public endpoint but has a `.disabled` suffix and is not included by the live WATER site.

R20 does **not**:

- rename it;
- load it;
- change production commercial.js;
- change live root HTML;
- change CNAME/DNS;
- change `water.bb610.com.ua`.

Future owner-approved cutover can be one isolated reversible change that enables the API endpoint override. The existing staging/public data loader already has last-known-good/source fallback logic accepted in R19.

## 13. Rollback strategy

### Failed application deployment

- retain current DB;
- return application checkout/image to previous accepted Git SHA;
- rebuild/restart Compose;
- reinstall prior accepted Admin static files if required;
- verify health/public contract.

Do not restore DB for a normal bad application release.

### Bad commercial publication

Use accepted Admin immutable catalog rollback to the selected known-good publication. Rollback creates a new published version and audit record.

### Database disaster

Use a verified backup only after confirming failure/recovery decision. First prove the dump with `restore-disposable.sh`. Production DB replacement is a disaster-recovery operation and requires a controlled maintenance procedure.

### Future public-data cutover failure

Revert only the public endpoint override/cutover commit and redeploy previous WATER release. The static/source fallback remains available. Database restore and DNS rollback are not required for a normal public-data integration rollback.

## 14. Remaining deployment gates

R20 closes deployment **preparation**, not actual live deployment.

Still required before the Admin/API are live:

- confirm existing BB610 VPS capacity and deployment owner;
- install the pinned accepted release on that VPS;
- generate/store real production secrets;
- create persistent host paths;
- separately approve/create Admin/API DNS records;
- issue TLS certificates through existing BB610 ACME method;
- activate Nginx configuration;
- create/rotate the real named Admin account;
- enable backup timer and configure encrypted/protected off-host backup destination;
- run target-host health/login/invariant/backup/restore acceptance;
- separately approve any future live WATER public-data cutover.

Independent website blockers remain:

- approved real PULS proof screenshots;
- missing commercial prices for F1-P/F2-P, which remain `PRICE_ON_REQUEST`.

## 15. Security gate

Prepared production configuration ensures:

- no universal/default password in repository;
- no real secrets in Git;
- named bootstrap procedure;
- bootstrap rotation/removal procedure;
- JWT secret environment-only;
- HTTPS termination at existing Nginx;
- exact Admin CORS origin;
- API loopback-only on host;
- DB private network only;
- no public PostgreSQL port;
- application auth retained on writes;
- login throttling at application + Nginx edge;
- Admin CSP/frame protections;
- bounded logs;
- protected backups;
- restore into separate DB for drills;
- public contract remains separate from auth/audit/internal data.

Production deployment must stop rather than weaken any of these constraints if the target host differs from the assumed existing BB610 layout.

## 16. Files intentionally not changed

R20 did not redesign or modify:

- R17 Admin UX/application behavior;
- R18/R19 API business logic;
- production WATER root site;
- live `water.bb610.com.ua`;
- CNAME;
- DNS;
- current commercial values.

## 17. Acceptance decision

The package is complete, reproducible and production-like validated, including recovery/restart behavior.

**R20 = PASS / READY FOR PRODUCTION DEPLOYMENT**.

This status means the next authorized operation may deploy this accepted package to the existing BB610 VPS. It does not itself authorize DNS/TLS activation or public WATER cutover.
