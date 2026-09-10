# BB610 WATER — VISUAL & UX IMPLEMENTATION R07

- **Revision:** R07
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Base:** R06 staging / commercial dialogue
- **Task:** `TASK_07_VISUAL_UX_IMPLEMENTATION.md`
- **Source of truth:** `BB610_WATER_VISUAL_UX_BRIEF_R1.md`
- **Implementation commit:** `8306b871256bcf9d11c6ca0e93e86fbd3f455611`
- **Copy:** WORKING COPY / NOT FREEZE
- **Production:** NOT CHANGED

## 1. Review access

Staging path:

`docs/website/staging/index.html`

Commit-pinned preview URL:

`https://rawcdn.githack.com/ladima75-source/bb610-water/8306b871256bcf9d11c6ca0e93e86fbd3f455611/docs/website/staging/index.html`

The same responsive page is intended for desktop and mobile review.

## 2. Implementation summary

Task 07 was implemented on the existing R06 staging base. No new A/B/C concept was created. The existing Precision Instrument visual language remains the base.

The page now follows the visual/UX sequence from the R1 brief using two strictly separated classes of material:

1. **EXPLANATORY UI / DIAGRAM** — lightweight HTML/CSS/JS examples that explain schedules, zones, actual measurement, fertigation, pH/EC roles, deviations, physical architecture, installation and configuration logic.
2. **PLACEHOLDER / PROOF NEEDED** — neutral containers for real PULS, PULS MOBILE, approved equipment visuals and real installation proof.

No arbitrary repository image is used as product proof in R07.

## 3. Centralized architecture preserved

R05/R06 centralized architecture is preserved.

Existing sources remain:

- `docs/website/staging/data/content.js` — commercial/marketing WORKING COPY;
- `docs/website/staging/data/commercial.js` — frozen versions/zones/pricing/HMI commercial source;
- `docs/website/staging/data/assets.js` — asset registry, unchanged in Task 07.

Task 07 adds:

- `docs/website/staging/data/visuals.js` — all explanatory/demo visual data: day schedule, named-zone schedules, target/actual values, fertigation process, pH/EC examples, deviation states, physical-system rail, installation steps, before/with BB610 lists and proof-state metadata;
- `docs/website/staging/data/ux-content.js` — Task 07 UX labels/headings/notes, kept separate from HTML and marked WORKING COPY.

`app.js` renders these centralized sources into the page. No editable Task 07 copy is scattered through repeated component templates.

## 4. Explanatory visuals implemented

### HERO

- restrained explanatory daily schedule/status panel;
- examples for Duke / Chandler;
- completed/active/planned states;
- explicit note that this is explanatory UI, not live telemetry or PULS.

### Named individual zones

- touch/click zone switcher;
- `Duke — молоді`;
- `Chandler — плодоношення`;
- `Томати чері`;
- `Улюблена грядка`;
- each zone changes the visible daily example schedule;
- explicit zone-level control boundary.

### Actual volume

- target `800 л`;
- checkpoints `200 → 400 → 600 → 800 → 802`;
- completed state;
- comparison: timer duration vs BB610 actual delivered volume;
- explicit explanatory/demo labeling.

### Fertigation / stock solution

- owner prepares/connects the stock solution;
- BB610 mixing/recirculation and programmed dosing shown as subsequent process;
- wet/feed/flush `15 / 70 / 15` explanatory bars;
- mandatory non-prescriptive agronomic note;
- F2 explanatory flow with stock A + stock B and two-channel concept;
- mixing-pump location/quantity communicated from frozen architecture facts.

### pH vs EC

- conceptual water/nutrition process rail;
- pH visually presented as management/correction + control;
- EC visually presented separately as monitoring + deviation notification;
- no closed-loop automatic EC correction implication.

### Normal vs deviation

- side-by-side normal cycle and attention-needed cycle;
- deviation does not invent physical diagnosis;
- working conclusion: owner attention is needed for deviations, not routine normal operation.

### Physical BB610 WATER system

- schematic `CONTROL → HYDRAULIC → ZONE → РОСЛИНИ` explanatory rail;
- human meaning shown for each module;
- no equipment image is presented as approved product proof.

