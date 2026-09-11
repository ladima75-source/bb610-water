#!/bin/sh
set -eu

ENV_FILE="${BB610_ADMIN_ENV_FILE:-/etc/bb610-water-admin/admin.env}"
COMPOSE_FILE="${BB610_ADMIN_COMPOSE_FILE:-/opt/bb610-water-admin/app/deploy/water-admin/docker-compose.production.yml}"
[ -f "$ENV_FILE" ] || { echo "Missing env file: $ENV_FILE" >&2; exit 2; }

set -a
. "$ENV_FILE"
set +a

BACKUP_ROOT="${BB610_ADMIN_BACKUP_ROOT:-/var/backups/bb610-water-admin}"
RETENTION_DAYS="${BB610_ADMIN_BACKUP_RETENTION_DAYS:-30}"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
FILE="$BACKUP_ROOT/bb610-water-admin-$STAMP.dump"

install -d -m 0700 "$BACKUP_ROOT"
umask 077

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T db \
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom --no-owner --no-privileges > "$FILE"
sha256sum "$FILE" > "$FILE.sha256"
chmod 0600 "$FILE" "$FILE.sha256"

find "$BACKUP_ROOT" -type f \( -name 'bb610-water-admin-*.dump' -o -name 'bb610-water-admin-*.dump.sha256' \) -mtime "+$RETENTION_DAYS" -delete

if [ -x /usr/local/sbin/bb610-water-admin-offhost-sync ]; then
  /usr/local/sbin/bb610-water-admin-offhost-sync "$FILE" "$FILE.sha256"
fi

printf '%s\n' "$FILE"
