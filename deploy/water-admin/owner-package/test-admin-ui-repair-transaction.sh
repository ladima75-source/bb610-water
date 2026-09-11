#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
REPAIR="$ROOT/deploy/water-admin/owner-package/repair-admin-ui.sh"
V2="$ROOT/docs/website/admin/review/v2"

[ "$(id -u)" -eq 0 ] || { echo "This regression must run as root (use the CI container)." >&2; exit 2; }
[ -f "$REPAIR" ] || { echo "repair-admin-ui.sh is missing" >&2; exit 2; }

TMP="$(mktemp -d)"
APP_BASE="$TMP/app"
PORT="18082"
SERVER="$TMP/server.py"
SERVER_PID=""

cleanup(){
  [ -z "$SERVER_PID" ] || kill "$SERVER_PID" >/dev/null 2>&1 || true
  rm -rf "$TMP"
}
trap cleanup EXIT

mkdir -p "$APP_BASE/admin-ui"
printf 'managed-by=BB610-WATER-OWNER-PACKAGE\n' > "$APP_BASE/.bb610-water-admin-managed"

# Reproduce the actual broken production UI from the old package: v2 is flattened,
# while the inherited v1 stylesheet is absent.
cp "$V2/index.html" "$APP_BASE/admin-ui/index.html"
cp "$V2/app.js" "$APP_BASE/admin-ui/app.js"
cp "$V2/styles.css" "$APP_BASE/admin-ui/styles.css"
printf "window.BB610_ADMIN_CONFIG={apiBase:'https://api.water.bb610.com.ua'};\n" > "$APP_BASE/admin-ui/config.js"

cat > "$SERVER" <<'PY'
import http.server, mimetypes, pathlib, sys, urllib.parse
root = pathlib.Path(sys.argv[1])
port = int(sys.argv[2])
fail_marker = pathlib.Path(sys.argv[3])
class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = urllib.parse.urlsplit(self.path).path
        if path == '/.bb610-ui-transaction' and fail_marker.exists():
            self.send_response(503); self.send_header('Content-Type','text/plain'); self.end_headers(); self.wfile.write(b'injected failure'); return
        rel = path.lstrip('/') or 'index.html'
        candidate = root / rel
        if not candidate.is_file():
            candidate = root / 'index.html'  # SPA fallback, intentionally HTTP 200.
        data = candidate.read_bytes()
        ctype = mimetypes.guess_type(candidate.name)[0] or 'application/octet-stream'
        self.send_response(200); self.send_header('Content-Type', ctype); self.send_header('Cache-Control','no-store'); self.end_headers(); self.wfile.write(data)
    def do_HEAD(self):
        path = urllib.parse.urlsplit(self.path).path
        rel = path.lstrip('/') or 'index.html'
        candidate = root / rel
        if not candidate.is_file(): candidate = root / 'index.html'
        ctype = mimetypes.guess_type(candidate.name)[0] or 'application/octet-stream'
        self.send_response(200); self.send_header('Content-Type', ctype); self.end_headers()
    def log_message(self, fmt, *args): pass
http.server.ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
PY

python3 "$SERVER" "$APP_BASE/admin-ui" "$PORT" "$TMP/fail-marker" &
SERVER_PID=$!
for _ in $(seq 1 30); do curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1 && break; sleep 0.1; done

# Prove the starting production symptom: missing v1 asset is SPA fallback HTML.
ctype="$(curl -fsSI "http://127.0.0.1:$PORT/v1/styles.css" | awk 'BEGIN{IGNORECASE=1}/^Content-Type:/{gsub("\r","");print tolower($2);exit}')"
[ "$ctype" = "text/html" ] || { echo "Regression setup failed: expected broken /v1/styles.css HTML fallback, got $ctype" >&2; exit 3; }

run_repair(){
  BB610_UI_APP_BASE="$APP_BASE" \
  BB610_UI_ADMIN_URL="http://127.0.0.1:$PORT" \
  BB610_UI_API_URL="https://api.water.bb610.com.ua" \
  BB610_UI_VERIFY_ATTEMPTS=10 \
  BB610_UI_VERIFY_SLEEP=0.1 \
  bash "$REPAIR"
}

# Scenario A: broken active tree -> atomic switch -> successful public validation.
run_repair > "$TMP/success.log" 2>&1
cat "$TMP/success.log"
grep -q 'Staged Admin UI tree verification PASS' "$TMP/success.log"
grep -q 'Atomic Admin UI switch complete' "$TMP/success.log"
grep -q 'ADMIN UI REPAIR SUCCESS' "$TMP/success.log"
[ -f "$APP_BASE/admin-ui/v1/styles.css" ]
ctype="$(curl -fsSI "http://127.0.0.1:$PORT/v1/styles.css" | awk 'BEGIN{IGNORECASE=1}/^Content-Type:/{gsub("\r","");print tolower($2);exit}')"
[ "$ctype" = "text/css" ] || { echo "Post-repair /v1/styles.css MIME mismatch: $ctype" >&2; exit 4; }
BACKUP_OK="$(find "$APP_BASE" -maxdepth 1 -type d -name 'admin-ui.previous.*' | head -n1)"
[ -n "$BACKUP_OK" ] && [ -f "$BACKUP_OK/styles.css" ] && [ ! -f "$BACKUP_OK/v1/styles.css" ]
echo 'PASS: broken production UI -> staged local verify -> atomic switch -> active HTTP asset validation'

# Scenario B: restore a broken active tree, force post-switch marker failure, and
# require the transaction to restore that exact broken tree atomically.
rm -rf "$APP_BASE/admin-ui"
mkdir -p "$APP_BASE/admin-ui"
cp "$V2/index.html" "$APP_BASE/admin-ui/index.html"
cp "$V2/app.js" "$APP_BASE/admin-ui/app.js"
cp "$V2/styles.css" "$APP_BASE/admin-ui/styles.css"
printf "window.BB610_ADMIN_CONFIG={apiBase:'https://api.water.bb610.com.ua'};\n" > "$APP_BASE/admin-ui/config.js"
rm -rf "$APP_BASE"/admin-ui.previous.*
touch "$TMP/fail-marker"
set +e
run_repair > "$TMP/failure.log" 2>&1
rc=$?
set -e
cat "$TMP/failure.log"
[ "$rc" -ne 0 ] || { echo 'Injected post-switch failure unexpectedly succeeded' >&2; exit 5; }
grep -q 'atomically restoring previous Admin UI' "$TMP/failure.log"
grep -q 'Previous Admin UI restored and reachable' "$TMP/failure.log"
[ ! -f "$APP_BASE/admin-ui/v1/styles.css" ] || { echo 'Rollback did not restore the original broken active tree' >&2; exit 6; }
ctype="$(curl -fsSI "http://127.0.0.1:$PORT/v1/styles.css" | awk 'BEGIN{IGNORECASE=1}/^Content-Type:/{gsub("\r","");print tolower($2);exit}')"
[ "$ctype" = "text/html" ] || { echo "Rollback active tree mismatch; expected original SPA fallback, got $ctype" >&2; exit 7; }
echo 'PASS: injected post-switch failure -> atomic rollback -> previous active tree restored and reachable'
