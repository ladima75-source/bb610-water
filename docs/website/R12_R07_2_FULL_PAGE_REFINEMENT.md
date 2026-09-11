# BB610 WATER — R07.2 FULL-PAGE REFINEMENT R12

- **Revision:** R12
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Accepted design / structure base:** `687cab5c918056450504270c7ed85e667abf75ce`
- **Task assignment commit:** `1767c366a0dc83bc50e05ed7ea7fda18a5f73829`
- **Implementation commit before this report:** `8881cdd08bd6b773fef47fa37ab04c49aa1b241d`
- **Review path:** `docs/website/review/r12/`
- **R07.2 staging:** NOT CHANGED
- **Production:** NOT CHANGED

## Preview

Commit-pinned preview after final handoff commit:

`https://rawcdn.githack.com/ladima75-source/bb610-water/FINAL_COMMIT/docs/website/review/r12/index.html`

Branch preview:

`https://raw.githack.com/ladima75-source/bb610-water/main/docs/website/review/r12/index.html`

## Working method

R12 is a refinement of the accepted R07.2 design / structure base, not a new website or a new concept. The accepted semantic order is retained:

1. HERO
2. WORKDAY
3. ROUTINE / VALUE
4. ZONES
5. ACTUAL VOLUME
6. FERTIGATION
7. pH / EC
8. DEVIATIONS / SAFETY
9. REAL BB610 PULS PROOF
10. CONTROL / HYDRAULIC / ZONE
11. INSTALLATION
12. CONFIGURATOR / PRODUCT LINE
13. CONTACT / CTA

R08–R10 visual directions were not imported. R11 contributed only the real-product-proof / asset-gate principle.

## Section-by-section change summary

### HERO
- Preserves the R07.2 irrigation-block explanatory concept.
- Uses required examples exactly:
  - `Теплиця — томати / 300 л / ВОДА + ЖИВЛЕННЯ`
  - `Лохина — молоді рослини / 220 л / ВОДА + ЖИВЛЕННЯ + pH`
  - `Розсадник / 180 л / ВОДА`
  - `Полуниця — тунель 1 / 260 л / ВОДА + ЖИВЛЕННЯ`
  - `Клумба Коханої / 120 л / ВОДА`
- Time is explicitly the block start; no minute-duration model is used.
- Litres are labeled as explanatory demo values, not agronomic recommendations.
- Hierarchy / spacing / density are reduced versus the raw staging implementation so the queue remains explanatory website UI rather than SCADA-like presentation.

### WORKDAY
- Remains immediately after HERO.
- Refined to a single calm `ЗАРАЗ / З BB610 WATER` buyer comparison.
- Preserves the conclusion: `ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.`
- Does not imply every warning can continue autonomously.

### ROUTINE / VALUE
- No longer repeats “less routine” as the main message.
- Focuses on where repeatable labour is removed while agronomic decisions remain with the owner: schedule, zone sequence, feeding program, stock-solution workflow, result control.

### ZONES
- Keeps the accepted interactive concept.
- Uses understandable owner-facing zone names, not anonymous Z01/Z02.
- `Duke` is secondary context only.
- Blueberry retains `ВОДА + ЖИВЛЕННЯ + pH`.
- `Клумба Коханої` is used exactly; `Улюблена грядка` is not present in active R12 UI/data.

### ACTUAL VOLUME
- Strengthened as a core differentiator.
- Explicit contrast:
  - ordinary controller = command / valve-open state;
  - BB610 WATER = target volume → actual volume → execution result.
- Keeps `800 л → 802 л → ВИКОНАНО` as clearly labeled explanatory data.
- Does not claim elapsed time is irrelevant.

### FERTIGATION
- Reframed around owner value and workflow.
- Keeps explanatory wetting / feeding / flushing structure `15 / 70 / 15` with explicit non-universal disclaimer.
- F1 = one fertigation channel; F2 = two.
- Stock-solution mixing / recirculation is described only as supported according to configuration.

### pH / EC
- Roles are visually and textually distinct.
- pH = management / correction + control in applicable P / PE configurations.
- EC = monitoring + deviation information in PE.
- No closed-loop automatic EC correction claim.

### DEVIATIONS / SAFETY
- Three levels are separated:
  1. monitoring / notification;
  2. warning / acknowledgement where applicable;
  3. protective / complete stop for relevant emergency conditions.
- No single universal reaction is promised for every event.

### REAL BB610 PULS PROOF
- No fake PULS UI is drawn.
- Three centralized real-proof slots are prepared:
  1. `puls-new-task-v028.png` — zone + recipe + `ОБ'ЄМ / VOLUME` + target litres;
  2. `puls-schedule-v028.png` — irrigation blocks + task sequence;
  3. `puls-main-v028.png` — mode + target + actual + progress + process parameters.
- Commercial logic: `ВИ ЗАДАЛИ → BB610 WATER ВИКОНАВ → BB610 WATER ПЕРЕВІРИВ`.
- Asset replacement is isolated in centralized data and does not require section redesign.

### CONTROL / HYDRAULIC / ZONE
- Preserves the three-module product architecture.
- Commercial-level explanations only; no BOM/component-level detail.
- Honest visualization slots are retained until approved presentation-quality assets exist.

