# BB610 WATER — TASK 09 / HERO + WORKDAY CONSOLIDATION

- Status: ASSIGNED
- Base: R07.2 staging + R08 review findings
- Production: DO NOT CHANGE
- Goal: one consolidated review implementation, not A/B/C

## Decision

Do not continue three concepts. Build one R09 review page combining the strongest parts:

- B / PRECISION CONTROL = structural base for the irrigation-block queue;
- A / FARM + LIVE PLAN = crop/farm context so the product is visibly about plants and the owner's work, not industrial automation for its own sake;
- C / WATER PROCESS = concise explanatory logic `СТАРТ БЛОКУ → ЧЕРГА ЗОН → РЕЦЕПТ + ОБ’ЄМ`.

The result must feel like one designed system, not three concepts pasted together.

## HERO commercial hierarchy

Primary heading working copy:

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ**

Supporting copy:

**Задайте для кожної зони свій режим поливу та живлення. BB610 WATER виконає поливні блоки за вашим графіком і проконтролює фактичний результат.**

Use the product principle below the copy in compact form:

**Ви задаєте → BB610 WATER виконує → BB610 WATER перевіряє**

Do not repeat the previous large slogan `BB610 WATER БЕРЕ НА СЕБЕ РУТИНУ...` as a second H1 line. The visual itself now explains this value.

Keep the existing slogan `Полив за фактичним об’ємом, а не лише за тривалістю` available as product language, but do not force it into HERO if it harms hierarchy.

## HERO visual

The visual must explain the real BB610 WATER model without imitating PULS:

**СТАРТ БЛОКУ → ЧЕРГА ЗОН → РЕЦЕПТ + ОБ’ЄМ → ФАКТИЧНЕ ВИКОНАННЯ**

Show a compact precision block/queue with understandable farm context.

Required demo examples:

### 06:00 · РАНКОВИЙ БЛОК
1. `Теплиця — томати` — `300 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Лохина — молоді рослини` — `220 л` — `ВОДА + ЖИВЛЕННЯ + pH`
3. `Розсадник` — `180 л` — `ВОДА`

### 15:00 · ДЕННИЙ БЛОК
1. `Полуниця — тунель 1` — `260 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Клумба Коханої` — `120 л` — `ВОДА`

`Клумба Коханої` must remain exactly this spelling.

Litres are explanatory demo values, not agronomic recommendations. Do not visually over-emphasize the disclaimer; it must remain available and readable without becoming part of the sales message.

Time means start of the irrigation block, never irrigation duration.

## Show fact, not only plan

R09 must introduce a restrained factual execution cue so the HERO does not stop at scheduling.

For one active/completed demo task, show something like:

`Задано 220 л → Фактично 221 л ✓`

This is explanatory UI, not live PULS telemetry. Clearly keep it in the visual language of the review concept rather than making a fake SCADA screen.

## Farm/photo direction

Create a credible visual place for crop/farm imagery, but do not invent a real BB610 WATER installation.

If no approved photograph exists, use an honest crop/farm PHOTO PLACEHOLDER or neutral crop treatment that preserves composition. The final photo will be selected separately.

The farm visual must support the product story; it must not dominate so strongly that the precision block becomes unreadable.

## Color and visual system

Start consolidating the future BB610 WATER visual language in this review:

- deep graphite / dark neutral surfaces for precision/technical information;
- WATER cyan as the main functional accent;
- green only for confirmed normal/success states;
- amber/red only for warnings/deviations, not decoration;
- light/neutral space may be used where it improves readability and creates contrast between sections;
- no neon glow, cyberpunk, decorative glassmorphism, random gradients or excessive card borders.

Do not attempt final brand-color freeze yet. R09 should demonstrate a coherent direction suitable for extending down the page.

## WORKDAY — second screen

Immediately after HERO:

# ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ

This section must read as a buyer benefit, not as review documentation.

Remove all internal wording such as:

- `Варіант A...`
- `Варіант B...`
- `Варіант C...`
- explanations about why a concept is readable.

Use a calm comparison.

### ЗАРАЗ

- пам’ятати про черговий запуск поливу;
- запускати / контролювати підживлення;
- стежити за перемішуванням маточного розчину;
- перевіряти, чи пройшов полив;
- підходити до системи, щоб зрозуміти її стан.

### З BB610 WATER

- поливні блоки стартують за вашим графіком;
- усередині блоку система виконує чергу зон;
- кожна зона має власний режим поливу та живлення;
- фертигація виконується як частина заданої програми;
- фактичний об’єм контролюється;
- відхилення привертають вашу увагу.

Working conclusion:

**ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.**

This conclusion may receive strong visual emphasis, but do not turn it into an advertising slogan detached from the comparison above it.

## Composition requirements

Desktop:

- HERO must fit the primary value proposition and enough of the precision visual into the first viewport at 1366×768 without feeling crushed;
- clear left/right hierarchy or another equally strong composition is allowed;
- the irrigation queue must remain readable, not become a tiny dashboard;
- second screen must visually feel like continuation of the same site.

Mobile:

- design independently for 390×844 and 430×932; do not simply stack/shrink desktop;
- H1 and lead must remain readable without consuming the entire first screen;
- show enough of the irrigation-block logic immediately to communicate differentiation;
- no horizontal scrolling;
- queue rows may restructure vertically;
- no hover dependency;
- CTA touch targets must remain usable.

## Architecture

This is review implementation only. Do not damage R07.2 staging.

Create a separate review path:

`docs/website/review/r09/index.html`

Use maintainable CSS/JS. If content/data is separated, keep it centralized and suitable for later merge into staging.

Do not touch production.

## Deliverable

Create:

`docs/website/R09_HERO_WORKDAY_CONSOLIDATION.md`

Status: REVIEW.

Report:

- preview URL;
- exact files created/changed;
- desktop/mobile checks;
- what was taken from R08 A/B/C;
- unresolved photo/asset needs;
- commit SHA.

Then STOP. Do not merge into staging and do not begin the next section until reviewed.