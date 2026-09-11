# BB610 WATER — WEBSITE COMPLETION REGISTER

Single operational register after R17 WATER Admin v1. Contains unresolved items only.

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

Canonical integration point: `docs/website/staging/data/commercial.js` → `BB610_COMMERCIAL_CATALOG`. Until approved, rows remain `PRICE_ON_REQUEST` and public UI shows `Ціна уточнюється`.

### WATER Admin production persistence + access control
- [ ] Approved authenticated Admin access / authorization mechanism.
- [ ] Server/API persistence for the `BB610_COMMERCIAL_CATALOG` schema; no browser-only/localStorage persistence.
- [ ] Durable immutable price-history storage with authenticated actor identity.
- [ ] Atomic/version-conflict-safe save plus rollback/backup path.
- [ ] Public commercial-data serialization/cache refresh after an approved admin save.

Current Admin v1 is isolated **REVIEW/EXPORT** at `docs/website/admin/review/v1/` and must not be exposed as an unauthenticated production admin.

## OPTIONAL POLISH

- [ ] Agricultural/context photography, only if later selected and approved.
- [ ] Installation/context photography, only if later selected and approved.
