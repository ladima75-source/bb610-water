# BB610 WATER — VISUAL & UX BRIEF R1

- **Status:** WORKING BRIEF / REVIEW
- **Date:** 2026-09-10
- **Base:** R06 commercial dialogue
- **Purpose:** define what each visual must explain/prove before implementation
- **Production:** DO NOT CHANGE
- **Copy:** remains WORKING COPY / NOT FREEZE

## 0. Core visual rule

Every visual must either **explain the product** or **prove a commercial claim**. If it only decorates the page, remove it.

The page must feel professional, industrial, calm, precise, modern and trustworthy. No neon, AI-show styling, decorative 3D for its own sake, fake telemetry, invented product photography or fabricated SCADA.

The visual story must support one continuous owner dialogue:

**I decide → BB610 executes → BB610 controls → I intervene when attention is actually needed.**

The owner should conclude for himself that BB610 gives him more freedom, professional control and risk reduction. Do not turn those abstract values into slogan cards.

---

# 1. HERO — show the farm working by the owner's rules

## Commercial meaning

The owner remains the person deciding how to grow. BB610 takes over repeatable irrigation and feeding operations.

## Preferred visual direction

Use a hybrid of:

1. real/credible farm or crop context as the dominant visual environment;
2. a restrained day schedule/status overlay that shows BB610 executing the owner's plan.

Do NOT lead with a PLC cabinet or a full PULS screen in HERO.

## Example visual information

- `06:00  Duke — молоді     Полив ✓`
- `11:00  Chandler          Полив ✓`
- `15:00  Chandler          Полив + живлення`
- `18:00  Duke — молоді     Полив`

Supporting status:

**Система працює за вашим графіком**

This is explanatory UI, not fake PULS telemetry.

## Goal

Within 3–5 seconds the visitor should understand: “I set the program; the irrigation/feeding process continues without requiring me to personally launch every operation.”

---

# 2. ONE DAY / INDIVIDUAL ZONES

## Commercial meaning

One system can execute different programs for different groups of plants.

## Preferred interaction

A simple interactive zone switcher, for example:

- `Duke — молоді`
- `Chandler — плодоношення`
- `Томати чері`
- `Улюблена грядка`

Changing the selected zone changes the visible daily schedule/settings example.

## Example

### Duke — молоді
- 06:00 — 200 л
- 11:00 — 200 л
- 15:00 — 200 л
- 18:00 — 200 л

### Chandler — плодоношення
- 06:30 — 300 л
- 12:00 — 300 л
- 16:00 — змочування → живлення → промивання

## Goal

The visitor should mentally replace the demo names with his own varieties, beds, greenhouse blocks or crop groups.

## UX rule

Zone names are human-readable farm names, not only `Z1/Z2/Z3`. Individual zone settings must be visually obvious.

---

# 3. ACTUAL VOLUME — PROOF OF EXECUTION

## Commercial question

“How do I know the program was actually executed?”

## Preferred visual

A clean explanatory progress/measurement graphic, not a fabricated SCADA screenshot.

Example:

`ЗАДАНО 800 л`

`200 → 400 → 600 → 800 → 802 л`

`ВИКОНАНО ✓`

Small comparison:

**Звичайний таймер:** клапан працював 20 хв  
**BB610:** фактично подано 802 л

## Goal

Make the flow meter commercially meaningful: the buyer understands that BB610 measures the result, not merely the duration of a command.

All numerical examples must be marked as explanatory/demo where necessary.

---

# 4. FERTIGATION / STOCK SOLUTION — SHOW REMOVED MANUAL WORK

## Commercial meaning

Feeding becomes part of the programmed irrigation process instead of a separate repetitive manual operation.

## Correct product boundary

The owner prepares the stock solution. Do not claim BB610 automatically creates the stock solution from raw fertilizer.

After preparation/connection, BB610 can automate the relevant mixing/recirculation and dosing workflow according to configuration.

## Preferred visual process

**МАТОЧНИЙ РОЗЧИН**  
`приготував власник`

↓

**ПЕРЕМІШУВАННЯ**  
`BB610`

↓

**ЗМОЧУВАННЯ → ЖИВЛЕННЯ → ПРОМИВАННЯ**

Example only:

`15% → 70% → 15%`

Then:

**ЦИКЛ ЗАВЕРШЕНО**

Mandatory note: example cycle structure, not a universal agronomic recommendation.

## F2 explanation

When F2 is discussed, visually show two stock-solution channels:

`МАТОЧНИК A` + `МАТОЧНИК B` → `BB610 F2` → programmed irrigation cycle.

Explain that each fertigation channel has its own mixing pump according to the frozen physical concept.

## Goal

The visitor sees how several repeated actions become one configured process.

---

