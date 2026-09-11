#!/usr/bin/env bash
# BB610 WATER Admin — transactional Nginx helper.
# Does not redesign Nginx. It only guarantees atomic candidate activation/rollback.

bb610_nginx_static_check() {
  local candidate="$1"
  [ -s "$candidate" ] || { echo "Nginx candidate is empty: $candidate" >&2; return 41; }
  head -n 1 "$candidate" | grep -Fxq '# BB610_WATER_ADMIN_MANAGED' || {
    echo "Nginx candidate lacks WATER managed marker" >&2; return 42;
  }
  grep -q 'admin\.water\.bb610\.com\.ua' "$candidate" || { echo "Admin server_name missing" >&2; return 43; }
  grep -q 'api\.water\.bb610\.com\.ua' "$candidate" || { echo "API server_name missing" >&2; return 44; }
  # Guard shared VPS neighbors and the public WATER site from accidental capture.
  ! grep -Eq 'server_name[[:space:]][^;]*(api\.market\.bb610\.com\.ua|market\.bb610\.com\.ua|(^|[[:space:]])water\.bb610\.com\.ua([[:space:];]|$))' "$candidate" || {
    echo "Candidate attempts to own an existing BB610 Market/WATER hostname" >&2; return 45;
  }
}

bb610_nginx_tx_begin() {
  : "${BB610_NGINX_CONF:?BB610_NGINX_CONF required}"
  : "${BB610_NGINX_BIN:=nginx}"
  : "${BB610_SYSTEMCTL_BIN:=systemctl}"
  : "${BB610_NGINX_TX_ROOT:=/tmp}"

  BB610_NGINX_TX_DIR="$(mktemp -d "$BB610_NGINX_TX_ROOT/bb610-water-nginx-tx.XXXXXX")"
  BB610_NGINX_TX_HAD_OLD=0
  if [ -e "$BB610_NGINX_CONF" ]; then
    cp -a "$BB610_NGINX_CONF" "$BB610_NGINX_TX_DIR/original.conf"
    BB610_NGINX_TX_HAD_OLD=1
  fi
  "$BB610_NGINX_BIN" -t >/dev/null 2>&1 || {
    rm -rf "$BB610_NGINX_TX_DIR"
    echo "Existing Nginx configuration is invalid before transaction" >&2
    return 46
  }
  BB610_NGINX_TX_ACTIVE=1
  export BB610_NGINX_TX_DIR BB610_NGINX_TX_HAD_OLD BB610_NGINX_TX_ACTIVE
}

bb610_nginx_tx_apply() {
  local candidate="$1"
  local staged="${BB610_NGINX_CONF}.bb610-next.$$"
  bb610_nginx_static_check "$candidate"

  # Stage outside *.conf matching, then atomically place candidate. This does not
  # activate it in the running Nginx process. Full nginx -t happens before reload.
  cp "$candidate" "$staged"
  chmod 0644 "$staged"
  mv -f "$staged" "$BB610_NGINX_CONF"

  if ! "$BB610_NGINX_BIN" -t >/dev/null 2>&1; then
    echo "Candidate failed nginx -t before activation" >&2
    return 47
  fi
  if ! "$BB610_SYSTEMCTL_BIN" reload nginx; then
    echo "Nginx reload failed" >&2
    return 48
  fi
  # Confirm the on-disk configuration is still valid after activation.
  "$BB610_NGINX_BIN" -t >/dev/null 2>&1 || {
    echo "Nginx became invalid after activation" >&2
    return 49
  }
}

bb610_nginx_tx_restore() {
  local rc=0
  [ "${BB610_NGINX_TX_ACTIVE:-0}" = "1" ] || return 0

  if [ "${BB610_NGINX_TX_HAD_OLD:-0}" = "1" ]; then
    cp -a "$BB610_NGINX_TX_DIR/original.conf" "$BB610_NGINX_CONF" || rc=1
  else
    rm -f "$BB610_NGINX_CONF" || rc=1
  fi

  if ! "$BB610_NGINX_BIN" -t >/dev/null 2>&1; then
    echo "CRITICAL: restored Nginx configuration does not pass nginx -t" >&2
    rc=1
  else
    "$BB610_SYSTEMCTL_BIN" reload nginx || {
      echo "CRITICAL: restored Nginx configuration could not be reloaded" >&2
      rc=1
    }
    "$BB610_NGINX_BIN" -t >/dev/null 2>&1 || rc=1
  fi
  BB610_NGINX_TX_ACTIVE=0
  export BB610_NGINX_TX_ACTIVE
  rm -rf "$BB610_NGINX_TX_DIR" 2>/dev/null || true
  return "$rc"
}

bb610_nginx_tx_commit() {
  [ "${BB610_NGINX_TX_ACTIVE:-0}" = "1" ] || return 50
  "$BB610_NGINX_BIN" -t >/dev/null 2>&1 || return 51
  BB610_NGINX_TX_ACTIVE=0
  export BB610_NGINX_TX_ACTIVE
  rm -rf "$BB610_NGINX_TX_DIR"
}
