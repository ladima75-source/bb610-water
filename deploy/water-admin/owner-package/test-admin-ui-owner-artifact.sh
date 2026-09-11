#!/usr/bin/env bash
set -Eeuo pipefail

PKG_ROOT="${1:?usage: test-admin-ui-owner-artifact.sh <extracted-owner-package-root>}"
INSTALLER="$PKG_ROOT/deploy/water-admin/scripts/install-admin-ui.sh"
SRC_V2="$PKG_ROOT/docs/website/admin/review/v2"
PROD_API="https://api.water.bb610.com.ua"
PROD_ADMIN="https://admin.water.bb610.com.ua"
TMP="$(mktemp -d)"
RUNTIME="${BB610_ADMIN_UI_RUNTIME:-/opt/bb610-water-admin/admin-ui}"
STATIC_PORT="${BB610_ADMIN_UI_TEST_PORT:-18081}"
STATIC_PID=""
HTTPS_PID=""

cleanup(){
  [ -z "$STATIC_PID" ] || kill "$STATIC_PID" >/dev/null 2>&1 || true
  [ -z "$HTTPS_PID" ] || kill "$HTTPS_PID" >/dev/null 2>&1 || true
  rm -rf "$TMP"
  if [ "$RUNTIME" = "/opt/bb610-water-admin/admin-ui" ]; then rm -rf /opt/bb610-water-admin; fi
}
trap cleanup EXIT INT TERM HUP

[ "$(id -u)" -eq 0 ] || { echo 'Artifact production-runtime smoke must run as root in CI.' >&2; exit 2; }
[ -x "$INSTALLER" ] || { echo "Packaged Admin UI installer missing: $INSTALLER" >&2; exit 2; }
[ -f "$PKG_ROOT/docs/website/admin/review/v1/styles.css" ] || { echo 'OWNER artifact missing approved Admin v1 styles.css dependency' >&2; exit 3; }
[ -f "$SRC_V2/styles.css" ] || { echo 'OWNER artifact missing Admin v2 styles.css' >&2; exit 4; }

grep -Fq "@import url('../v1/styles.css');" "$SRC_V2/styles.css" || {
  echo 'Admin v2 styles dependency contract changed unexpectedly' >&2
  exit 5
}

# Production installer must reject review/dev endpoints.
if "$INSTALLER" "$SRC_V2" "$TMP/forbidden-localhost" "http://localhost:8080" >/dev/null 2>&1; then
  echo 'Production installer accepted forbidden localhost API base' >&2; exit 6
fi
if "$INSTALLER" "$SRC_V2" "$TMP/forbidden-loopback" "https://127.0.0.1:8080" >/dev/null 2>&1; then
  echo 'Production installer accepted forbidden loopback API base' >&2; exit 6
fi

rm -rf "$RUNTIME"
mkdir -p "$(dirname "$RUNTIME")"
"$INSTALLER" "$SRC_V2" "$RUNTIME" "$PROD_API"

for f in index.html app.js config.js styles.css v1/styles.css; do [ -f "$RUNTIME/$f" ] || { echo "Runtime asset missing: $RUNTIME/$f" >&2; exit 7; }; done

EXPECTED="window.BB610_ADMIN_CONFIG={apiBase:'https://api.water.bb610.com.ua'};"
grep -Fxq "$EXPECTED" "$RUNTIME/config.js" || { echo 'Installed production config.js is not exact production API base' >&2; cat "$RUNTIME/config.js" >&2; exit 8; }
if grep -Eqi 'localhost|127\.0\.0\.1|apiBase:[[:space:]]*["'"']http://' "$RUNTIME/config.js" "$RUNTIME/app.js"; then
  echo 'Installed production root runtime contains forbidden local/plain-HTTP API endpoint' >&2; exit 9
fi
grep -Fq "apiBase:'https://api.water.bb610.com.ua'" "$RUNTIME/app.js" || { echo 'Installed production app.js does not contain production HTTPS fallback' >&2; exit 10; }
echo "PASS: installed $RUNTIME/config.js uses exact production API base"
echo 'PASS: installed root runtime contains no localhost/127.0.0.1/plain-http API endpoint'

# Static server mirrors production SPA fallback for recursive MIME/asset validation.
cat > "$TMP/static_server.py" <<'PY'
import http.server, mimetypes, pathlib, socketserver, sys
root = pathlib.Path(sys.argv[1]).resolve(); port = int(sys.argv[2]); index = root/'index.html'
class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        raw=self.path.split('?',1)[0].split('#',1)[0]; rel=raw.lstrip('/') or 'index.html'; target=(root/rel).resolve()
        if not str(target).startswith(str(root)): self.send_error(403); return
        if target.is_dir(): target=target/'index.html'
        if not target.is_file(): target=index
        body=target.read_bytes(); ctype=mimetypes.guess_type(str(target))[0] or 'application/octet-stream'
        self.send_response(200); self.send_header('Content-Type',ctype); self.send_header('Content-Length',str(len(body))); self.end_headers(); self.wfile.write(body)
    def log_message(self,*args): pass
