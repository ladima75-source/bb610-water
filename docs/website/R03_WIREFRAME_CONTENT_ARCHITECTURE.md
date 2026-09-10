# BB610 WATER — WIREFRAME & CONTENT ARCHITECTURE R3

- **Revision:** R3
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Source branch:** `main`
- **Source commit:** `2d52e42dcd0fd564572cf9633c0cbc23825c7f1e`
- **Inputs:** `R01_CURRENT_WEBSITE_TECHNICAL_AUDIT.md` (PASS), `R02_INFORMATION_ARCHITECTURE.md` (PASS), `R02_REVIEW_FINDINGS.md`, `PRODUCT_CONFIGURATION_FREEZE_R1.md` (FREEZE), `TASK_03_WIREFRAME_CONTENT_ARCHITECTURE.md`
- **Scope:** low-fidelity wireframe and content architecture only; no production implementation, no final visual design

## 1. Wireframe principle

The wireframe is built around one accepted commercial argument:

**Користувач приймає рішення → BB610 виконує → BB610 контролює фактичний результат.**

The first screen must immediately distinguish BB610 from a timer/controller. The visitor should understand that the system measures and verifies actual execution, rather than inferring success from valve-open time.

The wireframe therefore follows this sequence:

**difference → mechanism → real proof → operating value → system architecture → capabilities → fit/boundary → configuration/value/price → ecosystem → conversion.**

Hardware is used as proof of a complete system, not as the primary commercial proposition.

All working copy below is structural working copy, not final copy freeze.

---

## 2. Global page shell

### Desktop header

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BB610 WATER      Система   Технології   Конфігурації   Контакти   [CTA]   │
│                                                        Підібрати конфігурацію│
└──────────────────────────────────────────────────────────────────────────────┘
```

Recommended Release 1 navigation:

- `Система` → `/product/`
- `Технології` → technology hub or direct volume-control page depending Release 1 implementation
- `Конфігурації` → `/configurations/`
- `Контакти` → conversion/contact destination
- primary persistent CTA: `Підібрати конфігурацію`

Do not include empty future destinations. Do not include a fake EN switch. Release 1 is Ukrainian only.

### Mobile header

```text
┌─────────────────────────────────────┐
│ BB610 WATER              [Меню]     │
└─────────────────────────────────────┘

[opened]
Система
Технології
Конфігурації
Контакти
[Підібрати конфігурацію]
```

Requirements:

- native button with accessible expanded/collapsed state;
- no horizontal navigation compression;
- one primary CTA in menu;
- no fake language control.

### Footer

```text
BB610 WATER
Коротко: професійне керування поливом і фертигацією

Система | Технології | Конфігурації | Контакти

Контактні дані
Юридичні / privacy links when available