### Installation

- neutral connection diagram for water input, stock A/B, zones, power and external signals;
- process line `Поставили → ... → Робота`;
- frozen facts about quick moisture-protected/error-resistant external electrical connections and pumps inside HYDRAULIC;
- no zero-maintenance/no-specialist claim.

### Before / with BB610

- everyday owner-work comparison shown after price/configuration;
- returns commercial dialogue from technical selection to practical daily effect.

## 5. Interactions implemented

### Named-zone switcher

Keyboard/touch-capable buttons update schedule examples from `visuals.js`.

### Guided configuration

Customer-language questions now actively drive selection:

1. irrigation only / one fertigation channel / two channels;
2. pH yes/no;
3. EC monitoring yes/no;
4. zone configuration;
5. optional HMI.

Logic resolves automatically to exact frozen public names:

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

EC selection automatically implies the P/PE path because PE includes pH functionality + EC monitoring. Irrigation-only disables pH/EC choices.

The resolved zone remains one of:

- Z4(8)
- Z8(12)
- Z12(16)

The result card shows exact version + zone, capabilities and price from `commercial.js`. Missing F1-P/F2-P prices remain `Ціна уточнюється`; no price was invented.

A collapsible technical frozen-version selector remains available for review/verification without becoming the first customer interaction.

## 6. Proof-dependent areas intentionally gated

### Real BB610 PULS

**PROOF NEEDED.**

The R07 page does not render `assets/extracted/13_b432ba406d4c.webp` or any other arbitrary repository image as real PULS evidence.

A large neutral proof slot is prepared so an owner-approved screenshot from the documented real PULS source can later replace it without redesigning the section.

Potential callout labels are visible only as future placeholders and are explicitly marked as conditional on what the approved real screenshot actually proves.

### PULS MOBILE

**PROOF NEEDED.**

Not presented as a finished real product in R07.

### CONTROL / HYDRAULIC / ZONE photography/renders

**PROOF NEEDED.**

R07 uses schematic explanatory geometry only. Existing `assets/extracted/*` equipment images are not used as validation/proof.

### Real installations / farm context

**PROOF NEEDED.**

No contextual photo is presented as a photographed BB610 installation. HERO currently uses explanatory schedule UI without invented installation imagery.

## 7. Files changed from Task 07 assignment

- `docs/website/staging/index.html`
- `docs/website/staging/app.js`
- `docs/website/staging/task07.css`
- `docs/website/staging/data/visuals.js`
- `docs/website/staging/data/ux-content.js`
- `docs/website/R07_VISUAL_UX_IMPLEMENTATION.md`

Not changed:

- root production `index.html`;
- production CSS/JS;
- `CNAME`;
- `docs/website/staging/data/commercial.js`;
- `docs/website/staging/data/assets.js`.

## 8. Responsive checks

Implementation is designed against the required review classes:

- 390×844;
- 430×932;
- 1366×768;
- 1920×1080.

Responsive behavior implemented:

- HERO schedule remains readable and becomes two-row entries when needed;
- named-zone controls become a touch-first horizontally scrollable tab row on mobile;
- actual-volume track hides intermediate labels on narrow screens but preserves target/actual meaning;
- fertigation flow stacks vertically;
- pH/EC roles stack as separate cards;
- normal/deviation comparison stacks;
- proof slot becomes vertical;
- physical architecture becomes a vertical process rail;
- installation steps become vertical;
- guided configuration becomes single-column with large touch targets;
- no new wide table is introduced;
- no interaction depends on hover;
- `prefers-reduced-motion` remains respected.

Browser owner review is still required before PASS because this is staging review, not production acceptance.

## 9. Production confirmation

All Task 07 implementation remains isolated under `docs/website/staging/` plus this review document.

Production `water.bb610.com.ua` was not deployed or changed.

## Stage result

**R07: REVIEW**

Do not deploy to production. Do not freeze copy/design. Do not substitute missing PULS, PULS MOBILE, equipment or installation proof without explicit owner approval and a new assigned task.