class Reuse(socketserver.TCPServer): allow_reuse_address=True
with Reuse(('127.0.0.1',port),H) as s: s.serve_forever()
PY
python3 "$TMP/static_server.py" "$RUNTIME" "$STATIC_PORT" & STATIC_PID=$!
for _ in $(seq 1 50); do curl -fsS "http://127.0.0.1:$STATIC_PORT/" >/dev/null 2>&1 && break; sleep 0.1; done

python3 - "$STATIC_PORT" <<'PY'
import hashlib, html.parser, re, sys
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
port=int(sys.argv[1]); base=f'http://127.0.0.1:{port}/'
class P(html.parser.HTMLParser):
    def __init__(self): super().__init__(); self.refs=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='link' and d.get('rel')=='stylesheet' and d.get('href'): self.refs.append(d['href'])
        if tag=='script' and d.get('src'): self.refs.append(d['src'])
def fetch(url):
    r=urlopen(Request(url,headers={'User-Agent':'BB610-owner-artifact-test'}),timeout=5); return r.status,r.headers.get_content_type() or '',r.read()
def local(ref):
    if not ref or ref.startswith(('data:','mailto:','tel:','#','javascript:')): return False
    p=urlparse(ref); return not p.scheme and not p.netloc
status,ctype,index=fetch(base); assert status==200 and ctype=='text/html'
ih=hashlib.sha256(index).digest(); p=P(); p.feed(index.decode()); q=[urljoin(base,r) for r in p.refs if local(r)]; seen=set(); found=set(); required={'/styles.css','/app.js','/config.js','/v1/styles.css'}
while q:
    u=q.pop(0)
    if u in seen: continue
    seen.add(u); status,ctype,body=fetch(u); path=urlparse(u).path; found.add(path)
    assert status==200; assert hashlib.sha256(body).digest()!=ih, f'{path} is SPA fallback index.html'
    if path.endswith('.css'):
        assert ctype=='text/css', f'{path} MIME={ctype}'; text=body.decode()
        refs=re.findall(r'@import\s+(?:url\()?\s*["\']?([^"\')\s;]+)',text)+re.findall(r'url\(\s*["\']?([^"\')]+)',text)
        for ref in refs:
            if local(ref): q.append(urljoin(u,ref))
    elif path.endswith('.js'):
        assert ctype in ('text/javascript','application/javascript'), f'{path} MIME={ctype}'
assert not (required-found), f'missing runtime asset coverage: {sorted(required-found)}'
print('PASS: OWNER artifact recursive HTTP asset graph')
print('PASS: CSS/JS MIME types are correct')
print('PASS: no required asset is SPA fallback index.html')
print('PASS: /v1/styles.css is physically deployed and served as text/css')
PY

# HTTPS browser smoke: one local TLS origin handles both production hostnames.
# The browser resolves both names to 127.0.0.1, so the real production config.js
# performs a genuine cross-origin login request to https://api.water.bb610.com.ua.
cat > "$TMP/openssl.cnf" <<'EOF'
[req]
distinguished_name=dn
x509_extensions=v3
prompt=no
[dn]
CN=admin.water.bb610.com.ua
[v3]
subjectAltName=@alt
[alt]
DNS.1=admin.water.bb610.com.ua
DNS.2=api.water.bb610.com.ua
EOF
openssl req -x509 -nodes -newkey rsa:2048 -days 1 -config "$TMP/openssl.cnf" -keyout "$TMP/key.pem" -out "$TMP/cert.pem" >/dev/null 2>&1

# Test-only copy: append an automation script to submit the actual Admin login form.
cp "$RUNTIME/index.html" "$TMP/index.browser.html"
python3 - "$TMP/index.browser.html" <<'PY'
from pathlib import Path
import sys
p=Path(sys.argv[1]); s=p.read_text(); marker='</body>'
script="""<script>setTimeout(()=>{document.querySelector('#login-email').value='owner@example.invalid';document.querySelector('#login-password').value='test-password';document.querySelector('#login').click();},200);</script>"""
assert marker in s; p.write_text(s.replace(marker,script+marker,1))
PY

cat > "$TMP/https_server.py" <<'PY'
import http.server, json, mimetypes, pathlib, ssl, sys, urllib.parse
runtime=pathlib.Path(sys.argv[1]).resolve(); browser_index=pathlib.Path(sys.argv[2]); cert,key,log=sys.argv[3:6]
ADMIN='https://admin.water.bb610.com.ua'; APIHOST='api.water.bb610.com.ua'; ADMINHOST='admin.water.bb610.com.ua'
def cors(h):
    origin=h.headers.get('Origin','')
    if origin==ADMIN:
        h.send_header('Access-Control-Allow-Origin',ADMIN); h.send_header('Vary','Origin')
