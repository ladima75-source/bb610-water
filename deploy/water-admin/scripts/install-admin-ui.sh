#!/bin/sh
set -eu

SRC="${1:-docs/website/admin/review/v2}"
DEST="${2:-/opt/bb610-water-admin/admin-ui}"
API_BASE="${3:-https://api.water.bb610.com.ua}"

[ -f "$SRC/index.html" ] || { echo "Admin UI source not found: $SRC" >&2; exit 2; }

install -d -m 0755 "$DEST"
rm -f "$DEST/index.html" "$DEST/app.js" "$DEST/styles.css" "$DEST/config.js"
install -m 0644 "$SRC/index.html" "$DEST/index.html"
install -m 0644 "$SRC/app.js" "$DEST/app.js"
install -m 0644 "$SRC/styles.css" "$DEST/styles.css"
printf "window.BB610_ADMIN_CONFIG={apiBase:'%s'};\n" "$API_BASE" > "$DEST/config.js"
chmod 0644 "$DEST/config.js"

echo "Admin UI installed: $DEST"
echo "API base: $API_BASE"
