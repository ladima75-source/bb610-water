# BB610 WATER — TASK 10 / FIRST THREE SCREENS RESET

- **Status:** ASSIGNED
- **Base:** R07.2 staging
- **R09:** REJECTED / experiment only
- **Scope:** first 3 semantic screens only
- **Production:** DO NOT CHANGE
- **R07.2 staging:** DO NOT CHANGE

## Why this task exists

R09 tried to explain too much in HERO. The result became closer to an automation/control presentation than a premium commercial website for a professional irrigation/fertigation system.

Reset the first three screens around a simpler buyer dialogue:

1. **Why should I care?**
2. **What changes in my working day?**
3. **How can the system adapt to different plants/zones?**

Technical proof remains important, but it must appear in the right order.

---

# SCREEN 1 — HERO

## Job of the screen

Create interest and communicate the core value in 5 seconds. Do NOT explain the entire scheduling engine, queue, recipes, pH/EC and configuration in HERO.

## Working copy

### H1

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ**

### Lead

**BB610 WATER виконує задані вами режими поливу та живлення і контролює фактичний результат.**

### Technical proof line

**Полив за фактичним об’ємом, а не лише за тривалістю.**

### CTA

**ПОДИВИТИСЯ, ЩО ЗМІНИТЬСЯ**

CTA scrolls to Screen 2.

## Hero visual rule

The dominant visual must be plants / growing / irrigation context, not a dashboard.

Do not fabricate a real BB610 WATER installation. If no approved photo is available, use an honest image placeholder with the correct composition/ratio and a clear internal review label.

Only ONE restrained explanatory proof element is allowed over/next to the visual:

**Задано 800 л**  
**Фактично 802 л ✓**

This is demo/explanatory data, not live telemetry and not an agronomic recommendation.

No zone queue in HERO. No multiple schedules. No fake PULS. No pH/EC cards. No CONTROL/HYDRAULIC/ZONE. No configuration matrix.

## Desired feeling

Calm, expensive, professional, agricultural, precise. The buyer should see plants first and understand that the technology exists to make his chosen growing regime happen reliably.

---

# SCREEN 2 — WHAT CHANGES IN YOUR WORKING DAY

## Heading

**ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ**

## Job of the screen

Immediately answer the buyer's question: “What does this give me personally?”

Do not make this a feature grid. It is a before/after work-process comparison.

### ЗАРАЗ

- пам’ятати про черговий запуск поливу;
- запускати та контролювати підживлення;
- стежити за перемішуванням маточного розчину;
- перевіряти, чи пройшов полив;
- підходити до системи, щоб зрозуміти її стан.

### З BB610 WATER

- поливні блоки стартують за вашим графіком;
- кожна зона працює за своїми налаштуваннями;
- фертигація виконується як частина заданої програми;
- перемішування маточного розчину керується системою відповідно до комплектації;
- фактичний об’єм контролюється;
- контрольовані відхилення привертають вашу увагу.

## Key conclusion

**ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.**

This line may be visually strong, but it must remain the conclusion of the comparison rather than a detached advertising slogan.

## Visual direction

Use whitespace, typography and one coherent comparison composition. Avoid six independent feature cards. The screen should feel calmer than R07/R09 and be readable in seconds.

---

# SCREEN 3 — EACH ZONE HAS ITS OWN REGIME

## Heading

**КОЖНІЙ ЗОНІ — СВІЙ РЕЖИМ**

## Intro

**Різні рослини й умови вирощування потребують різного поливу та живлення. У BB610 WATER кожна зона може мати власне ім’я, об’єм, рецепт і місце в поливному блоці.**

## Job of the screen

This is where we explain the flexibility that was previously overloaded into HERO.

Show several understandable farm zones. Do not rely on blueberry cultivar names as the primary label.

Required examples:

### Теплиця — томати
- `300 л`
- `ВОДА + ЖИВЛЕННЯ`

### Лохина — молоді рослини
- `220 л`
- `ВОДА + ЖИВЛЕННЯ + pH`
- optional secondary cultivar label: `Duke`

### Полуниця — тунель 1
- `260 л`
- `ВОДА + ЖИВЛЕННЯ`

### Розсадник
- `180 л`
- `ВОДА`

### Клумба Коханої
- `120 л`
- `ВОДА`

`Клумба Коханої` must be spelled exactly this way.

All litres are explanatory demo values, not recommended irrigation rates.

## Show block/queue logic here, not in HERO

Use one simple example:

**06:00 · РАНКОВИЙ БЛОК**

`1 → Теплиця — томати → 300 л`  
`2 → Лохина — молоді рослини → 220 л`  
`3 → Розсадник → 180 л`

Explain visually that:

- 06:00 is the start of the irrigation block;
- zones execute in sequence;
- each zone has its own configured regime;
- litres are the configured target volume;
- the system then controls actual execution.

Do not use minutes as irrigation duration in this example.

## Interaction

A simple zone selector is allowed if it genuinely improves understanding. Do not turn the section into a fake SCADA application.

---

# VISUAL LANGUAGE FOR ALL THREE SCREENS

This task is also a reset of visual hierarchy.

Use:

- strong typography and generous spacing;
- agricultural imagery/context;
- dark graphite only where technical precision needs emphasis;
- BB610 WATER cyan as functional accent;
- green only for confirmed normal/result state;
- amber/red only for warnings later, not decorative use here;
- fewer boxes and borders;
- fewer dashboard-like microcards;
- no neon;
- no glassmorphism;
- no decorative technical clutter;
- no internal review commentary visible to a buyer except explicit PHOTO PLACEHOLDER labels needed for review.

The three screens must feel like a commercial website, not a SCADA presentation.

---

# MOBILE

Design mobile intentionally for 390×844 and 430×932.

Screen 1:
- H1 + lead + enough of the crop visual/proof should be understandable in the first viewport;
- do not allow the 800/802 proof to dominate the image.

Screen 2:
- before/after comparison may stack vertically;
- preserve immediate contrast between manual attention and BB610 WATER-managed routine;
- no tiny two-column text.

Screen 3:
- zone examples must be touch-readable;
- queue must not require horizontal scrolling;
- do not rely on hover.

---

# REVIEW IMPLEMENTATION

Create a new isolated review path:

`docs/website/review/r10/index.html`

Do not modify R07.2 staging.

Do not modify production.

Do not merge R08/R09 code wholesale. Reuse only what is structurally useful; remove the dashboard-heavy visual logic that caused R09 rejection.

---

# DELIVERABLE

Create:

`docs/website/R10_FIRST_THREE_SCREENS_RESET.md`

Set status **REVIEW** and report:

- preview URL;
- files created/changed;
- desktop/mobile checks;
- what was deliberately removed compared with R09;
- unresolved photo need;
- commit SHA.

Then STOP. Do not continue to screen 4 or merge into staging until reviewed.