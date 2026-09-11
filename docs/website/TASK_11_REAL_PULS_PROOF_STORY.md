# BB610 WATER — TASK 11 / REAL PULS PRODUCT PROOF STORY

- **Status:** ASSIGNED
- **R10:** REJECTED / do not iterate
- **Working page base:** R07.2 remains the last accepted whole-page working base
- **Scope:** create ONE isolated review block based on the real BB610 PULS product logic
- **Production:** DO NOT CHANGE
- **R07.2 staging:** DO NOT CHANGE

## Objective

Stop inventing website dashboards. Use the actual BB610 PULS product as evidence.

Build one commercial review section around the real product sequence:

**ВИ ЗАДАЛИ → BB610 WATER ВИКОНАВ → BB610 WATER ПЕРЕВІРИВ**

The section must explain value to a farm owner, while real PULS screenshots prove that this is a real control product rather than marketing illustration.

Do NOT create another HERO. Do NOT redesign the first three screens. This is a focused proof-section review.

---

# SOURCE TRUTH FROM OWNER-SUPPLIED REAL PULS SCREENS

The owner supplied three real screenshots from BB610 PULS / local EDGE WEB SCADA v0.28.

They show the following product truth and must be used as the basis of the story.

## SCREEN A — MAIN / CURRENT OPERATION

Visible real information includes:

- current operation / zone;
- operation type such as `ВОДА + ДОБРИВО A + pH`;
- completion mode `ОБ'ЄМ / VOLUME`;
- `ЗАДАНО / Target` in litres;
- `ФАКТИЧНО / Actual` in litres;
- progress;
- estimated finish / remaining time;
- flow;
- pressure;
- primary pH;
- safety pH;
- EC;
- fertilizer A/B state;
- active actions;
- active alarms;
- daily planned/completed/interrupted summary.

Commercial meaning: **BB610 WATER does not only issue a command; the owner can see what is actually happening and the measured result.**

## SCREEN B — SCHEDULE

Visible real information includes:

- weekly irrigation schedule;
- irrigation blocks started at a specified time;
- tasks inside a block;
- zones/tasks in sequence;
- recipes;
- volume values in litres;
- enabled schedule / waiting state.

Commercial meaning: **the owner defines the working plan; BB610 WATER carries it out.**

Important: time is the start of the irrigation block. Do not reinterpret the system as “water zone for N minutes”.

## SCREEN C — NEW TASK

Visible real information includes:

- zone selection;
- recipe selection;
- process derived from the recipe;
- completion method `ОБ'ЄМ / VOLUME`;
- total water volume in litres;
- process distribution fields;
- save action.

Commercial meaning: **the owner decides what the plants need: where, which recipe/process and how much water.**

---

# COMMERCIAL STORY

Create one continuous three-step section.

## INTRO

### Working heading

**ВИ ВИРІШУЄТЕ. BB610 WATER ВИКОНУЄ І ПЕРЕВІРЯЄ.**

### Working lead

**Задайте зоні потрібний режим, рецепт і об’єм. BB610 WATER поставить завдання у поливний блок, виконає його у заданій послідовності та покаже фактичний результат.**

Keep this calm. No “revolution”, “AI magic”, “maximum efficiency” or unsupported yield claims.

---

# STEP 1 — ВИ ЗАДАЛИ

Use the real **New Task** screenshot as the proof source.

### Buyer-facing copy

**ВИ ЗАДАЛИ**

**Оберіть зону, рецепт і потрібний об’єм. Рішення залишається за вами.**

Supporting points may explain only what the screenshot genuinely supports:

- потрібна зона;
- потрібний рецепт;
- завершення за об’ємом;
- задана кількість води в літрах.

### Screenshot treatment

Use the real screenshot itself or a clean crop of the actual screenshot.

Preferred crop: emphasize the central `Нове завдання` dialog, especially:

- `ЗОНА`;
- `РЕЦЕПТ`;
- `СПОСІБ ЗАВЕРШЕННЯ`;
- `ОБ'ЄМ / VOLUME`;
- `ЗАГАЛЬНИЙ ОБ'ЄМ, Л`.

Do not redraw these controls as a website mockup.

Do not erase product context so aggressively that it stops looking like real PULS.

---

# STEP 2 — BB610 WATER ВИКОНАВ

