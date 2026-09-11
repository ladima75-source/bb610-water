#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

APP_BASE="${BB610_UI_APP_BASE:-/opt/bb610-water-admin}"
DEST="$APP_BASE/admin-ui"
MANAGED_MARKER="$APP_BASE/.bb610-water-admin-managed"
ADMIN_URL="${BB610_UI_ADMIN_URL:-https://admin.water.bb610.com.ua}"
API_URL="${BB610_UI_API_URL:-https://api.water.bb610.com.ua}"
VERIFY_ATTEMPTS="${BB610_UI_VERIFY_ATTEMPTS:-30}"
VERIFY_SLEEP="${BB610_UI_VERIFY_SLEEP:-1}"

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
command -v python3 >/dev/null 2>&1 || fail "python3 is required for atomic directory exchange"
command -v curl >/dev/null 2>&1 || fail "curl is required for HTTPS verification"

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
TX_ID="ui-repair-$(date -u +%Y%m%dT%H%M%SZ)-$$"
TMP_DEST="$APP_BASE/admin-ui.next.$TX_ID"
BACKUP="$APP_BASE/admin-ui.previous.$TX_ID"
SWAPPED=0
BACKUP_READY=0

atomic_exchange(){
  local left="$1" right="$2"
  python3 - "$left" "$right" <<'PY'
import ctypes, errno, os, sys
left, right = sys.argv[1:3]
if os.stat(left).st_dev != os.stat(right).st_dev:
    raise SystemExit("atomic exchange requires both trees on the same filesystem")
libc = ctypes.CDLL(None, use_errno=True)
AT_FDCWD = -100
RENAME_EXCHANGE = 2
fn = getattr(libc, "renameat2", None)
if fn is None:
    raise SystemExit("renameat2 is unavailable on this host")
rc = fn(AT_FDCWD, os.fsencode(left), AT_FDCWD, os.fsencode(right), RENAME_EXCHANGE)
if rc != 0:
    e = ctypes.get_errno()
    raise OSError(e, os.strerror(e), left, right)
PY
}

local_tree_verify(){
  local root="$1"
  [ -f "$root/index.html" ] || return 1
  [ -f "$root/styles.css" ] || return 1
  [ -f "$root/v1/styles.css" ] || return 1
  [ -f "$root/app.js" ] || return 1
  [ -f "$root/config.js" ] || return 1
  [ -f "$root/.bb610-ui-transaction" ] || return 1
  grep -Fq "@import url('../v1/styles.css');" "$root/styles.css" || return 1
  grep -Fq "$TX_ID" "$root/.bb610-ui-transaction" || return 1
  return 0
}

fetch_asset_once(){
  local path="$1" expected="$2" expected_marker="${3:-}" body headers ctype index_tmp
  body="$(mktemp)"; headers="$(mktemp)"
  if ! curl -fsS --max-time 15 -H 'Cache-Control: no-cache' -D "$headers" -o "$body" "$ADMIN_URL$path?bb610_tx=$TX_ID"; then
    rm -f "$body" "$headers"; return 1
  fi
  ctype="$(awk 'BEGIN{IGNORECASE=1} /^Content-Type:/ {gsub("\r",""); print tolower($2); exit}' "$headers")"
  rm -f "$headers"
  case "$expected" in
    css) [[ "$ctype" == text/css* ]] || { rm -f "$body"; return 1; } ;;
    js) [[ "$ctype" == *javascript* ]] || { rm -f "$body"; return 1; } ;;
    html) [[ "$ctype" == text/html* ]] || { rm -f "$body"; return 1; } ;;
    text) [[ "$ctype" == text/plain* || "$ctype" == application/octet-stream* ]] || true ;;
  esac
  if [ -n "$expected_marker" ]; then
    grep -Fqx "$expected_marker" "$body" || { rm -f "$body"; return 1; }
  fi
  if [ "$path" != "/" ] && [ "$path" != "/.bb610-ui-transaction" ]; then
    index_tmp="$(mktemp)"
    curl -fsS --max-time 15 -H 'Cache-Control: no-cache' -o "$index_tmp" "$ADMIN_URL/?bb610_tx=$TX_ID" || { rm -f "$body" "$index_tmp"; return 1; }
    if cmp -s "$body" "$index_tmp"; then
      rm -f "$body" "$index_tmp"; return 1
    fi
    rm -f "$index_tmp"
  fi
  rm -f "$body"
}