BB610 Systems ecosystem reference
```

Footer must not become a second sitemap of future empty pages.

---

## 3. Homepage complete wireframe

### SECTION 01 — HERO / actual-result differentiation

**Purpose:** communicate the difference from timer/controller in approximately five seconds.

**Working headline:**

`Полив, результат якого система перевіряє.`

Alternative supporting line:

`BB610 Water виконує заданий полив і контролює фактично поданий об’єм.`

**Supporting message:** user makes the irrigation decision; BB610 executes and verifies the result using actual flow/volume data.

**Proof:** one compact explanatory plan-vs-actual state.

**CTA:** `Підібрати конфігурацію`.

**Secondary action:** `Як це працює` → scroll or `/technology/volume-control/`.

**Source:** static/frozen product message.

#### HERO Variant A — recommended

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ LEFT                                               RIGHT                     │
│                                                                              │
│ Полив, результат якого                         ┌───────────────────────────┐  │
│ система перевіряє.                             │ ПОЯСНЮВАЛЬНИЙ ПРИКЛАД     │  │
│                                                │                           │  │
│ BB610 виконує заданий полив                    │ Задано        800 л       │  │
│ і контролює фактично поданий                   │ Фактично      802 л       │  │
│ об’єм.                                         │ Статус        Виконано    │  │
│                                                │                           │  │
│ [Підібрати конфігурацію] [Як це працює]        │ Задав → Виконала →       │  │
│                                                │ Перевірила                │  │
│ «Полив за фактичним об’ємом,                   └───────────────────────────┘  │
│ а не лише за тривалістю».                                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

Annotation under proof component: `Пояснювальний приклад, не live-дані об’єкта.`

**Why recommended:**

- difference is verbal first, numeric proof second;
- visitor is not forced to decode hardware;
- proof is compact and understandable without SCADA knowledge;
- the example avoids telemetry theatre because it is explicitly labeled explanatory;
- primary CTA is visible without competing UI noise.

#### HERO Variant B

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Полив за фактичним об’ємом, а не лише за тривалістю.                        │
│                                                                              │
│ [ Задано ] ─────→ [ Система виконує ] ─────→ [ Фактично перевірено ]        │
│    800 л                                           802 л                    │
│                                                                              │
│ BB610 Water — професійне керування поливом і фертигацією.                   │
│                                                                              │
│ [Підібрати конфігурацію]                                                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Strength:** mechanism is visually explicit.

**Weakness:** more diagram-like and less immediately human/commercial; can look like an infographic rather than a clear product proposition.

**Recommendation:** Variant A.

#### Mobile HERO

```text
[headline]
[2–3 line explanation]

[explanatory proof card]
Задано 800 л
Фактично 802 л
Виконано

[primary CTA full width]
[secondary text link]

[slogan]
```

Priority on mobile: headline → meaning → proof → CTA. No side-by-side telemetry composition.

**Implementation annotations:** semantic `h1`, paragraph, data/proof component; no JS required; numeric example static; proof must be accessible as text, not image-only.

---

### SECTION 02 — HOW THE RESULT IS VERIFIED

**Purpose:** explain the mechanism behind the claim.

**Working headline:** `Задав → система виконала → система перевірила.`

**Supporting message:** the target may be set by actual volume or by time, while the system records actual delivered volume. Flow measurement is the factual basis.

**Proof/visual:** restrained four-step process diagram.

```text
ЗАВДАННЯ
800 л / або час
     ↓
ВИКОНАННЯ
клапан + зона
     ↓
ВИМІРЮВАННЯ
фактична витрата / об’єм
     ↓
ПЕРЕВІРКА
виконано / відхилення
```

A second line may show:

`Задано → поточний процес → фактичний результат → реакція на відхилення`.

**CTA:** `Детальніше про контроль об’єму`.

**Destination:** `/technology/volume-control/`.

**Desktop:** process steps horizontal or two-column explanation + process.

**Mobile:** stacked vertical steps. No animation required for comprehension.

**Source:** static/frozen.

**Technical:** SVG/HTML diagram preferred; text must remain indexable. If animation is later used, static meaning must remain clear and `prefers-reduced-motion` supported.

---

### SECTION 03 — REAL SCADA PROOF

**Purpose:** establish that BB610 control is a real developed system, not a marketing concept.

**Working headline:** `Видно не лише команду. Видно, що реально відбулося.`

**Required proof:** real SCADA crop.

Recommended screenshot content:

- one or several zones with target/actual state;
- current status;
- actual flow or actual delivered volume;
- deviation/status indication where present in the real approved SCADA.

```text
┌──────────────────── copy ────────────────────┐ ┌──────── SCADA crop ───────┐
│ Що було задано                               │ │ Real approved screenshot  │
│ Що зараз виконується                         │ │ target / actual / status  │
│ Що фактично отримано                         │ │                           │
│ Чи є відхилення                              │ │                           │
└──────────────────────────────────────────────┘ └───────────────────────────┘
```

**Claim proved:** the system has a real operational layer showing execution and result.

Do not redesign SCADA. Do not draw fake UI if the current screenshot cannot show target/actual clearly.

If no current approved crop proves the exact claim, mark:

`ASSET/PROOF NEEDED — approved SCADA screen/crop showing plan vs actual for a zone/cycle.`

**CTA:** optional `Як працює система` → `/product/`.

**Mobile:** copy first, screenshot second; screenshot may use a focused crop rather than a scaled full desktop screen.

**Source:** static approved product proof / media.

---

### SECTION 04 — OWNER/MANAGER OPERATING VALUE

**Purpose:** translate control technology into daily operating value without lifestyle advertising.

**Working headline:** `Ви приймаєте рішення. Система виконує і показує результат.`

```text
┌───────────────────────────────────────────────────────────────┐
│ Розклад і блоки        Зони            Відхилення            │
│ Задає користувач       Окремі режими   Видимі та actionable  │
│                                                               │
│ Історія                pH / EC*         Стан системи          │
│ Що відбулося           за конфігурацією не треба стояти      │
│                                         біля вузла весь день  │
└───────────────────────────────────────────────────────────────┘
* EC — моніторинг/сповіщення, не автоматична корекція.
```

**Core message:** professional operational control without implying autonomous agronomy.

**CTA:** none required; the section should deepen value rather than interrupt with another button.

**Source:** static.

---

### SECTION 05 — SYSTEM ARCHITECTURE

**Purpose:** explain physical/product architecture after the visitor already understands the value.

**Working headline:** `Три функціональні модулі. Одна система.`

```text
[CONTROL] ─────→ [HYDRAULIC] ─────→ [ZONE]
 керування       підготовка          розподіл
 логіка          води / dosing       по зонах
 контроль        вимірювання         клапани зон
