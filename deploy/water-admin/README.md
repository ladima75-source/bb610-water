# BB610 WATER Admin — production deployment package

This package prepares deployment of the accepted R17/R18/R19 Admin stack on the existing BB610 VPS. It does not authorize or perform DNS changes, live `water.bb610.com.ua` changes, or the public commercial-data cutover.

## Proposed production endpoints

- Admin UI: `https://admin.water.bb610.com.ua/`
- API: `https://api.water.bb610.com.ua/`
- Public commercial API: `https://api.water.bb610.com.ua/public/commercial`

DNS/TLS activation requires a separate owner-approved deployment step.

## Host layout

```text
/opt/bb610-water-admin/app/                 # approved repository release
/opt/bb610-water-admin/admin-ui/            # installed accepted Admin v2 static UI
/etc/bb610-water-admin/admin.env             # production secrets/config, chmod 600
/var/lib/bb610-water-admin/postgres/         # PostgreSQL persistent data
/var/backups/bb610-water-admin/              # local protected backups + checksums
/etc/nginx/conf.d/bb610-water-admin.conf     # reverse proxy after DNS/TLS approval
```

API binds only to host loopback (`127.0.0.1:18080`). PostgreSQL has no published host port.

## Files

- `docker-compose.production.yml` — PostgreSQL 16 + accepted API, restart/health/logging/persistent storage.
- `.env.production.example` — variable names/placeholders only; never store real secrets in Git.
- `nginx/bb610-water-admin.conf` — HTTPS routing/security/rate-limit template.
- `scripts/install-admin-ui.sh` — installs accepted R17 Admin v2 and writes production `config.js`.
- `scripts/backup.sh` — protected custom-format dump, SHA-256, 30-day local retention and optional off-host hook.
- `scripts/restore-disposable.sh` — restores into a separate database and validates the commercial invariant.
- `scripts/rotate-admin-password.sh` — operational named-user password rotation using the accepted backend models; no API redesign.
- `systemd/*` — daily persistent backup schedule template.
- `public-cutover/public-commercial-endpoint.js.disabled` — prepared but inactive future live-data switch.

## Commercial invariant

Every seed/restore/deployment acceptance must prove:

- 21 model×zone rows;
- 15 `APPROVED`;
- 6 `PRICE_ON_REQUEST`;
- all F1-P/F2-P rows have `base=null`, `hmi=null`;
- no F1-PH/F2-PH legacy model IDs.

## Security boundary

- HTTPS only at Nginx;
- API loopback-only on host;
- PostgreSQL Docker-network-only, no public port;
- CORS exact Admin origin;
- application login throttling retained and Nginx adds `/auth/token` rate limiting;
- production secrets only in `/etc/bb610-water-admin/admin.env` mode `0600` or stronger secret storage;
- bootstrap login must be a real named person, not a generic shared account;
- generated bootstrap/JWT/database secrets must never be written to Git or logs;
- backup directory/files mode `0700/0600` with off-host replication hook;
- container logs use bounded JSON rotation.

## Deployment command boundary

The package is intended to be run from the approved repository release on the target server:

```sh
docker compose \
  --env-file /etc/bb610-water-admin/admin.env \
  -f deploy/water-admin/docker-compose.production.yml \
  up -d --build
```

The API image runs Alembic migrations before Uvicorn startup, as already accepted in R18/R19.

Full operator procedure: `docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`.