Use the real **Schedule** screenshot as proof.

### Buyer-facing copy

**BB610 WATER ВИКОНАВ**

**Поливні блоки стартують за вашим графіком. Усередині блоку завдання зон виконуються у заданій послідовності.**

The screenshot must make it possible to understand:

- block start time;
- multiple tasks inside the block;
- zone/task sequence;
- volume-driven work.

### Screenshot treatment

Preferred crop: retain enough of the weekly schedule to establish that this is a real scheduler, but visually emphasize the Monday morning block(s) where multiple tasks are visible.

Do not make empty days dominate the composition.

Do not invent additional schedule entries merely to make the screenshot prettier.

---

# STEP 3 — BB610 WATER ПЕРЕВІРИВ

Use the real **Main / Current Operation** screenshot as proof.

### Buyer-facing copy

**BB610 WATER ПЕРЕВІРИВ**

**Під час роботи ви бачите заданий і фактичний об’єм, прогрес та ключові параметри процесу. Якщо контрольований параметр відхиляється — система привертає вашу увагу відповідно до реалізованої логіки попереджень і захисту.**

Primary visual proof should emphasize:

- `ЗАДАНО`;
- `ФАКТИЧНО`;
- `ПРОГРЕС`;
- `ОБ'ЄМ / VOLUME`.

Secondary proof may include:

- flow;
- pressure;
- pH;
- EC;
- active actions;
- alarms.

Do not imply automatic EC correction. EC remains monitoring / deviation information.

### Important wording

Do not claim that every possible fault is automatically diagnosed. The system monitors controlled parameters and reports/acts according to implemented logic.

---

# FINAL LINE OF THE SECTION

Use the product formula as the conclusion:

**ВИ ЗАДАЛИ → BB610 WATER ВИКОНАВ → BB610 WATER ПЕРЕВІРИВ**

Then a quieter supporting line:

**Вашої уваги потребує відхилення. Нормальна робота — не потребує.**

This should feel like the conclusion of demonstrated evidence, not an unsupported slogan.

---

# VISUAL DIRECTION

This section should derive its visual credibility from the actual PULS interface.

Use:

- real screenshot surfaces;
- restrained dark graphite background where it helps screenshots integrate naturally;
- WATER cyan for functional emphasis;
- green only for confirmed normal/success state;
- generous whitespace around screenshots;
- large readable screenshot crops rather than tiny laptop/device mockups;
- simple numbered/step progression `01 / 02 / 03` if useful.

Do NOT:

- put screenshots into fake MacBook/iPad frames;
- tilt them in 3D perspective;
- add neon glow;
- redraw the PULS UI;
- fabricate live values;
- cover the screenshot with dozens of marketing callouts;
- make it look like a SaaS landing-page template.

The product itself is the visual proof.

---

# ASSET GATE

The screenshots supplied by the owner in ChatGPT are real evidence, but the developer cannot assume chat attachments exist inside the Git repository.

Before final implementation with image files, use one of these valid sources only:

1. owner-provided screenshot files copied into an approved review asset directory; or
2. approved screenshots exported from the real local PULS source:
   `C:\Users\lahno.DTM\Desktop\дом\голубика\WATER\программы\EDGE WEB SCADA\BB610_EDGE_WEB_v0.28_CLEAN`

Suggested review paths after files are supplied:

- `docs/website/review-assets/puls/puls-main-v028.png`
- `docs/website/review-assets/puls/puls-schedule-v028.png`
- `docs/website/review-assets/puls/puls-new-task-v028.png`

Do not substitute arbitrary old repository screenshots.

If the three approved image files are not yet available to the developer, build the section layout with clearly named image slots and STOP at the asset gate. Do not replace them with invented UI.

---

# REVIEW OUTPUT

Create an isolated review path:

`docs/website/review/r11/index.html`

This review should contain the PULS proof section only, with enough neutral page context to evaluate it.

Do not modify R07.2 staging.

Do not modify production.

Create:

`docs/website/R11_REAL_PULS_PROOF_STORY.md`

Set R11 = REVIEW and report:

- preview URL;
- exact asset status;
- screenshot crops/treatments used or waiting;
- desktop/mobile behavior;
- files changed;
- commit SHA.

Then STOP.