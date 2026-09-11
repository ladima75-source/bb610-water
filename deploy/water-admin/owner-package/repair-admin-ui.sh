#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

APP_BASE="/opt/bb610-water-admin"
DEST="$APP_BASE/admin-ui"
MANAGED_MARKER="$APP_BASE/.bb610-water-admin-managed"
ADMIN_URL="https://admin.water.bb610.com.ua"
API_URL="https://api.water.bb610.com.ua"

say(){ printf '%s\n' "$*"; }
fail(){ printf 'ADMIN UI REPAIR FAILED: %s\n' "$*" >&2; exit 2; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -d "$SCRIPT_DIR/docs/website/admin/review" ] && [ -d "$SCRIPT_DIR/deploy/water-admin" ]; then
  PACKAGE_ROOT="$SCRIPT_DIR"
elif [ -d "$SCRIPT_DIR/../../../docs/website/admin/review" ] && [ -d "$SCRIPT_DIR/../../../deploy/water-admin" ]; then
  PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
else
  fail "OWNER package root not found"
fi

[ "$(id -u)" -eq 0 ] || fail "Run with sudo/root: sudo bash ./repair-admin-ui.sh"
[ -f "$MANAGED_MARKER" ] || fail "$APP_BASE is not marked as a managed BB610 WATER Admin deployment"
[ -d "$DEST" ] || fail "Existing Admin UI directory is missing: $DEST"

INSTALLER="$PACKAGE_ROOT/deploy/water-admin/scripts/install-admin-ui.sh"
SRC_V2="$PACKAGE_ROOT/docs/website/admin/review/v2"
SRC_V1="$PACKAGE_ROOT/docs/website/admin/review/v1"
[ -x "$INSTALLER" ] || fail "Packaged Admin UI installer missing"
[ -f "$SRC_V2/index.html" ] || fail "Packaged Admin v2 entrypoint missing"
[ -f "$SRC_V2/styles.css" ] || fail "Packaged Admin v2 stylesheet missing"
[ -f "$SRC_V1/styles.css" ] || fail "Packaged Admin v1 stylesheet dependency missing"

grep -Fq "@import url('../v1/styles.css');" "$SRC_V2/styles.css" || fail "Admin v2 stylesheet dependency contract changed"

PACKAGE_SHA="unknown"
[ -f "$PACKAGE_ROOT/PACKAGE_COMMIT_SHA" ] && PACKAGE_SHA="$(tr -d '[:space:]' < "$PACKAGE_ROOT/PACKAGE_COMMIT_SHA")"

TMP_DEST="$APP_BASE/admin-ui.next.$$"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$APP_BASE/admin-ui.previous.$STAMP"
SWAPPED=0

cleanup(){
  rc=$?
  rm -rf "$TMP_DEST"
  if [ "$rc" -ne 0 ] && [ "$SWAPPED" -eq 1 ]; then
    say "Repair verification failed; restoring previous Admin UI..."
    rm -rf "$DEST"
    if [ -d "$BACKUP" ]; then mv "$BACKUP" "$DEST"; fi
  fi
  exit "$rc"
}
trap cleanup EXIT INT TERM HUP

say "BB610 WATER Admin — UI-only repair"
say "Package SHA: $PACKAGE_SHA"
say "Scope: static Admin UI assets only. Docker/API/PostgreSQL/Nginx/TLS/Market are not modified."

rm -rf "$TMP_DEST"
"$INSTALLER" "$SRC_V2" "$TMP_DEST" "$API_URL"
[ -f "$TMP_DEST/v1/styles.css" ] || fail "Prepared runtime lacks v1/styles.css"
[ -f "$TMP_DEST/styles.css" ] || fail "Prepared runtime lacks root styles.css"
[ -f "$TMP_DEST/app.js" ] || fail "Prepared runtime lacks app.js"
[ -f "$TMP_DEST/config.js" ] || fail "Prepared runtime lacks config.js"

grep -Fq "@import url('../v1/styles.css');" "$TMP_DEST/styles.css" || fail "Prepared root stylesheet lost v1 dependency"

mv "$DEST" "$BACKUP"
mv "$TMP_DEST" "$DEST"
SWAPPED=1

verify_asset(){
  local path="$1" expected="$2" body headers ctype
  body="$(mktemp)"; headers="$(mktemp)"
  if ! curl -fsS --max-time 15 -D "$headers" -o "$body" "$ADMIN_URL$path"; then
    rm -f "$body" "$headers"; return 1
  fi
  ctype="$(awk 'BEGIN{IGNORECASE=1} /^Content-Type:/ {gsub("\r",""); print tolower($2); exit}' "$headers")"
  rm -f "$headers"
  case "$expected" in
    css) [[ "$ctype" == text/css* ]] || { rm -f "$body"; return 1; } ;;
    js) [[ "$ctype" == *javascript* ]] || { rm -f "$body"; return 1; } ;;
    html) [[ "$ctype" == text/html* ]] || { rm -f "$body"; return 1; } ;;
  esac
  if [ "$path" != "/" ]; then
    local index_tmp
    index_tmp="$(mktemp)"
    curl -fsS --max-time 15 -o "$index_tmp" "$ADMIN_URL/" || { rm -f "$body" "$index_tmp"; return 1; }
    if cmp -s "$body" "$index_tmp"; then
      rm -f "$body" "$index_tmp"; return 1
    fi
    rm -f "$index_tmp"
  fi
  rm -f "$body"
}

verify_asset "/" html || fail "Admin root verification failed"
verify_asset "/styles.css" css || fail "/styles.css is missing, wrong MIME, or SPA fallback"
verify_asset "/v1/styles.css" css || fail "/v1/styles.css is missing, wrong MIME, or SPA fallback"
verify_asset "/app.js" js || fail "/app.js is missing, wrong MIME, or SPA fallback"
verify_asset "/config.js" js || fail "/config.js is missing, wrong MIME, or SPA fallback"

printf '%s\n' "$PACKAGE_SHA" > "$DEST/.bb610-admin-ui-package-sha"
chmod 0644 "$DEST/.bb610-admin-ui-package-sha"

trap - EXIT INT TERM HUP
SWAPPED=0
say "ADMIN UI REPAIR SUCCESS"
say "  URL: $ADMIN_URL/"
say "  Required dependency: $ADMIN_URL/v1/styles.css — PASS"
say "  Previous UI backup retained at: $BACKUP"
say "  API/PostgreSQL/TLS/commercial data/Market: unchanged"
