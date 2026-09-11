# BB610 WATER — ADMIN PRODUCTION RUNBOOK R1

- **Purpose:** deploy and operate the accepted BB610 WATER Admin/API stack on the existing BB610 VPS.
- **Basis:** R17 Admin UX + R18 backend + R19 runtime acceptance + R20 production package.
- **Live WATER cutover:** NOT part of this runbook unless an owner separately authorizes the explicit cutover section.
- **Do not change:** `water.bb610.com.ua`, existing public DNS/CNAME, or production commercial data during deployment preparation.

## 1. Production topology

```text
Internet
  |
  | HTTPS 443
  v
Existing BB610 host Nginx / ACME
  |-- admin.water.bb610.com.ua
  |     -> static accepted Admin v2
  |        /opt/bb610-water-admin/admin-ui/
  |
  `-- api.water.bb610.com.ua
        -> reverse proxy 127.0.0.1:18080
             |
             v
        Docker Compose: bb610-water-admin
             |
             |-- api  FastAPI / Uvicorn
             |     - Alembic migration before startup
             |     - restart unless-stopped
             |     - /health
             |
             `-- db   PostgreSQL 16
                   - private Docker network only
                   - NO published host port
                   - persistent bind mount
                     /var/lib/bb610-water-admin/postgres/

Protected host data
  /etc/bb610-water-admin/admin.env            production secrets/config
  /var/backups/bb610-water-admin/             local database backups + SHA-256
  /var/log/nginx/bb610-water-admin.access.log
  /var/log/nginx/bb610-water-admin.error.log
  /var/log/nginx/bb610-water-api.access.log
  /var/log/nginx/bb610-water-api.error.log
```

Proposed URLs after separate DNS/TLS approval:

- Admin UI: `https://admin.water.bb610.com.ua/`
- Admin/API: `https://api.water.bb610.com.ua/`
- Public commercial contract: `https://api.water.bb610.com.ua/public/commercial`

The public WATER site is not pointed to the API by this deployment.

## 2. Package sources

Deployment package root:

`deploy/water-admin/`

Required artifacts:

- `docker-compose.production.yml`
- `.env.production.example`
- `nginx/bb610-water-admin.conf`
- `scripts/install-admin-ui.sh`
- `scripts/backup.sh`
- `scripts/restore-disposable.sh`
- `scripts/rotate-admin-password.sh`
- `systemd/bb610-water-admin-backup.service`
- `systemd/bb610-water-admin-backup.timer`
- `public-cutover/public-commercial-endpoint.js.disabled`

Accepted application sources remain:

- `services/water-admin-api/`
- `docs/website/admin/review/v2/`

Do not fork or redesign either source during production deployment.

## 3. Commercial invariant — mandatory gate

Before and after every deployment/cutover/restore exercise, verify:

- 21 model×zone rows;
- 15 rows = `APPROVED`;
- 6 rows = `PRICE_ON_REQUEST`;
- F1-P × 3 zones = `PRICE_ON_REQUEST`, `base=null`, `hmi=null`;
- F2-P × 3 zones = `PRICE_ON_REQUEST`, `base=null`, `hmi=null`;
- no `F1-PH` or `F2-PH` model IDs.

Current accepted seed checksum:

`aed501904237d25e0b430fd01b4905c2bbc79805076c41e4abaf317ec5f6ae07`

A later legitimate Admin publication may have a different checksum. The structural 21/15/6 invariant remains mandatory until the six missing price rows are separately approved.

## 4. Pre-deployment host checks

Run on the existing BB610 VPS before making changes:

```sh
uname -a
df -h
free -h
docker --version
docker compose version
nginx -v
systemctl is-active nginx
```

Confirm:

1. Docker Engine + Compose plugin available.
2. Existing Nginx remains host-level reverse proxy.
3. Ports 80/443 remain owned by existing Nginx.
4. `127.0.0.1:18080` is free.
5. Sufficient persistent disk exists for PostgreSQL and backups.
6. Host backup/off-host destination is known.
7. DNS is NOT changed during preparation unless owner explicitly authorizes production deployment.

