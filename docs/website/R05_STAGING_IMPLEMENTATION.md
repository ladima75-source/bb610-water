# BB610 WATER — STAGING IMPLEMENTATION R05

- **Revision:** R05
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Task:** `TASK_05_STAGING_IMPLEMENTATION.md`
- **Source branch:** `main`
- **Task assignment baseline:** `a895643eb64b2259d1a093d639b9c41d7b75c278`
- **Implementation + quick-edit baseline commit:** `ec49338d6efa91b94ea1a91bcedbfe00fb82e1fd`
- **Production:** NOT CHANGED
- **Copy:** WORKING COPY / NOT FREEZE

## 1. Result

Task 05 is implemented as a real isolated working staging/review website, not another concept preview.

Visual working base:

- A — Precision Instrument as primary language;
- B strength used for a larger, clearer real BB610 PULS evidence plate;
- C strength used for clearer master-system architecture inside a visible BB610 WATER frame.

No fourth visual concept was created.

## 2. Staging location / browser review

Repository path:

`docs/website/staging/index.html`

Straightforward branch preview URL:

`https://raw.githack.com/ladima75-source/bb610-water/main/docs/website/staging/index.html`

A commit-pinned URL may also be used after this R05 handoff commit by replacing `main` with the reported commit SHA.

This path is isolated from the production root and does not replace `water.bb610.com.ua`.

## 3. Implemented page scope

The staging homepage contains the compact commercial path requested in R03.1 / Task 05:

1. HERO — actual-result differentiation with explicitly labeled explanatory `800 л / 802 л / Виконано` proof;
2. mechanism — task → execution → measurement → verification;
3. real BB610 PULS evidence using an existing repository asset without redrawing UI;
4. owner/manager operating value;
5. complete BB610 WATER architecture;
6. working configuration selector with frozen 7 versions × 3 zones and HMI state;
7. contact/lead entry carrying the current selected configuration.

The page stays within the intended compact 7-section working structure and does not expand into a generic feature-card landing page.

## 4. Centralized content/data architecture

### Marketing/content

`docs/website/staging/data/content.js`

Contains:

- page title/meta description;
- navigation labels;
- shared CTA labels/destinations;
- HERO eyebrow/headline/subheadline/proof labels;
- all implemented section headings and explanatory copy;
- PULS captions/callouts;
- WATER architecture explanatory copy;
- configuration UI labels/disclaimer;
- contact form labels/copy;
- footer copy.

Key strings are marked as WORKING COPY and are not frozen.

### Commercial/configuration

`docs/website/staging/data/commercial.js`

Normalized as:

- `versions[]`;
- `zones[]`;
- `hmi`;
- `combinations["VERSION|ZONE"]` with `noHmi`, `withHmi`, commercial status/source note.

This is intentionally compatible with later Water Admin/API replacement. HTML components do not contain a manually maintained price matrix.

Frozen versions are exactly:

`I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`

Frozen zones are exactly:

`Z4(8) / Z8(12) / Z12(16)`

EC wording for PE remains monitoring + deviation notification, not automatic EC correction.

### Asset registry

`docs/website/staging/data/assets.js`

Contains centralized references for:

- BB610 PULS desktop evidence;
- current mobile interface asset;
- CONTROL engineering visualization;
- HYDRAULIC engineering visualization;
- ZONE engineering visualization;
- explicit `ASSET/PROOF NEEDED` state.

Real future product photography can replace engineering paths here without restructuring the page.

### Renderer / behavior

`docs/website/staging/app.js`

Consumes the three sources above and renders shared desktop/mobile content. It implements:

- navigation;
- shared CTA labels;
- proof/mechanism/value data;
- PULS evidence;
- architecture layers;
- version/zone/HMI selector;
- resolved price state;
- selected-configuration inheritance into lead context;
- staging-only generation/copy of lead request text without fake backend success.

### Semantic shell

`docs/website/staging/index.html`

Contains semantic sections, headings, form controls and data hooks. It intentionally does not duplicate normal editable marketing/commercial content.

### Visual system

`docs/website/staging/styles.css`

Responsive Precision Instrument working implementation with restrained cyan, matte dark surfaces, technical dividers, large PULS evidence and explicit WATER system framing.

No external UI framework, animation framework or font binary was added.

## 5. Pricing handling

Task 05 requires current repository pricing data without inventing missing values.

