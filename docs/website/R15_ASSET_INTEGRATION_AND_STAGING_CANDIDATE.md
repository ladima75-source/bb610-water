# BB610 WATER — R15 / ASSET INTEGRATION + STAGING CANDIDATE

- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R14 `272e3731203cf037a04647e0eb6c2a3cea2f7070`
- **Assignment:** `TASK_15_ASSET_INTEGRATION_AND_STAGING_CANDIDATE.md`
- **Production:** NOT CHANGED
- **Accepted R07.2 staging:** NOT CHANGED

## Preview

`docs/website/review/r15/index.html`

Commit-pinned preview is reported with the final handoff SHA.

## 1. What R15 is

R15 is the staging-candidate continuation of R14. No new concept, section order, product architecture or configurator architecture was introduced.

Preserved:
- exact accepted HERO proposition and lead;
- graphite BB610 WATER design system;
- WORKDAY high on the page;
- named-zone and litre/queue model;
- actual-volume proof;
- fertigation and pH/EC truth;
- deviations/PULS/system flow;
- dialogue configurator;
- final contact continuation.

## 2. Real assets integrated

Integrated after repository/public-suitability audit:

1. `assets/extracted/02_ae24f7eff9c5.webp` — approved BB610 WATER logo;
2. `assets/extracted/08_a48110ba0ba8.webp` — CONTROL presentation visual;
3. `assets/extracted/09_63f4616bc782.webp` — HYDRAULIC presentation visual;
4. `assets/extracted/10_131ed62b8eb2.webp` — ZONE presentation visual.

Module images use stable media areas, `object-fit: contain`, intrinsic width/height, lazy loading and buyer-facing captions. No fabricated equipment image is used.

Detailed classification: `docs/website/R15_ASSET_AUDIT.md`.

## 3. Assets held/rejected

- legacy equipment thumbnails `03…/04…/05…` rejected in favor of current public module visuals `08…/09…/10…`;
- legacy `BB610 Mobile` / SCADA imagery `06…/12…/13…` not used as current PULS proof;
- `BB610 Systems` mark `11…` rejected because the current architecture reserves `BB610 SYSTEM` from public use;
- legacy process diagram `07…` held pending content revalidation rather than reintroducing potentially superseded product logic;
- Intelligence assets `14…/15…` held because they are not required by the accepted homepage and currentness was not revalidated in this task;
- unidentified `01…` held.

## 4. Exact missing assets

Only current product-proof media remain genuinely required:
- approved real BB610 PULS v0.28 `New Task` screenshot/crop;
- approved real BB610 PULS v0.28 `Schedule` screenshot/crop;
- approved real BB610 PULS v0.28 `MAIN` screenshot/crop.

Agricultural/context photography is optional and does not block the candidate.

## 5. Price matrix audit

The complete 7 × 3 matrix was audited: 21 rows.

- 15 rows: APPROVED, with both without-HMI and with-HMI prices;
- 6 rows: MISSING;
- no accepted centralized row classified LEGACY-ONLY;
- no conflict found inside the current accepted centralized matrix.

Missing rows:
1. F1-P / Z4(8)
2. F1-P / Z8(12)
3. F1-P / Z12(16)
4. F2-P / Z4(8)
5. F2-P / Z8(12)
6. F2-P / Z12(16)

For every missing row the UI remains `Ціна уточнюється`; no price is inferred.

Detailed table: `docs/website/R15_PRICE_MATRIX_AUDIT.md`.

## 6. QA / defects closed in this pass

- real module assets replace generic architecture placeholders without altering section structure;
- intrinsic image dimensions added to prevent avoidable layout shift;
- module visuals use consistent aspect/crop behavior on desktop/tablet/mobile;
- historical PULS images are prevented from silently appearing as current proof;
- PULS empty states remain buyer-facing and deliberate;
- R14 dialogue configurator, dependent pH/EC logic, HMI handling and contact handoff are preserved unchanged;
- missing-price fallback remains commercial, not debug language;
- accepted logo remains an image asset, not a reconstructed text mark;
- no public `BB610 Systems` logo or invented PULS/PULS MOBILE logo is introduced;
- no new horizontal-scroll UI was added.

Responsive rules were reviewed for the required states already defined by the accepted design system: 1920×1080, 1366×768, 1024×768, 768×1024, 430×932 and 390×844. Asset integration respects the same breakpoints; module media collapse from the three-column architecture layout to single-column and retain readable proportions.

## 7. Product-resolution QA

Dialogue mapping remains exactly:
- irrigation only → `I`;
- 1 fert channel → `F1`;
- 1 fert + pH → `F1-P`;
- 1 fert + pH + EC monitoring → `F1-PE`;
- 2 fert channels → `F2`;
- 2 fert + pH → `F2-P`;
- 2 fert + pH + EC monitoring → `F2-PE`.

EC selection forces the PE logic with pH; irrigation-only does not expose impossible P/PE derivatives. Zone choices remain Z4(8), Z8(12), Z12(16). HMI switches only the price column. Contact handoff retains the resolved model/zone/HMI context.

## 8. Readiness table

| Major section | Status | Note |
|---|---|---|
| Header / navigation | **READY** | approved WATER logo integrated |
| HERO | **READY / ASSET OPTIONAL** | agricultural photo not required |
| WORKDAY | **READY** | accepted commercial value flow |
| Routine / owner decision | **READY** | no blocker |
| Named zones | **READY** | accepted interaction retained |
| Actual volume | **READY** | commercial proof complete |
| Fertigation | **READY** | no asset dependency |
| pH / EC | **READY** | product roles distinct |
| Deviations / protection | **READY** | no blocker |
| BB610 PULS proof | **ASSET BLOCKED** | current real v0.28 screenshots missing |
| CONTROL / HYDRAULIC / ZONE | **READY** | real public module visuals integrated |
| Installation | **READY / ASSET OPTIONAL** | context photo optional |
| Dialogue configurator | **DATA BLOCKED** | six F1-P/F2-P price rows missing; functional fallback is correct |
| Contact flow | **READY** | resolved configuration carried forward |
| Footer | **READY** | approved WATER logo integrated |

## 9. Overall verdict

**READY FOR OWNER VISUAL REVIEW**

The page is not blocked as a staging candidate by optional photography or by the six missing prices because the UI has an explicit approved fallback. Before final commercial release, the remaining mandatory acquisitions are the three current PULS v0.28 screenshots and approved F1-P/F2-P price rows.

## 10. Files created for R15

- `docs/website/review/r15/index.html`
- `docs/website/review/r15/styles.css`
- `docs/website/review/r15/assets.js`
- `docs/website/review/r15/app.js`
- `docs/website/R15_ASSET_AUDIT.md`
- `docs/website/R15_PRICE_MATRIX_AUDIT.md`
- `docs/website/R15_ASSET_INTEGRATION_AND_STAGING_CANDIDATE.md`

**R15 = REVIEW.** Stop here; no merge to staging or production.