verify_active_https(){
  local i
  for i in $(seq 1 "$VERIFY_ATTEMPTS"); do
    if fetch_asset_once "/.bb610-ui-transaction" text "$TX_ID" && \
       fetch_asset_once "/" html && \
       fetch_asset_once "/styles.css" css && \
       fetch_asset_once "/v1/styles.css" css && \
       fetch_asset_once "/app.js" js && \
       fetch_asset_once "/config.js" js; then
      say "HTTPS active-tree verification PASS after attempt $i"
      return 0
    fi
    sleep "$VERIFY_SLEEP"
  done
  return 1
}

verify_rollback_https(){
  # Rollback verification is intentionally conservative: root must be reachable.
  # The previous UI may be the known broken package and therefore /v1/styles.css
  # is not required to pass during rollback verification.
  local i
  for i in $(seq 1 "$VERIFY_ATTEMPTS"); do
    if curl -fsS --max-time 15 -H 'Cache-Control: no-cache' "$ADMIN_URL/?bb610_rollback=$TX_ID" >/dev/null; then
      say "Rollback HTTPS root verification PASS after attempt $i"
      return 0
    fi
    sleep "$VERIFY_SLEEP"
  done
  return 1
}

rollback(){
  [ "$SWAPPED" -eq 1 ] || return 0
  say "Repair verification failed; atomically restoring previous Admin UI..."
  if [ "$BACKUP_READY" -eq 1 ] && [ -d "$BACKUP" ]; then
    atomic_exchange "$DEST" "$BACKUP" || {
      say "CRITICAL: atomic rollback exchange failed; active tree was not modified further" >&2
      return 1
    }
  else
    atomic_exchange "$DEST" "$TMP_DEST" || {
      say "CRITICAL: atomic rollback exchange failed; active tree was not modified further" >&2
      return 1
    }
  fi
  SWAPPED=0
  verify_rollback_https || {
    say "CRITICAL: previous Admin UI was restored on disk but HTTPS root verification failed" >&2
    return 1
  }
  say "Previous Admin UI restored and reachable."
}

cleanup(){
  rc=$?
  if [ "$rc" -ne 0 ]; then rollback || true; fi
  rm -rf "$TMP_DEST"
  exit "$rc"
}
trap cleanup EXIT INT TERM HUP

say "BB610 WATER Admin — UI-only repair"
say "Package SHA: $PACKAGE_SHA"
say "Transaction: $TX_ID"
say "Scope: static Admin UI assets only. Docker/API/PostgreSQL/Nginx config/TLS/Market are not modified."

rm -rf "$TMP_DEST"
"$INSTALLER" "$SRC_V2" "$TMP_DEST" "$API_URL"
printf '%s\n' "$TX_ID" > "$TMP_DEST/.bb610-ui-transaction"
chmod 0644 "$TMP_DEST/.bb610-ui-transaction"
printf '%s\n' "$PACKAGE_SHA" > "$TMP_DEST/.bb610-admin-ui-package-sha"
chmod 0644 "$TMP_DEST/.bb610-admin-ui-package-sha"

# Phase 1: complete verification of the staged filesystem tree before switch.
local_tree_verify "$TMP_DEST" || fail "Staged Admin UI tree verification failed before switch"
say "Staged Admin UI tree verification PASS"

# Phase 2: one filesystem operation exchanges old active and staged trees.
# Both paths live below APP_BASE, so this remains on one filesystem.
atomic_exchange "$DEST" "$TMP_DEST" || fail "Atomic active/staged directory exchange failed"
SWAPPED=1
say "Atomic Admin UI switch complete"

# The previous active tree now lives at TMP_DEST; preserve it as rollback target.
mv "$TMP_DEST" "$BACKUP"
BACKUP_READY=1
say "Previous Admin UI preserved at: $BACKUP"

# Phase 3: only now validate what HTTPS actually serves from the active path.
if ! verify_active_https; then
  fail "Post-switch HTTPS asset verification failed"
fi

# Phase 4: commit transaction. Keep one timestamped previous tree for owner rollback.
trap - EXIT INT TERM HUP
SWAPPED=0
say "ADMIN UI REPAIR SUCCESS"
say "  URL: $ADMIN_URL/"
say "  Required dependency: $ADMIN_URL/v1/styles.css — PASS"
say "  Active transaction marker: $TX_ID — PASS"
say "  Previous UI backup retained at: $BACKUP"
say "  API/PostgreSQL/Nginx config/TLS/commercial data/Market: unchanged"