Recommended minimum free disk before first deployment: enough for PostgreSQL data plus at least several daily backups. Do not deploy if disk-pressure monitoring is absent or the host is already near capacity.

## 5. Install approved release

Use a pinned accepted repository commit/release, not an unreviewed moving checkout.

Target layout:

```text
/opt/bb610-water-admin/app/
/opt/bb610-water-admin/admin-ui/
/etc/bb610-water-admin/
/var/lib/bb610-water-admin/postgres/
/var/backups/bb610-water-admin/
```

Create directories:

```sh
sudo install -d -m 0755 /opt/bb610-water-admin/app
sudo install -d -m 0755 /opt/bb610-water-admin/admin-ui
sudo install -d -m 0700 /etc/bb610-water-admin
sudo install -d -m 0700 /var/lib/bb610-water-admin/postgres
sudo install -d -m 0700 /var/backups/bb610-water-admin
```

Place/checkout the approved repository release in:

`/opt/bb610-water-admin/app`

Record the exact deployed Git SHA in the operations log.

## 6. Production secrets

Copy the template:

```sh
sudo cp deploy/water-admin/.env.production.example /etc/bb610-water-admin/admin.env
sudo chmod 600 /etc/bb610-water-admin/admin.env
sudo chown root:root /etc/bb610-water-admin/admin.env
```

Replace every `REPLACE_*` value.

Generate strong random values locally on the target host or approved secret manager, for example:

```sh
openssl rand -hex 32   # PostgreSQL password
openssl rand -hex 48   # JWT secret
openssl rand -base64 36 # one-time bootstrap password
```

Never:

- commit the production env file;
- paste production secrets into GitHub issues/chat logs;
- print the JWT secret or database password to deployment logs;
- use a universal/default password;
- use a generic shared Admin identity.

Production CORS must be exactly the approved Admin origin, initially:

`https://admin.water.bb610.com.ua`

## 7. Named Admin bootstrap procedure

Set in `/etc/bb610-water-admin/admin.env`:

- `BB610_ADMIN_BOOTSTRAP_EMAIL=<real named admin email>`
- `BB610_ADMIN_BOOTSTRAP_PASSWORD=<one-time strong password>`

The email must identify an actual responsible person; do not use `admin@...` as a shared universal credential unless it is separately approved as an accountable named mailbox.

Start the stack, verify login, then rotate the account password:

```sh
cd /opt/bb610-water-admin/app
sudo BB610_ADMIN_ENV_FILE=/etc/bb610-water-admin/admin.env \
  BB610_ADMIN_COMPOSE_FILE=/opt/bb610-water-admin/app/deploy/water-admin/docker-compose.production.yml \
  sh deploy/water-admin/scripts/rotate-admin-password.sh <named-admin-email>
```

After successful rotation:

1. Edit `/etc/bb610-water-admin/admin.env`.
2. Clear both bootstrap variables:
   - `BB610_ADMIN_BOOTSTRAP_EMAIL=`
   - `BB610_ADMIN_BOOTSTRAP_PASSWORD=`
3. Restart only the API service:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml \
  up -d --no-deps api
```

Confirm the named account still logs in and bootstrap is no longer available for future initialization.

## 8. Start PostgreSQL + API

From the pinned release:

```sh
cd /opt/bb610-water-admin/app
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml \
  up -d --build
```

Expected behavior:

- PostgreSQL starts first;
- PostgreSQL healthcheck becomes healthy;
- API container starts;
- API command runs `alembic upgrade head` before Uvicorn;
- API publishes only `127.0.0.1:18080` on the host;
- PostgreSQL publishes no host port;
- both services use `restart: unless-stopped`.

Inspect:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml ps

curl -fsS http://127.0.0.1:18080/health
```

Expected health shape:

```json
{"ok":true,"latestDraftVersion":1,"publishedVersion":1}
```

Version numbers may be greater than 1 after legitimate Admin operations.

## 9. Verify public contract locally

Before exposing the API through Nginx:

```sh
curl -fsS http://127.0.0.1:18080/public/commercial > /tmp/bb610-water-commercial.json
```

