# BB610 WATER — ADMIN RUNTIME TEST EVIDENCE R1

- **Stage:** R19
- **Date:** 2026-09-11
- **Result:** PASS
- **Accepted runtime run:** GitHub Actions `R19 Admin Runtime Acceptance` run #2
- **Run ID:** `34607529304`
- **Run commit:** `5ad6f9fe94d6a86d8a9211eb09d5f873724de8ab`
- **Job ID:** `103289545549`
- **Runtime:** GitHub-hosted Ubuntu 24.04 + PostgreSQL 16 + Python 3.12 + live FastAPI/uvicorn + Admin v2/static staging
- **Production WATER:** NOT CHANGED

## 1. Why this is runtime evidence

R19 was not accepted from code review alone. The acceptance workflow actually:

1. started a PostgreSQL 16 service container;
2. ran Alembic against PostgreSQL (`PostgresqlImpl`, transactional DDL);
3. started the WATER Admin FastAPI service;
4. started a static HTTP server for Admin v2 and canonical staging;
5. executed real HTTP authentication/authorization and catalog mutation scenarios;
6. executed Admin v2 and public staging JavaScript against the live API through jsdom;
7. created a real `pg_dump` backup;
8. restored it into a second disposable PostgreSQL database and queried the restored data;
9. stopped the API and tested staging fallback;
10. restarted the API and verified the final catalog state.

Every workflow step completed with `success`.

## 2. Initial invariant

Initial server state after migration/bootstrap:

- draft version: `1`;
- published version: `1`;
- commercial rows: `21`;
- `APPROVED`: `15`;
- `PRICE_ON_REQUEST`: `6`;
- all F1-P / F2-P rows: `base=null`, `hmi=null`;
- catalog checksum:
  `aed501904237d25e0b430fd01b4905c2bbc79805076c41e4abaf317ec5f6ae07`.

No F1-PH / F2-PH legacy naming was accepted by the invariant check.

## 3. Authentication / authorization runtime results

| Check | Result |
|---|---|
| unauthenticated `/admin/catalog` denied | PASS |
| valid admin login | PASS |
| invalid credentials rejected | PASS |
| login throttle | PASS — `401, 401, 401, 401, 401, 429` |
| expired token rejected | PASS |
| viewer can read | PASS |
| viewer cannot save draft | PASS |
| editor cannot publish | PASS |
| logout revokes token | PASS |
| Admin v2 real login against live API | PASS |

Runtime-generated JWT/bootstrap secrets were masked in accepted run #2. They are not stored in repository evidence.

## 4. Draft / publish / concurrency scenario

Harmless test mutation:

`I / Z4(8) → active: true → false`

No price was changed.

Runtime sequence:

1. v1 = accepted published catalog;
2. save test draft → v2;
3. verify `/public/commercial` remains v1;
4. submit stale save from second session with `baseVersion=1` → HTTP `409`;
5. request publish diff;
6. diff contains `I / Z4(8) / active / true → false`;
7. publish reviewed draft → published v3;
8. verify public contract exposes `I / Z4(8)` as inactive;
9. verify canonical staging disables the hidden configuration intentionally;
10. rollback to immutable v1 snapshot → new **published v4**.

Results:

- draft does not alter public state: PASS;
- publish diff: PASS;
- optimistic concurrency conflict: PASS;
- explicit publish: PASS;
- hidden configuration handling: PASS;
- rollback creates a new version instead of rewriting history: PASS.

## 5. Audit / history evidence

Runtime audit verified:

- `AVAILABILITY_CHANGE` for `I / Z4(8)`;
- authenticated actor identity;
- actor role `admin`;
- server timestamp;
- resulting catalog version;
- `PUBLISH` audit event;
- `ROLLBACK` audit event.

Normal Admin API exposed no update/delete path for audit history.

Result: **PASS**.

## 6. Admin v2 / staging runtime UI evidence

Live static UI + live API checks:

- `R19 UI admin-login PASS Draft v1 · published v1`;
- `R19 UI staging-hidden PASS` after test publication;
- `R19 UI staging-baseline PASS` after rollback;
- `R19 UI staging-fallback PASS` with API deliberately stopped.

Fallback check confirmed:

- configurator remains usable;
- `PRICE_ON_REQUEST` remains `Ціна уточнюється`;
- no `0 тис. грн` or fabricated zero price appears;
- after API restart health reports draft v4 / published v4.

## 7. Backup / restore drill

A real PostgreSQL custom-format dump was created with `pg_dump -Fc`.

Accepted run #2 dump checksum:

`c96f0f0bd189299ba3b0a814f311d2032faffca8663f3ca7a011760afa9f0812`

The dump was restored into a separate disposable database `bb610_restore`.

Restored database checks:

| Table / invariant | Restored result |
|---|---:|
| `admin_users` | 3 |
| `catalog_versions` | 4 |
| `catalog_publications` | 3 |
| `catalog_audit_events` | 10 |
| `auth_login_throttle` | 1 |
| `revoked_tokens` | 1 |
| latest catalog version | 4 |
| published catalog version | 4 |
| APPROVED rows | 15 |
| PRICE_ON_REQUEST rows | 6 |

Result: **PASS**.

## 8. Mandatory final restoration

After all mutation tests the review database was returned through the real rollback mechanism to the accepted commercial snapshot.

Final state:

- latest draft version: `4`;
- published version: `4`;
- 21 rows;
- 15 `APPROVED`;
- 6 `PRICE_ON_REQUEST`;
- F1-P / F2-P remain null/null in all three zone configurations;
- final checksum:
  `aed501904237d25e0b430fd01b4905c2bbc79805076c41e4abaf317ec5f6ae07`.

The final checksum equals the initial accepted checksum exactly.

**Commercial state restoration: PASS.**

## 9. Reproducible test harness

Committed runtime harness:

- `.github/workflows/r19-runtime-acceptance.yml`
- `services/water-admin-api/tests/r19_runtime_acceptance.py`
- `services/water-admin-api/tests/r19_ui_smoke.mjs`

The workflow is reusable for later persistence changes and can also be manually dispatched.

## 10. Evidence location

Accepted run:

`https://github.com/ladima75-source/bb610-water/actions/runs/34607529304`

Runtime evidence artifact was uploaded by the successful run under the name:

`r19-runtime-evidence`

The artifact is transient CI evidence; this document records the durable acceptance facts and checksums.