```

For each module:

- what it does in the process;
- why it matters to result control;
- current engineering visualization;
- label: engineering/product visualization, not implied final serial photography.

**Future slot:** identical media container accepts real product photography later without changing information structure.

**CTA:** `Детальніше про систему` → `/product/`.

**Source:** static/frozen product architecture.

---

### SECTION 06 — CAPABILITY MAP

**Purpose:** make verbs and functional boundaries clear.

```text
КЕРУЄ / ВИКОНУЄ
- полив за об’ємом
- полив за часом
- розклад
- зони
- фертигація за конфігурацією
- pH-корекція у P/PE

КОНТРОЛЮЄ / ВИМІРЮЄ
- фактичний об’єм
- витрату
- тиск
- pH
- EC у PE

РЕАГУЄ
- попередження
- підтвердження продовження where approved
- аварійна зупинка where approved
```

EC wording must always be: monitoring + deviation notification, not automatic EC correction.

**CTA:** `Переглянути конфігурації`.

**Source:** static taxonomy + future data-driven per-version availability.

---

### SECTION 07 — FIT / OPERATING CONTEXT

**Purpose:** establish suitability without creating thin industry pages.

Working categories:

- ягідні господарства;
- теплиці;
- розсадники;
- інші професійні системи поливу/живлення.

Each category gets a one-sentence operational relevance statement, not unsupported benefit claims.

No case/yield/ROI numbers without evidence.

**CTA:** no mandatory CTA. Later, only categories with differentiated evidence become dedicated pages.

**Source:** static initially / future CMS-like.

---

### SECTION 08 — PRODUCT BOUNDARY

**Purpose:** prevent procurement misunderstanding.

```text
ВАШ ОБ’ЄКТ                         BB610 WATER
Джерело → насос → фільтрація  →   CONTROL → HYDRAULIC → ZONE
```

**Message:** BB610 is not presented as replacing source pump/filtering infrastructure unless a later product decision changes scope.

**Source:** static/frozen.

---

### SECTION 09 — CONFIGURATION / VALUE / PRICE PREVIEW

**Purpose:** introduce configuration logic after the visitor has already seen difference, mechanism, proof, operating value and system scope.

Working intro:

`Спочатку визначається функціональна версія, потім кількість зон.`

```text
1. ЩО ПОТРІБНО?
[I] irrigation
[F1] 1 fertigation channel
[F2] 2 fertigation channels

