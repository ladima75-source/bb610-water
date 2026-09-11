#!/bin/sh
set -eu

ENV_FILE="${BB610_ADMIN_ENV_FILE:-/etc/bb610-water-admin/admin.env}"
COMPOSE_FILE="${BB610_ADMIN_COMPOSE_FILE:-/opt/bb610-water-admin/app/deploy/water-admin/docker-compose.production.yml}"
EMAIL="${1:?Usage: rotate-admin-password.sh <named-admin-email>}"
[ -f "$ENV_FILE" ] || { echo "Missing env file: $ENV_FILE" >&2; exit 2; }

printf 'New password for %s: ' "$EMAIL" >&2
stty -echo
IFS= read -r PASS1
stty echo
printf '\nRepeat password: ' >&2
stty -echo
IFS= read -r PASS2
stty echo
printf '\n' >&2
[ "$PASS1" = "$PASS2" ] || { echo "Passwords do not match" >&2; exit 2; }
[ "${#PASS1}" -ge 16 ] || { echo "Password must be at least 16 characters" >&2; exit 2; }

set -a
. "$ENV_FILE"
set +a

TARGET_EMAIL="$EMAIL" NEW_PASSWORD="$PASS1" docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" exec -T \
  -e TARGET_EMAIL -e NEW_PASSWORD api python -c '
import os
from sqlalchemy import select
from app import SessionLocal, User, password_hash
email=os.environ["TARGET_EMAIL"]
password=os.environ["NEW_PASSWORD"]
with SessionLocal() as db:
    user=db.scalar(select(User).where(User.email==email))
    if not user:
        raise SystemExit("Named admin user not found")
    user.password_hash=password_hash.hash(password)
    db.commit()
print("Password rotated for named user")
'

unset PASS1 PASS2 NEW_PASSWORD
