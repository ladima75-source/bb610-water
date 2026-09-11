#!/usr/bin/env bash
set -Eeuo pipefail

PKG_ROOT="${1:?usage: test-admin-ui-owner-artifact.sh <extracted-owner-package-root>}"
INSTALLER="$PKG_ROOT/deploy/water-admin/scripts/install-admin-ui.sh"
SRC_V2="$PKG_ROOT/docs/website/admin/review/v2"
TMP="$(mktemp -d)"
RUNTIME="$TMP/admin-ui"
PORT="${BB610_ADMIN_UI_TEST_PORT:-18081}"
SERVER_PID=""

cleanup(){
  if [ -n "$SERVER_PID" ]; then kill "$SERVER_PID" >/dev/null 2>&1 || true; fi
  rm -rf "$TMP"
}
trap cleanup EXIT INT TERM HUP

[ -x "$INSTALLER" ] || { echo "Packaged Admin UI installer missing: $INSTALLER" >&2; exit 2; }
[ -f "$PKG_ROOT/docs/website/admin/review/v1/styles.css" ] || { echo 'OWNER artifact missing approved Admin v1 styles.css dependency' >&2; exit 3; }
[ -f "$SRC_V2/styles.css" ] || { echo 'OWNER artifact missing Admin v2 styles.css' >&2; exit 4; }

grep -Fq "@import url('../v1/styles.css');" "$SRC_V2/styles.css" || {
  echo 'Admin v2 styles dependency contract changed unexpectedly' >&2
  exit 5
}

"$INSTALLER" "$SRC_V2" "$RUNTIME" "https://api.water.bb610.com.ua"

[ -f "$RUNTIME/index.html" ]
[ -f "$RUNTIME/app.js" ]
[ -f "$RUNTIME/config.js" ]
[ -f "$RUNTIME/styles.css" ]
[ -f "$RUNTIME/v1/styles.css" ]

cat > "$TMP/server.py" <<'PY'
import http.server, mimetypes, os, pathlib, socketserver, sys
root = pathlib.Path(sys.argv[1]).resolve()
port = int(sys.argv[2])
index = root / 'index.html'
class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        raw = self.path.split('?',1)[0].split('#',1)[0]
        rel = raw.lstrip('/') or 'index.html'
        target = (root / rel).resolve()
        if not str(target).startswith(str(root)):
            self.send_error(403); return
        if target.is_dir():
            target = target / 'index.html'
        # Mirror production SPA fallback: unknown routes become index.html.
        if not target.is_file():
            target = index
        body = target.read_bytes()
        ctype = mimetypes.guess_type(str(target))[0] or 'application/octet-stream'
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def log_message(self, fmt, *args):
        pass
class Reuse(socketserver.TCPServer):
    allow_reuse_address = True
with Reuse(('127.0.0.1', port), Handler) as httpd:
    httpd.serve_forever()
PY
python3 "$TMP/server.py" "$RUNTIME" "$PORT" &
SERVER_PID=$!

for _ in $(seq 1 50); do
  if curl -fsS "http://127.0.0.1:$PORT/" >/dev/null; then break; fi
  sleep 0.1
done
curl -fsS "http://127.0.0.1:$PORT/" >/dev/null

python3 - "$PORT" <<'PY'
import hashlib, html.parser, re, sys
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

port = int(sys.argv[1])
base = f'http://127.0.0.1:{port}/'

class HTMLRefs(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if tag == 'link' and d.get('rel') == 'stylesheet' and d.get('href'):
            self.refs.append(d['href'])
        if tag == 'script' and d.get('src'):
            self.refs.append(d['src'])

def fetch(url):
    r=urlopen(Request(url, headers={'User-Agent':'BB610-owner-artifact-test'}), timeout=5)
    return r.status, (r.headers.get_content_type() or ''), r.read()

def local_ref(ref):
    if not ref or ref.startswith(('data:','mailto:','tel:','#','javascript:')): return False
    p=urlparse(ref)
    return not p.scheme and not p.netloc

status, ctype, index_body = fetch(base)
assert status == 200 and ctype == 'text/html', (status,ctype)
index_hash=hashlib.sha256(index_body).digest()
parser=HTMLRefs(); parser.feed(index_body.decode('utf-8'))
queue=[urljoin(base,r) for r in parser.refs if local_ref(r)]
seen=set()
required={'/styles.css','/app.js','/config.js','/v1/styles.css'}
found=set()

while queue:
    url=queue.pop(0)
    if url in seen: continue
    seen.add(url)
    status,ctype,body=fetch(url)
    path=urlparse(url).path
    found.add(path)
    assert status == 200, (path,status)
    assert hashlib.sha256(body).digest() != index_hash, f'{path} is SPA fallback index.html'
    if path.endswith('.css'):
        assert ctype == 'text/css', f'{path} MIME={ctype}'
        text=body.decode('utf-8')
        refs=[]
        refs += re.findall(r'@import\s+(?:url\()?\s*["\']?([^"\')\s;]+)', text)
        refs += re.findall(r'url\(\s*["\']?([^"\')]+)', text)
        for ref in refs:
            if local_ref(ref): queue.append(urljoin(url,ref))
    elif path.endswith('.js'):
        assert ctype in ('text/javascript','application/javascript'), f'{path} MIME={ctype}'
        text=body.decode('utf-8')
        for ref in re.findall(r'(?:import\s+(?:[^"\']+\s+from\s+)?|import\()\s*["\']([^"\']+)', text):
            if local_ref(ref): queue.append(urljoin(url,ref))

missing=required-found
assert not missing, f'missing runtime asset coverage: {sorted(missing)}'
print('PASS: OWNER artifact recursive HTTP asset graph')
print('PASS: CSS/JS MIME types are correct')
print('PASS: no required asset is SPA fallback index.html')
print('PASS: /v1/styles.css is physically deployed and served as text/css')
PY

BROWSER="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
[ -n "$BROWSER" ] || { echo 'Headless browser unavailable for Admin UI smoke' >&2; exit 6; }
"$BROWSER" --headless --no-sandbox --disable-gpu --virtual-time-budget=1500 --dump-dom "http://127.0.0.1:$PORT/" > "$TMP/dom.html" 2> "$TMP/browser.log"
grep -Fq 'BB610 WATER' "$TMP/dom.html"
grep -Fq 'id="login-card"' "$TMP/dom.html"
grep -Fq 'id="login-email"' "$TMP/dom.html"

echo 'PASS: headless browser rendered packaged Admin UI login shell'
