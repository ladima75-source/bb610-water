# BB610 WATER — WIREFRAME & CONTENT ARCHITECTURE R3.1

- **Revision:** R3.1
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Source branch:** `main`
- **Inputs:** `R03_WIREFRAME_CONTENT_ARCHITECTURE.md`, `TASK_03_1_WIREFRAME_CORRECTIONS.md`, `PRODUCT_CONFIGURATION_FREEZE_R1.md`, `PRODUCT_ARCHITECTURE_FREEZE_R1.md`
- **Scope:** corrected low-fidelity wireframe/content architecture; no production implementation; no final visual design

## 1. Purpose and precedence

This document is the corrected continuation of R03 and is intended to be unambiguous enough for Task 04 without requiring reconciliation between two competing structures.

Where R03 and R03.1 differ, **R03.1 takes precedence**.

Preserved commercial argument:

1. actual-result differentiation;
2. flow-based execution verification;
3. real product/software proof;
4. owner/manager operating value;
5. system/configuration/value path;
6. primary CTA `Підібрати конфігурацію`.

Preferred HERO direction remains R03 Variant A, with terminology corrections below.

---

## 2. Authoritative public product hierarchy

All public wireframe references must use the frozen hierarchy:

```text
BB610 WATER
├── Physical system
│   ├── CONTROL
│   ├── HYDRAULIC
│   └── ZONE
├── BB610 PULS
│   └── BB610 PULS MOBILE
└── BB610 INTELLIGENCE
```

Rules:

- **BB610 WATER** = complete product/system customer buys.
- **CONTROL / HYDRAULIC / ZONE** = physical modules inside BB610 WATER.
- **BB610 PULS** = main control software / SCADA interface for BB610 WATER.
- **BB610 PULS MOBILE** = mobile control/monitoring interface in the PULS family.
- **BB610 INTELLIGENCE** = analytical/intelligent layer, with qualified capability-driven claims only.
- `SCADA` may appear only as a technical descriptor, not as the primary public product name where `BB610 PULS` is intended.
- **BB610 SYSTEM** = RESERVED / DO NOT USE publicly.

The website must not imply that WATER, PULS and INTELLIGENCE are separate unrelated products required to assemble a working solution.

---

## 3. Revised homepage — final recommended section count

Target: **8 meaningful sections**.

### 1. HERO — actual-result differentiation
**Job:** explain within ~5 seconds that BB610 WATER verifies actual irrigation execution/result, not only a command or duration.

### 2. Mechanism — task → execution → measurement → verification
**Job:** explain how the claim works and make flow-based factual measurement explicit.

### 3. Real operating proof — BB610 PULS
**Job:** prove the system is real and operational by showing real PULS state/results rather than decorative telemetry.

### 4. Owner/manager value + operating fit
**Job:** connect technical control to daily farm management and absorb the former separate FIT block.

### 5. Complete BB610 WATER architecture
**Job:** explain both coordinated layers in one place: physical CONTROL/HYDRAULIC/ZONE and control/intelligence via PULS / PULS MOBILE / INTELLIGENCE; include product boundary here.

### 6. Capabilities → configuration entry
**Job:** clarify what is controlled, monitored or corrected and lead naturally into the frozen commercial versions.

### 7. Configurations, value and price
**Job:** present version + zone choice, value context and price using structured Admin-managed data; include the main high-intent conversion.

### 8. Closing conversion/contact
**Job:** provide a short lower-friction route for visitors not ready to select a configuration, without duplicating CTA spam.

This replaces the former 11-block tendency by merging:

- FIT into owner/manager value;
- product boundary into complete system architecture;
- detached ecosystem section into WATER/PULS/PULS MOBILE/INTELLIGENCE architecture;
- main conversion into configurations/pricing, leaving only a compact closing contact route.

---

## 4. Homepage wireframe — corrected full structure

## SECTION 01 — HERO / ACTUAL RESULT

**Working headline:** `Полив, результат якого система перевіряє.`

**Supporting message:** `BB610 WATER виконує заданий полив і контролює фактично поданий об’єм.`

**Proof component:**

```text
ПОЯСНЮВАЛЬНИЙ ПРИКЛАД
Задано       800 л
Фактично     802 л
Статус       Виконано

Задав → Виконала → Перевірила
```

Mandatory label: `Пояснювальний приклад, не live-дані об’єкта.`

**Primary CTA:** `Підібрати конфігурацію`

**Secondary action:** `Як це працює`

**Desktop:** copy left; compact proof right.

