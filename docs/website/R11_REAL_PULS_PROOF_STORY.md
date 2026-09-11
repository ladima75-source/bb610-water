# BB610 WATER — REAL PULS PRODUCT PROOF STORY R11

- **Revision:** R11
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R07.2 remains the accepted whole-page staging base
- **R10:** REJECTED / not iterated
- **Scope:** isolated real BB610 PULS product-proof section only
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED

## Preview

Review path:

`docs/website/review/r11/index.html`

Commit-pinned preview uses the final R11 handoff commit reported with this document.

## Asset status — GATE ACTIVE

The repository was checked for the three approved v0.28 assets required by Task 11:

- `docs/website/review-assets/puls/puls-main-v028.png`
- `docs/website/review-assets/puls/puls-schedule-v028.png`
- `docs/website/review-assets/puls/puls-new-task-v028.png`

**Status: NOT PRESENT in repository at implementation time.**

Searches for the exact filenames, `v0.28 PULS`, and a `review-assets/puls` approval path returned no approved image source. Per Task 11, arbitrary old repository screenshots and `assets/extracted/*` were not substituted.

Therefore R11 intentionally stops at the asset gate with complete layout slots and crop guidance. No PULS UI was redrawn, imitated or fabricated.

## Product-proof story implemented

The review block is one continuous evidence story:

### 01 — ВИ ЗАДАЛИ

Buyer copy:

`Оберіть зону, рецепт і потрібний об’єм. Рішення залишається за вами.`

Reserved proof source:

`puls-new-task-v028.png`

Future crop treatment:

- retain real PULS context;
- emphasize the real `Нове завдання` dialog;
- visually retain genuine `ЗОНА`, `РЕЦЕПТ`, `СПОСІБ ЗАВЕРШЕННЯ`, `ОБ'ЄМ / VOLUME`, `ЗАГАЛЬНИЙ ОБ'ЄМ, Л` fields where visible;
- do not redraw controls.

### 02 — BB610 WATER ВИКОНАВ

Buyer copy:

`Поливні блоки стартують за вашим графіком. Усередині блоку завдання зон виконуються у заданій послідовності.`

Reserved proof source:

`puls-schedule-v028.png`

Future crop treatment:

- keep enough weekly schedule to establish real scheduler context;
- prioritize the morning block(s) containing multiple visible tasks;
- preserve true start-time / task-sequence / volume-driven semantics;
- do not invent entries for empty days.

### 03 — BB610 WATER ПЕРЕВІРИВ

Buyer copy explains only Task-11-supported truth: target vs actual volume, progress and key controlled parameters, with deviations drawing attention according to implemented warning/protection logic.

Reserved proof source:

`puls-main-v028.png`

Future crop treatment:

- primary emphasis: `ЗАДАНО`, `ФАКТИЧНО`, `ПРОГРЕС`, `ОБ'ЄМ / VOLUME`;
- secondary context may retain flow, pressure, pH, EC, active actions and alarms only where genuinely visible;
- EC remains monitoring/deviation information, not automatic closed-loop EC correction;
- no claim of automatic diagnosis of every physical fault.

## Conclusion

The section ends with the demonstrated product formula:

`ВИ ЗАДАЛИ → BB610 WATER ВИКОНАВ → BB610 WATER ПЕРЕВІРИВ`

Supporting line:

`Вашої уваги потребує відхилення. Нормальна робота — не потребує.`

## Visual treatment

- dark graphite neutral background to integrate future real PULS surfaces;
- WATER cyan used only as functional accent;
- no neon/glassmorphism/3D/device frames;
- large screenshot slots rather than laptop/tablet mockups;
- generous spacing around future product evidence;
- no fabricated values or UI elements inside screenshot slots.

## Desktop / mobile behavior

Responsive source layout was built for review at the same practical viewport classes used in prior stages:

- **1366×768 / 1920×1080:** copy + large proof surface in a two-column evidence composition; alternating direction prevents repetition while keeping screenshots dominant.
- **390×844 / 430×932:** every step becomes a single vertical evidence sequence; copy appears before its screenshot; asset path/crop notes wrap safely; no horizontal-scrolling requirement.

The future screenshot itself will use the full proof-slot width rather than device chrome or perspective transforms.

## Files created

- `docs/website/review/r11/index.html`
- `docs/website/review/r11/styles.css`
- `docs/website/R11_REAL_PULS_PROOF_STORY.md`

No R07.2 staging files and no production files were modified.

## Implementation commit

Layout + asset-gate implementation through:

`bcb9970eacab562f42f924a2db6c63b25f9acccd`

## Stop condition

**R11 = REVIEW / ASSET GATE ACTIVE.**

Do not replace the slots with old or arbitrary repository assets. The next valid visual completion step requires the three owner-approved real PULS screenshot files or approved exports from the specified real local PULS source.