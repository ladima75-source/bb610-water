#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

OWNER_EMAIL="admin.bb610@gmail.com"
ADMIN_DOMAIN="admin.water.bb610.com.ua"
API_DOMAIN="api.water.bb610.com.ua"
APP_BASE="/opt/bb610-water-admin"
RELEASES_DIR="$APP_BASE/releases"
APP_LINK="$APP_BASE/app"
MANAGED_MARKER="$APP_BASE/.bb610-water-admin-managed"
ENV_DIR="/etc/bb610-water-admin"
ENV_FILE="$ENV_DIR/admin.env"
DATA_ROOT="/var/lib/bb610-water-admin"
BACKUP_ROOT="/var/backups/bb610-water-admin"
NGINX_CONF="/etc/nginx/conf.d/bb610-water-admin.conf"
ACME_ROOT="/var/www/bb610-water-admin-acme"
API_PORT="18080"
MIN_FREE_KB="2097152"

say(){ printf '%s\n' "$*"; }
warn(){ printf 'WARNING: %s\n' "$*" >&2; }
die(){ printf '\nPREFLIGHT FAILED: %s\nNo BB610 WATER Admin infrastructure changes were applied.\n' "$*" >&2; exit 2; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -d "$SCRIPT_DIR/services/water-admin-api" ] && [ -d "$SCRIPT_DIR/deploy/water-admin" ]; then
  PACKAGE_ROOT="$SCRIPT_DIR"
elif [ -d "$SCRIPT_DIR/../../../services/water-admin-api" ] && [ -d "$SCRIPT_DIR/../../../deploy/water-admin" ]; then
  PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
else
  die "Package root not found. Use the generated OWNER package ZIP or run from the full repository checkout."
fi

if [ -f "$PACKAGE_ROOT/PACKAGE_COMMIT_SHA" ]; then
  PACKAGE_SHA="$(tr -d '[:space:]' < "$PACKAGE_ROOT/PACKAGE_COMMIT_SHA")"
elif command -v git >/dev/null 2>&1 && git -C "$PACKAGE_ROOT" rev-parse --verify HEAD >/dev/null 2>&1; then
  PACKAGE_SHA="$(git -C "$PACKAGE_ROOT" rev-parse HEAD)"
else
  die "PACKAGE_COMMIT_SHA is missing. Download the generated OWNER package artifact."
fi
[ -n "$PACKAGE_SHA" ] || die "Empty package SHA"
RELEASE_DIR="$RELEASES_DIR/$PACKAGE_SHA"

say "BB610 WATER Admin — OWNER installer"
say "Package SHA: $PACKAGE_SHA"
say "Mode: preflight first; no existing service will be stopped or changed during preflight."
say ""

# ---------- READ-ONLY PREFLIGHT ----------
[ "$(id -u)" -eq 0 ] || die "Run with sudo/root: sudo bash ./install-or-update.sh"

for cmd in docker nginx certbot curl openssl python3 getent ss systemctl awk grep sed cp install find sha256sum; do
  command -v "$cmd" >/dev/null 2>&1 || die "Required command is missing: $cmd"
done

docker compose version >/dev/null 2>&1 || die "Docker Compose plugin is not available"
systemctl is-active --quiet docker || die "Docker service is not active"
systemctl is-active --quiet nginx || die "Nginx service is not active"
nginx -t >/dev/null 2>&1 || die "Existing Nginx configuration does not pass nginx -t"

for required in \
  "$PACKAGE_ROOT/services/water-admin-api/Dockerfile" \
  "$PACKAGE_ROOT/services/water-admin-api/app.py" \
  "$PACKAGE_ROOT/services/water-admin-api/seed_catalog.json" \
  "$PACKAGE_ROOT/deploy/water-admin/docker-compose.production.yml" \
  "$PACKAGE_ROOT/deploy/water-admin/nginx/bb610-water-admin.conf" \
  "$PACKAGE_ROOT/deploy/water-admin/scripts/backup.sh" \
  "$PACKAGE_ROOT/deploy/water-admin/scripts/restore-disposable.sh" \
  "$PACKAGE_ROOT/deploy/water-admin/scripts/rotate-admin-password.sh" \
  "$PACKAGE_ROOT/deploy/water-admin/systemd/bb610-water-admin-backup.service" \
  "$PACKAGE_ROOT/deploy/water-admin/systemd/bb610-water-admin-backup.timer" \
  "$PACKAGE_ROOT/docs/website/admin/review/v2/index.html" \
  "$PACKAGE_ROOT/deploy/water-admin/owner-package/owner-runtime-acceptance.py"