**Mobile:** headline → short explanation → proof card → primary CTA → secondary link.

**Do not show:** hardware wall, fake live dashboard, BB610 PULS screenshot in HERO, or multiple competing CTAs.

---

## SECTION 02 — HOW VERIFICATION WORKS

**Working headline:** `Задав → система виконала → система перевірила.`

```text
[ЗАВДАННЯ]
об’єм або час
      ↓
[ВИКОНАННЯ]
полив конкретної зони
      ↓
[ВИМІРЮВАННЯ]
фактична витрата / фактичний об’єм
      ↓
[ПЕРЕВІРКА]
виконано / відхилення
```

Core clarification:

- irrigation may run by target volume or time;
- actual delivered volume is measured;
- the flow measurement is the factual basis of result verification.

**CTA:** text link to actual-volume technology page.

**Technical note:** HTML/SVG preferred; core meaning must remain text/indexable; animation optional later, never required for comprehension.

---

## SECTION 03 — REAL BB610 PULS PROOF

**Working headline:** `Видно не лише команду. Видно, що реально відбулося.`

BB610 PULS must prove operating reality of BB610 WATER.

### Placement A — homepage first proof crop

**Claim proved:** user can see current execution and result, not merely an issued command.

**Required screen/crop:** one approved PULS zones/operation screen showing, where actually available:

- zone identity/state;
- task/target;
- actual delivered value or actual flow;
- execution status;
- deviation state if present in the real screen.

**Existing approved asset sufficiency:** current generic SCADA/PULS image may support the existence of the working interface, but if plan-vs-actual cannot be read clearly at homepage crop size, mark:

`ASSET/PROOF NEEDED — approved BB610 PULS crop showing target vs actual for one zone/cycle.`

**Do not invent values or redraw UI.**

### Placement B — product/system page PULS overview

**Claim proved:** BB610 PULS is the operator’s main working environment for monitoring/control of BB610 WATER.

**Required screen/crop:** approved main/overview or zones screen with enough interface context to identify real working software.

**Existing asset:** likely sufficient as overview evidence if branding/state is legible.

### Placement C — actual-volume technology page

**Claim proved:** actual-volume control is visible through the real system interface.

**Required screen/crop:** focused target/actual/history/cycle evidence tied to actual volume.

If unavailable:

`ASSET/PROOF NEEDED — PULS evidence specifically showing actual-volume execution/history.`

### BB610 PULS MOBILE

Use only where it proves useful mobile monitoring/control.

Recommended homepage placement: not a separate section. Include a compact mobile example inside Section 05 or Product page.

**Claim proved:** operator can monitor/control defined functions from mobile.

**Boundary:** do not imply full desktop/mobile feature parity unless validated.

### BB610 INTELLIGENCE

Show as a qualified analytical layer inside the architecture, not a standalone AI spectacle.

Allowed conceptual role:

- analysis;
- diagnostics;
- detection of meaningful deviations;
- recommendations/advisory functions within validated capabilities.

Do not imply autonomous agronomy or replacement of local safety/control logic.

---

## SECTION 04 — OWNER/MANAGER VALUE + FIT

**Working headline:** `Ви приймаєте рішення. BB610 WATER виконує і показує результат.`

```text
[Розклад і блоки]
користувач визначає режим роботи

[Зони]
окремі налаштування / окремий фактичний результат

[Відхилення]
видимі та actionable

[Історія]
можна перевірити, що відбулося

[Контроль параметрів]
витрата / тиск / pH / EC за конфігурацією

[Робочий контекст]
не потрібно постійно стояти біля вузла, щоб розуміти стан процесу
```

Fit statement integrated here:

`Для ягідних господарств, теплиць, розсадників та інших професійних систем, де важливо контролювати фактичне виконання поливу і живлення.`

No separate lifestyle section; no unsupported ROI/yield/water-saving claims.

---

## SECTION 05 — COMPLETE BB610 WATER ARCHITECTURE

**Working headline:** `Одна система: обладнання, керування та аналітика.`

### Physical process layer

```text
ВАШ ОБ’ЄКТ
Джерело води → насос → фільтрація
                         ↓
                    BB610 WATER
                         ↓
[CONTROL] → [HYDRAULIC] → [ZONE]
```

Physical module role:

- **CONTROL** — automation/control logic and interfaces to process signals/actions;
- **HYDRAULIC** — water preparation, measurement, fertigation/pH functions according to configuration;
- **ZONE** — distribution/control by irrigation zones.

Use current engineering visualizations with clear presentation as engineering/product visuals, not final product photography.

