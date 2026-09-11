# BB610 WATER — TASK 15 / ASSET INTEGRATION + STAGING CANDIDATE

- **Status:** ASSIGNED
- **Base:** R14 commit `272e3731203cf037a04647e0eb6c2a3cea2f7070`
- **Goal:** stop redesigning accepted UI; integrate every real approved asset already available in repository/project sources, prepare a single staging-candidate build, and produce an exact missing-assets/data acquisition list for the owner
- **Production:** DO NOT CHANGE

## 1. Freeze the current UI direction

R14 design/commercial structure is the current working direction. Do not create another visual concept and do not rewrite accepted commercial sections unless a concrete integration/QA issue requires it.

Preserve:
- full accepted HERO copy;
- graphite BB610 WATER design system;
- dialogue configurator;
- named zones and litre/queue logic;
- actual-volume proof;
- pH vs EC product truth;
- current section order;
- current typography/grid/token system.

## 2. Real asset audit — repository first

Before leaving any placeholder, search the repository/project-controlled website assets for usable approved materials.

Audit and classify candidates for:
- BB610 WATER logo;
- BB610 PULS screenshots;
- CONTROL visuals;
- HYDRAULIC visuals;
- ZONE visuals;
- system/process diagrams suitable for PUBLIC use;
- agricultural/context images already approved for public use.

Do NOT use internal engineering drawings as public marketing art if they expose component/BOM/pinout detail.
Do NOT use obsolete PULS screenshots if they contradict current v0.28 UX/product truth.
Do NOT invent PULS/PULS MOBILE logos.

For each candidate record: path, what it depicts, whether CURRENT/OBSOLETE/UNCERTAIN, PUBLIC suitability, and decision USE / HOLD / REJECT.

## 3. PULS integration

If current real approved PULS screenshots exist in repository/project-controlled assets, integrate them into the existing R14 PULS proof section.

Use the commercial sequence:

**Ви задали → BB610 WATER виконав → BB610 WATER перевірив.**

Preferred proof crops/content:
1. New Task: zone + recipe + volume target;
2. Schedule: irrigation block / queued tasks;
3. MAIN: target / actual / progress and relevant process readings.

Do not reproduce the whole browser/Windows desktop if a clean crop communicates the product better. Preserve the real UI; crop only, no fake reconstruction.

If the correct current screenshots are not available, keep the neutral slot and report the exact file needed. Do not block the rest of TASK 15.

## 4. CONTROL / HYDRAULIC / ZONE integration

Use only presentation-safe approved visuals.

Commercial role:
- CONTROL — керування;
- HYDRAULIC — підготовка води / фертигація / вимірювання according to configuration;
- ZONE — розподіл по зонах.

If only INTERNAL engineering masters exist, do not expose them. Keep the existing commercial placeholder and request/export a PUBLIC/presentation-safe visual.

## 5. Asset presentation quality

Any real asset inserted must be treated as part of the design system:
- consistent crop/aspect ratio;
- no accidental browser chrome unless meaningful;
- readable at desktop and mobile;
- no stretched images;
- no tiny illegible screenshots;
- captions explain buyer value, not filename/revision;
- use image loading/size attributes sensibly.

## 6. Data blocker audit

Audit centralized commercial data for the full 7 × 3 configuration matrix and HMI handling.

Do not invent missing prices.

Produce an exact table of:
- model;
- zone configuration;
- price without HMI if known;
- price with HMI if known;
- status APPROVED / MISSING / LEGACY-ONLY / CONFLICT.

Pay special attention to F1-P and F2-P. If a price is unavailable, UI remains `Ціна уточнюється`.

## 7. Staging-candidate build

Create:
`docs/website/review/r15/`

This must be a coherent candidate for replacing the old staging after owner approval — not another concept branch.

Integrate all safe/real assets found in this task. Where assets/data remain unavailable, preserve deliberate placeholders/fallbacks without debug language.

## 8. Final whole-page QA

Check at minimum:
- 1920×1080
- 1366×768
- 1024×768
- 768×1024
- 430×932
- 390×844

Inspect visually/logically:
- word/sentence wrapping;
- logo sizing/crop;
- section rhythm;
- PULS image readability;
- equipment visual readability;
- dialogue configurator states;
- all 7 product resolution paths;
- zone options;
- HMI;
- pricing fallback;
- contact handoff;
- sticky header/anchors;
- no internal/review/debug language visible to buyer;
- no horizontal overflow.

Fix ordinary UI/CSS/copy defects encountered during this pass without opening a new redesign cycle.

## 9. Readiness decision

In the report, every major section gets exactly one status:
- `READY`
- `READY / ASSET OPTIONAL`
- `ASSET BLOCKED`
- `DATA BLOCKED`

Also provide one overall verdict:
- `READY FOR OWNER VISUAL REVIEW`
- or `BLOCKED` with a concrete reason.

Do not mark the whole page blocked merely because optional photography is absent.

## 10. Deliverables

Create:
- `docs/website/R15_ASSET_INTEGRATION_AND_STAGING_CANDIDATE.md`
- `docs/website/R15_ASSET_AUDIT.md`
- `docs/website/R15_PRICE_MATRIX_AUDIT.md`

Set **R15 = REVIEW**.

Report:
1. preview URL;
2. real assets found and used;
3. assets rejected/held and why;
4. exact missing asset requests;
5. exact missing/conflicting price rows;
6. whole-page QA fixes made;
7. readiness table;
8. overall verdict;
9. commit SHA.

Then STOP. Do not merge into staging and do not touch production.