#!/bin/sh
set -eu

SRC="${1:-docs/website/admin/review/v2}"
DEST="${2:-/opt/bb610-water-admin/admin-ui}"
API_BASE="${3:-https://api.water.bb610.com.ua}"
PRODUCTION_API_BASE="https://api.water.bb610.com.ua"
REVIEW_ROOT="$(dirname "$SRC")"
V1_SRC="$REVIEW_ROOT/v1"
V2_SRC="$REVIEW_ROOT/v2"

[ "$API_BASE" = "$PRODUCTION_API_BASE" ] || {
  echo "Refusing non-production Admin API base: $API_BASE" >&2
  exit 5
}
case "$API_BASE" in
  https://api.water.bb610.com.ua) : ;;
  *) echo "Invalid production Admin API base: $API_BASE" >&2; exit 5 ;;
esac

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

# Preserve the approved review asset tree so relative v2 dependencies remain valid.
# Review/dev config.js may intentionally contain localhost; production root config.js
# is always generated below and is never copied from the review file.
cp -a "$V1_SRC" "$DEST/v1"
cp -a "$V2_SRC" "$DEST/v2"
find "$DEST/v1" "$DEST/v2" -type d -exec chmod 0755 {} \;
find "$DEST/v1" "$DEST/v2" -type f -exec chmod 0644 {} \;

install -m 0644 "$V2_SRC/index.html" "$DEST/index.html"
install -m 0644 "$V2_SRC/app.js" "$DEST/app.js"
install -m 0644 "$V2_SRC/styles.css" "$DEST/styles.css"
printf "window.BB610_ADMIN_CONFIG={apiBase:'%s'};\n" "$PRODUCTION_API_BASE" > "$DEST/config.js"
chmod 0644 "$DEST/config.js"

# The accepted review app has a localhost fallback for review/dev. Production runtime
# must fail over only to the production HTTPS API if config.js cannot be read.
python3 - "$DEST/app.js" "$PRODUCTION_API_BASE" <<'PY'
from pathlib import Path
import sys
path=Path(sys.argv[1]); prod=sys.argv[2]
s=path.read_text()
old="window.BB610_ADMIN_CONFIG||{apiBase:'http://localhost:8080'}"
new=f"window.BB610_ADMIN_CONFIG||{{apiBase:'{prod}'}}"
if old not in s:
    raise SystemExit('Expected review localhost fallback not found in Admin app.js')
path.write_text(s.replace(old,new,1))
PY
chmod 0644 "$DEST/app.js"

# Production runtime invariant: exact HTTPS API in root config, and no local/plain-HTTP
# API endpoint in the actually served root JS/config assets.
grep -Fxq "window.BB610_ADMIN_CONFIG={apiBase:'$PRODUCTION_API_BASE'};" "$DEST/config.js" || {
  echo "Production config.js invariant failed" >&2; exit 6;
}
if grep -Eqi 'localhost|127\.0\.0\.1' "$DEST/config.js" "$DEST/app.js"; then
  echo "Production Admin runtime contains forbidden localhost/loopback API endpoint" >&2
  exit 7
fi
if grep -Fq "apiBase:'http://" "$DEST/config.js" "$DEST/app.js" || grep -Fq 'apiBase:"http://' "$DEST/config.js" "$DEST/app.js"; then
  echo "Production Admin runtime contains forbidden plain-HTTP API endpoint" >&2
  exit 7
fi
grep -Fq "apiBase:'$PRODUCTION_API_BASE'" "$DEST/app.js" || {
  echo "Production app.js fallback invariant failed" >&2; exit 8;
}

echo "Admin UI installed: $DEST"
echo "Admin UI dependency: $DEST/v1/styles.css"
echo "API base: $PRODUCTION_API_BASE"
