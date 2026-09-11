#!/bin/sh
set -eu

SRC="${1:-docs/website/admin/review/v2}"
DEST="${2:-/opt/bb610-water-admin/admin-ui}"
API_BASE="${3:-https://api.water.bb610.com.ua}"
REVIEW_ROOT="$(dirname "$SRC")"
V1_SRC="$REVIEW_ROOT/v1"
V2_SRC="$REVIEW_ROOT/v2"

[ -f "$V2_SRC/index.html" ] || { echo "Admin UI v2 source not found: $V2_SRC" >&2; exit 2; }
[ -f "$V2_SRC/styles.css" ] || { echo "Admin UI v2 styles not found: $V2_SRC/styles.css" >&2; exit 2; }
[ -f "$V1_SRC/styles.css" ] || { echo "Admin UI v1 dependency not found: $V1_SRC/styles.css" >&2; exit 3; }

grep -Fq "@import url('../v1/styles.css');" "$V2_SRC/styles.css" || {
  echo "Admin UI v2 stylesheet dependency contract changed; refusing incomplete install" >&2
  exit 4
}

install -d -m 0755 "$DEST"
rm -rf "$DEST/v1" "$DEST/v2"
rm -f "$DEST/index.html" "$DEST/app.js" "$DEST/styles.css" "$DEST/config.js"

# Preserve the approved review asset tree so relative v2 dependencies remain valid
# when v2 is published as the production root entrypoint.
cp -a "$V1_SRC" "$DEST/v1"
cp -a "$V2_SRC" "$DEST/v2"
find "$DEST/v1" "$DEST/v2" -type d -exec chmod 0755 {} \;
find "$DEST/v1" "$DEST/v2" -type f -exec chmod 0644 {} \;

install -m 0644 "$V2_SRC/index.html" "$DEST/index.html"
install -m 0644 "$V2_SRC/app.js" "$DEST/app.js"
install -m 0644 "$V2_SRC/styles.css" "$DEST/styles.css"
printf "window.BB610_ADMIN_CONFIG={apiBase:'%s'};\n" "$API_BASE" > "$DEST/config.js"
chmod 0644 "$DEST/config.js"

echo "Admin UI installed: $DEST"
echo "Admin UI dependency: $DEST/v1/styles.css"
echo "API base: $API_BASE"
