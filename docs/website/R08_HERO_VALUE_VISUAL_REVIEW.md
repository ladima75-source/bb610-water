# BB610 WATER — HERO + OWNER VALUE VISUAL REVIEW R08

- **Revision:** R08
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R07.2 staging (unchanged)
- **Task:** `TASK_08_HERO_VALUE_VISUAL_REVIEW.md`
- **Scope:** HERO + immediately following `ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ` only
- **Preview implementation commit:** `0ab9cb493fc977c87b0240be7b39ee9df9be7967`
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED
- **Copy/design:** WORKING / NOT FREEZE

## Review URLs

### A — FARM + LIVE PLAN

`https://rawcdn.githack.com/ladima75-source/bb610-water/0ab9cb493fc977c87b0240be7b39ee9df9be7967/docs/website/review/r08-a/index.html`

Visual difference:
- strongest grower/farm context;
- contextual farm area is intentionally represented by a complete `PHOTO DIRECTION / PLACEHOLDER`, not an unapproved repository image;
- irrigation-block queue is a restrained operational overlay, not fake SCADA;
- Screen 2 keeps the farm/context mood while making the manual-to-managed transition explicit.

### B — PRECISION CONTROL

`https://rawcdn.githack.com/ladima75-source/bb610-water/0ab9cb493fc977c87b0240be7b39ee9df9be7967/docs/website/review/r08-b/index.html`

Visual difference:
- strongest professional/product clarity;
- irrigation-block queue is the primary HERO visual;
- hierarchy is block start → queue number → zone → recipe → litres → state;
- restrained dark technical surfaces and functional cyan are used without copying or fabricating BB610 PULS;
- Screen 2 uses a highly legible two-column transformation rather than a card wall.

### C — WATER PROCESS

`https://rawcdn.githack.com/ladima75-source/bb610-water/0ab9cb493fc977c87b0240be7b39ee9df9be7967/docs/website/review/r08-c/index.html`

Visual difference:
- strongest connection between controlled water/nutrition process and different plant zones;
- a restrained path `СТАРТ БЛОКУ → ЧЕРГА ЗОН → РЕЦЕПТ + ОБ’ЄМ` frames the queue;
- abstract crop bands provide crop context without pretending to be product photography or a real installation;
- Screen 2 continues the process flow from manual attention to controlled routine.

## Product truth preserved in all three variants

Every variant uses the same required example set:

**06:00 · РАНКОВИЙ БЛОК**
1. `Теплиця — томати` — `300 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Лохина — молоді рослини` — `220 л` — `ВОДА + ЖИВЛЕННЯ + pH`
3. `Розсадник` — `180 л` — `ВОДА`

**15:00 · ДЕННИЙ БЛОК**
1. `Полуниця — тунель 1` — `260 л` — `ВОДА + ЖИВЛЕННЯ`
2. `Клумба Коханої` — `120 л` — `ВОДА`

The following semantics are explicit:
- time = irrigation-block start, not zone irrigation duration;
- zones execute as an ordered queue;
- each zone has its own recipe/settings;
- litres are target-volume explanatory/demo values;
- demo litres are not recommended irrigation norms for the named crops;
- pH is shown only on the blueberry example in this HERO set and is not presented as necessary for every crop;
- `BB610 WATER` is used when referring to the complete system.

No real PULS UI, PULS MOBILE, equipment image, installation image or claimed product proof is used in these R08 variants.

## Screen 2 preserved in all variants

All three versions place `ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ` immediately after HERO and preserve the required contrast:

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

Working conclusion remains:

**ВАШОЇ УВАГИ ПОТРЕБУЄ ВІДХИЛЕННЯ. НОРМАЛЬНА РОБОТА — НЕ ПОТРЕБУЄ.**

## Files changed

Only new review-only files were added:

- `docs/website/review/r08-shared.css`
- `docs/website/review/r08-a/index.html`
- `docs/website/review/r08-b/index.html`
- `docs/website/review/r08-c/index.html`
- `docs/website/R08_HERO_VALUE_VISUAL_REVIEW.md`

No file under `docs/website/staging/` was modified by Task 08.

## Responsive review checks

The shared review CSS includes explicit mobile treatment below 900 px and a second compact treatment at 430 px and below. The four required target widths are covered by the layout rules:

- **390×844:** queue rows collapse to two-column/mobile rows; recipe/litres/state move below zone text; CTA becomes full-width; no intentional horizontal scrolling.
- **430×932:** same compact queue model with readable zone/recipe/litre hierarchy.
- **1366×768:** two-column HERO compositions remain within the 1180 px content shell; queue and headline have unequal visual weight by variant.
- **1920×1080:** content remains capped at 1180 px rather than stretching into oversized typography or queue tables.

No fixed desktop min-width is used. Queue grids are redefined on mobile, and all review compositions use `box-sizing:border-box` with width-capped shells.

## Temporary photo / asset dependencies

- **Variant A:** no repository photo is claimed or selected. A deliberate `PHOTO DIRECTION / PLACEHOLDER` is used so the owner can judge the photo-dominant composition safely. A later approved contextual farm/crop photo can replace this surface without changing the composition.
- **Variant B:** no photo dependency.
- **Variant C:** no photo dependency; crop context is abstract explanatory CSS geometry only.
- No `assets/extracted/*` file is used as proof or as contextual photography in R08.

## Review boundary

R08 does not select a winner and does not propagate any of the three treatments to the accepted R07.2 staging page. It does not alter downstream sections, production code, `CNAME`, or `water.bb610.com.ua`.

## Stage result

**R08: REVIEW**

STOP after review handoff. Owner/supervising chat chooses or requests corrections before any visual treatment is propagated.