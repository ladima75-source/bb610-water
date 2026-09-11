#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HELPER="$ROOT/nginx-transaction.sh"
GATE="$ROOT/bin/certbot"
[ -f "$HELPER" ] || { echo 'transaction helper missing' >&2; exit 2; }
[ -f "$GATE" ] || { echo 'certbot gate missing' >&2; exit 2; }

# This test is intended to run inside AlmaLinux 9.x with the distro nginx package.
grep -q '^ID="\?almalinux"\?' /etc/os-release || { echo 'Not running on AlmaLinux' >&2; exit 3; }
nginx -V 2>&1 | grep -q 'nginx version' || true
[ -f /etc/nginx/nginx.conf ] || { echo '/etc/nginx/nginx.conf missing' >&2; exit 4; }
grep -Eq 'include[[:space:]]+/etc/nginx/conf\.d/\*\.conf;' /etc/nginx/nginx.conf || {
  echo 'Alma nginx.conf does not include /etc/nginx/conf.d/*.conf' >&2; exit 5;
}

ADMIN_DOMAIN=admin.water.bb610.com.ua
API_DOMAIN=api.water.bb610.com.ua
CONF=/etc/nginx/conf.d/bb610-water-admin.conf
MARKET_CONF=/etc/nginx/conf.d/bb610-market-neighbor.conf
ACME_ROOT=/var/www/bb610-water-admin-acme
TMP="$(mktemp -d)"
trap 'nginx -s stop >/dev/null 2>&1 || true; rm -rf "$TMP"; rm -f "$CONF" "$MARKET_CONF"' EXIT

# Remove distro conf.d samples only; nginx.conf itself stays the AlmaLinux package file.
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

nginx -t
nginx
sleep 0.2
[ "$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)" = 'MARKET-UNCHANGED' ]

export BB610_NGINX_CONF="$CONF"
export BB610_NGINX_BIN=nginx
export BB610_SYSTEMCTL_BIN="$TMP/systemctl"
export BB610_NGINX_TX_ROOT="$TMP"
. "$HELPER"
bb610_nginx_tx_begin
bb610_nginx_tx_apply "$TMP/acme.conf"

# Candidate must really be active through AlmaLinux's conf.d/*.conf include.
PROBE=alma-candidate-active
printf '%s\n' "$PROBE" > "$ACME_ROOT/.well-known/acme-challenge/$PROBE"
[ "$(curl -fsS --resolve "$ADMIN_DOMAIN:80:127.0.0.1" "http://$ADMIN_DOMAIN/.well-known/acme-challenge/$PROBE")" = "$PROBE" ]
[ "$(curl -fsS --resolve "$API_DOMAIN:80:127.0.0.1" "http://$API_DOMAIN/.well-known/acme-challenge/$PROBE")" = "$PROBE" ]
rm -f "$ACME_ROOT/.well-known/acme-challenge/$PROBE"
[ "$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)" = 'MARKET-UNCHANGED' ]

# The production certbot gate must verify LOCAL + PUBLIC token/200 before it
# delegates to the real certbot binary. /etc/hosts makes the public-name path
# deterministic inside this isolated AlmaLinux reproduction.
export BB610_REAL_CERTBOT="$TMP/real-certbot"
export BB610_ADMIN_DOMAIN="$ADMIN_DOMAIN"
export BB610_API_DOMAIN="$API_DOMAIN"
export BB610_ALMA_CERTBOT_LOG="$TMP/certbot.log"
bash "$GATE" certonly --webroot -w "$ACME_ROOT" --non-interactive -d "$ADMIN_DOMAIN"
grep -Fxq REAL_CERTBOT_CALLED "$TMP/certbot.log"

bb610_nginx_tx_commit
nginx -t
[ "$(curl -fsS -H 'Host: api.market.bb610.com.ua' http://127.0.0.1/)" = 'MARKET-UNCHANGED' ]

echo "AlmaLinux nginx version: $(nginx -v 2>&1)"
echo 'PASS: AlmaLinux /etc/nginx/conf.d/*.conf candidate activation'
echo 'PASS: LOCAL + PUBLIC ACME token/200 gate before real Certbot'
echo 'PASS: existing api.market.bb610.com.ua neighbor remained unchanged'