do
  [ -f "$required" ] || die "Package file missing: $required"
done

FREE_KB="$(df -Pk / | awk 'NR==2 {print $4}')"
[ "${FREE_KB:-0}" -ge "$MIN_FREE_KB" ] || die "Less than 2 GiB free on root filesystem"

MANAGED=0
if [ -e "$APP_BASE" ]; then
  if [ -f "$MANAGED_MARKER" ]; then
    MANAGED=1
  elif [ -n "$(find "$APP_BASE" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null || true)" ]; then
    die "$APP_BASE already exists but is not marked as BB610 WATER Admin managed"
  fi
fi

if [ "$MANAGED" -eq 0 ]; then
  [ ! -e "$ENV_FILE" ] || die "$ENV_FILE exists but no managed installation marker exists"
  if [ -d "$DATA_ROOT" ] && [ -n "$(find "$DATA_ROOT" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null || true)" ]; then
    die "$DATA_ROOT already contains data but no managed installation marker exists"
  fi
fi

NGINX_DUMP="$(nginx -T 2>&1)"
for domain in "$ADMIN_DOMAIN" "$API_DOMAIN"; do
  if printf '%s\n' "$NGINX_DUMP" | grep -Eq "server_name[[:space:]][^;]*${domain//./\\.}"; then
    if [ "$MANAGED" -eq 1 ] && [ -f "$NGINX_CONF" ] && grep -q '^# BB610_WATER_ADMIN_MANAGED$' "$NGINX_CONF"; then
      :
    else
      die "Nginx already contains server_name $domain outside the managed WATER Admin config"
    fi
  fi
done

PORT_LINE="$(ss -lntp 2>/dev/null | awk -v p=":$API_PORT" '$4 ~ p"$" {print}' || true)"
if [ -n "$PORT_LINE" ]; then
  if [ "$MANAGED" -eq 1 ] && docker ps --format '{{.Names}} {{.Ports}}' | grep -q 'bb610-water-admin-api'; then
    :
  else
    die "127.0.0.1:$API_PORT is already in use by an unknown service: $PORT_LINE"
  fi
fi

if [ "$MANAGED" -eq 0 ] && docker ps -a --format '{{.Names}}' | grep -q '^bb610-water-admin-'; then
  die "Docker containers with bb610-water-admin prefix already exist without managed marker"
fi

PUBLIC_IP="$(curl -4fsS --max-time 8 https://api.ipify.org || true)"
[ -n "$PUBLIC_IP" ] || die "Cannot determine VPS public IPv4 for DNS preflight"

for domain in "$ADMIN_DOMAIN" "$API_DOMAIN"; do
  IPS="$(getent ahostsv4 "$domain" 2>/dev/null | awk '{print $1}' | sort -u | tr '\n' ' ' || true)"
  [ -n "$IPS" ] || die "DNS $domain does not resolve yet. Expected A record: $PUBLIC_IP"
  printf '%s\n' "$IPS" | tr ' ' '\n' | grep -Fxq "$PUBLIC_IP" || die "DNS $domain resolves to [$IPS], but this VPS public IPv4 is $PUBLIC_IP"
done

if [ ! -s "/etc/letsencrypt/live/$ADMIN_DOMAIN/fullchain.pem" ] || [ ! -s "/etc/letsencrypt/live/$API_DOMAIN/fullchain.pem" ]; then
  certbot --version >/dev/null 2>&1 || die "Certbot is required for first TLS issuance"
fi

say "PREFLIGHT PASS"
say "  VPS public IPv4: $PUBLIC_IP"
say "  Docker: active"
say "  Nginx: active / config valid"
say "  WATER Admin mode: $([ "$MANAGED" -eq 1 ] && echo UPDATE || echo FRESH INSTALL)"
say "  Port $API_PORT: $([ -n "$PORT_LINE" ] && echo managed-existing || echo free)"
say "  DNS $ADMIN_DOMAIN: OK"
say "  DNS $API_DOMAIN: OK"
say "  Free disk: $((FREE_KB / 1024)) MiB"
say ""
say "No changes have been made yet. BB610 Market and water.bb610.com.ua have not been touched."
printf 'Type DEPLOY to continue: '
read -r CONFIRM
[ "$CONFIRM" = "DEPLOY" ] || { say "Cancelled. No changes applied."; exit 0; }