# 5. pH + EC — DIFFERENT ROLES MUST BE OBVIOUS

## Preferred visual

Show the water/nutrition process and two clearly different measurement/control states.

Example conceptual flow:

`ВОДА → ЖИВЛЕННЯ A/B → КОРЕКЦІЯ pH → ЗМІШУВАННЯ → КОНТРОЛЬ`

### pH

`pH 5.4`  
**КЕРУВАННЯ / КОРЕКЦІЯ**

Example:
`задано 5.40`  
`фактично 5.42 ✓`

### EC

`EC 1.36`  
**МОНІТОРИНГ**

`поточне значення / межі / повідомлення про відхилення`

## Critical accuracy rule

Do not imply automatic closed-loop EC correction. Current public meaning:

- pH = management/correction + control;
- EC = monitoring + deviation notification.

---

# 6. DEVIATION / SAFETY — ATTENTION ONLY WHEN NEEDED

## Commercial meaning

Normal operation should not require the owner's constant attention. Deviations should.

## Preferred visual comparison

### Normal
`Chandler`  
`Задано 800 л`  
`Фактично 802 л`  
`Виконано ✓`

### Needs attention
`Duke — молоді`  
`Задано 600 л`  
`Фактична витрата нижча очікуваної`  
`Потрібна увага`

Supporting explanation:

BB610 does not invent a physical diagnosis. It shows that a controlled process deviated from the configured state and applies the implemented event logic: warning / confirmation to continue / emergency stop as applicable.

## Key owner takeaway

**Вашої уваги потребує відхилення. Нормальна робота — не потребує.**

Treat this as a strong working line, not yet frozen copy.

---

# 7. REAL BB610 PULS — PRODUCT PROOF

## Role

Only after the visitor understands schedules, zones, actual execution and deviations do we show the real control environment.

## Source

The owner identified the current real PULS source on his Windows workstation as:

`C:\Users\lahno.DTM\Desktop\дом\голубика\WATER\программы\EDGE WEB SCADA\BB610_EDGE_WEB_v0.28_CLEAN`

This local path is a source reference only. The website developer does not currently have the files merely because this path is documented.

## Rule

Use only real PULS material explicitly supplied/approved from that source. Do not use arbitrary `assets/extracted/*` files as proof merely because they exist in the repository.

Do not redraw or fabricate PULS.

## Presentation

On desktop, real PULS may occupy a large part of the viewport/section rather than being placed as a tiny laptop mockup.

Possible restrained callouts around the real screen:

- `ваші зони`
- `поточний стан`
- `розклад`
- `фактичні параметри`
- `попередження`

Callouts must point only to things actually visible/supported in the approved screenshot.

## PULS MOBILE

Not a finished product proof at this stage. Do not present project/mobile concept imagery as a currently finished real product unless separately confirmed.

---

# 8. PHYSICAL SYSTEM — CONTROL / HYDRAULIC / ZONE

## Commercial timing

Show hardware only after the visitor understands the value it provides.

## Preferred visual story

`CONTROL → HYDRAULIC → ZONE → РОСЛИНИ`

### CONTROL

Human meaning: **керує тим, що і коли виконати**.

Technical support: automation, schedules, sensor/actuator connections.

### HYDRAULIC

Human meaning: **забезпечує та контролює потрібний режим потоку/живлення**.

Technical support: measurement, fertigation, pH/EC according to version, mixing pumps inside HYDRAULIC.

### ZONE

Human meaning: **спрямовує воду туди, куди ви призначили**.

Technical support: distribution across individually configured irrigation zones.

Supporting line:

**Три модулі працюють як одна BB610 WATER.**

Do not allow the hardware section to look like three unrelated electrical cabinets.

---

# 9. INSTALLATION — REDUCE FEAR OF COMPLEXITY

## Buyer question

“Who will install all of this, and am I buying another complicated engineering project?”

## Preferred visual

Show a finished system with a limited number of understandable external connections:

- water input;
- stock solution A/B lines as applicable;
- CONTROL ↔ HYDRAULIC ↔ ZONE protected electrical connections;
- ZONE → zone pipes;
- power;
- relevant external sensors/connections.

## Process line

**Поставили → підключили воду → підключили баки → підключили зони → живлення → налаштування → робота**

## Product facts to communicate

- modules are designed as finished functional units;
- external electrical connections should use quick, moisture-protected, error-resistant connectors;
- mixing pumps are inside HYDRAULIC;
- installation intent is plug-and-play as far as the product architecture allows.

## Do not claim

- zero maintenance;
- no specialist ever required;
- universal installation without commissioning.

---

# 10. GUIDED CONFIGURATION — CUSTOMER LANGUAGE FIRST

Do not begin with a dense 21-combination matrix.

## Step 1

**Потрібен тільки полив чи також підживлення?**

