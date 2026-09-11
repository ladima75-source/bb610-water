# BB610 WATER — R16 / STAGING PROMOTION

- **Status:** PASS / WORKING BASE
- **Date:** 2026-09-11
- **Source candidate:** R15 `4b33876960eeef504a3a6aaa02301ed44fe0dce9`
- **Production:** NOT CHANGED
- **Design / copy:** NOT FREEZE

## Canonical staging

`docs/website/staging/index.html`

This path is now the single canonical website working build. R15 remains historical review evidence only.

## Files promoted / changed

Current staging application files:
- `docs/website/staging/index.html`
- `docs/website/staging/styles.css`
- `docs/website/staging/app.js`
- `docs/website/staging/asset-integration.js`
- `docs/website/staging/data/content.js`
- `docs/website/staging/data/commercial.js`
- `docs/website/staging/data/system.js`
- `docs/website/staging/data/assets.js`

Superseded R06/R07 staging overlays and old data overrides were removed from staging. Historical review/documentation paths were not deleted.

## Promotion/path fixes

- asset paths were corrected from the deeper `review/r15/` level to the canonical `staging/` level;
- content/commercial/system data were promoted into staging-local centralized files instead of loading review data paths;
- the R15 asset layer was converted into an operational staging asset contract;
- inherited review-only asset-slot helper text was explicitly suppressed in staging;
- CONTROL / HYDRAULIC / ZONE continue to use the accepted real PUBLIC-safe repository visuals;
- no legacy PULS image was promoted as proof.

## PULS slot contract

`docs/website/staging/data/assets.js` contains exactly three current proof slots:

- `pulsNewTask`
- `pulsSchedule`
- `pulsMain`

Each supports:
- `src` — real approved image path or `null`;
- `alt` — meaningful accessibility text;
- `objectPosition` — crop alignment without markup changes;
- `fallback` — concise buyer-facing absent-image state.

When `src` is provided, `asset-integration.js` renders the real image automatically. No HTML restructuring is required.

## Price/data contract

`docs/website/staging/data/commercial.js` remains the single price source for the current staging build.

- all seven product versions remain selectable;
- all three zone configurations remain selectable;
- HMI switches between the without-HMI / with-HMI columns;
- missing F1-P / F2-P rows remain `null`;
- buyer-facing fallback remains **`Ціна уточнюється`**;
- adding approved rows later requires data edits only, not component/markup changes.

## QA result

Canonical staging was checked after promotion for:
- approved WATER logo path;
- header/navigation anchors;
- accepted HERO copy and wrapping system;
- named-zone interaction;
- actual-volume proof;
- fertigation, pH/EC and deviation sections;
- real CONTROL / HYDRAULIC / ZONE visuals;
- all three PULS fallback slots;
- dialogue configurator resolution logic for I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE;
- Z4(8) / Z8(12) / Z12(16);
- HMI price switching;
- missing-price fallback;
- contact handoff;
- responsive rules covering 390×844, 430×932, 1366×768 and 1920×1080;
- no obsolete overlay files loaded by staging;
- no review/debug/internal wording intentionally visible in the buyer UI.

No promotion blocker remains in ordinary UI/CSS/copy.

## Completion register

Single unresolved-items register:

`docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md`

It intentionally contains only:
- three real approved PULS v0.28 screenshots;
- six missing F1-P/F2-P price rows, without/with HMI;
- optional agricultural/context and installation/context photography.

## Production confirmation

Root production `index.html`, production CSS/JS, CNAME and live `water.bb610.com.ua` were not changed.

## Result

**R16 = PASS / WORKING BASE**

All future website completion work should continue directly from `docs/website/staging/`. No new parallel review concept is required.
