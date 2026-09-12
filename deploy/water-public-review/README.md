# BB610 WATER — External Review Staging

Target: `https://review.water.bb610.com.ua/`

Purpose: publish the exact `docs/website/staging/` review build without touching production WATER, Admin, API, PostgreSQL, Docker or Market.

## DNS prerequisite

Create exactly one record before deployment:

- Host: `review.water.bb610.com.ua`
- Type: `A`
- Value: `173.242.53.156`

The installer is fail-closed and will not change Nginx if DNS does not resolve to the expected VPS address.

## Owner action

After DNS is live, unpack the generated artifact on `vps-59918` and run:

```bash
sudo bash ./install-or-update-review.sh
```

The script performs read-only preflight first. It writes only the dedicated BB610 WATER review paths after explicit `DEPLOY` confirmation.

## Isolation boundaries

Managed objects:

- `/opt/bb610-water-review/`
- `/var/lib/bb610-water-review/acme/`
- `/etc/nginx/conf.d/bb610-water-review.conf`
- Let's Encrypt certificate for `review.water.bb610.com.ua`

Not modified:

- `water.bb610.com.ua`
- `admin.water.bb610.com.ua`
- `api.water.bb610.com.ua`
- BB610 Market vhosts/services
- Docker/PostgreSQL/API/Admin data

The external URL redirects `/` to `/docs/website/staging/` so the browser resolves the exact same relative paths as the R21 staging/CI build.
