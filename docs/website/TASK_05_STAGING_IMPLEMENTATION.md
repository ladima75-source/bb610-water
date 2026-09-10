# BB610 WATER — TASK 05 / WORKING STAGING IMPLEMENTATION

- **Task:** 05
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Inputs:** R03.1 PASS; R04/R04.1 REVIEW; PRODUCT CONFIGURATION FREEZE R1; PRODUCT ARCHITECTURE FREEZE R1
- **Visual working base:** A — Precision Instrument, with controlled use of B/C strengths described below
- **Copy status:** WORKING COPY, NOT FREEZE
- **Production:** DO NOT CHANGE

## 1. Objective

Build the first real working review/staging version of the new BB610 WATER website so the owner can evaluate it as a website on desktop and mobile and request fast iterative changes.

Stop producing additional abstract A/B/C comparison documents. From this point, use a single working implementation and improve it iteratively.

This is NOT production deployment.

## 2. Visual direction

Use **A — Precision Instrument** as the main visual base.

Allowed controlled borrowing:

- from B: larger, clearer presentation of real BB610 PULS evidence;
- from C: clearer explanation of BB610 WATER system architecture.

Do not create a fourth visual concept. Do not restart design exploration.

The result should remain professional, industrial, calm, precise, modern and trustworthy.

## 3. Critical maintainability requirement

The owner has explicitly requested rapid future correction of slogans, texts, CTAs and commercial content.

Therefore DO NOT hard-code editable marketing/commercial content throughout page components.

Create a clear centralized content/data layer suitable for later Water Admin integration.

At minimum separate:

### A. Marketing/content data
- HERO eyebrow/headline/subheadline;
- section headings;
- section explanatory copy;
- CTA labels/destinations;
- labels around proof/examples;
- navigation labels where practical;
- contact labels/data where applicable.

### B. Commercial/configuration data
- seven product versions;
- version labels/descriptions/features;
- three zone configurations;
- price values;
- HMI option/state/price where current source supports it;
- combination-specific commercial data/disclaimers.

### C. Asset references
- PULS screenshots;
- engineering visualizations;
- future product photography slots.

The page/components must render from these sources rather than duplicating values in multiple templates.

Document exactly which files the owner/developer changes for quick copy/content edits before Admin exists.

## 4. Future Water Admin boundary

Do NOT build the full Admin backend in Task 05.

However, structure the data so later Admin can replace/edit the commercial/content source without redesigning public components.

Pricing/configuration components must not depend on manually edited HTML tables.

The same source must support desktop and mobile rendering.

## 5. Working copy

Current slogans/headlines are NOT approved final marketing copy.

Use the current R03.1 wording only as working content where necessary.

Clearly mark in the content source/documentation which key strings are `WORKING COPY`.

Do not delay staging implementation waiting for final slogans. The architecture must make changing them trivial later.

## 6. Homepage scope

Implement the accepted compact homepage structure from R03.1, approximately 7–8 meaningful sections maximum.

The first commercial chain must remain clear:

1. what BB610 WATER changes — actual result, not only command/time;
2. how actual execution is checked;
3. real BB610 PULS proof;
4. what this gives the owner/manager;
5. how WATER is built as one coordinated system;
6. configurations/value/price path;
7. conversion to `Підібрати конфігурацію`.

Do not re-expand the page into a long grid of generic feature cards.

## 7. HERO

Use the R03.1 Variant A hierarchy as a starting point, not copy freeze.

The explanatory `800 л → 802 л` example may be used, but it must be visibly identified as an explanatory example and must not resemble current live telemetry.

HERO must remain easy to rewrite from the centralized content layer.

## 8. Real PULS proof

Use real existing BB610 PULS/SCADA assets where available.

Do not fabricate or redraw PULS screens.

The presentation may use the larger editorial framing learned from direction B if it improves legibility.

If the available real asset does not prove a specific claim, show a neutral proof-needed state during staging rather than inventing evidence.

## 9. Product hierarchy

Implement the frozen hierarchy consistently:

- BB610 WATER = complete system;
- CONTROL / HYDRAULIC / ZONE = physical layer;
- BB610 PULS = main control software / SCADA;
- BB610 PULS MOBILE = mobile interface;
- BB610 INTELLIGENCE = analytical/intelligent layer;
- BB610 SYSTEM = RESERVED / not public.

Use C's stronger architecture clarity if useful, but keep all layers visually subordinate to the master WATER system.

## 10. Configuration/pricing

Implement a working review version of the selector using exactly:

Versions:
- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

Zones:
- Z4(8)
- Z8(12)
- Z12(16)

Every resolved selection must clearly show exact version + zone configuration, e.g. `F1-PE / Z8(12)`.

EC in PE = monitoring/deviation notification; do not imply automatic EC correction.

Use current repository pricing source/data. Do not invent missing prices.

Desktop and mobile must consume the same data but may render differently.

## 11. Responsive/mobile

This is a real mobile implementation, not a screenshot exercise.

Review at minimum:

- 390×844;
- 430×932;
- 1366×768;
- 1920×1080.

Requirements:

- readable HERO;
- no horizontal overflow;
- real PULS evidence remains understandable;
- architecture stacks logically;
- configuration selector is touch-friendly;
- CTA targets are comfortable;
- navigation works without hover dependency;
- no tiny desktop tables on mobile.

## 12. SEO/HTML

Use semantic HTML and real indexable text.

At minimum:

- one clear H1;
- logical H2/H3 hierarchy;
- real links/buttons with appropriate semantics;
- useful alt text for meaningful images;
- decorative images treated as decorative;
- no key text baked into images;
- page title/meta description from centralized content/config where practical.

Do not add filler SEO paragraphs.

## 13. Performance

Prefer existing lightweight architecture unless a change is demonstrably necessary.

Avoid heavy JS frameworks/dependencies solely for presentation.

Use CSS/SVG and small purposeful JS.

Respect `prefers-reduced-motion`.

Do not add heavy decorative video/3D/parallax.

## 14. Repository safety / staging isolation

Do not modify production deployment or production domain.

Implement in a clearly isolated staging/review path or branch according to the repository's existing safe workflow.

Do not overwrite the current production site merely to make review easier.

Preserve rollback capability.

## 15. Review access

The deliverable is not complete until the owner has a straightforward way to open the working site in a browser.

Provide either:

- a safe staging/review URL, OR
- an existing repository-supported preview mechanism with exact simple instructions.

Do not require the owner to inspect raw HTML files to judge the site.

## 16. Quick-edit documentation

Create a short document showing where to change, before Admin exists:

- HERO headline/subheadline;
- CTA text;
- section copy;
- product/version descriptions;
- prices/HMI data;
- PULS/engineering asset references.

Target: a competent developer should be able to change a slogan or CTA in one source location and see it everywhere it is used.

## 17. Required deliverables

Create/update staging implementation files as needed and create:

`docs/website/R05_STAGING_IMPLEMENTATION.md`

with status **REVIEW**.

R05 must include:

- implementation summary;
- exact staging/preview path or URL;
- files changed;
- content/data architecture;
- how to edit working copy quickly;
- responsive checks performed;
- known gaps/ASSET PROOF NEEDED items;
- confirmation that production was not changed;
- commit SHA.

Also create:

`docs/website/QUICK_EDIT_GUIDE.md`

for the centralized content/data layer.

## 18. Stop condition

After staging implementation is accessible and R05 is committed:

- set R05 = REVIEW;
- report preview URL/path and commit SHA;
- stop;
- do not deploy to production;
- do not freeze slogans/copy;
- do not build full Water Admin yet;
- do not proceed to the next task without PASS/new ASSIGNED TASK.