2. ДОДАТКОВИЙ КОНТРОЛЬ
[base] [P: pH] [PE: pH + EC monitoring]

3. СКІЛЬКИ ЗОН?
[Z4(8)] [Z8(12)] [Z12(16)]

[working price / HMI option from data source]
[Підібрати конфігурацію]
```

Homepage should show understandable entry into the model, not necessarily the entire 21-cell matrix.

**Data:** Admin-managed for version availability/descriptions, zone configuration, prices, HMI prices, publish state, sort order. Static explanatory copy remains frozen/content-managed by code for Release 1.

---

### SECTION 10 — MOBILE / SCADA / INTELLIGENCE ECOSYSTEM

**Purpose:** show interaction layer after core product understanding.

```text
BB610 Water → data → Mobile / SCADA → Intelligence*
```

- Mobile: operational access/state where approved.
- SCADA: detailed operational control and history.
- Intelligence: qualified ecosystem mention only; show only validated/entitled capabilities.

`* Intelligence availability/capability depends on product entitlement. PRODUCT VALIDATION for any detailed claim.`

**CTA:** none required in Release 1.

---

### SECTION 11 — FINAL CONVERSION

**Working headline:** `Підберемо конфігурацію під ваш об’єкт.`

**Primary CTA/form:** configuration request.

Minimum first-contact fields:

- ім’я;
- телефон or email (require at least one preferred contact method);
- кількість зон;
- irrigation type;
- fertigation need: none / F1 / F2 / not sure;
- pH need: yes / no / not sure;
- optional comment.

Do not require a full engineering questionnaire before first contact.

**Secondary lower-intent action:** `Потрібна консультація` may use a shorter form: name + contact + comment.

**Success state concept:**

`Запит отримано. Ми зв’яжемося для уточнення параметрів об’єкта.`

No fake success until backend exists.

---

## 4. First four screens as one commercial argument

The first four screens should be read as one sentence:

1. **Difference:** BB610 verifies actual result.
2. **Mechanism:** target → execution → measurement → verification.
3. **Proof:** real SCADA shows planned/current/actual/deviation state.
4. **Value:** owner remains in control without physically supervising the irrigation node all day.

Hardware appears only after this argument. This prevents the site from being misread as a controller/PLC catalogue.

---

## 5. Product/System page wireframe `/product/`

### Page goal

Explain BB610 Water as one professional system, then show CONTROL / HYDRAULIC / ZONE and system boundary.

### Low-fidelity structure

```text
[H1] BB610 Water — система контролю поливу та фертигації
[short product definition]
[CTA: Підібрати конфігурацію]

[actual-result principle]
Задано → виконано → перевірено

[whole-system process diagram]
source/object → CONTROL → HYDRAULIC → ZONE → irrigation zones

[CONTROL]
what it does
what data/logic it handles
engineering visualization / future photography slot

[HYDRAULIC]
water preparation, measurement, fertigation/pH according to version
engineering visualization / future photography slot

[ZONE]
distribution by zones
engineering visualization / future photography slot

[system boundary]
what belongs to customer object vs BB610

[capability map]
control vs monitor vs correct

[SCADA proof]
real approved screenshot/crop proving system state/result visibility

[configuration bridge]
I / F1 / F2 → P / PE → Z4/Z8/Z12
[CTA: Переглянути конфігурації]

[final CTA]
Підібрати конфігурацію
```

### Desktop

Alternating text/media or stable two-column modules. The module visual container must be generic enough to accept current engineering render now and real photography later.

### Mobile

Each module becomes: title → process role → visual → facts. Do not place three tiny modules in one row.

### Proof mapping

- process diagram proves system completeness/process location;
- engineering module visuals prove physical modularity, not final industrial design;
- SCADA proves operational monitoring/control layer;
- plan/actual example reconnects hardware to actual-result value.

### Technical annotations

- semantic sections and headings;
- no JS required for core content;
- optional progressive disclosure only for deep details;
- all explanatory content must remain indexable HTML;
- media uses responsive sources.

---

## 6. Configurations & Pricing page `/configurations/`

Authoritative commercial model:

- versions: I, F1, F1-P, F1-PE, F2, F2-P, F2-PE;
- zones: Z4(8), Z8(12), Z12(16);
- 21 combinations;
- HMI price option where retained by the pricing source.

### Approach A — version-first configurator (recommended)

```text
[H1] Конфігурації BB610 Water
[explain 2 dimensions: function + zones]

