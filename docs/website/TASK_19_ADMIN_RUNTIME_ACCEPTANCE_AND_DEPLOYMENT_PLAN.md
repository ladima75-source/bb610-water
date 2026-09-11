# BB610 WATER — TASK 19 / ADMIN RUNTIME ACCEPTANCE + DEPLOYMENT PLAN

- **Status:** ASSIGNED
- **Base:** R18 commit `11f830ffd50e43eaf15dbb77a9d151b33e5a653d`
- **Goal:** move R18 from implementation-complete to runtime-proven in a non-production environment, without changing live WATER production.
- **Production:** DO NOT CHANGE.

## 1. No new feature/design work
Do not redesign Admin v2 and do not add unrelated features. R18 implementation is the subject under test.

## 2. Start real review runtime
Use the supplied PostgreSQL + API stack and Admin v2. Create only private/local review secrets. Never commit credentials.

Run migrations and bootstrap one named review admin account according to the documented secure bootstrap mechanism.

## 3. Runtime acceptance
Actually execute, not merely inspect code:
- `/health`;
- unauthenticated denial;
- successful login;
- failed login/throttling sanity;
- session expiry/revocation/logout;
- role enforcement where practical;
- read published catalog;
- read draft;
- save a harmless TEST draft change;
- verify public catalog unchanged before publish;
- inspect publish diff;
- publish test change;
- verify public endpoint changed;
- inspect audit actor/role/timestamp;
- inspect new published version;
- rollback to original accepted catalog;
- verify rollback created a NEW version;
- verify final public catalog exactly returns to accepted 15 APPROVED + 6 PRICE_ON_REQUEST state.

Do not leave test commercial changes published at the end.

## 4. Concurrency test
Open/use two authenticated sessions or equivalent API clients. Save from one, then attempt stale save/publish from the other. Confirm conflict protection works and no silent overwrite occurs.

## 5. Public staging integration
Run canonical staging against the review API and verify:
- published prices/configurations load;
- PRICE_ON_REQUEST renders `Ціна уточнюється`;
- hidden test configuration behavior is intentional;
- after rollback the staging returns to accepted catalog;
- stop API and verify last-known-good/static seed fallback keeps configurator usable and does not show zero/fabricated prices.

Restore API after the failure test.

## 6. Backup/restore drill
Create a real PostgreSQL backup using provided helper. Record checksum. Restore into a separate disposable review database/container, not over the active review database. Verify schema, users/catalog versions/publication/audit integrity sufficiently to prove recovery works.

Do not expose backup files publicly or commit database dumps.

## 7. Security/config review
Verify at runtime/config level:
- no default/universal password;
- secrets are environment-only;
- bootstrap credentials can be rotated/disabled;
- production HTTPS requirement documented;
- allowed origins can be restricted;
- DB is not intended for public Internet exposure;
- Admin API write routes require auth;
- public endpoint exposes no internalNote/audit/auth data.

## 8. Production deployment plan
Do NOT deploy live. Produce an exact deployment plan for the existing BB610 environment including:
- target host/service layout;
- PostgreSQL persistent storage/backup location;
- API service process/container;
- Admin static location;
- proposed URLs/subdomains/paths for Admin and public commercial API;
- HTTPS/reverse proxy;
- environment/secrets placement;
- named-user bootstrap/rotation;
- origin/network restrictions;
- backup schedule;
- rollback procedure;
- sequence for later public WATER cutover.

Prefer the existing BB610 infrastructure where practical. Do not invent a second unnecessary hosting stack.

## 9. Completion register
If runtime tests and restore drill PASS, update Admin persistence/access-control items in `BB610_WATER_WEBSITE_COMPLETION_REGISTER.md` from implementation blockers to deployment/cutover gate. Do not remove PULS screenshot blockers or missing F1-P/F2-P prices.

## 10. Documentation/deliverable
Create:
- `docs/website/R19_ADMIN_RUNTIME_ACCEPTANCE.md`
- `docs/website/BB610_WATER_ADMIN_RUNTIME_TEST_EVIDENCE_R1.md`
- `docs/website/BB610_WATER_ADMIN_PRODUCTION_DEPLOYMENT_PLAN_R1.md`

Update operations/deployment docs only where runtime findings require it.

Report:
1. exact runtime environment used;
2. migration/bootstrap result;
3. auth/runtime results;
4. draft/publish/rollback evidence;
5. concurrency result;
6. public staging/fallback result;
7. backup/restore drill result;
8. final catalog invariant (15 APPROVED + 6 PRICE_ON_REQUEST);
9. security/config findings;
10. remaining deployment blockers;
11. proposed production topology/URLs;
12. completion register change;
13. commit SHA.

Set `R19 = PASS / RUNTIME ACCEPTED` only if the real runtime tests and backup/restore drill pass. Otherwise set `R19 = REVIEW` with exact failures. STOP. Live production must remain unchanged.