### INSTALLATION
- Keeps the plug-and-play direction without claiming “no installation required”.
- Includes water, stock solution A/B as applicable, zone lines, power, external signals/sensors, protected quick electrical connections.
- Correct connection and commissioning remain explicitly necessary.

### CONFIGURATOR / PRODUCT LINE
- Active public naming only:
  - `I`
  - `F1`
  - `F1-P`
  - `F1-PE`
  - `F2`
  - `F2-P`
  - `F2-PE`
- Zone options:
  - `Z4(8)`
  - `Z8(12)`
  - `Z12(16)`
- 7 × 3 = 21 base configurations before options such as HMI.
- No legacy `F1-PH`, `F2-PH`, `F1-EC`, `F2-EC` active buyer-facing names.
- Price data remains centralized and derived from the accepted R07.2 repository mapping.
- F1-P / F2-P missing prices remain `null` and render as `Ціна уточнюється`; no legacy PH price is silently remapped.
- Commercial data contract remains suitable for future Admin/API replacement without rewriting page markup.

### CONTACT / CTA
- Final intent refined to `ПІДІБРАТИ BB610 WATER ПІД МОЄ ГОСПОДАРСТВО`.
- Selected version / zone / HMI state is carried into the generated request context.
- No fake backend success state is shown.

## Files created

- `docs/website/review/r12/index.html`
- `docs/website/review/r12/styles.css`
- `docs/website/review/r12/data.js`
- `docs/website/review/r12/commercial.js`
- `docs/website/review/r12/app.js`
- `docs/website/R12_R07_2_FULL_PAGE_REFINEMENT.md`

No accepted R07.2 staging file was overwritten.

## Centralized architecture status

- mutable page copy / explanatory models / asset requirements: `review/r12/data.js`
- versions / zone configurations / price pairs / HMI pricing mode: `review/r12/commercial.js`
- rendering / interactions / selected configuration propagation: `review/r12/app.js`
- semantic page shell: `review/r12/index.html`
- visual system / responsive behavior: `review/r12/styles.css`

This remains structurally mergeable into staging after PASS.

## Desktop review checks

### 1366 × 768
- HERO preserves left/right balance without converting queue into a full dashboard.
- Section widths are bounded at 1240px.
- WORKDAY remains immediately after HERO.
- PULS proof slots remain large enough for real screenshots rather than device mockups.
- Sticky configuration result is used only on desktop.

### 1920 × 1080
- Max-width prevents uncontrolled line lengths / card expansion.
- Light / dark section rhythm remains deliberate across the full page.
- Headings, proof blocks and CTA hierarchy maintain consistent scale.

## Mobile review checks

### 390 × 844 / 430 × 932
- HERO becomes one column; queue rows restructure so recipe / target remain readable without horizontal scroll.
- WORKDAY stacks into immediate before / after sequence.
- ROUTINE, pH/EC and other two-column compositions collapse deliberately rather than shrinking.
- Zone selector becomes touch-readable; no hover-only meaning.
- Actual-volume proof remains readable and secondary labels do not dominate.
- Fertigation flow remains vertical/touch-safe.
- PULS proof slots remain full-width and ready for real screenshot insertion.
- Architecture becomes a single-column module sequence.
- Configurator choices are touch-friendly; result card is no longer sticky on mobile.
- Contact form becomes single column.
- CSS uses `box-sizing:border-box`, bounded widths and <=980 / <=520 breakpoints; no component intentionally requires horizontal scrolling.

## Obsolete naming check

Active R12 buyer-facing data/UI contains no:
- `F1-PH`
- `F2-PH`
- `F1-EC`
- `F2-EC`
- `Улюблена грядка`

These names may still exist elsewhere in repository history/archive; R12 does not modify archive material.

## Pricing / data architecture

Status: **PASS for REVIEW architecture**.

- Prices are not scattered through HTML.
- Current accepted R07.2 mapped prices are centralized in `commercial.js`.
- Unknown P-version prices remain unknown.
- Version / zone / HMI state is resolved at runtime.
- The structure can later be replaced by an authenticated Water Admin/API source without changing the public page composition.

## Asset status

### HERO agricultural image
- **NEEDED**
- target: professional greenhouse / berry / nursery context;
- not a fabricated BB610 WATER installation.

### Real BB610 PULS screenshots
- **ASSET GATE / NEEDED**
- expected:
  - `docs/website/review-assets/puls/puls-new-task-v028.png`
  - `docs/website/review-assets/puls/puls-schedule-v028.png`
  - `docs/website/review-assets/puls/puls-main-v028.png`
- arbitrary old `assets/extracted/*` are not used as proof.

### CONTROL visualization/photo
- **NEEDED / APPROVAL REQUIRED**
- review slot prepared.

### HYDRAULIC visualization/photo
- **NEEDED / APPROVAL REQUIRED**
- review slot prepared.

### ZONE visualization/photo
- **NEEDED / APPROVAL REQUIRED**
- review slot prepared.

### Installation/context photography
- **OPTIONAL / LATER**
- current architecture works without it.

## Safety / production boundary

- Production root files: not changed.
- `CNAME`: not changed.
- R07.2 staging: not changed.
- No fake PULS UI.
- No fake serial product photography.
- No invented commercial prices.
- No AI image is presented as a real installed BB610 WATER system.

**STOP CONDITION:** R12 = REVIEW. Do not merge to staging or production until reviewed / accepted.