Media containers must later accept real serial-product photography without changing section architecture.

### Control/intelligence layer

```text
BB610 WATER
     │
     ├── BB610 PULS
     │      └── BB610 PULS MOBILE
     │
     └── BB610 INTELLIGENCE
```

Explanatory relationship:

- WATER = complete system;
- PULS = main operator/control software (SCADA);
- PULS MOBILE = mobile interface within PULS family;
- INTELLIGENCE = qualified analytical/advisory layer.

Do not show these as separately purchased unrelated brands unless later commercial packaging explicitly requires it.

**CTA:** `Детальніше про систему` → Product/System page.

---

## SECTION 06 — CAPABILITIES → CONFIGURATION ENTRY

**Working headline:** `Що саме має контролювати ваша система?`

Structure by correct verbs:

### Виконує / керує
- полив за фактичним об’ємом;
- полив за часом;
- розклад;
- зонами;
- фертигацією in F versions;
- pH management/correction in P/PE versions.

### Вимірює / контролює
- фактичний об’єм;
- витрату;
- тиск;
- pH where applicable;
- EC in PE.

### Повідомляє / захищає
- відхилення;
- warnings;
- confirmation-required continuation where product logic allows;
- emergency stop where product logic allows.

**Critical wording:** EC in PE = monitoring/deviation notification; **not automatic EC correction**.

Then introduce commercial version logic:

```text
I      полив
F1     1 канал фертигації
F1-P   F1 + pH
F1-PE  F1 + pH + EC monitoring
F2     2 канали фертигації
F2-P   F2 + pH
F2-PE  F2 + pH + EC monitoring
```

This is explanatory/frozen product text. Availability/price fields are Admin-managed.

---

## SECTION 07 — CONFIGURATIONS, VALUE & PRICE

The visitor must not decode 21 unrelated products.

### Recommended presentation approach — progressive version-first selection

Step 1: select authoritative **product version**.

```text
[I]
[F1] [F1-P] [F1-PE]
[F2] [F2-P] [F2-PE]
```

Family grouping is visual only; each selectable item retains the full frozen public version name.

Step 2: select zone configuration.

```text
Z4(8)   Z8(12)   Z12(16)
```

Step 3: show resolved result.

```text
Вибрана конфігурація
F1-PE / Z8(12)

Без HMI   [data]
З HMI     [data]
```

Every result must resolve to exact `product_version + zone_configuration`.

### Alternative comparison approach

A full 7×3 matrix may remain available on the dedicated configurations page for expert comparison, but it should not be the only primary browsing interaction.

### Mobile native behavior

No forced 1120px table.

```text
[Version selector / stacked cards]
      ↓
[Zone selector]
      ↓
[Resolved configuration card]
F1-PE / Z8(12)
price without HMI
price with HMI
[Підібрати цю конфігурацію]

[Optional: Порівняти версії]
```

### Data/Admin boundary

Admin/data source:

- product version code;
- version description;
- enabled/published state;
- sort order;
- zone configuration code;
- base/max zones;
- price without HMI;
- price with HMI;
- currency;
- working/final-price disclaimer state/text if operationally managed;
- timestamps/version history.

Frozen/static explanatory content:

- meaning of I/F1/F2/P/PE;
- EC monitoring boundary;
- product hierarchy;
- value/context copy unless separately opened to Admin later.

### Value context immediately before price

Price must come after proof and system context. Intro should remind visitor that the price covers a complete professional process-control system, not a timer/controller.

No invented ROI calculation.

### Conversion integration

Primary CTA in the resolved card:

`Підібрати цю конфігурацію`

Automatically pass selected `version` and `zone configuration` into the lead form/lead payload.

Do not ask the visitor to re-enter the same selection.

---

## SECTION 08 — CLOSING CONTACT / LOWER-INTENT ROUTE

**Purpose:** serve visitors who understand the product but are not ready to choose a specific configuration.

Working headline:

`Не впевнені, яка версія потрібна? Опишіть об’єкт — підберемо напрям конфігурації.`

Secondary CTA:

`Обговорити об’єкт`

This is deliberately secondary to `Підібрати конфігурацію`.

Do not repeat multiple buttons throughout every section.

---

## 5. Corrected lead/configuration flow

## A. High-intent flow

Entry:

`Підібрати конфігурацію` or `Підібрати цю конфігурацію`.

If a configuration is already selected, attach automatically:

- selected product version;
- selected zone configuration;
- HMI preference if selected.

### Minimum first-contact fields

