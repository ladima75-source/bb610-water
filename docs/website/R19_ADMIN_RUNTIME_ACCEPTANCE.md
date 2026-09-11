# BB610 WATER — R19 / ADMIN RUNTIME ACCEPTANCE

- **Status:** PASS / RUNTIME ACCEPTED
- **Date:** 2026-09-11
- **Base:** R18 implementation
- **Task:** `TASK_19_ADMIN_RUNTIME_ACCEPTANCE_AND_DEPLOYMENT_PLAN.md`
- **Production WATER:** NOT CHANGED

## 1. Result

TASK 19 was executed as a real runtime acceptance, not as another review of TASK 18 code.

The accepted R18 stack was started in a reproducible non-production runtime with:

- PostgreSQL 16 service container;
- Alembic migration;
- live FastAPI/uvicorn service;
- live Admin v2 static UI;
- canonical staging static UI;
- real HTTP auth/API requests;
- real `pg_dump` and `pg_restore` into a separate PostgreSQL database.

Accepted run:

- GitHub Actions workflow: `R19 Admin Runtime Acceptance`;
- run number: `2`;
- run ID: `34607529304`;
- commit: `5ad6f9fe94d6a86d8a9211eb09d5f873724de8ab`;
- job ID: `103289545549`;
- job conclusion: `success`;
- all workflow steps: `success`.

## 2. Runtime authentication / authorization

Verified at runtime:

- unauthenticated Admin access denied;
- valid admin login;
- invalid credentials denied;
- durable login throttle: first five attempts `401`, sixth attempt `429`;
- expired JWT rejected;
- `viewer` read permission;
- `viewer` draft write rejected;
- `editor` publish rejected;
- `admin` draft/publish/rollback permissions;
- logout revokes the active token;
- Admin v2 browser-like runtime successfully authenticated and loaded the server version state.

Result: **PASS**.

## 3. Commercial seed before mutation

Initial runtime state:

- draft v1;
- published v1;
- 21 model×zone rows;
- 15 APPROVED;
- 6 PRICE_ON_REQUEST;
- all F1-P/F2-P values remain null/null;
- checksum:
  `aed501904237d25e0b430fd01b4905c2bbc79805076c41e4abaf317ec5f6ae07`.

Result: **PASS**.

## 4. Draft / public separation

Harmless review mutation used for acceptance:

`I / Z4(8) → active true → false`.

No price was changed.

Sequence:

1. save draft v2;
2. public endpoint remains published v1;
3. second stale session attempts save with `baseVersion=1`;
4. API returns conflict;
5. publish diff reports the exact active-state change.

Result:

- draft does not leak into public: PASS;
- optimistic locking: PASS;
- publish diff: PASS.

## 5. Publish / staging integration

The test draft was explicitly published and became new published v3.

Runtime verified:

- public endpoint exposes the published inactive row;
- canonical staging consumes the published API state;
- `I / Z4(8)` becomes intentionally disabled;
- no dead selection path or fabricated price is created.

Result: **PASS**.

## 6. Immutable audit / versions

Runtime verified:

- availability change audit;
- authenticated actor;
- actor role;
- server timestamp;
- resulting version;
- publish audit;
- version list marks the published version.

Result: **PASS**.

## 7. Rollback and mandatory commercial restoration

Admin rollback targeted the accepted v1 snapshot.

The service did not move history backwards. It created and published a new v4 snapshot copied from v1.

After rollback:

- draft v4;
- published v4;
- 21 rows;
- 15 APPROVED;
- 6 PRICE_ON_REQUEST;
- F1-P/F2-P still null/null;
- final checksum:
  `aed501904237d25e0b430fd01b4905c2bbc79805076c41e4abaf317ec5f6ae07`.

The final checksum equals the initial accepted checksum exactly.

**Required post-test restoration: PASS.**

## 8. Staging after rollback / API failure

Runtime UI verified after rollback:

- accepted configurations restored;
- F1-P resolves to `Ціна уточнюється`;
- no zero/fabricated price.

Then the API was deliberately stopped.

Canonical staging remained usable through the already implemented continuity chain and still showed safe commercial data. Runtime output:

`R19 UI staging-fallback PASS`.

The API was restarted and health returned draft v4 / published v4.

Result: **PASS**.

## 9. PostgreSQL backup / restore drill

A real `pg_dump -Fc` was created after the acceptance mutation/rollback cycle.

Accepted run dump SHA-256:

`c96f0f0bd189299ba3b0a814f311d2032faffca8663f3ca7a011760afa9f0812`

It was restored into separate database `bb610_restore`.

Restored database verified:

- `admin_users`: 3;
- `catalog_versions`: 4;
- `catalog_publications`: 3;
- `catalog_audit_events`: 10;
- `auth_login_throttle`: 1;
- `revoked_tokens`: 1;
- latest version: 4;
- published version: 4;
- APPROVED: 15;
- PRICE_ON_REQUEST: 6.

Result: **PASS**.

## 10. Security review finding during acceptance

The first successful test run revealed a CI logging-hygiene issue: generated ephemeral review JWT/bootstrap values could appear in runner environment output.

This was corrected before final acceptance by adding GitHub Actions masking for both generated runtime secrets.

Accepted run #2 confirms these values render only as `***` in logs.

No real production secret was involved or committed.

Result: **FIXED / PASS**.

## 11. Reproducible acceptance harness

Created:

- `.github/workflows/r19-runtime-acceptance.yml`;
- `services/water-admin-api/tests/r19_runtime_acceptance.py`;
- `services/water-admin-api/tests/r19_ui_smoke.mjs`.

This remains a repeatable regression gate for future Admin persistence changes.

## 12. Evidence

Detailed evidence:

`docs/website/BB610_WATER_ADMIN_RUNTIME_TEST_EVIDENCE_R1.md`

Accepted Actions run:

`https://github.com/ladima75-source/bb610-water/actions/runs/34607529304`

The run also uploaded the transient `r19-runtime-evidence` artifact.

## 13. Production deployment plan

Prepared separately:

`docs/website/BB610_WATER_ADMIN_PRODUCTION_DEPLOYMENT_PLAN_R1.md`

R19 proves that the persistence/auth/publication implementation works in non-production. Production deployment still requires owner approval and environment-specific provisioning/secrets/TLS/users.

Public WATER commercial-data cutover remains a separate explicit owner gate.

## 14. Completion register

`docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md` is updated so runtime acceptance and backup/restore drill are no longer open implementation blockers.

Remaining Admin work is production deployment and separately approved public cutover.

PULS screenshot blockers and the six unapproved F1-P/F2-P price rows remain unchanged.

## 15. Production confirmation

TASK 19 did not modify:

- root production WATER page;
- production CSS/JS;
- CNAME;
- production DNS;
- live `water.bb610.com.ua` deployment.

The runtime was disposable non-production infrastructure only.

# Status

**R19 = PASS / RUNTIME ACCEPTED**