# ---------- CHANGES BEGIN HERE ----------
say "Starting isolated WATER Admin deployment..."

install -d -m 0755 "$APP_BASE" "$RELEASES_DIR"
install -d -m 0700 "$ENV_DIR" "$DATA_ROOT" "$DATA_ROOT/postgres" "$BACKUP_ROOT"
install -d -m 0755 "$ACME_ROOT"

if [ ! -d "$RELEASE_DIR" ]; then
  TMP_RELEASE="$RELEASE_DIR.tmp.$$"
  install -d -m 0755 "$TMP_RELEASE"
  cp -a "$PACKAGE_ROOT/services" "$TMP_RELEASE/"
  cp -a "$PACKAGE_ROOT/deploy" "$TMP_RELEASE/"
  cp -a "$PACKAGE_ROOT/docs" "$TMP_RELEASE/"
  printf '%s\n' "$PACKAGE_SHA" > "$TMP_RELEASE/PACKAGE_COMMIT_SHA"
  mv "$TMP_RELEASE" "$RELEASE_DIR"
fi
ln -sfn "$RELEASE_DIR" "$APP_LINK"
printf 'managed-by=BB610-WATER-OWNER-PACKAGE\npackage-sha=%s\n' "$PACKAGE_SHA" > "$MANAGED_MARKER"
chmod 0644 "$MANAGED_MARKER"

FRESH=0
BOOTSTRAP_SECRET=""
if [ ! -f "$ENV_FILE" ]; then
  FRESH=1
  DB_PASS="$(openssl rand -hex 32)"
  JWT_SECRET="$(openssl rand -hex 48)"
  BOOTSTRAP_SECRET="$(openssl rand -hex 32)"
  cat > "$ENV_FILE" <<EOF
# BB610_WATER_ADMIN_MANAGED_ENV=1
POSTGRES_DB=bb610_water_admin
POSTGRES_USER=bb610_water_admin
POSTGRES_PASSWORD=$DB_PASS
BB610_ADMIN_JWT_SECRET=$JWT_SECRET
BB610_ADMIN_JWT_ISSUER=bb610-water-admin-production
BB610_ADMIN_JWT_TTL_MIN=60
BB610_ADMIN_LOGIN_MAX_FAILURES=5
BB610_ADMIN_LOGIN_BLOCK_MIN=15
BB610_ADMIN_BOOTSTRAP_EMAIL=$OWNER_EMAIL
BB610_ADMIN_BOOTSTRAP_PASSWORD=$BOOTSTRAP_SECRET
BB610_ADMIN_CORS_ORIGINS=https://$ADMIN_DOMAIN
BB610_ADMIN_API_PORT=$API_PORT
BB610_ADMIN_DATA_ROOT=$DATA_ROOT
BB610_ADMIN_BACKUP_ROOT=$BACKUP_ROOT
EOF
  chmod 0600 "$ENV_FILE"
  unset DB_PASS JWT_SECRET
else
  grep -q '^# BB610_WATER_ADMIN_MANAGED_ENV=1$' "$ENV_FILE" || { warn "Existing env lacks managed marker; stopping before service restart"; exit 3; }
fi

COMPOSE_FILE="$APP_LINK/deploy/water-admin/docker-compose.production.yml"
export BB610_ADMIN_ENV_FILE="$ENV_FILE"
export BB610_ADMIN_COMPOSE_FILE="$COMPOSE_FILE"

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --build

HEALTH_OK=0
for _ in $(seq 1 60); do
  if curl -fsS "http://127.0.0.1:$API_PORT/health" >/tmp/bb610-water-admin-health.json 2>/dev/null; then HEALTH_OK=1; break; fi
  sleep 2
