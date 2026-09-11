# BB610 WATER — WEBSITE COMPLETION REGISTER

Single operational register after **R19 = PASS / RUNTIME ACCEPTED**. Contains unresolved items only.

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

### WATER Admin production deployment / cutover
The Admin persistence/auth/version/audit/publication stack passed real non-production PostgreSQL runtime acceptance in R19, including backup/restore and API-failure fallback. No further Admin UX redesign or persistence implementation stage is required before deployment.

Remaining deployment gates:

- [ ] Confirm the production runtime host / VPS capacity and deployment owner.
- [ ] Provision durable production PostgreSQL and persistent storage.
- [ ] Configure scheduled backups plus encrypted/off-host retention.
- [ ] Deploy Admin API behind HTTPS on the approved host.
- [ ] Deploy the accepted Admin UI behind authenticated/controlled infrastructure.
- [ ] Inject production DB/JWT/bootstrap values through deployment secret storage; commit no real secrets.
- [ ] Create named production Admin users/roles and rotate/remove bootstrap access.
- [ ] Restrict CORS/network exposure to approved origins; do not expose PostgreSQL publicly.
- [ ] Run the R19 acceptance harness against the actual deployed review/production-like environment.
- [ ] Run one backup/restore drill on that target environment.
- [ ] Owner separately authorizes live WATER commercial-data cutover to production `GET /public/commercial`.
- [ ] Immediately after cutover verify last-known-good/API-failure behavior, 15+6 commercial invariant and rollback path.

Runtime acceptance evidence:
- `docs/website/R19_ADMIN_RUNTIME_ACCEPTANCE.md`
- `docs/website/BB610_WATER_ADMIN_RUNTIME_TEST_EVIDENCE_R1.md`

Deployment plan:
- `docs/website/BB610_WATER_ADMIN_PRODUCTION_DEPLOYMENT_PLAN_R1.md`

Architecture/operations references:
- `docs/website/BB610_WATER_ADMIN_SERVER_ARCHITECTURE_R1.md`
- `docs/website/BB610_WATER_ADMIN_DEPLOYMENT_R1.md`
- `docs/website/BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`
- `docs/website/BB610_WATER_ADMIN_OPERATIONS_R1.md`

## OPTIONAL POLISH

- [ ] Agricultural/context photography, only if later selected and approved.
- [ ] Installation/context photography, only if later selected and approved.
