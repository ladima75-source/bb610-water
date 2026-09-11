#!/usr/bin/env bash
set -Eeuxo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HELPER="$ROOT/nginx-transaction.sh"
GATE="$ROOT/bin/certbot"
FINAL_TEMPLATE="$ROOT/../nginx/bb610-water-admin.conf"
[ -f "$HELPER" ] || { echo 'transaction helper missing' >&2; exit 2; }
[ -f "$GATE" ] || { echo 'certbot gate missing' >&2; exit 2; }
[ -f "$FINAL_TEMPLATE" ] || { echo 'final nginx template missing' >&2; exit 2; }

echo 'ALMA TEST: verify distro nginx layout'
grep -q '^ID="\?almalinux"\?' /etc/os-release || { echo 'Not running on AlmaLinux' >&2; exit 3; }
NGINX_VERSION="$(nginx -v 2>&1)"
echo "ALMA TEST: $NGINX_VERSION"
case "$NGINX_VERSION" in
  *'nginx/1.20.1'*) : ;;
  *) echo "Expected AlmaLinux distro Nginx 1.20.1, got: $NGINX_VERSION" >&2; exit 4 ;;
esac
[ -f /etc/nginx/nginx.conf ] || { echo '/etc/nginx/nginx.conf missing' >&2; exit 5; }
grep -Eq 'include[[:space:]]+/etc/nginx/conf\.d/\*\.conf;' /etc/nginx/nginx.conf || {
  echo 'Alma nginx.conf does not include /etc/nginx/conf.d/*.conf' >&2; exit 6;
}

ADMIN_DOMAIN=admin.water.bb610.com.ua
API_DOMAIN=api.water.bb610.com.ua
CONF=/etc/nginx/conf.d/bb610-water-admin.conf
MARKET_CONF=/etc/nginx/conf.d/bb610-market-neighbor.conf
ACME_ROOT=/var/www/bb610-water-admin-acme
TMP="$(mktemp -d)"
trap 'nginx -s stop >/dev/null 2>&1 || true; rm -rf "$TMP"; rm -f "$CONF" "$MARKET_CONF"; rm -rf /etc/letsencrypt/live/admin.water.bb610.com.ua /etc/letsencrypt/live/api.water.bb610.com.ua' EXIT

rm -f /etc/nginx/conf.d/default.conf
cat > "$MARKET_CONF" <<'EOF'
server {
    listen 80;
    server_name api.market.bb610.com.ua;
    location / { return 200 "MARKET-UNCHANGED\n"; }
}
EOF

mkdir -p "$ACME_ROOT/.well-known/acme-challenge"
printf '127.0.0.1 %s %s\n' "$ADMIN_DOMAIN" "$API_DOMAIN" >> /etc/hosts

cat > "$TMP/systemctl" <<'SH'
#!/usr/bin/env bash
set -eu
[ "${1:-}" = reload ] && [ "${2:-}" = nginx ] || exit 2
nginx -s reload
SH
chmod +x "$TMP/systemctl"

cat > "$TMP/real-certbot" <<'SH'
#!/usr/bin/env bash
set -eu
printf 'REAL_CERTBOT_CALLED\n' >> "${BB610_ALMA_CERTBOT_LOG:?}"
exit 0
SH
chmod +x "$TMP/real-certbot"
: > "$TMP/certbot.log"

cat > "$TMP/acme.conf" <<EOF
# BB610_WATER_ADMIN_MANAGED
server {
    listen 80;
    server_name $ADMIN_DOMAIN $API_DOMAIN;
    location ^~ /.well-known/acme-challenge/ { root $ACME_ROOT; try_files \$uri =404; }
    location / { return 404; }
}
EOF

echo 'ALMA TEST: start existing neighbor nginx'
nginx -t
nginx
sleep 0.2
MARKET_BEFORE="$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)"
echo "ALMA TEST: market before candidate=[$MARKET_BEFORE]"
[ "$MARKET_BEFORE" = 'MARKET-UNCHANGED' ]