done
[ "$HEALTH_OK" -eq 1 ] || { docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" logs --tail=80 api >&2 || true; exit 4; }

curl -fsS "http://127.0.0.1:$API_PORT/public/commercial" >/tmp/bb610-water-commercial.json
python3 - <<'PY'
import json
p=json.load(open('/tmp/bb610-water-commercial.json'))
rows=p['catalog']['rows']
assert len(rows)==21
assert sum(r['priceState']=='APPROVED' for r in rows)==15
assert sum(r['priceState']=='PRICE_ON_REQUEST' for r in rows)==6
assert all(r['prices']=={'base':None,'hmi':None} for r in rows if r['modelId'] in ('F1-P','F2-P'))
assert not any(r['modelId'] in ('F1-PH','F2-PH') for r in rows)
print('Commercial invariant PASS: 21 = 15 APPROVED + 6 PRICE_ON_REQUEST')
PY

sh "$APP_LINK/deploy/water-admin/scripts/install-admin-ui.sh" \
  "$APP_LINK/docs/website/admin/review/v2" \
  "$APP_BASE/admin-ui" \
  "https://$API_DOMAIN"

if [ "$FRESH" -eq 1 ]; then
  BB610_OWNER_ACCEPT_API="http://127.0.0.1:$API_PORT" \
  BB610_OWNER_EMAIL="$OWNER_EMAIL" \
  BB610_OWNER_BOOTSTRAP_PASSWORD="$BOOTSTRAP_SECRET" \
  BB610_OWNER_ACCEPT_EVIDENCE="$BACKUP_ROOT/initial-owner-acceptance.json" \
  python3 "$APP_LINK/deploy/water-admin/owner-package/owner-runtime-acceptance.py"

  # Remove temporary role-test users; immutable audit evidence remains.
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T api python - <<'PY'
from sqlalchemy import delete
from app import SessionLocal, User
with SessionLocal() as db:
    db.execute(delete(User).where(User.email.like('owner-accept-%@example.invalid')))
    db.commit()
print('Temporary acceptance users removed')
PY

  say ""
  say "Set the final owner/admin password for $OWNER_EMAIL."
  say "The password is entered only here on the VPS and is not printed or stored in the package."
  while :; do
    printf 'New owner password (minimum 16 characters): ' >&2
    stty -echo
    IFS= read -r OWNER_PASS1
    stty echo
    printf '\nRepeat owner password: ' >&2
    stty -echo
    IFS= read -r OWNER_PASS2
    stty echo
    printf '\n' >&2
    [ "$OWNER_PASS1" = "$OWNER_PASS2" ] || { warn "Passwords do not match"; continue; }
    [ "${#OWNER_PASS1}" -ge 16 ] || { warn "Password must be at least 16 characters"; continue; }
    break
  done

  BB610_ADMIN_NEW_PASSWORD="$OWNER_PASS1" sh "$APP_LINK/deploy/water-admin/scripts/rotate-admin-password.sh" "$OWNER_EMAIL"

  OWNER_PASSWORD_FOR_VERIFY="$OWNER_PASS1" python3 - <<'PY'
import json, os, urllib.parse, urllib.request
body=urllib.parse.urlencode({'username':'admin.bb610@gmail.com','password':os.environ['OWNER_PASSWORD_FOR_VERIFY']}).encode()
req=urllib.request.Request('http://127.0.0.1:18080/auth/token',data=body,headers={'Content-Type':'application/x-www-form-urlencoded'},method='POST')
with urllib.request.urlopen(req,timeout=10) as r:
    data=json.load(r)
assert data['role']=='admin' and data['actor']=='admin.bb610@gmail.com'
print('Production owner/admin login PASS')
PY
  unset OWNER_PASS1 OWNER_PASS2 OWNER_PASSWORD_FOR_VERIFY BB610_ADMIN_NEW_PASSWORD

  python3 - "$ENV_FILE" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1])
lines=[]
for line in p.read_text().splitlines():
    if line.startswith('BB610_ADMIN_BOOTSTRAP_EMAIL='):
        line='BB610_ADMIN_BOOTSTRAP_EMAIL='
    elif line.startswith('BB610_ADMIN_BOOTSTRAP_PASSWORD='):
        line='BB610_ADMIN_BOOTSTRAP_PASSWORD='
    lines.append(line)
p.write_text('\n'.join(lines)+'\n')
PY
  chmod 0600 "$ENV_FILE"
  BOOTSTRAP_SECRET=""
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --no-deps --force-recreate api
fi

# TLS: use isolated webroot; never let Certbot rewrite other Nginx sites.
NEED_CERT=0
for domain in "$ADMIN_DOMAIN" "$API_DOMAIN"; do
  if [ ! -s "/etc/letsencrypt/live/$domain/fullchain.pem" ] || ! openssl x509 -checkend 86400 -noout -in "/etc/letsencrypt/live/$domain/fullchain.pem" >/dev/null 2>&1; then
    NEED_CERT=1
  fi
done

if [ "$NEED_CERT" -eq 1 ]; then
  OLD_NGINX_COPY=""
  if [ -f "$NGINX_CONF" ]; then
    OLD_NGINX_COPY="/tmp/bb610-water-admin-nginx.$$.bak"
    cp "$NGINX_CONF" "$OLD_NGINX_COPY"
  fi
  cat > "$NGINX_CONF" <<EOF
