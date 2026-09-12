# BB610 WATER — R21 PUBLIC WEBSITE COMPLETION

**Status:** REVIEW  
**Source base:** R16 = PASS / WORKING BASE  
**Canonical staging:** `docs/website/staging/`  
**Review branch:** `review/r21-public-website-completion`

## Scope

Completion/polish pass existing R16 staging. No production deployment. No changes to Admin production, API, PostgreSQL, Nginx/TLS, Market, PLC/SCADA or public `water.bb610.com.ua`.

## Section-by-section decision

| Section | Decision | R21 result |
|---|---|---|
| Hero | refine | CTA hierarchy kept; secondary CTA now leads to product architecture; copy tightened |
| Owner value | refine | duplicate wording reduced; clearer before/after contrast |
| Routine | merge/remove | repetitive R16 routine chapter absorbed into HOW IT WORKS |
| CONTROL / HYDRAULIC / ZONE | move earlier + refine | now follows value proposition; existing approved engineering media retained |
| HOW IT WORKS | complete | added four-step execution logic and safe connection presentation slot without inventing a final scheme |
| Zones | keep + polish | clearer examples; physical Z4(8)/Z8(12)/Z12(16) and up-to-36 logical-zone note aligned with product architecture |
| Actual volume proof | keep | core proof unchanged |
| Fertigation | keep + polish | wording tightened; cycle remains explicitly illustrative |
| pH / EC | keep + polish | pH management and EC monitoring distinction preserved; English `closed-loop` removed from public copy |
| Deviations / safety | keep + polish | three response levels preserved |
| Versions / commercial | complete | new 7-model × 3-zone matrix rendered from canonical commercial data; no duplicated hard-coded prices |
| BB610 PULS | refine | fixed media slots; no broken image or technical `null` state when approved screenshots are absent |
| Plug&Play / installation | refine | product boundary and prepared external connections clarified; no new connection scheme invented |
| Configurator | refine | canonical catalog preserved; PRICE_ON_REQUEST receives a dedicated state and CTA |
| Final CTA / form | refine | selected configuration context retained; form transport remains an unresolved release dependency |
| Footer | refine | return-to-top link added |

## Significant before / after

| Before R21 | After R21 |
|---|---|
| Physical architecture appeared late in the page | CONTROL / HYDRAULIC / ZONE appears immediately after value proposition |
| No complete HOW IT WORKS chapter | Four-step `задаєте → виконує → вимірює → результат` flow + replaceable connection media slot |
| No compact public explanation of all 7 models before configurator | Seven model cards plus 7×3 commercial matrix from `BB610_COMMERCIAL_CATALOG` |
| F1-P / F2-P null prices looked like generic price clarification | Explicit `PRICE_ON_REQUEST · ціна надається за запитом` and `Запросити ціну` CTA |
| PULS missing screenshots were labelled as visuals being prepared | Stable branded proof slots show the intended screen purpose without broken media |
| Public commercial loader defaulted to `localhost:8080` | No default dev endpoint; source fallback remains active until an endpoint is explicitly configured |
| Some public wording mixed internal/English terminology | Ukrainian editorial pass; product/UI names remain in their approved form |

## Intentionally unchanged

- R16 Precision Instrument visual direction.
- Existing centralized `data/content.js`, `data/commercial.js`, `data/system.js`, `data/assets.js` architecture.
- Approved BB610 WATER logo.
- Approved engineering module media for CONTROL / HYDRAULIC / ZONE.
- Core actual-volume proof and explanatory numeric examples.
- Canonical `BB610_COMMERCIAL_CATALOG` values.
- F1-P / F2-P six rows remain `PRICE_ON_REQUEST`; values are not fabricated.
- No PULS screenshot selected independently.
- No hero / installation photography selected independently.
- No final connection scheme selected or generated.

## Commercial validation

**PASS**

