#!/usr/bin/env bash
set -Eeuo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT="${1:-$ROOT/dist/r22-public-review}"
rm -rf "$OUT"
mkdir -p "$OUT"
cp "$ROOT/deploy/water-public-review/install-or-update-review.sh" "$OUT/"
cp "$ROOT/deploy/water-public-review/README.md" "$OUT/"
printf '%s\n' "$(git -C "$ROOT" rev-parse HEAD)" > "$OUT/SOURCE_COMMIT"

tar -C "$ROOT" -czf "$OUT/site-root.tar.gz" \
  docs/website/staging \
  docs/website/review \
  assets/extracted

chmod +x "$OUT/install-or-update-review.sh"
(
  cd "$OUT"
  sha256sum SOURCE_COMMIT site-root.tar.gz install-or-update-review.sh README.md > SHA256SUMS
)
echo "Built: $OUT"
