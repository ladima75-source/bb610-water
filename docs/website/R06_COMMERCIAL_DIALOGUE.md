# BB610 WATER — COMMERCIAL DIALOGUE R06

- **Revision:** R06
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Base:** R05 PASS staging implementation
- **Task:** `TASK_06_COMMERCIAL_DIALOGUE_R1.md` + owner clarification for Task 06
- **Implementation commit:** `81f628ab3194f87149ae92aac78bd0e8900005f6`
- **Scope:** commercial/textual recomposition of current staging only; visual proof/assets deferred
- **Copy:** WORKING COPY / NOT FREEZE
- **Production:** NOT CHANGED

## 1. Staging review access

Implementation path:

`docs/website/staging/index.html`

Commit-pinned review URL:

`https://rawcdn.githack.com/ladima75-source/bb610-water/81f628ab3194f87149ae92aac78bd0e8900005f6/docs/website/staging/index.html`

The same responsive staging URL is intended for desktop and mobile review.

## 2. Task 06 clarification applied

The owner clarified that this iteration is **commercial dialogue / working copy only**.

Therefore this implementation deliberately does **not**:

- select or replace photographs;
- select or replace PULS screenshots;
- crop or annotate PULS screens;
- select or replace engineering visualizations;
- create new diagrams/graphs/animations as visual proof;
- treat `assets/extracted/*` as validated product evidence merely because the files exist in the repository;
- redesign the accepted R05 visual system.

Current staging images remain in place as temporary working placeholders. The UI now labels the PULS and physical-module visuals as temporary/review-later material so they are not presented as proof of specific functions during R06 review.

`docs/website/staging/data/assets.js` was **not modified**.

## 3. Homepage commercial dialogue implemented

The staging homepage now follows one customer conversation instead of a feature-list structure:

1. **What changes for me?**
   - `Ви вирішуєте, як вирощувати. BB610 бере на себе рутину поливу та підживлення.`
   - supporting logic: `Ви вирішуєте → BB610 виконує → BB610 контролює`;
   - primary first-screen CTA: `Подивитися, як це працює`.

2. **What no longer needs my presence every cycle?**
   - schedule;
   - individual zones;
   - time or actual-volume irrigation;
   - multiple daily blocks/cycles;
   - fertigation integrated into scheduled operation.

3. **My plants are different**
   - human-readable demo zone names centralized in data:
     - `Duke — молоді`;
     - `Chandler — плодоношення`;
     - `Томати чері`;
     - `Улюблена грядка`;
   - explicit boundary: control is by zone, not by individual plant.

4. **How do I know it actually happened?**
   - timer/controller evidence vs BB610 factual measurement;
   - explanatory HTML example `800 л → 802 л → цикл виконано`;
   - explicit label that this is an example, not live telemetry;
   - flowmeter identified as factual-volume basis;
   - no unsupported diagnosis of deviation causes.

5. **What if execution goes wrong?**
   - actual flow/volume;
   - pressure;
   - pH according to P/PE configuration;
   - EC in PE as monitoring/deviation notification only;
   - low-level/system-state signals;
   - validated response language: warning, warning + confirmation, or emergency stop where applicable.

6. **Feeding without a separate repeated manual ritual**
   - user prepares the stock/mother solution;
   - BB610 does not automatically create stock solution from raw fertilizer;
   - mixing/recirculation pump role is explained;
   - one mixing pump for one fertigation channel, two for two channels, according to configuration;
   - cycle concept: `Змочування → Підживлення → Промивка`;
   - `15% / 70% / 15%` is explicitly labeled only as an example, not agronomic guidance.

7. **Where do I see/manage it?**
   - BB610 PULS remains the main software/SCADA term;
   - PULS MOBILE remains in the PULS family;
   - visual evidence review is explicitly deferred;
   - current staging image is labeled temporary placeholder and is not used to prove a function.

8. **What system do I need and what does it cost?**
   - customer-language questions appear before the technical selector;
   - the existing exact frozen selector remains intact:
     `I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`;
   - zones remain:
     `Z4(8) / Z8(12) / Z12(16)`;
   - exact result remains version + zone;
   - HMI state remains available;
   - no missing F1-P/F2-P price is invented.