# BB610_WATER_ADMIN_MANAGED
server {
    listen 80;
    listen [::]:80;
    server_name $ADMIN_DOMAIN $API_DOMAIN;
    location ^~ /.well-known/acme-challenge/ { root $ACME_ROOT; try_files \$uri =404; }
    location / { return 404; }
}
EOF
  if ! nginx -t >/dev/null 2>&1; then
    [ -n "$OLD_NGINX_COPY" ] && cp "$OLD_NGINX_COPY" "$NGINX_CONF" || rm -f "$NGINX_CONF"
    nginx -t >/dev/null 2>&1 || true
    die "Temporary ACME Nginx config failed validation"
  fi
  systemctl reload nginx
  for domain in "$ADMIN_DOMAIN" "$API_DOMAIN"; do
    certbot certonly --webroot -w "$ACME_ROOT" --non-interactive --agree-tos --email "$OWNER_EMAIL" --keep-until-expiring -d "$domain"
  done
fi

{ printf '# BB610_WATER_ADMIN_MANAGED\n'; cat "$APP_LINK/deploy/water-admin/nginx/bb610-water-admin.conf"; } > "$NGINX_CONF.tmp"
nginx -t -c /etc/nginx/nginx.conf >/dev/null 2>&1 || true
mv "$NGINX_CONF.tmp" "$NGINX_CONF"
if ! nginx -t; then
  warn "Final WATER Admin Nginx config failed nginx -t. Existing sites were not reloaded."
  exit 5
fi
systemctl reload nginx

install -m 0644 "$APP_LINK/deploy/water-admin/systemd/bb610-water-admin-backup.service" /etc/systemd/system/bb610-water-admin-backup.service
install -m 0644 "$APP_LINK/deploy/water-admin/systemd/bb610-water-admin-backup.timer" /etc/systemd/system/bb610-water-admin-backup.timer
systemctl daemon-reload
systemctl enable --now bb610-water-admin-backup.timer

BACKUP_FILE="$(sh "$APP_LINK/deploy/water-admin/scripts/backup.sh")"
[ -s "$BACKUP_FILE" ] || { warn "Initial backup was not created"; exit 6; }
sha256sum -c "$BACKUP_FILE.sha256"
RESTORE_OUT="$(sh "$APP_LINK/deploy/water-admin/scripts/restore-disposable.sh" "$BACKUP_FILE")"
printf '%s\n' "$RESTORE_OUT"
RESTORE_DB="$(printf '%s\n' "$RESTORE_OUT" | awk '/^Database:/ {print $2}')"
[ -n "$RESTORE_DB" ] || { warn "Could not identify disposable restore DB"; exit 7; }
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T db dropdb -U bb610_water_admin "$RESTORE_DB"

# Controlled API restart acceptance; isolated service only.
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" restart api >/dev/null
for _ in $(seq 1 40); do
  if curl -fsS "http://127.0.0.1:$API_PORT/health" >/dev/null 2>&1; then break; fi
  sleep 2
done
curl -fsS "http://127.0.0.1:$API_PORT/health" >/dev/null

curl -fsS "https://$API_DOMAIN/health" >/tmp/bb610-water-admin-external-health.json
curl -fsS "https://$API_DOMAIN/public/commercial" >/tmp/bb610-water-admin-final-commercial.json
python3 - <<'PY'
import json
p=json.load(open('/tmp/bb610-water-admin-final-commercial.json'))
rows=p['catalog']['rows']
assert len(rows)==21
assert sum(r['priceState']=='APPROVED' for r in rows)==15
assert sum(r['priceState']=='PRICE_ON_REQUEST' for r in rows)==6
assert all(r['prices']=={'base':None,'hmi':None} for r in rows if r['modelId'] in ('F1-P','F2-P'))
print('Final invariant PASS')
PY

say ""
say "============================================================"
say "BB610 WATER Admin deployment SUCCESS"
say "Package SHA: $PACKAGE_SHA"
say "Admin: https://$ADMIN_DOMAIN/"
say "API health: https://$API_DOMAIN/health"
say "Commercial API: https://$API_DOMAIN/public/commercial"
say "Owner/admin: $OWNER_EMAIL"
say "Backup timer: $(systemctl is-active bb610-water-admin-backup.timer || true)"
say "Public water.bb610.com.ua cutover: NOT ACTIVATED"
say "BB610 Market: NOT TOUCHED"
say "============================================================"