class H(http.server.BaseHTTPRequestHandler):
    def host(self): return self.headers.get('Host','').split(':',1)[0]
    def json(self,status,obj):
        data=json.dumps(obj).encode(); self.send_response(status); self.send_header('Content-Type','application/json'); cors(self); self.send_header('Content-Length',str(len(data))); self.end_headers(); self.wfile.write(data)
    def do_OPTIONS(self):
        if self.host()!=APIHOST: self.send_error(404); return
        self.send_response(204); cors(self); self.send_header('Access-Control-Allow-Methods','GET, POST, OPTIONS'); self.send_header('Access-Control-Allow-Headers','Authorization, Content-Type'); self.end_headers()
    def do_POST(self):
        if self.host()!=APIHOST or urllib.parse.urlsplit(self.path).path!='/auth/token': self.send_error(404); return
        origin=self.headers.get('Origin',''); open(log,'a').write(f'LOGIN host={self.host()} origin={origin}\n')
        if origin!=ADMIN: self.json(403,{'detail':'bad origin'}); return
        n=int(self.headers.get('Content-Length','0')); self.rfile.read(n)
        self.json(200,{'access_token':'test-token','token_type':'bearer','role':'admin','actor':'owner@example.invalid'})
    def do_GET(self):
        host=self.host(); path=urllib.parse.urlsplit(self.path).path
        if host==APIHOST:
            if path=='/admin/catalog':
                cat={'models':[{'id':'I','name':'I','description':'I','active':True,'sort':1,'capabilities':{'fertigationChannels':0,'phManagement':False,'ecMonitoring':False},'internalNote':''}], 'zones':[{'id':'Z4(8)','description':'Z','installed':4,'max':8,'active':True,'sort':1}], 'rows':[{'modelId':'I','zoneId':'Z4(8)','active':True,'priceState':'APPROVED','prices':{'base':209000,'hmi':234000},'updatedAt':'2026-09-11T00:00:00Z'}]}
                self.json(200,{'version':1,'publishedVersion':1,'catalog':cat}); return
            if path=='/admin/audit': self.json(200,[]); return
            if path=='/admin/versions': self.json(200,[{'version':1,'createdAt':'2026-09-11T00:00:00Z','createdBy':'owner@example.invalid','published':True,'note':'test'}]); return
            self.send_error(404); return
        if host!=ADMINHOST: self.send_error(404); return
        rel=path.lstrip('/') or 'index.html'; target=runtime/rel
        if path=='/': target=browser_index
        if not target.is_file(): target=runtime/'index.html'
        body=target.read_bytes(); ctype=mimetypes.guess_type(str(target))[0] or 'application/octet-stream'
        self.send_response(200); self.send_header('Content-Type',ctype); self.send_header('Cache-Control','no-store'); self.send_header('Content-Length',str(len(body))); self.end_headers(); self.wfile.write(body)
    def log_message(self,*args): pass
srv=http.server.ThreadingHTTPServer(('0.0.0.0',443),H); ctx=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER); ctx.load_cert_chain(cert,key); srv.socket=ctx.wrap_socket(srv.socket,server_side=True); srv.serve_forever()
PY

ss -lnt | grep -qE '[:.]443[[:space:]]' && { echo 'CI port 443 unexpectedly occupied' >&2; exit 11; } || true
python3 "$TMP/https_server.py" "$RUNTIME" "$TMP/index.browser.html" "$TMP/cert.pem" "$TMP/key.pem" "$TMP/api.log" & HTTPS_PID=$!
for _ in $(seq 1 50); do curl -kfsS --resolve admin.water.bb610.com.ua:443:127.0.0.1 "$PROD_ADMIN/" >/dev/null 2>&1 && break; sleep 0.1; done

BROWSER="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
[ -n "$BROWSER" ] || { echo 'Headless browser unavailable for Admin UI login smoke' >&2; exit 12; }
"$BROWSER" --headless --no-sandbox --disable-gpu --ignore-certificate-errors \
  --host-resolver-rules='MAP admin.water.bb610.com.ua 127.0.0.1, MAP api.water.bb610.com.ua 127.0.0.1' \
  --virtual-time-budget=5000 --dump-dom "$PROD_ADMIN/" > "$TMP/dom.html" 2> "$TMP/browser.log"

grep -Fq 'AUTHENTICATED' "$TMP/dom.html" || { echo 'Browser login did not reach authenticated Admin state' >&2; cat "$TMP/browser.log" >&2; exit 13; }
grep -Fq 'LOGIN host=api.water.bb610.com.ua origin=https://admin.water.bb610.com.ua' "$TMP/api.log" || { echo 'Mock API did not receive production-origin login request' >&2; cat "$TMP/api.log" >&2; exit 14; }
! grep -Eqi 'Failed to fetch|Mixed Content|CORS policy' "$TMP/browser.log" || { echo 'Browser reported fetch/CORS/mixed-content failure' >&2; cat "$TMP/browser.log" >&2; exit 15; }

echo 'PASS: headless browser performed Admin-origin login request to production HTTPS API host'
echo 'PASS: login completed without Failed to fetch / CORS / mixed-content error'
