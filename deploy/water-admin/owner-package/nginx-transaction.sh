#!/usr/bin/env bash
# BB610 WATER Admin — transactional Nginx helper.
# Does not redesign Nginx. It guarantees candidate activation/rollback semantics
# even when bb610_nginx_tx_apply is called directly without an outer ERR trap.

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

# Restore the on-disk WATER slot to the exact transaction-start state without
# touching the running Nginx process. Used inside apply before returning an error.
bb610_nginx_tx_restore_disk() {
  [ "${BB610_NGINX_TX_ACTIVE:-0}" = "1" ] || return 0
  if [ "${BB610_NGINX_TX_HAD_OLD:-0}" = "1" ]; then
    cp -a "$BB610_NGINX_TX_DIR/original.conf" "$BB610_NGINX_CONF"
  else
    rm -f "$BB610_NGINX_CONF"
  fi
  "$BB610_NGINX_BIN" -t >/dev/null 2>&1 || {
    echo "CRITICAL: transaction-start Nginx state cannot be restored on disk" >&2
    return 1
  }
}

bb610_nginx_tx_apply() {
  local candidate="$1"
  local staged="${BB610_NGINX_CONF}.bb610-next.$$"
  local rc=0

  bb610_nginx_static_check "$candidate" || return $?

  # Candidate is staged outside the *.conf include glob. Placing it into the
  # managed slot changes only the on-disk candidate; the running workers still
  # use the previous configuration until the explicit reload below.
  cp "$candidate" "$staged"
  chmod 0644 "$staged"
  mv -f "$staged" "$BB610_NGINX_CONF"

  # Full host-level validation while the running Nginx is still unchanged.
  if ! "$BB610_NGINX_BIN" -t >/dev/null 2>&1; then
    echo "Candidate failed nginx -t before activation; restoring transaction-start disk state" >&2
    bb610_nginx_tx_restore_disk || return 97
    return 47
  fi

  if ! "$BB610_SYSTEMCTL_BIN" reload nginx; then
    echo "Nginx reload failed; restoring transaction-start state" >&2
    rc=48
    bb610_nginx_tx_restore || return 98
    return "$rc"
  fi

  # Confirm disk syntax again after reload. Any inconsistency is rolled back by
  # this helper itself; correctness does not depend on a caller-side ERR trap.
  if ! "$BB610_NGINX_BIN" -t >/dev/null 2>&1; then
    echo "Nginx became invalid after activation; restoring transaction-start state" >&2
    rc=49
    bb610_nginx_tx_restore || return 99
    return "$rc"
  fi
}

bb610_nginx_tx_restore() {
  local rc=0
  [ "${BB610_NGINX_TX_ACTIVE:-0}" = "1" ] || return 0

  if ! bb610_nginx_tx_restore_disk; then
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