export BB610_NGINX_CONF="$CONF"
export BB610_NGINX_BIN=nginx
export BB610_SYSTEMCTL_BIN="$TMP/systemctl"
export BB610_NGINX_TX_ROOT="$TMP"
. "$HELPER"
echo 'ALMA TEST: begin/apply ACME candidate'
bb610_nginx_tx_begin
bb610_nginx_tx_apply "$TMP/acme.conf"

PROBE=alma-candidate-active
printf '%s\n' "$PROBE" > "$ACME_ROOT/.well-known/acme-challenge/$PROBE"
echo 'ALMA TEST: wait until reloaded candidate is observably active'
probe_candidate(){
  local domain="$1" body i
  for i in $(seq 1 40); do
    body="$(curl -fsS --resolve "$domain:80:127.0.0.1" "http://$domain/.well-known/acme-challenge/$PROBE" 2>/dev/null || true)"
    if [ "$body" = "$PROBE" ]; then
      echo "ALMA TEST: $domain active after attempt $i"
      return 0
    fi
    sleep 0.1
  done
  echo "ALMA TEST: $domain never served candidate token" >&2
  return 1
}
probe_candidate "$ADMIN_DOMAIN"
probe_candidate "$API_DOMAIN"
rm -f "$ACME_ROOT/.well-known/acme-challenge/$PROBE"
MARKET_AFTER="$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)"
[ "$MARKET_AFTER" = 'MARKET-UNCHANGED' ]

export BB610_REAL_CERTBOT="$TMP/real-certbot"
export BB610_ADMIN_DOMAIN="$ADMIN_DOMAIN"
export BB610_API_DOMAIN="$API_DOMAIN"
export BB610_ALMA_CERTBOT_LOG="$TMP/certbot.log"
echo 'ALMA TEST: run production ACME gate before fake real Certbot'
bash "$GATE" certonly --webroot -w "$ACME_ROOT" --non-interactive -d "$ADMIN_DOMAIN"
grep -Fxq REAL_CERTBOT_CALLED "$TMP/certbot.log"

echo 'ALMA TEST: validate production final template with Nginx 1.20.1'
for domain in "$ADMIN_DOMAIN" "$API_DOMAIN"; do
  certdir="/etc/letsencrypt/live/$domain"
  mkdir -p "$certdir"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -subj "/CN=$domain" \
    -keyout "$certdir/privkey.pem" \
    -out "$certdir/fullchain.pem" >/dev/null 2>&1
  chmod 0600 "$certdir/privkey.pem"
  chmod 0644 "$certdir/fullchain.pem"
done
! grep -Eq '^[[:space:]]*http2[[:space:]]+on;' "$FINAL_TEMPLATE"
grep -Eq 'listen[[:space:]]+443[[:space:]]+ssl[[:space:]]+http2;' "$FINAL_TEMPLATE"
grep -Eq 'listen[[:space:]]+\[::\]:443[[:space:]]+ssl[[:space:]]+http2;' "$FINAL_TEMPLATE"
bb610_nginx_tx_apply "$FINAL_TEMPLATE"
nginx -t
MARKET_WITH_FINAL="$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)"
[ "$MARKET_WITH_FINAL" = 'MARKET-UNCHANGED' ]

echo 'ALMA TEST: commit transaction and re-check Market'
bb610_nginx_tx_commit
nginx -t
MARKET_FINAL="$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)"
[ "$MARKET_FINAL" = 'MARKET-UNCHANGED' ]

echo "AlmaLinux nginx version: $NGINX_VERSION"
echo 'PASS: AlmaLinux /etc/nginx/conf.d/*.conf candidate activation'
echo 'PASS: LOCAL + PUBLIC ACME token/200 gate before real Certbot'
echo 'PASS: production final template parses on Nginx 1.20.1 with listen ... ssl http2 syntax'
echo 'PASS: existing api.market.bb610.com.ua neighbor remained unchanged'