Verify the commercial invariant. At minimum:

```sh
python3 - <<'PY'
import json
p=json.load(open('/tmp/bb610-water-commercial.json'))
rows=p['catalog']['rows']
assert len(rows)==21
assert sum(r['priceState']=='APPROVED' for r in rows)==15
assert sum(r['priceState']=='PRICE_ON_REQUEST' for r in rows)==6
assert not any(r['modelId'] in ('F1-PH','F2-PH') for r in rows)
assert all(r['prices']=={'base':None,'hmi':None} for r in rows if r['modelId'] in ('F1-P','F2-P'))
print('BB610 WATER commercial invariant PASS')
PY
```

Also inspect the public payload and confirm it contains no:

- password hashes;
- JWT/session data;
- internal audit data;
- `internalNote` fields.

## 10. Install Admin static UI

Install the accepted R17 Admin v2 without modifying its UX:

```sh
cd /opt/bb610-water-admin/app
sudo sh deploy/water-admin/scripts/install-admin-ui.sh \
  docs/website/admin/review/v2 \
  /opt/bb610-water-admin/admin-ui \
  https://api.water.bb610.com.ua
```

Verify:

```sh
grep -F "https://api.water.bb610.com.ua" /opt/bb610-water-admin/admin-ui/config.js
```

`config.js` is deployment configuration, not an application redesign.

## 11. DNS/TLS deployment — separate owner gate

Do not perform this section until the owner approves production Admin/API deployment.

Required DNS records should resolve both names to the existing BB610 VPS:

- `admin.water.bb610.com.ua`
- `api.water.bb610.com.ua`

After DNS resolves, issue certificates using the existing host ACME/Certbot method. Example only if Certbot is the established host mechanism:

```sh
sudo certbot certonly --nginx -d admin.water.bb610.com.ua
sudo certbot certonly --nginx -d api.water.bb610.com.ua
```

Use the existing certificate policy if the VPS uses another ACME implementation.

Never replace or invalidate the existing `water.bb610.com.ua` certificate/config while adding the two new names.

## 12. Activate Nginx Admin/API config

Only after certificates exist:

```sh
sudo cp deploy/water-admin/nginx/bb610-water-admin.conf /etc/nginx/conf.d/bb610-water-admin.conf
sudo nginx -t
sudo systemctl reload nginx
```

Verify:

```sh
curl -fsS https://api.water.bb610.com.ua/health
curl -fsS https://api.water.bb610.com.ua/public/commercial >/tmp/public.json
curl -I https://admin.water.bb610.com.ua/
```

Security expectations:

- HTTP redirects to HTTPS;
- Admin CSP allows API connection only to the production API origin;
- API proxies only to loopback;
- `/auth/token` gets Nginx rate limiting in addition to application durable throttling;
- PostgreSQL remains unaddressable from the Internet.

## 13. Firewall/network checks

Verify no public listener for PostgreSQL:

```sh
ss -lntp | grep -E '(:5432|:18080|:80|:443)'
```

Expected:

- 80/443: Nginx public as already established;
- 18080: `127.0.0.1` only;
- 5432: no host-level published Docker listener.

If host firewall rules are used, do not open 5432 or 18080 publicly.

## 14. Health/restart acceptance on target host

After deployment:

```sh
curl -fsS https://api.water.bb610.com.ua/health
```

