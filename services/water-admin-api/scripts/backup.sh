#!/bin/sh
set -eu
: "${BB610_ADMIN_DATABASE_URL:?BB610_ADMIN_DATABASE_URL is required}"
OUT_DIR="${1:-./backups}"
mkdir -p "$OUT_DIR"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
FILE="$OUT_DIR/bb610-water-admin-$STAMP.dump"
pg_dump --format=custom --no-owner --no-privileges "$BB610_ADMIN_DATABASE_URL" > "$FILE"
sha256sum "$FILE" > "$FILE.sha256"
echo "$FILE"
