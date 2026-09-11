#!/bin/sh
set -eu
: "${BB610_ADMIN_DATABASE_URL:?BB610_ADMIN_DATABASE_URL is required}"
: "${BB610_ADMIN_RESTORE_CONFIRM:?Set BB610_ADMIN_RESTORE_CONFIRM=YES to allow restore}"
[ "$BB610_ADMIN_RESTORE_CONFIRM" = "YES" ] || { echo "Restore confirmation missing" >&2; exit 2; }
FILE="${1:?Usage: restore.sh <backup.dump>}"
[ -f "$FILE" ] || { echo "Backup not found: $FILE" >&2; exit 2; }
if [ -f "$FILE.sha256" ]; then sha256sum -c "$FILE.sha256"; fi
pg_restore --clean --if-exists --no-owner --no-privileges --dbname="$BB610_ADMIN_DATABASE_URL" "$FILE"
echo "Restore complete: $FILE"
