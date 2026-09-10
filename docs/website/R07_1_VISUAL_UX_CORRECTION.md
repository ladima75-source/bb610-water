# BB610 WATER — VISUAL & UX CORRECTION R07.1

- **Revision:** R07.1
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Base:** R07 REVIEW
- **Scope:** correction of explanatory irrigation schedule / named-zone UX model only
- **Implementation commit:** `c9ab2629884ce135a113e21c9a4ff5310cebda30`
- **Copy/design:** WORKING / NOT FREEZE
- **Production:** NOT CHANGED

## 1. Correction objective

R07 simplified the explanatory schedule too far toward separate time-based irrigation events. R07.1 aligns the staging explanation with the actual BB610 operating model confirmed by the owner:

**поливний блок → черга зон → заданий об’єм → фактичне виконання**.

Time is shown as the **start of an irrigation block**, not as the primary completion criterion for each zone task. Inside the block, zone tasks are executed sequentially. The key explanatory completion model is the target actual volume in litres and the measured actual execution.

## 2. HERO correction

The HERO explanatory panel now shows irrigation blocks rather than independent timed irrigation events.

Each block contains:

- block start time;
- ordered queue of zones;
- target volume for each zone;
- actual measured execution / progress state;
- completed / active / waiting state.

The panel explicitly labels itself as explanatory staging UI, not live telemetry and not BB610 PULS.

## 3. Named-zone correction

The interactive zone switcher now uses owner-readable farm names:

- `Теплиця — томати`;
- `Лохина — молоді рослини`;
- `Розсадник`;
- `Полуниця — тунель 1`;
- `Улюблена грядка`.

A variety such as `Duke` appears only as an optional secondary clarification, not as the primary zone name.

Selecting a zone now shows:

- irrigation block start;
- block identity;
- position in the block queue;
- target volume;
- actual measured value / current progress.

No per-plant control is implied; control remains zone-based.

## 4. Removed incorrect demo pattern

All Task 07 demo examples such as `12 хв / 10 хв / 12 хв` were removed from the active staging explanatory data.

The compatibility fields still consumed by the original R07 renderer also use litres/block language so the page does not briefly fall back to a contradictory time-based model before the R07.1 correction layer runs.

## 5. PULS relationship

Owner-provided information about real PULS UX is used only to align the explanatory logic:

- zone;
- recipe;
- `ОБ’ЄМ / VOLUME`;
- target volume;
- MAIN target / actual / progress and process parameters.

No real PULS screenshot was copied, redrawn or fabricated in R07.1. The existing neutral `PROOF NEEDED` PULS gate remains unchanged in principle.

## 6. Files changed

From R07 commit `d028cd5f98e36656f03af5e347ad4622da2f9b7d`:

- `docs/website/staging/data/visuals.js` — corrected centralized demo model and owner-readable zone examples;
- `docs/website/staging/data/ux-content.js` — corrected explanatory labels/copy for block/queue/volume semantics;
- `docs/website/staging/task07_1.js` — renders corrected HERO and zone interaction while preserving the R07 base;
- `docs/website/staging/task07_1.css` — minimal structural styling for block/queue presentation;
- `docs/website/staging/index.html` — loads R07.1 correction layer and identifies the review revision;
- `docs/website/R07_1_VISUAL_UX_CORRECTION.md` — this review handoff.

The existing R07 visual system, fertigation, pH/EC, deviation, proof gates, physical-system explanation, installation, guided configuration, price and final conversion were not redesigned.

## 7. Centralized architecture

R05/R06/R07 centralized architecture remains intact.

Corrected demo information is stored in `data/visuals.js`; corrected explanatory labels are stored in `data/ux-content.js`. The R07.1 renderer consumes those sources rather than hard-coding the farm examples into HTML.

`commercial.js` remains unchanged and continues to be the commercial price/configuration source.

## 8. Responsive behavior

The corrected irrigation-block queue is designed to remain readable at the existing R07 review viewport classes:

- 390×844;
- 430×932;
- 1366×768;
- 1920×1080.

Desktop shows the block logic and zone queue as a compact structured table-like sequence. Mobile converts the logic chain and queue values into vertical touch/readable rows without horizontal scrolling.

## 9. Review access

Staging path:

`docs/website/staging/index.html`

Implementation-pinned review URL:

`https://rawcdn.githack.com/ladima75-source/bb610-water/c9ab2629884ce135a113e21c9a4ff5310cebda30/docs/website/staging/index.html`

## 10. Production confirmation

Only the isolated staging path under `docs/website/staging/` and this R07.1 review document were changed.

Production `water.bb610.com.ua`, root production `index.html`, production CSS/JS and `CNAME` were not changed or deployed.

## Stage result

**R07.1: REVIEW**

Stop after review handoff. Do not deploy production and do not change other accepted R07 sections without a new instruction.