STEP 1 — FUNCTION
I      irrigation only
F1     1 fertigation channel
F1-P   F1 + pH management
F1-PE  F1 + pH + EC monitoring
F2     2 fertigation channels
F2-P   F2 + pH management
F2-PE  F2 + pH + EC monitoring

STEP 2 — ZONES
Z4(8) | Z8(12) | Z12(16)

STEP 3 — HMI
without HMI | with HMI

RESULT
[selected version]
[selected zone config]
[features summary]
[current working price]
[disclaimer]
[Підібрати цю конфігурацію]

[optional full comparison below]
```

**Why recommended:** it teaches the product grammar instead of presenting 21 unrelated products. It works naturally on mobile and can consume one structured data source.

### Approach B — comparison matrix

```text
             Z4(8)       Z8(12)       Z12(16)
I            price       price        price
F1           price       price        price
F1-P         price       price        price
...
F2-PE        price       price        price
```

With expandable version explanations above or beside the table.

**Strength:** fast scanning for expert/high-intent users.

**Weakness:** first-time visitors must decode naming and 21 price cells; weak on mobile.

**Recommendation:** use Approach A as primary experience, with Approach B as optional desktop comparison/reference below, generated from the same data.

### Native mobile configuration pattern

```text
[Version cards / radio list]
I
F1
F1-P
F1-PE
F2
F2-P
F2-PE

[Zone segmented/select list]
Z4(8)
Z8(12)
Z12(16)

[HMI toggle/select]

[Result card]
Version: F1-PE
Zones: Z8(12)
EC: monitoring/deviation notification
Price without HMI: ...
Price with HMI: ...
[Request this configuration]
```

No forced 1120px horizontal table as primary mobile UX.

### Static vs Admin-managed

**Admin-managed/data-driven from Release 1:**

- version code;
- version enabled/published state;
- version short description;
- version sort order;
- zone configuration code;
- base/max zones;
- zone enabled/published state;
- price without HMI;
- price with HMI;
- currency;
- price disclaimer/version if operationally editable;
- combination availability;
- timestamps/version history.

**Static/frozen explanatory content:**

- meaning of I/F1/F2 hierarchy;
- P = pH management;
- PE = pH + EC monitoring;
- EC is not automatic closed-loop correction;
- product-selection explanation.

### Data identity

Do not create 21 standalone product records. Use dimensions:

`product_version × zone_configuration → price/combination record`.

---

## 7. Technology page template

Route family example: `/technology/volume-control/`.

The template should be reusable only when a topic has enough distinct substance. Do not create thin duplicates.

### Generic template

```text
[H1 technology/problem]
[problem in user language]

[why common approach is insufficient]

[principle]
what is measured / controlled

[how BB610 handles it]
step-by-step process

[evidence]
real screenshot / diagram / actual numeric explanatory scenario

[boundaries]
what the function does NOT mean

[related configurations]
which versions include/rely on this capability