Check Docker state:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml ps
```

A production-like crash restart was proven during R20 (`RestartCount=1`). On the target host, do not deliberately kill the service during peak operation unless a controlled maintenance window is approved. Verify the configured restart policy:

```sh
sudo docker inspect -f '{{.HostConfig.RestartPolicy.Name}}' $(sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml ps -q api)
```

Expected: `unless-stopped`.

## 15. Backup installation

Install the service/timer:

```sh
sudo cp deploy/water-admin/systemd/bb610-water-admin-backup.service /etc/systemd/system/
sudo cp deploy/water-admin/systemd/bb610-water-admin-backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now bb610-water-admin-backup.timer
```

Schedule in package:

- daily `02:35 UTC`;
- persistent timer;
- randomized delay up to 300 seconds;
- local protected backup + `.sha256`;
- default local retention 30 days;
- optional off-host hook `/usr/local/sbin/bb610-water-admin-offhost-sync`.

Check:

```sh
systemctl list-timers bb610-water-admin-backup.timer
```

Run one manual backup immediately after deployment:

```sh
sudo systemctl start bb610-water-admin-backup.service
sudo journalctl -u bb610-water-admin-backup.service -n 50 --no-pager
sudo ls -lh /var/backups/bb610-water-admin/
```

## 16. Off-host backup requirement

Local backups on the same VPS are not sufficient for disaster recovery.

Before treating production deployment as operationally complete, configure `/usr/local/sbin/bb610-water-admin-offhost-sync` or an equivalent existing BB610 backup mechanism to copy:

- `.dump`
- matching `.dump.sha256`

to a protected off-host destination.

The hook must return non-zero on failure so the systemd service records the backup run as failed.

Do not put database passwords into backup filenames, command-line arguments visible to untrusted users, or public storage paths.

## 17. Restore drill

Never test recovery by restoring over the active production database.

Use a selected backup:

```sh
sudo BB610_ADMIN_ENV_FILE=/etc/bb610-water-admin/admin.env \
  BB610_ADMIN_COMPOSE_FILE=/opt/bb610-water-admin/app/deploy/water-admin/docker-compose.production.yml \
  sh /opt/bb610-water-admin/app/deploy/water-admin/scripts/restore-disposable.sh \
  /var/backups/bb610-water-admin/<backup>.dump
```

The helper verifies checksum, restores into a disposable separate database, and must report:

- 21 rows;
- 15 APPROVED;
- 6 PRICE_ON_REQUEST;
- six F1-P/F2-P null/null;
- zero legacy F1-PH/F2-PH rows.

After review, execute the drop command printed by the helper.

Perform a restore drill:

- once at initial production deployment;
- after material PostgreSQL/runtime upgrades;
- periodically under the BB610 operations schedule.

## 18. Normal application release update

Before update:

1. create a fresh backup;
2. record current Git SHA;
3. record current public catalog version/checksum;
4. confirm current health;
5. ensure previous accepted release remains available.

Then update the pinned release and run:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml \
  up -d --build
```

Reinstall Admin UI only if accepted UI deployment files changed. Do not silently deploy an unaccepted Admin redesign.

After update verify:

- `/health`;
- named login;
- Admin catalog read;
- public endpoint;
- invariant;
- CORS/HTTPS;
- logs.

## 19. Application rollback

If a new API/Admin release fails but the database schema/data are healthy:

1. do **not** restore the database first;
2. return `/opt/bb610-water-admin/app` to the previous accepted Git SHA/release;
3. rebuild/restart Compose;
4. reinstall previous accepted Admin static files if necessary;
5. verify `/health` and public contract.

Database restore is a disaster-recovery action, not the normal method for application rollback.

If a migration is not backward-compatible, the release must have a separately reviewed DB rollback/migration plan before deployment. R20 does not authorize destructive schema downgrades.

## 20. Commercial data rollback

For a bad published commercial change, use the accepted Admin immutable rollback flow:

- choose the known-good published version;
- review diff;
- perform Admin rollback;
- confirm rollback creates a **new** published version;
- verify public endpoint and audit trail.

Do not replace the database or edit rows manually for normal commercial corrections.

## 21. Emergency API isolation

If the Admin/API must be isolated without affecting the public WATER site:

- disable/remove only the Admin/API Nginx server blocks or firewall the new hostnames;
- leave `water.bb610.com.ua` untouched;
- stop the Admin stack if necessary:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml \
  stop api
```

Because public WATER has not been cut over during R20, this isolation does not change current public commercial behavior.

## 22. Future public-data cutover — NOT ACTIVE

Prepared inactive file:

`deploy/water-admin/public-cutover/public-commercial-endpoint.js.disabled`

It points the staging-style commercial loader to:

`https://api.water.bb610.com.ua/public/commercial`

