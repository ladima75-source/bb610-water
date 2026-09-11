# BB610 WATER — TASK 16 / STAGING PROMOTION + BLOCKER SLOTS

- **Status:** ASSIGNED
- **Source candidate:** R15 commit `4b33876960eeef504a3a6aaa02301ed44fe0dce9`
- **Decision:** R15 is accepted as the new working staging baseline for continued completion work. This is NOT production approval and NOT design FREEZE.
- **Goal:** stop multiplying review branches; promote the accepted candidate into staging, preserve safe fallbacks for the two remaining blocker classes, and prepare the site for direct iterative completion.
- **Production:** DO NOT CHANGE

## 1. Promote R15 to working staging

Replace/update `docs/website/staging/` with the R15 candidate implementation so that all subsequent website work continues from one canonical staging path.

Preserve centralized content/data/assets architecture.

Do not touch root production `index.html`, production CSS/JS, CNAME or live `water.bb610.com.ua`.

## 2. Status semantics

After promotion:

- R15 review remains historical evidence;
- `docs/website/staging/` becomes the canonical current website working build;
- staging status = **PASS / WORKING BASE**;
- design/copy = **NOT FREEZE**;
- production = unchanged.

Do not create another parallel visual concept.

## 3. PULS blocker slots

Keep the three real-product proof slots in staging, but make replacement operationally trivial through centralized `assets.js` (or the current equivalent).

Required slots:
- `pulsNewTask`
- `pulsSchedule`
- `pulsMain`

Each slot must support:
- real image path when supplied;
- meaningful alt text;
- commercial fallback state when absent;
- crop/object-position setting if needed without editing HTML structure.

Fallback buyer-facing text must be concise and must not say `ASSET BLOCKED`, `placeholder`, `review`, filename, revision, repository, TODO or other developer language.

Do not use legacy PULS imagery as a substitute.

## 4. Price blocker handling

Keep centralized price fallback for missing F1-P/F2-P rows:

**Ціна уточнюється**

The configurator remains fully usable even when price is missing.

Do not hide F1-P/F2-P product configurations merely because approved price rows are missing.

Ensure adding the six approved price rows later requires only centralized commercial-data edits, not markup/component changes.

## 5. Preserve accepted current page

No redesign in this task.

Preserve:
- accepted HERO copy and layout;
- graphite design system;
- typography/wrapping system;
- WORKDAY placement;
- named zones;
- actual-volume section;
- fertigation;
- pH/EC distinction;
- deviations;
- real CONTROL/HYDRAULIC/ZONE visuals integrated in R15;
- dialogue configurator;
- contact handoff;
- approved WATER logo asset.

## 6. Staging hygiene

During promotion, remove obsolete staging-only files that conflict with the new canonical build only if they are clearly superseded by R15. Do not delete historical `review/r07...r15` evidence or documentation.

Ensure staging has no broken references caused by copying paths from `review/r15/`.

## 7. QA after promotion

Open/check the canonical staging build, not only the old R15 path.

Verify:
- header/logo;
- all navigation anchors;
- HERO wrapping;
- zone interactions;
- actual-volume proof;
- fertigation/pH/EC/deviation sections;
- CONTROL/HYDRAULIC/ZONE images;
- PULS fallback slots;
- dialogue configurator all seven resolution paths;
- Z4/Z8/Z12;
- HMI price switching;
- missing-price fallback;
- contact handoff;
- mobile at 390×844 and 430×932;
- desktop at 1366×768 and 1920×1080;
- no horizontal overflow;
- no review/debug/internal wording visible to buyer.

Fix ordinary promotion/path defects immediately.

## 8. Completion register

Create `docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md` as the single short operational list from this point forward.

It must contain only unresolved items, grouped:

### REQUIRED BEFORE PRODUCTION
- real approved PULS v0.28 New Task screenshot;
- real approved PULS v0.28 Schedule screenshot;
- real approved PULS v0.28 MAIN screenshot;
- approved prices for F1-P × Z4/Z8/Z12 without/with HMI;
- approved prices for F2-P × Z4/Z8/Z12 without/with HMI.

### OPTIONAL POLISH
- agricultural/context photography if later selected;
- installation/context photography if later selected.

Do not repopulate this register with already completed design tasks.

## 9. Deliverable

Create:
`docs/website/R16_STAGING_PROMOTION.md`

Report:
1. canonical staging URL;
2. exact files promoted/changed;
3. confirmation production unchanged;
4. PULS slot contract;
5. price fallback/data contract;
6. QA result;
7. completion-register path;
8. commit SHA.

Set **R16 = PASS / WORKING BASE** and STOP. Do not touch production.