- 7 models × 3 zones = 21 rows.
- 15 `APPROVED`.
- 6 `PRICE_ON_REQUEST` (F1-P and F2-P across all three zone configurations).
- without HMI / with HMI semantics preserved.
- unavailable rows remain distinct from price-on-request rows.
- F1-P and F2-P configurator paths show `Ціна за запитом` and `Запросити ціну`.

## Responsive / functional validation

Rendered browser validation: **PASS**.  
GitHub Actions run: `34673323519` — `R21 Public Website Review` — SUCCESS.  
Review artifact: `R21_PUBLIC_WEBSITE_REVIEW`, artifact ID `10290789876`, SHA-256 `31d0735126166c08d3089c1b119778f1acd25faa4b49000ef630beb0e6175105`.

Validated against actually rendered staging at 1440, 1024, 768, 390 and 360 px:

- no page overflow at 1024 / 768 / 390 / 360;
- navigation anchors present;
- mobile menu opens and closes at 768 / 390 / 360;
- no console errors;
- no JS page errors;
- no broken HTTP resources;
- no broken images;
- commercial 7×3 invariant and six PRICE_ON_REQUEST rows;
- rendered 7×3 commercial matrix;
- F1-P and F2-P configurator state and CTA;
- missing PULS assets degrade to stable review-only media slots;
- no localhost / 127.0.0.1 endpoint in public runtime.

Detailed evidence:

- `docs/website/review/r21/VALIDATION.md`
- `docs/website/review/r21/validation.json`

## Review screenshots

Desktop:

- `docs/website/review/r21/screenshots/r21_desktop_full_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_hero_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_modules_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_how_it_works_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_versions_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_configurator_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_software_1440.png`
- `docs/website/review/r21/screenshots/r21_desktop_final_cta_1440.png`

Mobile:

- `docs/website/review/r21/screenshots/r21_mobile_full_390.png`
- `docs/website/review/r21/screenshots/r21_mobile_hero_390.png`
- `docs/website/review/r21/screenshots/r21_mobile_modules_390.png`
- `docs/website/review/r21/screenshots/r21_mobile_how_it_works_390.png`
- `docs/website/review/r21/screenshots/r21_mobile_versions_390.png`
- `docs/website/review/r21/screenshots/r21_mobile_configurator_390.png`
- `docs/website/review/r21/screenshots/r21_mobile_software_390.png`

## Unresolved items

1. Three approved BB610 PULS v0.28 screenshots: New Task, Schedule, MAIN.
2. Final approved connection scheme asset for the prepared HOW IT WORKS slot.
3. Final hero / installation photography if the supervising chat chooses to add it.
4. Lead-form delivery transport / contact endpoint is not defined in the current public staging architecture; R21 does not invent one.
5. Public API cutover is intentionally not activated by R21.

The six F1-P / F2-P price rows are **not an R21 blocker** and intentionally remain `PRICE_ON_REQUEST`.

## Changed files

- `docs/website/staging/index.html`
- `docs/website/staging/styles.css`
- `docs/website/staging/app.js`
- `docs/website/staging/asset-integration.js`
- `docs/website/staging/data/content.js`
- `docs/website/staging/data/commercial.js`
- `docs/website/staging/data/assets.js`
- `.github/scripts/r21-public-review.mjs`
- `.github/workflows/r21-public-review.yml`
- `docs/website/R21_PUBLIC_WEBSITE_COMPLETION.md`
- `docs/website/review/r21/VALIDATION.md`
- `docs/website/review/r21/validation.json`
- `docs/website/review/r21/screenshots/*.png`

## Commits

Rendered implementation + validation harness commit: `642452479b9f9372ac66686fe9bca12973212329`.  
Rendered review evidence commit: `3dfc7657dab7ff8a0bbe9eb92fbecb90218a0976`.  
Final report commit is the current HEAD of `review/r21-public-website-completion`.

No production deployment performed. TASK 22 is not started.
