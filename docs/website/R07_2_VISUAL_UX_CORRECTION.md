# BB610 WATER — VISUAL & UX CORRECTION R07.2

- **Revision:** R07.2
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Base:** R07.1 REVIEW
- **Scope:** section-order, overall-system naming, and HERO zone-program correction only
- **Staging implementation commit:** `777c11f9c490e96afb1384b38e538b5ae2b9fc95`
- **Copy/design:** WORKING / NOT FREEZE
- **Production:** NOT CHANGED

## 1. Correction objective

R07.2 keeps the accepted R07/R07.1 staging architecture and visual language while applying the owner-requested correction package:

1. move `Що змінюється у вашому робочому дні` directly after HERO;
2. use `BB610 WATER` in user-facing copy when referring to the complete system, rather than shortening the system name to `BB610`;
3. make the HERO block example demonstrate different configured programs for different zones while preserving the R07.1 operating model:
   **start of irrigation block → ordered zone queue → target volume → execution**.

No new concept exploration or product-proof work was introduced.

## 2. Page order

The `#before-with` / `Що змінюється у вашому робочому дні` section is now immediately after `#hero` in the staging HTML source.

The R07.2 JS layer also preserves that order defensively after earlier rendering layers execute.

The section retains its existing `Зараз / З BB610 WATER` comparison structure; it was moved, not redesigned.

## 3. HERO program model

The explanatory HERO now uses the requested working model:

### 06:00 · РАНКОВИЙ БЛОК

1. `Теплиця — томати / 300 л / ВОДА + ЖИВЛЕННЯ`
2. `Лохина — молоді рослини / 220 л / ВОДА + ЖИВЛЕННЯ + pH`
3. `Розсадник / 180 л / ВОДА`

### 15:00 · ДЕННИЙ БЛОК

1. `Полуниця — тунель 1 / 260 л / ВОДА + ЖИВЛЕННЯ`
2. `Клумба Коханої / 120 л / ВОДА`

`Клумба Коханої` is preserved exactly as written and is also available in the named-zone explorer as an example of a free, owner-readable zone name.

The blueberry example explicitly includes `pH` in its program.

## 4. Meaning of time and volume

The explanatory model continues to state that:

- time is the **start time of the irrigation block**;
- inside the block, zone tasks execute **sequentially in a queue**;
- the litre value is the **target volume for the zone task**;
- actual-volume verification remains explained elsewhere on the page and is not turned into a fake SCADA HERO.

The HERO volume values are explicitly labelled as **explanatory demo values**. They are not presented as recommended irrigation norms for tomatoes, blueberry, nursery plants, strawberries or ornamental beds.

## 5. HERO is not PULS / SCADA

The HERO remains lightweight explanatory website UI.

It shows only:

- irrigation-block start;
- ordered zone number;
- owner-readable zone name;
- target volume;
- configured program.

It does not reproduce PULS chrome, controls, telemetry layout, MAIN screen or a fabricated SCADA screenshot.

The existing real-PULS `PROOF NEEDED` gate remains unchanged.

## 6. Overall-system naming

A centralized R07.2 override normalizes user-facing working copy so references to the complete product use **BB610 WATER**.

Branded/subsystem names remain distinct and are not rewritten:

- `BB610 PULS`;
- `BB610 INTELLIGENCE`;
- module names such as `CONTROL`, `HYDRAULIC`, `ZONE`.

Known hard-coded explanatory labels produced by the earlier renderer (`BB610 F2`, `BB610 / HYDRAULIC`) are corrected in the R07.2 rendering layer to `BB610 WATER F2` and `BB610 WATER / HYDRAULIC`.

## 7. Centralized content/data architecture

The R05/R06/R07 architecture remains intact.

R07.2 adds a reversible centralized override layer:

- `docs/website/staging/data/r07_2-overrides.js`

This contains:

- R07.2 HERO blocks and zone programs;
- exact `Клумба Коханої` demo zone;
- blueberry pH program;
- explanatory disclaimer for demo volumes;
- overall-system naming normalization;
- small R07.2 UX copy overrides.

Rendering corrections are isolated in:

- `docs/website/staging/task07_2.js`;
- `docs/website/staging/task07_2.css`.

`commercial.js` remains the commercial source of truth and is unchanged.

## 8. Existing sections deliberately not redesigned

R07.2 does not unnecessarily alter:

- actual-volume proof section;
- fertigation/F2 explanation beyond complete-system naming;
- pH vs EC distinction;
- deviation/safety comparison;
- PULS proof gate;
- physical-system explanatory geometry;
- installation explanation;
- guided configuration logic and centralized pricing;
- contact workflow.

## 9. Review access

Staging path:

`docs/website/staging/index.html`

Commit-pinned preview for the implementation commit:

`https://rawcdn.githack.com/ladima75-source/bb610-water/777c11f9c490e96afb1384b38e538b5ae2b9fc95/docs/website/staging/index.html`

The same responsive staging page is intended for desktop and mobile review.

## 10. Files changed from R07.1 handoff

- `docs/website/staging/index.html`
- `docs/website/staging/data/r07_2-overrides.js`
- `docs/website/staging/task07_2.js`
- `docs/website/staging/task07_2.css`
- `docs/website/R07_2_VISUAL_UX_CORRECTION.md`

No production-root file is part of this correction.

## 11. Production confirmation

Production `water.bb610.com.ua`, root production `index.html`, production CSS/JS and `CNAME` were not changed or deployed.

## Stage result

**R07.2: REVIEW**

Stop after review handoff. Do not deploy production and do not proceed to another stage without an explicit owner instruction / ASSIGNED TASK.
