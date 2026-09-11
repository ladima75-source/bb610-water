#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
OUT_DIR="${1:-$ROOT/dist-owner-package}"
SHA="$(git -C "$ROOT" rev-parse HEAD)"
PKG="$OUT_DIR/BB610_WATER_ADMIN_OWNER_DEPLOYMENT_PACKAGE"
ZIP="$OUT_DIR/BB610_WATER_ADMIN_OWNER_DEPLOYMENT_PACKAGE.zip"

rm -rf "$PKG" "$ZIP"
mkdir -p "$PKG/services" "$PKG/deploy" "$PKG/docs/website/admin" "$PKG/docs/website"

cp -a "$ROOT/services/water-admin-api" "$PKG/services/"
cp -a "$ROOT/deploy/water-admin" "$PKG/deploy/"
# Admin v2 inherits approved assets from review/v1. Package the complete review
# tree so production installation can preserve all relative asset dependencies.
cp -a "$ROOT/docs/website/admin/review" "$PKG/docs/website/admin/"
cp "$ROOT/docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md" "$PKG/docs/website/"
cp "$ROOT/docs/website/BB610_WATER_ADMIN_OWNER_BOOTSTRAP_POLICY_R1.md" "$PKG/docs/website/"
cp "$ROOT/deploy/water-admin/owner-package/OWNER_README.md" "$PKG/OWNER_README.md"
cp "$ROOT/deploy/water-admin/owner-package/install-or-update.sh" "$PKG/install-or-update.sh"
cp "$ROOT/deploy/water-admin/owner-package/repair-admin-ui.sh" "$PKG/repair-admin-ui.sh"
printf '%s\n' "$SHA" > "$PKG/PACKAGE_COMMIT_SHA"
chmod 0755 "$PKG/install-or-update.sh" "$PKG/repair-admin-ui.sh"
chmod 0755 "$PKG/deploy/water-admin/owner-package/owner-runtime-acceptance.py"
chmod 0755 "$PKG/deploy/water-admin/owner-package/bin/certbot"
chmod 0755 "$PKG/deploy/water-admin/scripts/"*.sh

(
  cd "$OUT_DIR"
  zip -qr "$(basename "$ZIP")" "$(basename "$PKG")"
)

sha256sum "$ZIP" > "$ZIP.sha256"
printf 'Package: %s\nSHA: %s\nChecksum: %s\n' "$ZIP" "$SHA" "$(cut -d' ' -f1 < "$ZIP.sha256")"
