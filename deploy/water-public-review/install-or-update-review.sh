#!/usr/bin/env bash
set -Eeuo pipefail

HOST='review.water.bb610.com.ua'
EXPECTED_IP='173.242.53.156'
TARGET='/opt/bb610-water-review'
ACME='/var/lib/bb610-water-review/acme'
NGINX_CONF='/etc/nginx/conf.d/bb610-water-review.conf'
MANAGED='# BB610_WATER_PUBLIC_REVIEW_MANAGED'
PACKAGE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ARCHIVE="$PACKAGE_DIR/site-root.tar.gz"
SOURCE_SHA_FILE="$PACKAGE_DIR/SOURCE_COMMIT"

need(){ command -v "$1" >/dev/null 2>&1 || { echo "PREFLIGHT FAILED: Required command is missing: $1"; exit 20; }; }
for c in nginx certbot curl getent tar sha256sum python3; do need "$c"; done
[[ $EUID -eq 0 ]] || { echo 'PREFLIGHT FAILED: run with sudo/root'; exit 20; }
[[ -f "$SITE_ARCHIVE" ]] || { echo "PREFLIGHT FAILED: missing $SITE_ARCHIVE"; exit 20; }
[[ -f "$SOURCE_SHA_FILE" ]] || { echo "PREFLIGHT FAILED: missing $SOURCE_SHA_FILE"; exit 20; }
SOURCE_SHA="$(tr -d '[:space:]' < "$SOURCE_SHA_FILE")"
[[ "$SOURCE_SHA" =~ ^[0-9a-f]{40}$ ]] || { echo 'PREFLIGHT FAILED: invalid SOURCE_COMMIT'; exit 20; }

systemctl is-active --quiet nginx || { echo 'PREFLIGHT FAILED: nginx is not active'; exit 20; }
nginx -t >/dev/null 2>&1 || { echo 'PREFLIGHT FAILED: existing nginx -t is not clean'; exit 20; }

