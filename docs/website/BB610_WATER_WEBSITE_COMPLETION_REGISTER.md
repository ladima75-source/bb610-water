# BB610 WATER — WEBSITE COMPLETION REGISTER

Single operational register after Admin persistence implementation. Contains unresolved items only.

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
The authenticated persistence/API implementation now exists in `services/water-admin-api/`; remaining work is deployment and production cutover, not another Admin UX redesign.

- [ ] Provision durable production PostgreSQL plus backup/restore policy.
- [ ] Deploy `services/water-admin-api/` behind HTTPS on the approved Admin/API host.
- [ ] Supply production secrets through deployment secret storage: database credentials, JWT secret, bootstrap credentials; no repository secrets.
- [ ] Create real Admin users/roles and rotate/remove bootstrap credentials.
- [ ] Restrict CORS/network access to approved origins.
- [ ] Run runtime migration/auth/version/audit/rollback/publish acceptance test on the deployed review environment.
- [ ] Owner separately authorizes public WATER cutover from source-controlled commercial data to API `GET /public/commercial`.
- [ ] After cutover, verify cache/failure behavior and rollback to last published commercial version.

Architecture: `docs/website/BB610_WATER_ADMIN_PERSISTENCE_ARCHITECTURE_R1.md`.

## OPTIONAL POLISH

- [ ] Agricultural/context photography, only if later selected and approved.
- [ ] Installation/context photography, only if later selected and approved.
