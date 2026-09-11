# BB610 WATER — FIRST THREE SCREENS RESET R10

- **Revision:** R10
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R07.2 staging
- **R09:** REJECTED / experiment only
- **Scope:** isolated review implementation of first 3 semantic screens only
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED

## Preview

Commit-pinned preview:

`https://rawcdn.githack.com/ladima75-source/bb610-water/COMMIT_SHA/docs/website/review/r10/index.html`

Review path:

`docs/website/review/r10/index.html`

## What R10 implements

### Screen 1 — HERO

Reset to a five-second buyer message:

- H1: `ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ`;
- lead: `BB610 WATER виконує задані вами режими поливу та живлення і контролює фактичний результат.`;
- technical proof line: `Полив за фактичним об’ємом, а не лише за тривалістю.`;
- CTA scrolls directly to Screen 2;
- dominant visual is an honest agricultural `PHOTO PLACEHOLDER`, explicitly not a BB610 WATER installation;
- only one restrained proof element: `Задано 800 л / Фактично 802 л ✓`;
- no queue, schedules, pH/EC, module architecture, config matrix or fake PULS in HERO.

### Screen 2 — workday transformation

One coherent before/after composition:

- `ЗАРАЗ` = manual attention / recurring checks;
- `З BB610 WATER` = scheduled blocks, zone settings, fertigation as program, managed mixing where equipped, actual-volume control, deviations drawing attention;
- conclusion remains attached to the comparison:
  `ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.`

No six-card feature grid and no review commentary visible to buyer.

### Screen 3 — each zone has its own regime

Contains the required examples:

- `Теплиця — томати` / `300 л` / `ВОДА + ЖИВЛЕННЯ`;
- `Лохина — молоді рослини` / `220 л` / `ВОДА + ЖИВЛЕННЯ + pH` / optional `Duke`;
- `Полуниця — тунель 1` / `260 л` / `ВОДА + ЖИВЛЕННЯ`;
- `Розсадник` / `180 л` / `ВОДА`;
- `Клумба Коханої` / `120 л` / `ВОДА`.

Simple selector is used only to make zone differentiation touch-readable. It is explanatory website UI, not a SCADA imitation.

The block example is intentionally limited to:

`06:00 · РАНКОВИЙ БЛОК`

1. `Теплиця — томати → 300 л`
2. `Лохина — молоді рослини → 220 л`
3. `Розсадник → 180 л`

The note explicitly explains that 06:00 is block start, zones execute sequentially, litres are target volume, and all values are explanatory demo rather than irrigation recommendations.

## Deliberately removed compared with R09

- no irrigation queue in HERO;
- no multi-block schedule in HERO;
- no process rail in HERO;
- no multiple state/status fields;
- no farm-context + precision-dashboard composite competing for attention;
- no pseudo-control presentation as the primary visual;
- no second oversized system slogan after H1;
- no technical architecture or configuration content in first three screens;
- no R09-specific dashboard-heavy microcard structure.

The reset moves technical flexibility to Screen 3 and keeps HERO commercial/agricultural first.

## Files created

- `docs/website/review/r10/index.html`
- `docs/website/review/r10/styles.css`
- `docs/website/review/r10/data.js`
- `docs/website/review/r10/app.js`
- `docs/website/R10_FIRST_THREE_SCREENS_RESET.md`

No existing R07.2 staging or production files were modified.

## Centralized review data

Mutable review copy and zone examples live in `review/r10/data.js` rather than being duplicated through layout code. `app.js` renders the zone selector and queue from that source. This keeps the review implementation structurally suitable for later controlled merge if R10 is accepted.

## Responsive checks

Reviewed against the Task 10 target widths through the responsive rules and source layout:

- **390×844** — single-column HERO; H1/lead/CTA remain primary; crop placeholder stays visible; 800/802 proof remains secondary; Screen 2 stacks; Screen 3 selector/queue is vertical with no horizontal dependency.
- **430×932** — same mobile hierarchy with larger breathing room and touch-readable selector rows.
- **1366×768** — HERO uses two-column buyer-message / crop-context layout; proof is restrained in the visual; queue does not appear until Screen 3.
- **1920×1080** — max-width shell prevents over-expansion; typography and whitespace remain controlled.

CSS uses `box-sizing:border-box`, bounded shells, mobile grid collapse at 900px, and a dedicated <=480px restructuring for queue rows. No component requires horizontal scrolling or hover to reveal meaning.

## Unresolved photo need

A final approved agricultural/crop image is still required for HERO. R10 intentionally uses `PHOTO PLACEHOLDER` rather than selecting or implying a real BB610 WATER installation. Image selection/review remains a separate asset decision.

## Boundaries preserved

- `R07.2 staging` — unchanged.
- production `water.bb610.com.ua` — unchanged.
- no PULS proof was fabricated.
- no equipment/install photo was fabricated.
- copy/design remain review material, not FREEZE.

## Commit

Final handoff commit: `COMMIT_SHA`

**STOP CONDITION:** R10 = REVIEW. Do not continue to Screen 4 and do not merge into staging until reviewed.