[CTA]
Підібрати конфігурацію
```

### Demonstration — actual-volume control

**H1 working:** `Полив за фактичним об’ємом`.

**Problem:** valve-open time does not by itself prove how much water actually reached the irrigation system.

**Principle:** the flow meter provides actual delivered-volume data.

**BB610 handling:**

`target volume → irrigation starts → flow measured → accumulated actual volume → stop/verify → status/deviation`.

**Evidence:** explanatory 800/802 example + real SCADA crop if approved asset shows plan/actual.

**Boundary:** time-based irrigation remains available; actual volume remains a measured result. Do not imply agronomic target selection by BB610.

**Related configurations:** core irrigation function across the product line, subject to product data source.

**CTA:** `Підібрати конфігурацію`.

### Future reuse

- fertigation;
- pH management;
- EC monitoring;
- flow/pressure control/monitoring.

Each page must carry unique problem, mechanism, evidence and boundaries.

---

## 8. SCADA proof architecture

SCADA is not a decorative hero background.

### Homepage proof crop

**Needed content:** plan/actual + zone/cycle state + deviation/status if available.

**Claim:** visitor can see what was intended and what actually happened.

### Product page crop

**Needed content:** broader system or zones overview.

**Claim:** BB610 operates as a real multi-zone control environment.

### Technology page crop

**Needed content:** focused actual-volume/flow evidence.

**Claim:** volume verification is based on operational data.

### Configurations page

SCADA is optional and secondary. It should not distract from selection/price logic.

### Asset rule

If existing assets do not show the exact required proof:

`ASSET/PROOF NEEDED`.

Never redraw a convenient fake SCADA state.

---

## 9. Lead / configuration-selection flow

### High-intent flow

Entry points:

- persistent header CTA;
- configuration result CTA;
- pricing section CTA;
- final homepage CTA;
- product/technology pages.

Flow:

```text
[CTA: Підібрати конфігурацію]
        ↓
[short configuration context]
- zones
- irrigation type
- fertigation need
- pH need
- contact
        ↓
[optional comment]
        ↓
[submit]
        ↓
