# BB610 WATER — COMMERCIAL DIALOGUE R06

- **Revision:** R06
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Base:** R05 PASS staging implementation
- **Task:** `TASK_06_COMMERCIAL_DIALOGUE_R1.md` + owner clarification
- **Working copy source:** `BB610_WATER_COMMERCIAL_COPY_R1.md`
- **Implementation commit:** `d584cbe11be8028d3b3d40e01597ce23b09d6f9b`
- **Scope:** commercial/textual recomposition only; visual-proof work deferred
- **Copy:** WORKING COPY / NOT FREEZE
- **Production:** NOT CHANGED

## 1. Review access

Staging path:

`docs/website/staging/index.html`

Commit-pinned review URL:

`https://rawcdn.githack.com/ladima75-source/bb610-water/d584cbe11be8028d3b3d40e01597ce23b09d6f9b/docs/website/staging/index.html`

The same responsive page is used for desktop and mobile review.

## 2. Commercial dialogue implemented

The R05 staging page was recomposed around the agreed commercial conversation from `BB610_WATER_COMMERCIAL_COPY_R1.md`:

1. HERO: owner remains the decision-maker; BB610 takes over irrigation/feeding routine.
2. Irrigation and feeding by the owner’s schedule, including the four-block explanatory daily example.
3. Individual regime and human-readable names for each zone.
4. Actual measured result rather than command-only automation, including the clearly labeled `800 л / 802 л` explanatory example.
5. Deviation/control logic with validated wording only.
6. Fertigation as part of the irrigation cycle; stock solution remains owner-prepared; wet/feed/flush example is explicitly non-prescriptive.
7. Separate pH/EC distinction: pH management/correction and control; EC monitoring/deviation notification only.
8. Concrete owner impact: fewer manual launches, zone-specific regimes, factual execution visibility, attention to deviations.
9. PULS textual role only in this task.
10. CONTROL / HYDRAULIC / ZONE physical system and plug-and-play installation intent.
11. Customer-language configuration dialogue followed by the exact frozen technical selector and price state.
12. Final conversion/contact copy.

All marketing wording remains WORKING COPY.

## 3. Centralized content/data architecture preserved

R05 architecture was retained.

### Marketing/content source

`docs/website/staging/data/content.js`

All new Task 06 copy, CTA labels, demo zone names, customer questions and explanatory examples live here.

### Commercial source

`docs/website/staging/data/commercial.js`

**Not changed in R06.**

The exact frozen versions remain:

`I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`

Zones remain:

`Z4(8) / Z8(12) / Z12(16)`

No missing F1-P/F2-P price was invented.

### Asset source

`docs/website/staging/data/assets.js`

**Not changed in R06.**

### Rendering

`docs/website/staging/app.js`

The page continues to render both desktop and mobile from the same centralized sources.

## 4. Owner clarification about visuals applied

R06 deliberately does not select, replace, crop, annotate or validate:

- photographs;
- PULS screenshots;
- engineering visuals;
- schemes;
- graphs;
- animations;
- any other visual proof.

No `assets/extracted/*` file is treated as verified real-product evidence merely because it exists in the repository.

Current staging images remain temporarily in place and are explicitly labeled as placeholders/review-later material.

Real BB610 PULS visual presentation is deferred to the next dedicated stage.

PULS MOBILE is not presented as an already finished real product; the staging text marks it as a project/development direction until separately confirmed.

## 5. Files changed in Task 06

Staging changes:

- `docs/website/staging/data/content.js`
- `docs/website/staging/index.html`
- `docs/website/staging/app.js`
- `docs/website/staging/task06.css`

Review document:

- `docs/website/R06_COMMERCIAL_DIALOGUE.md`

A concurrent supervising-chat file `docs/website/BB610_WATER_COMMERCIAL_COPY_R1.md` appeared during execution and was then used as the authoritative WORKING COPY source for final alignment.

`commercial.js`, `assets.js`, production root files and production deployment were not changed by R06 implementation.

## 6. Responsive / structural checks

The accepted R05 responsive system remains the base.

Task 06 additions use the same breakpoints and tokens:

- new dialogue grids collapse to one column on mobile;
- principle and wet/feed/flush sequences stack vertically on narrow screens;
- configuration remains touch-friendly and consumes the same commercial data source;
- no fixed-width commercial table was introduced;
- no new horizontal-overflow dependency was introduced;
- desktop structure remains compatible with the existing 1366/1920 review layouts;
- mobile structure remains compatible with the existing <=760 px rules used for 390/430 review widths.

Owner browser review remains required before PASS.

## 7. Items still open

- all slogans/headlines/body copy are WORKING COPY;
- exact visual treatment of real BB610 PULS is deferred;
- final engineering/product imagery is deferred;
- PULS MOBILE product-state/visual confirmation is deferred;
- full production contact backend is outside Task 06;
- full Water Admin remains outside Task 06.

## 8. Production confirmation

Task 06 changes are isolated to `docs/website/staging/` and review documentation.

`water.bb610.com.ua`, root production `index.html`, root production CSS/JS and `CNAME` were not changed.

## Stage result

**R06 = REVIEW**

Stop after review handoff. Do not deploy production, freeze copy, or begin visual-proof selection without a new explicit assignment.
