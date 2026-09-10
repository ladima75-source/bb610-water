# BB610 WATER — TASK 08 / HERO + OWNER VALUE VISUAL REVIEW

- **Status:** ASSIGNED
- **Base:** R07.2 staging
- **Scope:** ONLY HERO + immediately following `ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ`
- **Production:** DO NOT CHANGE
- **Purpose:** create real reviewable visual alternatives, not another text description

## Why this task exists

R07.2 has the correct commercial direction, but the first two screens are not visually mature enough. Before polishing the whole site, produce three real, clickable/rendered alternatives for the first two screens so the owner can choose the visual language that will then be propagated downward.

Do not redesign the rest of the page in this task.

## Product truth that every variant MUST preserve

Use `BB610 WATER` when referring to the whole product/system.

The irrigation model is:

**scheduled irrigation block start → ordered queue of zones → each zone has its own recipe/settings → target volume in litres → actual execution/control.**

Time is the start time of the irrigation block, NOT the duration of a zone irrigation.

Different zones must visibly have different settings/recipes. Use agronomically plausible examples and label all litres as explanatory/demo values, not recommended irrigation norms.

Required example set:

### 06:00 · РАНКОВИЙ БЛОК
1. `Теплиця — томати` — `300 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Лохина — молоді рослини` — `220 л` — `ВОДА + ЖИВЛЕННЯ + pH`
3. `Розсадник` — `180 л` — `ВОДА`

### 15:00 · ДЕННИЙ БЛОК
1. `Полуниця — тунель 1` — `260 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Клумба Коханої` — `120 л` — `ВОДА`

Do not replace `Клумба Коханої` with `Улюблена грядка`.

Do not present pH as necessary for every crop. The blueberry example intentionally demonstrates a zone where pH management is relevant.

## Screen 1 copy direction

Keep the current approved central idea as WORKING COPY:

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ.**  
**BB610 WATER БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ.**

Supporting meaning:

**Ви вирішуєте → BB610 WATER виконує → BB610 WATER контролює.**

The visual must explain the product rather than merely decorate the headline.

## Screen 2 must remain directly after HERO

`ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ`

This is a major commercial screen, not a minor feature section.

It should make the owner's benefit immediately obvious. Preserve the core contrast:

### ЗАРАЗ
- пам’ятати про черговий запуск поливу;
- запускати / контролювати підживлення;
- стежити за перемішуванням маточного розчину;
- перевіряти, чи пройшов полив;
- підходити до системи, щоб зрозуміти її стан.

### З BB610 WATER
- поливні блоки стартують за вашим графіком;
- усередині блоку система виконує чергу зон;
- кожна зона має власні налаштування;
- фертигація виконується як частина програми;
- фактичний об’єм контролюється;
- контрольовані відхилення привертають вашу увагу.

Strong working conclusion:

**ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.**

## Build THREE REAL visual variants

These are not three different marketing concepts. Commercial logic/copy stays the same. They are three visual/compositional treatments of the same approved story.

### Variant A — FARM + LIVE PLAN

Goal: strongest emotional connection to the grower.

- Crop/farm context is visually dominant.
- The irrigation-block queue is overlaid or adjacent as a restrained operational layer.
- Must not look like fake SCADA.
- The photo is contextual; do not imply it is a photographed BB610 installation.
- Screen 2 should feel like the owner has moved from manual attention to managed routine, without lifestyle stock-photo clichés.

### Variant B — PRECISION CONTROL

Goal: strongest product clarity and professional feel.

- Minimal, calm, precise layout.
- The irrigation-block queue itself is the HERO visual.
- Strong hierarchy: block start → queue number → zone → recipe → litres → state.
- May borrow visual discipline from real PULS (dark surfaces, cyan functional accent, status semantics) but MUST NOT imitate or fabricate PULS UI.
- Screen 2 should use a highly legible before/after transformation, not a wall of cards.

### Variant C — WATER PROCESS

Goal: strongest connection between plants and controlled water/nutrition process.

- Crop context + a restrained process path from block to zones.
- Show that different zones receive different recipes/settings.
- More visual than B, less photographic than A.
- Avoid engineering-schematic complexity in HERO.
- Screen 2 should visually connect reduced routine with the controlled process rather than showing generic benefit icons.

## Color direction

Do NOT freeze a final palette yet, but make the three variants mature enough to judge.

Common rules:

- professional / industrial / calm;
- WATER cyan is the primary functional accent;
- green = successful/normal state where semantically useful;
- amber/red only for attention/alarm meaning, not decoration;
- avoid excessive blue/cyan glow;
- avoid glassmorphism/neon/futuristic AI styling;
- surfaces must have clear contrast and hierarchy;
- do not make every card outlined in cyan;
- photography must not overpower readability.

## Typography / composition

- HERO headline must not become an oversized wall of uppercase text on mobile.
- The product name `BB610 WATER` must be visually coherent.
- Queue data must remain readable at 390px width.
- Use whitespace deliberately; do not fill every area with cards.
- Avoid equal-weight treatment of headline, queue, CTA and status.
- The first two screens together must feel like one narrative unit.

## Photos

For review variants you may use an existing contextual crop/farm image already present in staging/repository if appropriate, or a clearly identified temporary contextual image source already approved for review use. Do not fabricate a real BB610 installation.

If no suitable image is available, Variant A may use an explicit `PHOTO DIRECTION / PLACEHOLDER` rather than a misleading image, but the composition itself must still be complete and reviewable.

## Interaction / animation

Only if it explains the process:

- subtle progression through queue states is allowed;
- no fast looping animation;
- no decorative parallax;
- no hover-only meaning;
- mobile/touch must work without hover;
- respect reduced motion.

## Review-only implementation

Create three separate review paths, for example:

- `docs/website/review/r08-a/index.html`
- `docs/website/review/r08-b/index.html`
- `docs/website/review/r08-c/index.html`

Each path must contain enough of the page to judge HERO + Screen 2 at desktop and mobile. Do NOT replace the accepted R07.2 staging yet.

## Required checks

At minimum:

- 390×844
- 430×932
- 1366×768
- 1920×1080

No horizontal overflow. No overlapping copy. Queue remains understandable on mobile.

## Deliverable

Create `docs/website/R08_HERO_VALUE_VISUAL_REVIEW.md` with status `REVIEW` and include:

- URLs for A/B/C;
- concise explanation of what differs visually;
- files changed;
- responsive checks;
- any temporary photo/asset dependencies;
- commit SHA.

Then STOP. Do not choose a winner yourself. Do not propagate a variant to the rest of the site. Do not change production or R07.2 staging.