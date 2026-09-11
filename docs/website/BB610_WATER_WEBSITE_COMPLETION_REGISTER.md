# BB610 WATER — WEBSITE COMPLETION REGISTER

Single operational register after **R20 = PASS / READY FOR PRODUCTION DEPLOYMENT**. Contains unresolved items only.

## REQUIRED BEFORE PRODUCTION

### PULS product proof
- [ ] Real approved BB610 PULS v0.28 **New Task** screenshot/crop: zone + recipe + target volume.
- [ ] Real approved BB610 PULS v0.28 **Schedule** screenshot/crop: irrigation block + queued tasks.
- [ ] Real approved BB610 PULS v0.28 **MAIN** screenshot/crop: target + actual + progress + relevant process readings.

Integration point: `docs/website/staging/data/assets.js` → `pulsNewTask`, `pulsSchedule`, `pulsMain`.

### Approved price rows
- [ ] F1-P × Z4(8): without HMI / with HMI.
- [ ] F1-P × Z8(12): without HMI / with HMI.
- [ ] F1-P × Z12(16): without HMI / with HMI.
- [ ] F2-P × Z4(8): without HMI / with HMI.
- [ ] F2-P × Z8(12): without HMI / with HMI.
- [ ] F2-P × Z12(16): without HMI / with HMI.

Until approved these rows remain `PRICE_ON_REQUEST` and public UI remains `Ціна уточнюється`.

### WATER Admin actual production deployment / cutover
R19 proved the accepted backend at runtime. R20 prepared and production-like validated the complete deployment package. No further Admin UX redesign, persistence implementation or deployment-package design stage is required before target-host deployment.

Prepared package:
- `deploy/water-admin/`
- `docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`
- `docs/website/R20_ADMIN_PRODUCTION_DEPLOYMENT_PREP.md`

Remaining live deployment gates:

- [ ] Confirm the existing BB610 VPS capacity and deployment owner.
- [ ] Install the pinned accepted R20 release on that VPS.
- [ ] Provision production persistent paths and private PostgreSQL storage.
- [ ] Generate/store real production DB/JWT/bootstrap secrets outside Git.
- [ ] Separately approve/create `admin.water.bb610.com.ua` and `api.water.bb610.com.ua` DNS records.
- [ ] Issue TLS certificates through the existing BB610 ACME/certificate mechanism.
- [ ] Activate the prepared Nginx Admin/API configuration and verify HTTPS/CORS/network restrictions.
- [ ] Bootstrap the real named Admin account, rotate its password and clear bootstrap credentials.
- [ ] Enable the prepared backup timer and configure protected off-host backup replication.
- [ ] Run target-host health/login/invariant acceptance and one disposable backup/restore drill.
- [ ] Owner separately authorizes any live WATER commercial-data cutover to production `GET /public/commercial`.
- [ ] If cutover is authorized, verify last-known-good/API-failure behavior, 15+6 invariant and public rollback immediately after release.

R20 package already production-like validated:
- Docker Compose start/build: PASS;
- PostgreSQL 16: PASS;
- API migrations/health: PASS;
- named bootstrap/password rotation: PASS;
- backup/checksum/restore: PASS;
- Nginx syntax: PASS;
- automatic API crash restart: PASS (`RestartCount=1`);
- final commercial invariant: PASS (21 = 15 APPROVED + 6 PRICE_ON_REQUEST).

References:
- `docs/website/R19_ADMIN_RUNTIME_ACCEPTANCE.md`
- `docs/website/BB610_WATER_ADMIN_RUNTIME_TEST_EVIDENCE_R1.md`
- `docs/website/BB610_WATER_ADMIN_PRODUCTION_DEPLOYMENT_PLAN_R1.md`
- `docs/website/R20_ADMIN_PRODUCTION_DEPLOYMENT_PREP.md`
- `docs/website/BB610_WATER_ADMIN_PRODUCTION_RUNBOOK_R1.md`

Architecture/operations references:
- `docs/website/BB610_WATER_ADMIN_SERVER_ARCHITECTURE_R1.md`
- `docs/website/BB610_WATER_ADMIN_DEPLOYMENT_R1.md`
- `docs/website/BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`
- `docs/website/BB610_WATER_ADMIN_OPERATIONS_R1.md`

## OPTIONAL POLISH

- [ ] Agricultural/context photography, only if later selected and approved.
- [ ] Installation/context photography, only if later selected and approved.