mapfile -t DNS_IPS < <(getent ahostsv4 "$HOST" | awk '{print $1}' | sort -u)
[[ ${#DNS_IPS[@]} -gt 0 ]] || { echo "PREFLIGHT FAILED: DNS does not resolve: $HOST"; exit 20; }
for ip in "${DNS_IPS[@]}"; do [[ "$ip" == "$EXPECTED_IP" ]] || { echo "PREFLIGHT FAILED: $HOST resolves to $ip, expected $EXPECTED_IP"; exit 20; }; done

if [[ -e "$NGINX_CONF" ]] && ! grep -qF "$MANAGED" "$NGINX_CONF"; then
  echo "PREFLIGHT FAILED: unknown existing Nginx object: $NGINX_CONF"; exit 20
fi
if nginx -T 2>/dev/null | grep -E '^[[:space:]]*server_name[[:space:]].*review\.water\.bb610\.com\.ua' | grep -vF "$NGINX_CONF" >/dev/null 2>&1; then
  echo "PREFLIGHT FAILED: server_name conflict for $HOST"; exit 20
fi
for d in "$TARGET" "$ACME"; do
  if [[ -e "$d" && ! -f "$d/.bb610-water-review-managed" ]]; then
    echo "PREFLIGHT FAILED: unmanaged persistent path exists: $d"; exit 20
  fi
done

echo "Review hostname: $HOST"
echo "Expected VPS IPv4: $EXPECTED_IP"
echo "Source commit: $SOURCE_SHA"
echo 'Existing nginx -t: PASS'
echo 'DNS: PASS'
echo 'Isolation preflight: PASS'
echo 'PREFLIGHT PASS'
read -r -p 'Type DEPLOY to continue: ' confirm
[[ "$confirm" == 'DEPLOY' ]] || { echo 'Stopped before changes.'; exit 0; }

mkdir -p "$TARGET/releases" "$ACME/.well-known/acme-challenge"
touch "$TARGET/.bb610-water-review-managed" "$ACME/.bb610-water-review-managed"
RELEASE="$TARGET/releases/$SOURCE_SHA"
NEW="$RELEASE.new.$$"
rm -rf "$NEW"
mkdir -p "$NEW"
tar -xzf "$SITE_ARCHIVE" -C "$NEW"

for f in \
  docs/website/staging/index.html \
  docs/website/staging/styles.css \
  docs/website/staging/app.js \
  docs/website/staging/data/commercial.js \
  assets/extracted/02_ae24f7eff9c5.webp; do
  [[ -f "$NEW/$f" ]] || { echo "DEPLOY FAILED: packaged runtime missing $f"; rm -rf "$NEW"; exit 30; }
done
if grep -RIE 'localhost|127\.0\.0\.1' "$NEW/docs/website/staging" >/dev/null; then
  echo 'DEPLOY FAILED: localhost/dev endpoint found in packaged public runtime'; rm -rf "$NEW"; exit 30
fi
rm -rf "$RELEASE"
mv "$NEW" "$RELEASE"

PREV_CONF=''
PREV_CONF_EXISTS=0
if [[ -f "$NGINX_CONF" ]]; then PREV_CONF="$(mktemp)"; cp -a "$NGINX_CONF" "$PREV_CONF"; PREV_CONF_EXISTS=1; fi
ROLLBACK_NEEDED=1
rollback(){
  local rc=$?
  if [[ $ROLLBACK_NEEDED -eq 1 ]]; then
    echo 'Review deployment failed; restoring previous Nginx state...'
    if [[ $PREV_CONF_EXISTS -eq 1 ]]; then cp -a "$PREV_CONF" "$NGINX_CONF"; else rm -f "$NGINX_CONF"; fi
    if nginx -t >/dev/null 2>&1; then systemctl reload nginx || true; echo 'Rollback nginx -t: PASS'; else echo 'CRITICAL: rollback nginx -t failed'; fi
  fi
  [[ -n "$PREV_CONF" ]] && rm -f "$PREV_CONF"
  exit "$rc"
}
trap rollback ERR INT TERM HUP

write_http(){ cat > "$NGINX_CONF" <<EOF
$MANAGED
server {
  listen 80;
  listen [::]:80;
  server_name $HOST;
  root $RELEASE;

  location ^~ /.well-known/acme-challenge/ {
    alias $ACME/.well-known/acme-challenge/;
    default_type text/plain;
    try_files \$uri =404;
  }
  location = / { return 302 /docs/website/staging/; }
  location ^~ /docs/website/staging/ {
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
    try_files \$uri \$uri/ =404;
  }
  location ~ ^/docs/website/review/.+\.css$ {
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
    try_files \$uri =404;
  }
  location /docs/website/review/ { return 404; }
  location ^~ /assets/extracted/ {
    add_header Cache-Control "no-store, max-age=0" always;
    try_files \$uri =404;
  }
  location / { return 404; }
}
EOF
}

write_https(){ cat > "$NGINX_CONF" <<EOF
$MANAGED
server {
  listen 80;
  listen [::]:80;
  server_name $HOST;
  location ^~ /.well-known/acme-challenge/ {
    alias $ACME/.well-known/acme-challenge/;
    default_type text/plain;
    try_files \$uri =404;
  }
  location / { return 301 https://\$host\$request_uri; }
}
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name $HOST;
  root $RELEASE;
  ssl_certificate /etc/letsencrypt/live/$HOST/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/$HOST/privkey.pem;
  add_header X-Content-Type-Options nosniff always;
  add_header X-Frame-Options SAMEORIGIN always;
  add_header Referrer-Policy strict-origin-when-cross-origin always;

  location = / { return 302 /docs/website/staging/; }
  location ^~ /docs/website/staging/ {
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
    try_files \$uri \$uri/ =404;
  }
  location ~ ^/docs/website/review/.+\.css$ {
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0" always;
    try_files \$uri =404;
  }
  location /docs/website/review/ { return 404; }
  location ^~ /assets/extracted/ {
    add_header Cache-Control "no-store, max-age=0" always;
    try_files \$uri =404;
  }
  location / { return 404; }
}
EOF
}

write_http
nginx -t
systemctl reload nginx

TOKEN="bb610-r22-$(date +%s)-$$"
printf '%s' "$TOKEN" > "$ACME/.well-known/acme-challenge/$TOKEN"
probe(){ local url="$1" expected="$2"; for _ in $(seq 1 20); do local body; body="$(curl -fsS --max-time 5 "$url" 2>/dev/null || true)"; [[ "$body" == "$expected" ]] && return 0; sleep 1; done; return 1; }
probe "http://127.0.0.1/.well-known/acme-challenge/$TOKEN" "$TOKEN" || { echo 'LOCAL ACME probe FAILED'; false; }
probe "http://$HOST/.well-known/acme-challenge/$TOKEN" "$TOKEN" || { echo 'PUBLIC ACME probe FAILED'; false; }
echo 'ACME readiness probes: PASS'

if [[ ! -s "/etc/letsencrypt/live/$HOST/fullchain.pem" || ! -s "/etc/letsencrypt/live/$HOST/privkey.pem" ]]; then
  certbot certonly --webroot -w "$ACME" -d "$HOST" --non-interactive --agree-tos --register-unsafely-without-email
fi

write_https
nginx -t
systemctl reload nginx

for path in '/' '/docs/website/staging/' '/docs/website/staging/styles.css' '/docs/website/staging/app.js'; do
  curl -fsS --max-time 10 "https://$HOST$path" >/dev/null || { echo "HTTPS verification failed: $path"; false; }
done
ctype_css="$(curl -fsSI "https://$HOST/docs/website/staging/styles.css" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type"{print tolower($2)}' | tail -1)"
ctype_js="$(curl -fsSI "https://$HOST/docs/website/staging/app.js" | tr -d '\r' | awk -F': ' 'tolower($1)=="content-type"{print tolower($2)}' | tail -1)"
[[ "$ctype_css" == text/css* ]] || { echo "HTTPS verification failed: CSS MIME=$ctype_css"; false; }
[[ "$ctype_js" == *javascript* ]] || { echo "HTTPS verification failed: JS MIME=$ctype_js"; false; }

ROLLBACK_NEEDED=0
trap - ERR INT TERM HUP
[[ -n "$PREV_CONF" ]] && rm -f "$PREV_CONF"
rm -f "$ACME/.well-known/acme-challenge/$TOKEN"
find "$TARGET/releases" -mindepth 1 -maxdepth 1 -type d ! -path "$RELEASE" -mtime +7 -exec rm -rf {} + 2>/dev/null || true

echo 'R22 EXTERNAL REVIEW DEPLOYMENT SUCCESS'
echo "Review URL: https://$HOST/"
echo "Source commit: $SOURCE_SHA"
echo 'Production WATER/Admin/API/PostgreSQL/Docker/Market content: unchanged'