1. **Ім’я** — identifies the person for follow-up.
2. **Телефон або email** — one required contact route; do not force both.
3. **Тип об’єкта / господарства** — simple choice/free text such as ягідник / теплиця / розсадник / інше; gives operating context without BB610 terminology.
4. **Приблизна кількість зон** — materially affects Z configuration and scale; visitor may enter approximate value.
5. **Чи потрібна фертигація?** — `ні / 1 канал / 2 канали / не знаю`; directly helps route I/F1/F2 without requiring version knowledge.
6. **Чи потрібне керування pH?** — `так / ні / не знаю`; helps distinguish base/P families.
7. **Коментар** — optional for object-specific constraints.

### Irrigation method

Do **not** make irrigation method mandatory in the shortest first-contact flow. It can be optional (`крапельний / дощування / інше / не знаю`) if commercial team finds it useful for routing.

Reason: it may be relevant technically, but it should not add friction before first contact unless it materially changes commercial qualification.

### EC question

Do not force a visitor to decide whether they need `PE` terminology. If helpful, ask plain-language optional question such as `Потрібен контроль EC? так / ні / не знаю`, but only after the core fields or in a second step.

The form must not require customer knowledge of product codes.

## B. Lower-intent consultation

Minimum:

- name;
- phone or email;
- object/type optional;
- comment/question.

No configuration questionnaire required.

## C. Success state concept

After real backend implementation:

```text
Запит отримано.
Ми зв’яжемося з вами для уточнення конфігурації.
[summary of submitted selection if any]
```

Never simulate success without backend acknowledgement.

---

## 6. Product/System page — corrected wireframe

The page explains one complete BB610 WATER system through two coordinated layers.

### 1. Product proposition
`BB610 WATER — система, яка виконує заданий процес і контролює фактичний результат.`

### 2. Process/result logic
Task → execution → measurement → verification.

### 3. Physical system
CONTROL → HYDRAULIC → ZONE.

For each module:

- job in process;
- relation to actual-result control;
- engineering visualization now;
- future real-photo slot.

### 4. Supply boundary
Integrate directly with physical architecture:

`source water → pump → filtration` = object side;
`CONTROL / HYDRAULIC / ZONE` = BB610 WATER.

### 5. Control software
BB610 PULS presented as the main control software / SCADA interface of BB610 WATER.

Use real PULS screenshot(s) and explain what they prove.

### 6. Mobile control/monitoring
BB610 PULS MOBILE as the mobile interface in the PULS family.

Do not promise desktop parity.

### 7. Intelligence
BB610 INTELLIGENCE as qualified analytical/advisory layer.

Do not imply autonomous agronomic decisions.

### 8. Configuration bridge
Explain that commercial versions define how BB610 WATER is equipped; they are not sibling brands to PULS/INTELLIGENCE.

CTA → configurations page.

---

## 7. Configuration page — corrected behavior

The frozen commercial matrix remains 7 × 3 = 21 combinations, but public UI treats it as two dimensions.

### Primary browse mode

**Version-first progressive selector** recommended.

Why:

- preserves exact authoritative names;
- reduces cognitive load;
- works naturally on mobile;
- maps cleanly to Admin data model;
- resolves to one exact commercial result.

### Expert compare mode

Optional comparison table below the progressive selector on desktop/tablet.

Rows = seven authoritative product versions.
Columns = three zone configurations.
Each cell = combination-specific price data.

The table is secondary, not the only interface.

### HMI

Where retained by current price data, HMI is a price/presentation option attached to the resolved combination, not a new product-version dimension.

### Disclaimer

Use current approved price/working-price disclaimer from data source; do not invent/change values in wireframe stage.

---

## 8. Technology page template — terminology correction

Reusable template remains valid from R03.

For `/technology/volume-control/`:

1. user problem;
2. difference between command/time and actual execution;
3. flow-based principle;
4. how BB610 WATER handles it;
5. real BB610 PULS evidence;
6. boundaries/limitations;
7. relevant commercial versions/configurations;
8. CTA.

When showing interface proof, label it `BB610 PULS` first; `SCADA` may be explanatory descriptor only.

---

## 9. Header/navigation correction

Release 1 desktop:

```text
BB610 WATER
Система
Технології
Конфігурації
Контакти
[Підібрати конфігурацію]
```

Do not add PULS, PULS MOBILE or INTELLIGENCE as top-level navigation merely because they are named product layers; their Release 1 content lives inside Product/System architecture unless a later task creates dedicated pages.

Mobile:

```text
BB610 WATER   [Menu]

Система
Технології
Конфігурації
Контакти
[Підібрати конфігурацію]
```

