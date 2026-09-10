# BB610 WATER — R09 HERO + WORKDAY CONSOLIDATION

- **Revision:** R09
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R07.2 staging + R08 visual review + TASK 09
- **Scope:** isolated review implementation of HERO + immediately following WORKDAY screen
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED
- **Implementation commit before review handoff:** `ba78dad64b471de5ed41c3e091521945a5103193`

## Result

One consolidated R09 review page was created. No A/B/C variants remain in this stage.

Review path:

`docs/website/review/r09/index.html`

## Consolidation logic

R09 combines the selected strengths from R08 without looking like three pasted concepts:

- **R08 B / PRECISION CONTROL** — structural base for the irrigation block queue, restrained graphite surfaces, clear queue hierarchy and readable zone/recipe/litre data;
- **R08 A / FARM + LIVE PLAN** — crop/farm context is retained as an honest `CROP / FARM CONTEXT · PHOTO PLACEHOLDER`, explicitly not a photographed BB610 WATER installation;
- **R08 C / WATER PROCESS** — concise explanatory path `СТАРТ БЛОКУ → ЧЕРГА ЗОН → РЕЦЕПТ + ОБ’ЄМ → ФАКТИЧНЕ ВИКОНАННЯ`.

## HERO hierarchy

Working copy follows TASK 09:

- H1: `ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ`;
- support: `Задайте для кожної зони свій режим поливу та живлення. BB610 WATER виконає поливні блоки за вашим графіком і проконтролює фактичний результат.`;
- compact principle: `Ви задаєте → BB610 WATER виконує → BB610 WATER перевіряє`.

The old large second H1 line about taking over routine is not repeated.

## Product model preserved

The HERO visual preserves:

`СТАРТ БЛОКУ → ЧЕРГА ЗОН → РЕЦЕПТ + ОБ’ЄМ → ФАКТИЧНЕ ВИКОНАННЯ`.

Required examples are present exactly:

### 06:00 · РАНКОВИЙ БЛОК

1. `Теплиця — томати` — `300 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Лохина — молоді рослини` — `220 л` — `ВОДА + ЖИВЛЕННЯ + pH`
3. `Розсадник` — `180 л` — `ВОДА`

### 15:00 · ДЕННИЙ БЛОК

1. `Полуниця — тунель 1` — `260 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Клумба Коханої` — `120 л` — `ВОДА`

Time is described as irrigation-block start, never zone duration. Litres are explicitly labelled as explanatory demo values rather than crop recommendations.

## Fact execution cue

A restrained explanatory execution cue is shown for the blueberry demo task:

`Задано 220 л → Фактично 221 л ✓`

It is clearly part of the review explanatory visual and is not represented as BB610 PULS/live telemetry.

## Farm/photo dependency

No unapproved repository image and no fabricated BB610 WATER installation is used.

R09 contains a complete compositional slot labelled:

`CROP / FARM CONTEXT · PHOTO PLACEHOLDER · НЕ ІНСТАЛЯЦІЯ BB610 WATER`

The final crop/farm image remains an unresolved asset decision for a later approved photo stage.

## WORKDAY screen

The second screen remains immediately after HERO and contains only buyer-facing content.

It uses the required calm comparison:

- `ЗАРАЗ` — manual attention/routine;
- `З BB610 WATER` — scheduled blocks, queue execution, zone-specific regimes, fertigation as program, actual-volume control and deviation attention.

Working conclusion receives strong but subordinate emphasis:

`ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.`

No `Variant A/B/C` review commentary appears in buyer-facing page content.

## Architecture / maintainability

Review implementation is isolated under `docs/website/review/r09/`:

- `index.html` — semantic structure only;
- `data.js` — centralized HERO, queue and WORKDAY content/data;
- `app.js` — rendering of centralized data;
- `styles.css` — consolidated responsive visual system.

This keeps content suitable for a later controlled merge into the R07.2 staging architecture after review, without modifying staging now.

## Responsive checks

Implementation was designed/check-reviewed against the required viewport classes:

- 390×844 — dedicated mobile restructuring: single-column HERO, compact H1/lead, queue rows reflow vertically, full-width CTA, workday comparison becomes sequential;
- 430×932 — same mobile layout with additional readable width and no horizontal data table;
- 1366×768 — primary proposition + meaningful precision queue fit in first viewport without treating the queue as a tiny dashboard;
- 1920×1080 — constrained 1180px content width prevents over-stretching and preserves hierarchy.

CSS uses `box-sizing:border-box`, constrained shells and mobile grid changes; no horizontal-scrolling component is introduced. No hover-only information is used. `prefers-reduced-motion` is respected; no looping/decorative animation is included.

## Files created

- `docs/website/review/r09/index.html`
- `docs/website/review/r09/data.js`
- `docs/website/review/r09/app.js`
- `docs/website/review/r09/styles.css`
- `docs/website/R09_HERO_WORKDAY_CONSOLIDATION.md`

No file under `docs/website/staging/` was modified. No production root file, production CSS/JS or CNAME was modified.

## Stage result

**R09: REVIEW**

Stop after review handoff. Do not merge R09 into staging and do not continue to the next site section until reviewed.