The existing production repository table was inspected. It contains exact rows for:

- I;
- F1;
- F1-PE;
- F2;
- F2-PE;

These exact-name combinations were mapped into staging as working repository data.

The old table contains legacy `F1-PH` and `F2-PH`, while current frozen public versions are `F1-P` and `F2-P`.

Task 05 does not authorize silently renaming old commercial rows, therefore all `F1-P` and `F2-P` prices remain `null` / `Ціна уточнюється` until explicit commercial confirmation.

Legacy F1-EC/F2-EC rows are not reintroduced.

## 6. PULS / product evidence

The staging page reuses the existing repository desktop SCADA/PULS asset:

`assets/extracted/13_b432ba406d4c.webp`

It is presented as real repository evidence and is not redrawn/recolored as a fake marketing state.

Current engineering module assets are explicitly labeled `ENGINEERING VISUAL` and are not presented as final serial photography.

Known evidence gap remains visible:

`ASSET/PROOF NEEDED — approved BB610 PULS crop showing target vs actual for one zone/cycle if current repository screenshot is insufficient at review size.`

## 7. Responsive implementation/checks

Responsive CSS and content order were explicitly implemented for the required review sizes:

- 390 × 844;
- 430 × 932;
- 1366 × 768;
- 1920 × 1080.

Implemented safeguards:

- mobile navigation is button-controlled and does not depend on hover;
- mobile HERO is one-column and proof is readable as text;
- no desktop price matrix exists to squeeze/scroll on mobile;
- version and zone controls stack to touch-friendly rows on narrow widths;
- PULS evidence scales within the viewport;
- architecture changes from connected desktop rail to logical mobile stack;
- CTA height is at least ~50 px;
- content containers prevent intended horizontal overflow;
- `prefers-reduced-motion` removes non-essential transitions.

Connector-based implementation did not run a full headless-browser pixel-diff suite; owner browser review at the staging URL is therefore part of R05 REVIEW, as intended by Task 05.

## 8. SEO / semantic HTML

Staging implementation includes:

- one H1;
- logical H2/H3 hierarchy;
- semantic links/buttons/fieldsets/labels;
- real indexable text;
- meaningful image alt text;
- no key copy baked into images;
- centralized title/meta description;
- staging-specific `noindex,nofollow` so the review page is not intended for search indexing.

No filler SEO copy was added.

## 9. Quick edit guide

Created:

`docs/website/QUICK_EDIT_GUIDE.md`

It documents the exact source location for changing:

- HERO copy;
- shared CTA labels;
- section text;
- product/version descriptions;
- prices/HMI/commercial states;
- PULS and engineering asset references.

Normal content/pricing changes do not require editing `index.html` or rewriting layout components.

## 10. Files created

- `docs/website/staging/index.html`
- `docs/website/staging/styles.css`
- `docs/website/staging/app.js`
- `docs/website/staging/data/content.js`
- `docs/website/staging/data/commercial.js`
- `docs/website/staging/data/assets.js`
- `docs/website/QUICK_EDIT_GUIDE.md`
- `docs/website/R05_STAGING_IMPLEMENTATION.md`

## 11. Production safety

Task 05 did **not** modify:

- root production `index.html`;
- `css/final-original.css`;
- `js/final-original.js`;
- `CNAME`;
- `water.bb610.com.ua` deployment/runtime.

All new implementation files are isolated under `docs/website/staging/` plus documentation under `docs/website/`.

Rollback is trivial: production is untouched; staging files can be removed independently if required.

## 12. Known gaps / next-review items

- Final slogans/HERO-copy remain WORKING COPY.
- `F1-P` and `F2-P` pricing requires explicit commercial confirmation.
- Confirm whether the current PULS screenshot proves plan-vs-actual strongly enough at website review scale; otherwise provide an approved focused crop.
- Confirm which current PULS MOBILE screen(s) are approved and which mobile capabilities are safe to claim publicly.
- Final serial product photography is not yet available; staging uses labeled engineering visuals.
- Contact form backend is intentionally not built in Task 05; staging generates a copyable request text and does not fake successful submission.
- Full Water Admin is intentionally deferred.

## Stage result

**R05: REVIEW**

Stop here. Do not deploy production, freeze copy, build full Water Admin or proceed to another task without PASS/new ASSIGNED TASK.
