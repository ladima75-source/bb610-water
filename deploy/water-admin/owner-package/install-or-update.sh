#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -f "$SCRIPT_DIR/install-or-update-safe.sh" ]; then
  exec bash "$SCRIPT_DIR/install-or-update-safe.sh" "$@"
fi

if [ -f "$SCRIPT_DIR/deploy/water-admin/owner-package/install-or-update-safe.sh" ]; then
  exec bash "$SCRIPT_DIR/deploy/water-admin/owner-package/install-or-update-safe.sh" "$@"
fi

printf 'BB610 WATER Admin safe installer is missing from this OWNER package.\n' >&2
exit 2
