#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SAFE=""
SHIM=""
if [ -f "$SCRIPT_DIR/install-or-update-safe.sh" ]; then
  SAFE="$SCRIPT_DIR/install-or-update-safe.sh"
  SHIM="$SCRIPT_DIR/bin/certbot"
elif [ -f "$SCRIPT_DIR/deploy/water-admin/owner-package/install-or-update-safe.sh" ]; then
  SAFE="$SCRIPT_DIR/deploy/water-admin/owner-package/install-or-update-safe.sh"
  SHIM="$SCRIPT_DIR/deploy/water-admin/owner-package/bin/certbot"
else
  printf 'BB610 WATER Admin safe installer is missing from this OWNER package.\n' >&2
  exit 2
fi

if [ ! -x "$SHIM" ]; then
  printf 'BB610 WATER Admin ACME certbot gate is missing or not executable: %s\n' "$SHIM" >&2
  exit 2
fi

REAL_CERTBOT="$(command -v certbot || true)"
if [ -z "$REAL_CERTBOT" ]; then
  printf 'Required command is missing: certbot\n' >&2
  exit 2
fi

export BB610_REAL_CERTBOT="$REAL_CERTBOT"
export BB610_ADMIN_DOMAIN="admin.water.bb610.com.ua"
export BB610_API_DOMAIN="api.water.bb610.com.ua"
export PATH="$(dirname "$SHIM"):$PATH"

exec bash "$SAFE" "$@"