[success / next-contact expectation]
```

Recommended minimum fields:

1. name;
2. phone or email;
3. zones / approximate number of zones;
4. irrigation type;
5. fertigation: none / 1 channel / 2 channels / not sure;
6. pH management: yes / no / not sure;
7. optional comment.

If visitor comes from a selected configuration, prefill/attach version + zone + HMI choice without forcing re-entry.

### Lower-intent consultation

Separate secondary route:

- name;
- contact;
- short comment.

Do not visually give it equal weight everywhere. Primary conversion remains `Підібрати конфігурацію`.

### Success/error

Both states must be explicit when backend is later implemented. No fake success in static frontend.

---

## 10. Pricing/value placement rationale

Price should appear only after the visitor has received enough context to avoid comparing BB610 with a basic timer/controller.

Minimum value context before price on the homepage:

1. actual-result differentiation;
2. flow-based verification mechanism;
3. real SCADA proof;
4. owner/manager operating value;
5. complete system architecture/capability boundary.

On `/configurations/`, price may appear earlier because the user has explicitly entered a high-intent pricing destination, but the top of that page still needs a concise explanation of the two-dimensional model and what P/PE mean.

---

## 11. Content/source classification

### A. Code/static/frozen content

- core product proposition;
- `Задав → виконала → перевірила` logic;
- slogan;
- CONTROL / HYDRAULIC / ZONE structure;
- product boundary;
- pH vs EC functional distinction;
- technology explanatory principles;
- core navigation structure.

### B. Admin-managed operational content

- public product version records;
- version descriptions where operational edits are allowed;
- zone configuration records;
- prices without/with HMI;
- currency;
- combination availability;
- enabled/published state;
- sort order;
- price/configuration timestamps/history.

### C. Future CMS-like content

- cases;
- industry pages when differentiated evidence exists;
- expert articles;
- expanded product media library;
- future SCADA/Intelligence editorial pages.

Release 1 must not introduce a heavy CMS just for C.

---

## 12. Semantic / accessibility / responsive implementation implications

These are annotations for later implementation, not code decisions.

### Semantic HTML

- one meaningful `h1` per page;
- sections with explicit headings;
- pricing selection expressed with native form controls where possible;
- comparison table remains a real table if included;
- evidence values available as text, not baked only into images;
- forms use associated labels.

### JavaScript

Needed only where it improves interaction:

- mobile navigation;
- progressive configuration selector;
- optional comparison/filter interaction;
- form submission later.

Core page comprehension must not depend on JS.

### Responsive

- mobile-first stacking;
- focused SCADA crops on small screens;
- no desktop matrix shrink as primary mobile solution;
- visual diagrams must remain readable without horizontal page overflow.

### Accessibility

- keyboard-operable menu/config selector;
- visible focus states;
- semantic status text, not color alone;
- reduced-motion support for any later animation;
- screenshots require meaningful contextual captions; decorative assets hidden from assistive tech when appropriate.

### SEO/indexability

All principal explanatory copy and technology content remains server/static-rendered HTML. Pricing values may be data-driven but should render into indexable HTML where appropriate.

---

## 13. Release 1 scope

### Core commercial path — must be complete

1. Homepage.
2. `/product/` system/product page.
3. `/configurations/` pricing/configuration page.
4. `/technology/volume-control/` actual-volume proof page.
5. configuration/contact conversion flow.
6. mobile/responsive equivalents.
7. real SCADA proof placements.
8. shared structured configuration/price data source assumption.

### Supporting / optional for Release 1

- fertigation technology page using the same template;
- pH/EC technology page(s) only if content/proof are ready and non-thin;
- compact ecosystem explanation for Mobile/SCADA/Intelligence.

These must not block the core commercial path.

### Later

- industry/use-case pages;
- expert materials hub;
- case library;
- standalone Intelligence page;
- expanded SCADA/Mobile pages;
- English localization;
- broader CMS/editorial system.

---

## 14. Open items / proof needs

R03 does not require new product-owner decisions to proceed to review because version naming is resolved by `PRODUCT_CONFIGURATION_FREEZE_R1.md`.

Items that must be validated before visual/content freeze where relevant:

1. **ASSET/PROOF NEEDED:** identify the exact approved SCADA screenshot/crop that best demonstrates plan vs actual on homepage.
2. **ASSET/PROOF NEEDED:** confirm which current engineering visuals are approved for CONTROL/HYDRAULIC/ZONE use in the new site before real photography exists.
3. **PRODUCT VALIDATION:** confirm exact public wording for Intelligence capabilities included in Release 1; default is a qualified ecosystem mention only.
4. **COPY VALIDATION:** final public wording for price disclaimer and HMI wording must come from accepted commercial source when visual/copy freeze is prepared.

Default if no further owner decision changes scope: Ukrainian-only Release 1, Intelligence as qualified ecosystem mention, no industry page blocking launch.

---

## 15. Acceptance checklist self-review

- [x] First screen distinguishes BB610 from timer/controller.
- [x] Two HERO variants were developed within one accepted concept; Variant A recommended.
- [x] First four screens form one commercial argument.
- [x] Hardware appears after value/proof and serves system explanation.
- [x] Real SCADA has explicit proof roles; missing evidence is marked rather than invented.
- [x] Configuration model uses authoritative 7 × 3 FREEZE.
- [x] Obsolete F1-PH/F1-EC/F2-PH/F2-EC names are not used in new commercial UI.
- [x] P/PE meaning is respected.
- [x] EC is monitoring/deviation notification, not automatic correction.
- [x] Mobile configuration is native and not dependent on a horizontally scrolling desktop matrix.
- [x] Primary CTA is `Підібрати конфігурацію` with a defined destination/flow.
- [x] No fake EN control is included.
- [x] Admin-managed pricing/configuration fields are identified.
- [x] No unsupported yield, ROI, savings or testimonial claims are introduced.
- [x] No final visual system, typography, effects or mockups are frozen.
- [x] No production/code changes are part of Task 03.

---

## 16. Stage result

**Document:** `BB610 WATER — WIREFRAME & CONTENT ARCHITECTURE R3`

**Status:** `REVIEW`

The low-fidelity wireframe/content-architecture stage is complete. In accordance with `docs/website/WORKFLOW.md`, work stops here before visual-system design or implementation until the supervising BB610 Water chat / owner reviews and accepts R03.
