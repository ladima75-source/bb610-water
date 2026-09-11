#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HELPER="$ROOT/nginx-transaction.sh"
[ -f "$HELPER" ] || { echo "helper missing" >&2; exit 2; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
BIN="$TMP/bin"
mkdir -p "$BIN"

cat > "$BIN/nginx" <<'SH'
#!/usr/bin/env bash
set -eu
[ "${1:-}" = "-t" ] || exit 2
CONF="${BB610_NGINX_CONF:?}"
[ ! -f "$CONF" ] && exit 0
! grep -q 'BROKEN_DIRECTIVE' "$CONF"
SH
chmod +x "$BIN/nginx"

cat > "$BIN/systemctl" <<'SH'
#!/usr/bin/env bash
set -eu
[ "${1:-}" = "reload" ] && [ "${2:-}" = "nginx" ] || exit 2
printf 'reload\n' >> "${BB610_TEST_RELOAD_LOG:?}"
SH
chmod +x "$BIN/systemctl"

cat > "$BIN/certbot" <<'SH'
#!/usr/bin/env bash
set -eu
domain=""
while [ "$#" -gt 0 ]; do
  if [ "$1" = "-d" ]; then domain="$2"; shift 2; else shift; fi
done
printf '%s\n' "$domain" >> "${BB610_TEST_CERT_LOG:?}"
if [ "${BB610_TEST_CERT_FAIL_DOMAIN:-}" = "$domain" ]; then exit 70; fi
SH
chmod +x "$BIN/certbot"

make_candidate(){
  local file="$1" extra="${2:-}"
  cat > "$file" <<EOF
# BB610_WATER_ADMIN_MANAGED
server { listen 80; server_name admin.water.bb610.com.ua api.water.bb610.com.ua; }
$extra
EOF
}

run_case(){
  local name="$1" mode="$2"
  local dir="$TMP/$name"
  mkdir -p "$dir/conf" "$dir/tx"
  local conf="$dir/conf/bb610-water-admin.conf"
  local before="$dir/original.copy"
  local acme="$dir/acme.candidate"
  local final="$dir/final.candidate"
  local reload_log="$dir/reload.log"
  local cert_log="$dir/cert.log"

  printf '# ORIGINAL SHARED VPS WATER SLOT\nserver { listen 80; server_name untouched.example; }\n' > "$conf"
  cp "$conf" "$before"
  make_candidate "$acme"
  make_candidate "$final"
  [ "$mode" != "broken" ] || printf 'BROKEN_DIRECTIVE;\n' >> "$final"
  : > "$reload_log"; : > "$cert_log"

  set +e
  BB610_NGINX_CONF="$conf" \
  BB610_NGINX_BIN="$BIN/nginx" \
  BB610_SYSTEMCTL_BIN="$BIN/systemctl" \
  BB610_NGINX_TX_ROOT="$dir/tx" \
  BB610_TEST_RELOAD_LOG="$reload_log" \
  BB610_TEST_CERT_LOG="$cert_log" \
  BB610_TEST_CERT_FAIL_DOMAIN="$([ "$mode" = certfail ] && printf 'api.water.bb610.com.ua' || true)" \
  PATH="$BIN:$PATH" \
  MODE="$mode" ACME="$acme" FINAL="$final" HELPER="$HELPER" \
  bash -c '
    set -Eeuo pipefail
    . "$HELPER"
    abort(){ rc=${1:-1}; trap - ERR INT TERM HUP; bb610_nginx_tx_restore; exit "$rc"; }
    trap '\''abort $?'\'' ERR
    trap '\''abort 130'\'' INT TERM HUP
    bb610_nginx_tx_begin
    bb610_nginx_tx_apply "$ACME"
    case "$MODE" in
      broken)
        bb610_nginx_tx_apply "$FINAL"
        ;;
      certfail)
        certbot certonly -d admin.water.bb610.com.ua
        certbot certonly -d api.water.bb610.com.ua
        bb610_nginx_tx_apply "$FINAL"
        ;;
      interrupt)
        certbot certonly -d admin.water.bb610.com.ua
        certbot certonly -d api.water.bb610.com.ua
        kill -TERM $$
        bb610_nginx_tx_apply "$FINAL"
        ;;
    esac
    bb610_nginx_tx_commit
    trap - ERR INT TERM HUP
  '
  rc=$?
  set -e

  [ "$rc" -ne 0 ] || { echo "$name unexpectedly succeeded" >&2; exit 10; }
  cmp -s "$before" "$conf" || { echo "$name did not restore original Nginx file" >&2; diff -u "$before" "$conf" || true; exit 11; }
  BB610_NGINX_CONF="$conf" "$BIN/nginx" -t || { echo "$name restored invalid Nginx config" >&2; exit 12; }
  [ "$(wc -l < "$reload_log")" -ge 2 ] || { echo "$name did not reload restored Nginx state" >&2; cat "$reload_log"; exit 13; }
  if [ "$mode" = certfail ]; then
    grep -Fxq 'admin.water.bb610.com.ua' "$cert_log"
    grep -Fxq 'api.water.bb610.com.ua' "$cert_log"
  fi
  echo "PASS: $name rollback restored original valid/running Nginx state"
}

run_direct_apply_case(){
  local dir="$TMP/direct-apply"
  mkdir -p "$dir/conf" "$dir/tx"
  local conf="$dir/conf/bb610-water-admin.conf"
  local before="$dir/original.copy"
  local broken="$dir/broken.candidate"
  local reload_log="$dir/reload.log"
  printf '# ORIGINAL SHARED VPS WATER SLOT\nserver { listen 80; server_name untouched.example; }\n' > "$conf"
  cp "$conf" "$before"
  make_candidate "$broken" 'BROKEN_DIRECTIVE;'
  : > "$reload_log"

  set +e
  BB610_NGINX_CONF="$conf" \
  BB610_NGINX_BIN="$BIN/nginx" \
  BB610_SYSTEMCTL_BIN="$BIN/systemctl" \
  BB610_NGINX_TX_ROOT="$dir/tx" \
  BB610_TEST_RELOAD_LOG="$reload_log" \
  HELPER="$HELPER" BROKEN="$broken" \
  bash -c '
    set -u
    . "$HELPER"
    bb610_nginx_tx_begin || exit $?
    bb610_nginx_tx_apply "$BROKEN"
  '
  rc=$?
  set -e
  [ "$rc" -ne 0 ] || { echo 'direct apply unexpectedly succeeded' >&2; exit 20; }
  cmp -s "$before" "$conf" || { echo 'direct apply left failed candidate on disk' >&2; diff -u "$before" "$conf" || true; exit 21; }
  BB610_NGINX_CONF="$conf" "$BIN/nginx" -t || { echo 'direct apply restore is invalid' >&2; exit 22; }
  echo 'PASS: direct bb610_nginx_tx_apply failure restores transaction-start disk state without caller trap'
}

run_case broken-nginx-candidate broken
run_case certbot-fails-after-first-domain certfail
run_case interrupted-between-stages interrupt
run_direct_apply_case

echo 'OWNER Nginx/TLS failure-injection suite PASS'
