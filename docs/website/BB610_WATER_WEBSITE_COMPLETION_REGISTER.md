# BB610 WATER — WEBSITE COMPLETION REGISTER

Single operational register after R16 staging promotion. Contains unresolved items only.

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

Integration point: `docs/website/staging/data/commercial.js` only. Until approved, UI remains `Ціна уточнюється`.

## OPTIONAL POLISH

- [ ] Agricultural/context photography, only if later selected and approved.
- [ ] Installation/context photography, only if later selected and approved.
