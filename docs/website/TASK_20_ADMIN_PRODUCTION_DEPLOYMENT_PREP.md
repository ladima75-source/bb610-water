# BB610 WATER — TASK 20 / ADMIN PRODUCTION DEPLOYMENT PREP

- **Status:** ASSIGNED
- **Base:** R19 commit `3c00741704586d8ee0ff2638a541db8d6f880954`
- **R19:** PASS / RUNTIME ACCEPTED
- **Goal:** prepare the exact production deployment package and operator procedure for WATER Admin/API on the existing BB610 server environment, without switching the live WATER public site yet.
- **Live public WATER:** DO NOT CUT OVER in this task.

## 1. Preserve accepted implementation
No redesign and no new business features. R17 Admin UX and R18/R19 backend architecture are accepted. Work only on deployment readiness, security configuration, operations and repeatable deployment artifacts.

## 2. Existing infrastructure first
Audit the repository/deployment docs for the existing BB610 server environment and use it where practical. Do not create a second unnecessary hosting stack.

Produce exact intended topology for:
- WATER Admin static UI;
- WATER Admin API;
- PostgreSQL;
- HTTPS reverse proxy;
- persistent volumes;
- backups;
- logs;
- environment/secrets.

Do not guess credentials or commit secrets.

## 3. Proposed production naming
Choose and document one coherent production routing scheme. Prefer a dedicated Admin hostname/path and API hostname/path that does not collide with the public WATER site.

The final report must state the exact proposed URLs, but DNS/live routing changes require separate owner authorization.

## 4. Deployment artifacts
Prepare production-grade, repeatable deployment artifacts appropriate to the selected existing environment, including as applicable:
- compose/service definition;
- reverse-proxy configuration template;
- `.env.example` with names only/no secrets;
- database persistent-volume mapping;
- migration/startup sequence;
- healthcheck;
- restart policy;
- log handling;
- backup job/script/schedule template;
- restore procedure;
- admin bootstrap/rotation procedure.

No universal/default password.

## 5. Public-site boundary
The current live public `water.bb610.com.ua` remains untouched.

Prepare but do not activate the future public commercial endpoint cutover. The eventual switch must be reversible and retain the accepted static/last-known-good fallback.

## 6. Production acceptance checklist
Create a concise operator checklist for the later real server deployment:
1. provision secrets;
2. start PostgreSQL;
3. migrate;
4. start API;
5. bootstrap named owner/admin;
6. disable/rotate bootstrap access;
7. serve Admin through HTTPS;
8. verify auth/roles;
9. verify catalog invariant;
10. perform draft/publish/rollback smoke test;
11. perform backup + separate restore check;
12. verify logs/health/restart;
13. verify public API projection;
14. only then request owner approval for public WATER cutover.

## 7. Security gate
Document/verify configuration for:
- HTTPS only;
- secure secret injection;
- PostgreSQL not publicly exposed;
- restricted CORS/origins;
- rate limiting/login throttling;
- API/admin access boundaries;
- backup file permissions/retention;
- no secrets in logs;
- named users and role assignment.

## 8. Data invariant
All deployment seed/migration artifacts must still preserve exactly:
- 21 model×zone rows;
- 15 APPROVED;
- 6 PRICE_ON_REQUEST;
- F1-P/F2-P null/null;
- no legacy F1-PH/F2-PH.

## 9. Completion register
Update `BB610_WATER_WEBSITE_COMPLETION_REGISTER.md` only if deployment preparation is genuinely complete. Keep actual production deployment/cutover as unresolved until it has happened and been accepted. Keep PULS screenshots and missing F1-P/F2-P prices unresolved.

## 10. Deliverables
Create:
- `docs/website/R20_ADMIN_PRODUCTION_DEPLOYMENT_PREP.md`
- `docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`
- required deployment/config templates under an appropriate `deploy/` or existing project deployment path.

Update deployment/operations docs where needed.

Report:
1. selected topology;
2. proposed Admin/API URLs;
3. exact deployment artifacts created;
4. persistent storage and backup plan;
5. secrets/bootstrap procedure;
6. security configuration;
7. production acceptance checklist;
8. rollback/cutover plan;
9. data invariant confirmation;
10. remaining blockers;
11. commit SHA.

Set `R20 = PASS / READY FOR PRODUCTION DEPLOYMENT` only if the package is complete and reproducible. Otherwise `R20 = REVIEW` with exact gaps. STOP. Do not deploy or change live DNS/public WATER.