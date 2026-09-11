#!/bin/sh
set -eu

ENV_FILE="${BB610_ADMIN_ENV_FILE:-/etc/bb610-water-admin/admin.env}"
COMPOSE_FILE="${BB610_ADMIN_COMPOSE_FILE:-/opt/bb610-water-admin/app/deploy/water-admin/docker-compose.production.yml}"
FILE="${1:?Usage: restore-disposable.sh <backup.dump>}"
[ -f "$ENV_FILE" ] || { echo "Missing env file: $ENV_FILE" >&2; exit 2; }
[ -f "$FILE" ] || { echo "Backup not found: $FILE" >&2; exit 2; }

if [ -f "$FILE.sha256" ]; then
  sha256sum -c "$FILE.sha256"
fi

set -a
. "$ENV_FILE"
set +a

RESTORE_DB="bb610_restore_$(date -u +%Y%m%d%H%M%S)"

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T db \
  createdb -U "$POSTGRES_USER" "$RESTORE_DB"

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T db \
  pg_restore -U "$POSTGRES_USER" -d "$RESTORE_DB" --no-owner --no-privileges < "$FILE"

query() {
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T db \
    psql -U "$POSTGRES_USER" -d "$RESTORE_DB" -Atqc "$1"
}

VERSIONS=$(query 'SELECT count(*) FROM catalog_versions;')
PUBLICATIONS=$(query 'SELECT count(*) FROM catalog_publications;')
AUDIT=$(query 'SELECT count(*) FROM catalog_audit_events;')
LATEST=$(query 'SELECT version FROM catalog_versions ORDER BY version DESC LIMIT 1;')
PUBLISHED=$(query 'SELECT version FROM catalog_publications ORDER BY id DESC LIMIT 1;')
ROWS=$(query "SELECT count(*) FROM jsonb_array_elements(((SELECT snapshot FROM catalog_versions ORDER BY version DESC LIMIT 1)::jsonb)->'rows');")
APPROVED=$(query "SELECT count(*) FROM jsonb_array_elements(((SELECT snapshot FROM catalog_versions ORDER BY version DESC LIMIT 1)::jsonb)->'rows') r WHERE r->>'priceState'='APPROVED';")
POR=$(query "SELECT count(*) FROM jsonb_array_elements(((SELECT snapshot FROM catalog_versions ORDER BY version DESC LIMIT 1)::jsonb)->'rows') r WHERE r->>'priceState'='PRICE_ON_REQUEST';")
LEGACY=$(query "SELECT count(*) FROM jsonb_array_elements(((SELECT snapshot FROM catalog_versions ORDER BY version DESC LIMIT 1)::jsonb)->'rows') r WHERE r->>'modelId' IN ('F1-PH','F2-PH');")
NULL_P=$(query "SELECT count(*) FROM jsonb_array_elements(((SELECT snapshot FROM catalog_versions ORDER BY version DESC LIMIT 1)::jsonb)->'rows') r WHERE r->>'modelId' IN ('F1-P','F2-P') AND r->>'priceState'='PRICE_ON_REQUEST' AND r->'prices'->'base'='null'::jsonb AND r->'prices'->'hmi'='null'::jsonb;")

[ "$ROWS" = "21" ] || { echo "Restore invariant failed: rows=$ROWS" >&2; exit 3; }
[ "$APPROVED" = "15" ] || { echo "Restore invariant failed: approved=$APPROVED" >&2; exit 3; }
[ "$POR" = "6" ] || { echo "Restore invariant failed: price_on_request=$POR" >&2; exit 3; }
[ "$NULL_P" = "6" ] || { echo "Restore invariant failed: F1-P/F2-P null/null=$NULL_P" >&2; exit 3; }
[ "$LEGACY" = "0" ] || { echo "Restore invariant failed: legacy rows=$LEGACY" >&2; exit 3; }

cat <<EOF
Disposable restore PASS
Database: $RESTORE_DB
Versions: $VERSIONS
Publications: $PUBLICATIONS
Audit events: $AUDIT
Latest version: $LATEST
Published version: $PUBLISHED
Commercial rows: $ROWS
APPROVED: $APPROVED
PRICE_ON_REQUEST: $POR
F1-P/F2-P null/null: $NULL_P
Legacy F1-PH/F2-PH: $LEGACY
EOF

echo "Review the disposable database, then drop it with:"
echo "docker compose --env-file $ENV_FILE -f $COMPOSE_FILE exec -T db dropdb -U $POSTGRES_USER $RESTORE_DB"
