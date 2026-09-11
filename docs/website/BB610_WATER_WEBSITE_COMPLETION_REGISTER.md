# BB610 WATER — WEBSITE COMPLETION REGISTER

Single operational register after TASK 18 Admin server persistence/auth implementation. Contains unresolved items only.

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
Server/auth/version/audit/publish/rollback implementation exists in `services/water-admin-api/`. Remaining Admin work is deployment/runtime acceptance and owner-approved live cutover, not another UX redesign.

- [ ] Provision durable production PostgreSQL with scheduled backup and tested restore.
- [ ] Deploy Admin API behind HTTPS on the approved host.
- [ ] Inject production DB/JWT/bootstrap secrets through deployment secret storage.
- [ ] Create named real Admin users/roles and rotate/remove bootstrap access.
- [ ] Restrict CORS/network exposure to approved origins.
- [ ] Run non-production runtime acceptance: migration, login/logout/throttle, roles, draft save, publish diff, publish, immutable audit, stale-write conflict, rollback.
- [ ] Run database backup/restore drill and compare published checksum/version after recovery.
- [ ] Owner separately authorizes live WATER commercial-data cutover to `GET /public/commercial`.
- [ ] After cutover verify last-known-good/API-failure behavior and commercial rollback.

References:
- `docs/website/BB610_WATER_ADMIN_SERVER_ARCHITECTURE_R1.md`
- `docs/website/BB610_WATER_ADMIN_DEPLOYMENT_R1.md`
- `docs/website/BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`

## OPTIONAL POLISH

- [ ] Agricultural/context photography, only if later selected and approved.
- [ ] Installation/context photography, only if later selected and approved.