Do not rename, load, copy into production, or otherwise activate it until the owner explicitly authorizes public commercial-data cutover.

Cutover prerequisites:

1. production Admin/API deployed and stable;
2. HTTPS valid;
3. target-host R19/R20 runtime checks pass;
4. fresh backup exists;
5. public endpoint returns exact accepted commercial state;
6. staging against production API displays `Ціна уточнюється` for the six request-price rows;
7. last-known-good/static fallback is confirmed;
8. owner explicitly approves live `water.bb610.com.ua` change.

## 23. Future public cutover procedure

When separately authorized:

1. Record current live WATER release SHA.
2. Record the current source-controlled commercial fallback checksum/state.
3. Back up Admin DB.
4. Verify production API public endpoint.
5. Enable the production endpoint override in the smallest isolated public-site change.
6. Deploy the public-site change.
7. Verify live configurator across representative `APPROVED` and `PRICE_ON_REQUEST` configurations.
8. Stop API briefly in a controlled test only if approved, verifying last-known-good/source fallback behavior.
9. Restore API.
10. Record cutover commit and commercial version/checksum.

## 24. Future public cutover rollback

If the live public cutover fails:

1. revert/remove only the endpoint override introduced by the cutover commit;
2. redeploy the previous live WATER release;
3. confirm source-controlled fallback is active;
4. confirm no zero/fabricated prices;
5. leave Admin/API online for diagnosis unless it is itself the incident source;
6. do not alter historical catalog versions/audit to hide the event.

This rollback does not require DNS changes and does not require database restore.

## 25. Logs and incident checks

API/container logs:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml logs --tail=200 api
```

PostgreSQL logs:

```sh
sudo docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml logs --tail=200 db
```

Nginx:

```sh
sudo tail -200 /var/log/nginx/bb610-water-admin.error.log
sudo tail -200 /var/log/nginx/bb610-water-api.error.log
```

Do not copy secrets/tokens/passwords into issue reports.

## 26. Production deployment acceptance checklist

Production deployment itself is accepted only when all are true:

- [ ] exact approved Git SHA recorded;
- [ ] PostgreSQL persistent path confirmed;
- [ ] PostgreSQL not publicly exposed;
- [ ] API bound to loopback only;
- [ ] API `/health` PASS;
- [ ] Admin HTTPS PASS;
- [ ] API HTTPS PASS;
- [ ] CORS restricted to Admin origin;
- [ ] named Admin login PASS;
- [ ] bootstrap password rotated and bootstrap env cleared;
- [ ] backup timer active;
- [ ] fresh backup checksum PASS;
- [ ] disposable restore drill PASS;
- [ ] off-host backup copy confirmed;
- [ ] public contract contains no internal/auth/audit data;
- [ ] commercial invariant 21 = 15 APPROVED + 6 PRICE_ON_REQUEST;
- [ ] no F1-PH/F2-PH;
- [ ] F1-P/F2-P remain null/null unless separately price-approved;
- [ ] restart policy verified;
- [ ] existing `water.bb610.com.ua` remains unchanged unless a separate cutover task authorizes it.

## 27. R20 package validation evidence

Production-like package validation was executed in GitHub Actions with Docker Compose and real PostgreSQL 16.

Accepted validation:

- workflow: `R20 Production Deployment Package Validation`;
- run #4;
- run ID: `34610231529`;
- tested commit: `80446f94193b215aa98c7234fa6e6955ea1f883f`;
- conclusion: `success`.

Validated in that run:

- Compose render/start: PASS;
- PostgreSQL health/persistence layout: PASS;
- API startup/Alembic/health: PASS;
- seed invariant: PASS;
- accepted Admin v2 install/config generation: PASS;
- named bootstrap login: PASS;
- named password rotation: PASS;
- backup + checksum: PASS;
- disposable PostgreSQL restore: PASS;
- Nginx syntax: PASS;
- simulated API process crash + automatic restart: PASS, `RestartCount=1`;
- final invariant after restart: PASS;
- all generated validation secrets masked.

This proves the package is reproducible. It does not mean DNS, certificates, or the live BB610 VPS have already been changed.