Release 1 Ukrainian only. No fake EN toggle.

---

## 10. Footer correction

```text
BB610 WATER
Професійне керування поливом і фертигацією

Система
Технології
Конфігурації
Контакти

Контактні дані
Privacy/legal when ready
```

Optional compact product-family statement may mention:

`Керування: BB610 PULS · мобільний інтерфейс: BB610 PULS MOBILE · аналітика: BB610 INTELLIGENCE`

Do not mention BB610 SYSTEM.

---

## 11. Release 1 scope after correction

### Core commercial path — cannot be blocked

- homepage with revised 8-section structure;
- Product/System page;
- Configurations & Pricing page;
- actual-volume technology page;
- high-intent configuration lead flow;
- lower-intent contact path;
- responsive/mobile behavior;
- real BB610 PULS proof;
- correct WATER/PULS/PULS MOBILE/INTELLIGENCE naming;
- structured Admin/data dependency for pricing/configurations.

### Supporting but must not block core validation

- fertigation technology page using same template;
- pH/EC technology page using same template.

### Later

- industry pages;
- expert hub/articles;
- standalone PULS page;
- standalone PULS MOBILE page;
- standalone INTELLIGENCE page;
- English localization;
- cases library.

---

## 12. Data and implementation annotations

### Static/frozen

- master product naming/hierarchy;
- CONTROL/HYDRAULIC/ZONE architecture;
- meaning of I/F1/F2/P/PE;
- EC monitoring boundary;
- core product proposition;
- product boundary;
- core explanatory mechanism.

### Admin-managed from Release 1

- version records;
- zone configuration records;
- combination price without HMI;
- combination price with HMI;
- currency;
- published/enabled state;
- sort order;
- operational description fields where approved;
- timestamps/version history.

### Future CMS-like

- cases;
- industry pages;
- expert articles;
- richer media library;
- possibly managed PULS evidence assets after content governance is defined.

### Technical implications

- semantic/indexable HTML first;
- no heavy framework required by this wireframe;
- progressive configuration component may use light JS but must be data-driven and accessible;
- server/static-rendered fallback should expose configuration content to search engines and users without JS dependency where practical;
- images/screenshots require responsive crops/variants;
- all interactive selectors need keyboard/focus/state semantics;
- mobile configuration uses native stacked/selectable cards rather than desktop table shrinkage.

---

## 13. Asset/proof checklist for next stages

1. `ASSET/PROOF NEEDED` if no approved PULS crop clearly shows target vs actual at readable scale.
2. Validate existing PULS overview screenshot for Product page.
3. Validate PULS MOBILE screenshot and exact functions visible before public copy implies specific control scope.
4. Validate INTELLIGENCE screenshot/copy against entitlement/capability before use.
5. Preserve current engineering module visuals until real product photography is approved.
6. Do not fabricate UI states for marketing convenience.

---

## 14. Acceptance checklist

- [x] First screen differentiates BB610 WATER from timer/controller.
- [x] HERO Variant A retained as preferred direction.
- [x] Homepage reduced to 8 meaningful sections.
- [x] FIT merged into owner/manager value.
- [x] Product boundary merged into system architecture.
- [x] Ecosystem detached block removed; WATER/PULS/PULS MOBILE/INTELLIGENCE now one coherent product architecture.
- [x] BB610 SYSTEM removed from public architecture.
- [x] Generic SCADA references corrected to BB610 PULS where branded software is intended.
- [x] Real PULS proof roles specified with `ASSET/PROOF NEEDED` fallback.
- [x] Mobile parity is not assumed for PULS MOBILE.
- [x] INTELLIGENCE remains qualified and non-autonomous.
- [x] Seven frozen product versions preserved exactly.
- [x] Three frozen zone configurations preserved exactly.
- [x] Final selection resolves to exact version + zone, e.g. `F1-PE / Z8(12)`.
- [x] Configuration UI does not model public product as informal add-on toggles that obscure authoritative version names.
- [x] Native mobile configuration behavior defined.
- [x] Lead flow simplified and no longer depends on ambiguous mandatory irrigation-type field.
- [x] Existing selected configuration is passed automatically into lead context.
- [x] No automatic EC correction claim.
- [x] No production/code changes required by this document.

---

## 15. Stage result

**Document:** `BB610 WATER — WIREFRAME & CONTENT ARCHITECTURE R3.1`

**Status:** `REVIEW`

R03.1 is ready for supervising review. No Task 04 visual-system work or website implementation may begin until R03.1 receives PASS.