- I = irrigation
- F1 = one fertigation channel
- F2 = two fertigation channels

## Step 2

**Потрібне керування pH?**

- add P

Examples: `F1-P`, `F2-P`.

## Step 3

**Потрібен моніторинг EC?**

- PE = pH functionality + EC monitoring

Examples: `F1-PE`, `F2-PE`.

## Step 4 — zones

**Скільки зон потрібно зараз?**

- `Z4(8)` = 4 now / expansion to 8
- `Z8(12)` = 8 now / expansion to 12
- `Z12(16)` = 12 now / expansion to 16

The zone selector may reuse human-readable example zone names so configuration still feels connected to the owner's farm.

## Goal

The buyer should understand why each added capability changes the system and price before seeing technical nomenclature.

---

# 11. PRICE — CALM, CONCRETE, EXPLAINED

After configuration, show a resolved system rather than a generic pricing wall.

Example presentation:

## ВАША КОНФІГУРАЦІЯ

**BB610 WATER F1-PE / Z8(12)**

- 8 zones, expansion to 12;
- 1 fertigation channel;
- pH management/correction;
- EC monitoring.

Then show the actual price only from centralized commercial data.

Do not invent missing F1-P/F2-P prices.

Show HMI as an option when supported by current commercial data.

CTA working direction:

**ОБГОВОРИТИ ЦЮ КОНФІГУРАЦІЮ**

The price area should make capability progression understandable, not defend the price with hype.

---

# 12. BEFORE / WITH BB610 — RETURN TO OWNER VALUE

After price, return to everyday work.

## Preferred structure

### Зараз

- пам’ятати про черговий запуск поливу;
- запускати/контролювати підживлення;
- стежити за перемішуванням маточного розчину;
- перевіряти, чи пройшов полив;
- підходити до системи, щоб зрозуміти її стан.

### З BB610

- кожна зона має власний графік;
- полив запускається автоматично;
- фертигація виконується як частина програми;
- перемішування керується системою;
- фактичний об’єм вимірюється;
- контрольовані відхилення привертають увагу власника.

Strong working conclusion:

**Вашої уваги потребує відхилення. Нормальна робота — не потребує.**

This section should help the visitor justify the purchase to himself after seeing the price.

---

# 13. FINAL CONVERSION

Keep the final step calm and consultative.

## Working heading

**РОЗКАЖІТЬ, ЯК ВЛАШТОВАНИЙ ВАШ ПОЛИВ**

## Working copy

Скільки у вас зон, які культури вирощуєте, чи використовуєте фертигацію, чи потрібні корекція pH та моніторинг EC.

Ми підберемо BB610 під технологію вашого господарства — без функцій, які вам не потрібні, і з передбаченою можливістю розширення.

CTA:

**ПІДІБРАТИ КОНФІГУРАЦІЮ**

Do not use “buy now” e-commerce behavior for the main high-value system conversion.

---

# 14. MOBILE PRINCIPLES

Mobile must preserve the dialogue, not merely stack desktop graphics.

- HERO schedule remains immediately understandable;
- zone selector is touch-first;
- actual-volume proof remains legible without horizontal scrolling;
- wet/feed/flush process stacks vertically when necessary;
- pH and EC distinction remains explicit;
- real PULS should use an approved mobile-friendly crop/presentation without fabricating a mobile product;
- CONTROL/HYDRAULIC/ZONE process becomes a clear vertical sequence;
- guided configuration uses large touch targets;
- price/result remains visible without tiny tables;
- no interaction may depend on hover.

---

# 15. ASSET / PROOF GATES BEFORE IMPLEMENTATION

The developer must not invent proof assets.

Before final visual implementation, classify each required visual as one of:

1. **APPROVED REAL ASSET** — may be used as product proof;
2. **EXPLANATORY UI/DIAGRAM** — may be built in HTML/CSS/SVG and clearly represents an example/process, not live telemetry;
3. **PLACEHOLDER / PROOF NEEDED** — keep neutral until owner supplies/approves evidence.

Especially:

- real PULS = owner-supplied/approved only;
- PULS MOBILE = not current finished proof;
- CONTROL/HYDRAULIC/ZONE = use only approved engineering visualization until physical photography exists;
- farm/crop imagery = must not falsely imply a photographed BB610 installation if it is only contextual imagery.

---

# 16. IMPLEMENTATION INTENT FOR TASK 07

Task 07 should implement the approved visual/UX story on the existing R06 staging base without changing production and without abandoning the centralized content/data architecture.

However, missing real proof must remain explicitly gated. The developer should build explanatory UI/diagrams where approved by this brief and leave proof-dependent areas neutral until the owner provides the required source asset.

No new design concept exploration is required. This brief defines the working visual direction.