A supporting installation/system block remains between PULS and configuration to explain CONTROL / HYDRAULIC / ZONE and plug-and-play intent without claiming zero maintenance. Its existing visual assets remain placeholders.

## 4. Centralized content/data layer preserved

R05 architecture was preserved rather than replaced.

Changed working-copy source:

`docs/website/staging/data/content.js`

It now contains all Task 06 commercial copy, including:

- navigation labels;
- HERO copy and CTA labels;
- routine-operation copy;
- zone examples/demo names;
- actual-result comparison and explanatory proof values;
- deviation/control language;
- fertigation workflow and cycle labels;
- PULS placeholder/review wording;
- architecture/installation wording;
- configuration customer questions;
- contact copy;
- intended future routes.

Commercial data source remains:

`docs/website/staging/data/commercial.js`

and was **not changed** in R06.

Asset references remain:

`docs/website/staging/data/assets.js`

and were **not changed** in R06.

Rendering remains centralized through:

`docs/website/staging/app.js`

No marketing/commercial copy was duplicated into multiple page templates.

## 5. Files changed

Compared with Task 06 assignment commit `b64c3eea8fa9962d4fa549d3071e14f0e5004e6a`, staging implementation changes are limited to:

- `docs/website/staging/data/content.js` — commercial dialogue / centralized WORKING COPY;
- `docs/website/staging/index.html` — semantic section sequence / data hooks;
- `docs/website/staging/app.js` — rendering of the new content/data fields;
- `docs/website/staging/task06.css` — small structural additions using the existing R05 visual tokens/styles.

No root production file was changed by Task 06 implementation.

## 6. Visual/assets status

### PULS

No PULS asset was selected, replaced, cropped, annotated, or validated during R06.

Current asset usage: **TEMPORARY STAGING PLACEHOLDER ONLY**.

No derivative was created.

Real BB610 PULS exists, but its website visual presentation is intentionally deferred to the next owner/supervising review stage.

### CONTROL / HYDRAULIC / ZONE

Existing staging images remain unchanged and are labeled as temporary placeholders. Their repository presence is not treated as validation that they are current/final product evidence.

## 7. Statements still requiring owner/copy review

All marketing copy remains WORKING COPY, especially:

- HERO headline;
- HERO explanation;
- routine-operation wording;
- emotional wording around human-readable zone names;
- fertigation explanation length;
- plug-and-play wording;
- contact wording;
- customer-language questions before the configuration selector.

No copy in R06 is FREEZE.

## 8. Responsive checks

R06 preserves the R05 responsive system and adds only structural styles consistent with it.

Source-level responsive checks cover the existing breakpoints used for the required review widths:

- mobile layout <= 760 px supports 390×844 and 430×932 classes of viewport;
- intermediate <= 1100 px behavior remains intact;
- desktop layout remains the R05 base for 1366×768 and 1920×1080 classes of viewport;
- new principle/cycle flows stack vertically on mobile;
- new compare/deviation/fertigation/question grids collapse to one column on mobile;
- configuration selector continues to use the same desktop/mobile commercial data source;
- no new fixed-width table or horizontal-scrolling commercial matrix was introduced.

Owner browser review remains required before PASS because R06 is a staging review iteration, not production acceptance.

## 9. Future page routes prepared in centralized content

The content source records the intended future routes without implementing them in this task:

- `/irrigation/`;
- `/fertigation/`;
- `/ph-ec/`;
- `/puls/`;
- `/puls/mobile/`;
- `/system/`;
- `/configurations/`.

No public `BB610 SYSTEM` product name is introduced.

## 10. Production confirmation

Task 06 implementation is isolated under `docs/website/staging/` plus this review document.

Production `water.bb610.com.ua`, root `index.html`, root production CSS/JS and `CNAME` were not modified.

## Stage result

**R06: REVIEW**

Commercial/textual staging iteration is ready for owner/supervising review.

Do not deploy to production. Do not freeze copy. Do not begin PULS/engineering visual-proof selection until a new explicit task is assigned.
