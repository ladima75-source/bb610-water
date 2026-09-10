# BB610 WATER — INFORMATION ARCHITECTURE R2

- **Revision:** R2
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Source branch:** `main`
- **Source commit:** `9bc08239965a09f2729662e02cea5f57a8e0f8fc`
- **Input:** `R01_CURRENT_WEBSITE_TECHNICAL_AUDIT.md` — PASS
- **Task:** `TASK_02_INFORMATION_ARCHITECTURE.md`
- **Scope:** information architecture only; no wireframe, no visual design, no implementation

## 1. IA principle

The new BB610 Water site must be organized around one commercial truth:

**Користувач приймає рішення. BB610 виконує його і контролює фактичний результат.**

The site must explain BB610 as professional control of water and nutrition processes, not as a timer, controller box, PLC catalogue, or household smart-irrigation product.

Primary communication logic:

**Задав → система виконала → система перевірила.**

The existing slogan remains valid:

**«Полив за фактичним об’ємом, а не лише за тривалістю».**

The IA must progressively answer:

1. What does BB610 actually control?
2. How do I know the task was really executed?
3. Is this relevant to my farm?
4. What is inside the system and what stays outside its boundary?
5. Which configuration do I need?
6. Why does it cost 200–400+ thousand UAH?
7. What do I need to provide to get a real proposal?

---

## 2. Primary user journey

### Stage 1 — Entry

Sources: search, ad, referral, direct link, industry recommendation.

Visitor question:
- What is BB610 Water?
- Is this just another irrigation controller?

Required answer:
- professional irrigation/fertigation execution control;
- actual result is measured, not assumed from valve-open time.

Primary objection:
- “I already have irrigation automation.”

Resolution:
- show difference between command and verified execution.

### Stage 2 — First understanding

Visitor question:
- What makes this different?

Required answer:
- plan versus actual;
- flow meter as the factual basis;
- time mode also exists, but actual delivered volume remains visible.

Primary proof:
- compact scenario: `задано 800 л → фактично 802 л → результат перевірено`.

### Stage 3 — Proof

Visitor question:
- Is this real or just marketing?

Required answer:
- real SCADA development;
- current system/process diagram;
- actual product architecture CONTROL / HYDRAULIC / ZONE;
- real monitoring/control/correction distinctions.

### Stage 4 — Relevance to farm

Visitor question:
- Is this suitable for my operation?

Required answer:
- farms, berry fields, nurseries, greenhouses and similar professional operations;
- individual zones;
- schedules;
- multiple daily blocks;
- wetting / feeding / flushing scenarios;
- pressure, flow, pH, EC monitoring according to configuration.

Psychological value:

**«Я керую господарством професійно і розумію, що відбувається».**

### Stage 5 — Configuration understanding

Visitor question:
- Which version do I need?

Required answer:
- product family logic;
- differences between irrigation only, fertigation channels, pH correction, EC monitoring;
- zone configurations;
- optional HMI;
- what is included and what is outside BB610.

### Stage 6 — Price/value

Visitor question:
- Why does the system cost this much?

Required answer before price:
- it controls a critical process;
- verifies actual execution;
- detects deviation;
- centralizes irrigation/fertigation state;
- reduces the need to physically stand beside the system;
- scales by configuration rather than being sold as a generic controller.

Only then show configuration/price data.

### Stage 7 — Lead/action

Visitor question:
- What do I need to send to receive a suitable configuration?

Required action:
- request system selection / configuration proposal.

Minimum useful inputs:
- contact name;
- phone or email;
- operation/farm name optional;
- number of irrigation zones;
- irrigation type;
- whether fertigation is required;
- whether pH management is required;
- comment/object specifics optional.

---

## 3. Homepage role

The homepage is not a full technical manual, BOM, SCADA manual, complete technology library or SEO article archive.

Its job is to:

1. establish the product difference in the first seconds;
2. prove that BB610 controls actual execution;
3. explain the system as a complete professional process;
4. show relevance to real farms;
5. make product architecture understandable;
6. establish value before price;
7. expose configuration/pricing logic without overwhelming the visitor;
8. convert to a qualified configuration request.

The homepage should deliberately NOT contain:

- detailed PLC/component lists;
- every alarm and event rule;
- detailed commissioning documentation;
- every SCADA screen;
- long SEO copy walls;
- full expert articles;
- detailed technical specifications better suited to product/technology pages.

---

## 4. Recommended homepage narrative sequence

### Section 1 — Actual-result proposition

**Purpose:** immediate differentiation.

**Visitor question:** What does BB610 do differently?

**Core message:** BB610 does not only send an irrigation command; it measures whether the required result was actually achieved.

**Evidence/visual type:** restrained plan-vs-actual proof; one real-system visual cue, not a dashboard collage.

**CTA:** `Підібрати конфігурацію`.

**Next step:** proof section.

**Data class:** static/frozen content.

### Section 2 — “Задав → виконала → перевірила”

**Purpose:** explain mechanism in plain language.

**Visitor question:** How is the result verified?

**Core message:** flow data confirms actual supplied volume; time mode remains available.

**Evidence:** numeric plan-vs-actual scenario plus compact process explanation.

**CTA:** optional text link to technology page later.

**Data class:** static/frozen.

### Section 3 — Real proof / SCADA

**Purpose:** prove that the product and control layer are real.

**Visitor question:** Can I actually see what happened?

**Core message:** SCADA shows what was planned, what is happening, what was delivered, and whether there is deviation.

**Evidence:** real SCADA screenshot(s), not decorative mock dashboard.

**CTA:** `Як працює контроль` / deeper product or technology page.

**Data class:** static initially; future managed media may be possible.

### Section 4 — Owner/manager value

**Purpose:** connect product to operating reality.

**Visitor question:** Why does this matter in my farm?

**Core message:** one person can remain in control of irrigation/nutrition without constant physical presence next to equipment.

**Evidence:** concise operational scenarios: zones, schedules, blocks, deviations, history.

**CTA:** none required.

**Data class:** static.

### Section 5 — CONTROL / HYDRAULIC / ZONE

**Purpose:** explain real product architecture.

**Visitor question:** What is the system made of?

**Core message:** three functional modules form one system: control, water preparation, zone distribution.

**Evidence:** approved engineering visualizations, clearly presented as product/system visuals and not final serial photography.

**CTA:** product details.

**Data class:** static/frozen product architecture.

### Section 6 — Functional capability map

**Purpose:** explain what can be controlled/monitored/corrected.

**Visitor question:** What functions are available?

**Core message:** irrigation, fertigation, pH correction where applicable, EC monitoring, pressure/flow, schedule, history, protections.

**Evidence:** structured comparison using correct verbs:
- irrigation: control/execution;
- pH: monitoring + automatic correction in applicable versions;
- EC: monitoring + deviation notification, not closed-loop regulation.

**CTA:** `Переглянути конфігурації`.

**Data class:** mixed: feature taxonomy static; per-version assignment Admin-managed.

### Section 7 — Fit by operation/use case

**Purpose:** establish relevance.

**Visitor question:** Is BB610 suitable for my type of operation?

**Core message:** suitable for berry farms, greenhouses, nurseries and similar professional systems where irrigation/nutrition execution matters.

**Evidence:** application categories and short problem statements; no unsupported yield claims.

**CTA:** links to industry pages as they become available.

**Data class:** static initially; future CMS-like content.

### Section 8 — Boundary of supply

**Purpose:** prevent misunderstanding.

**Visitor question:** What is BB610 responsible for and what must already exist at my site?

**Core message:** source water / pump / filtration remain on the object side; BB610 begins with control/water preparation/distribution according to approved boundary.

**Evidence:** simplified approved product-boundary diagram.

**CTA:** none.

**Data class:** static/frozen.

### Section 9 — Configuration and pricing

**Purpose:** allow qualified comparison after value is understood.

**Visitor question:** What version and price range applies to me?

**Core message:** choose functional family + zone configuration + optional HMI.

**Evidence:** data-driven comparison/pricing interface.

**CTA:** `Отримати конфігурацію під мій об’єкт`.

**Data class:** Admin-managed operational content.

### Section 10 — Mobile / SCADA / Intelligence ecosystem

**Purpose:** explain how the user interacts with the system.

**Visitor question:** Where do I see and manage the system?

**Core message:** local/control layer plus Mobile/SCADA; Intelligence is shown only where entitlement/product claims are validated.

**Evidence:** real approved UI screens.

**CTA:** deeper page later.

**Data class:** static initially; future product-managed media/content.

### Section 11 — Conversion

**Purpose:** turn understanding into qualified inquiry.

**Visitor question:** What should I do next?

**Core message:** send basic object parameters and receive a suitable configuration discussion.

**CTA:** primary conversion form.

**Data class:** operational lead form, backend later.

---

## 5. Commercial logic of first 3–4 screens

### Screen 1

Must communicate within five seconds:

- this is a professional irrigation/fertigation system;
- it controls actual execution, not merely timer duration;
- the user remains the decision-maker.

Do not place a large feature matrix, SCADA dashboard wall or product-module BOM in HERO.

Recommended proof level:

**one compact plan-vs-actual scenario** plus one visual cue that the system measures reality.

### Screen 2

Explain the mechanism:

**task → execution → measurement → verification**.

This is where flow-meter-backed actual volume should become explicit.

### Screen 3

Show real proof:

- approved SCADA screenshot;
- plan/fact state;
- actual process visibility;
- deviations/state.

The purpose is credibility, not feature spectacle.

### Screen 4

Translate technology into owner/manager value:

- know what actually happened;
- see deviations;
- understand system state;
- control multiple zones/blocks without standing near equipment all day.

This sequence avoids making HERO a technical dashboard while proving the product early enough.

---

## 6. Public site map

### Release 1

#### `/` — Homepage

**Purpose:** commercial explanation and conversion.

**Intent:** brand + broad commercial search.

**Conversion role:** primary entry and lead path.

#### `/product/` — BB610 Water system

**Purpose:** explain complete product architecture, system boundary and capability structure.

**Intent:** product/commercial.

**Conversion role:** high.

#### `/configurations/` — Configurations and prices

**Purpose:** explain versions, zone options, HMI and current pricing.

**Intent:** high commercial intent.

**Conversion role:** very high.

This page should consume the same Admin-managed source as homepage pricing blocks.

#### `/technology/volume-control/`

**Purpose:** explain irrigation by actual volume and plan-vs-actual verification.

**Intent:** technology/problem intent around volume-based irrigation/control.

**Conversion role:** medium-high.

#### `/technology/fertigation/`

**Purpose:** explain fertigation control, channels and cycle structure.

**Intent:** system fertigation / automatic fertilizer application.

**Conversion role:** medium-high.

#### `/technology/ph-ec/`

**Purpose:** clearly separate pH control/correction from EC monitoring.

**Intent:** pH/EC technology/problem search.

**Conversion role:** medium-high.

### Release 1 optional

#### `/solutions/berry/`

Intent: automation of berry operations.

#### `/solutions/greenhouse/`

Intent: irrigation/fertigation system for greenhouse.

Only publish when each page has real differentiated value, not thin SEO duplication.

### Later

#### `/solutions/nursery/`

#### `/scada/`

#### `/mobile/`

#### `/intelligence/`

Only after entitlement/product claims are validated.

#### `/knowledge/`

Expert materials hub.

#### `/knowledge/<article>/`

Problem/technology articles with real technical value.

Avoid generating pages solely to occupy keywords.

---

## 7. Product/configuration architecture

### CONTROL / HYDRAULIC / ZONE

Explain first as three functional responsibilities, not hardware BOM:

- **CONTROL** — decisions, schedules, logic, state, protection, user interface;
- **HYDRAULIC** — measurement, fertigation, pH correction where configured, mixing, process instrumentation;
- **ZONE** — distribution to individual irrigation zones.

### Version families

Current public source data must remain available:

- I
- F1
- F1-PH
- F1-EC
- F1-PE
- F2
- F2-PH
- F2-EC
- F2-PE

Any naming conflict with newer product architecture is **REQUIRES PRODUCT VALIDATION** and must not be silently corrected in IA/implementation.

### Zone configurations

- Z4(8)
- Z8(12)
- Z12(16)

Present as capacity/configuration choices, not separate products.

### HMI

Present as an option attached to a configuration, not a separate product family.

### Monitoring / control / correction vocabulary

The public architecture must enforce a semantic distinction:

- **monitoring** = observe/measure/report;
- **control** = execute/manage process according to user settings;
- **correction** = automatically adjust a controlled variable where the approved configuration supports it.

EC must remain monitoring/deviation notification unless product architecture later explicitly changes.

### Supply boundary

The product page and homepage should both clarify:

**Object side:** water source → pump → filtration.

**BB610 side:** control → water preparation → zone distribution.

---

## 8. Pricing/value architecture

Prices should not appear in the first screens.

Recommended journey point:

**after** visitor understands:

1. actual-result control;
2. proof via plan/fact and SCADA;
3. CONTROL/HYDRAULIC/ZONE architecture;
4. functional differences;
5. relevance to farm;
6. product boundary.

Then show configuration and price.

Reason: before this context, the visitor is likely to compare BB610 with a timer/controller. After this context, the price is evaluated against control of a critical water/nutrition process.

### Desktop concept

Use structured comparison with clear version hierarchy and zone/HMI choices.

### Mobile concept

Do not reproduce the current `min-width:1120px` table as the primary experience.

Recommended conceptual behavior:

- select functional version;
- view short feature summary;
- choose zone configuration;
- show price without/with HMI;
- optionally compare 2–3 versions.

The same underlying data source must drive both desktop and mobile presentations.

---

## 9. Proof architecture

### Plan-vs-actual numeric scenario

**Claim proved:** BB610 verifies execution, not merely command duration.

### Flow/process diagram

**Claim proved:** there is a defined process from measurement/control through preparation and distribution.

### Real SCADA development/screens

**Claim proved:** the user can see system state, plan/fact, parameters, events and deviations in a real control interface.

### CONTROL / HYDRAULIC / ZONE engineering visualizations

**Claim proved:** BB610 is a modular physical system with defined functional blocks.

**Constraint:** do not present them as final serial photography if they are engineering/visual representations.

### Mobile UI

**Claim proved:** system state can be accessed remotely in the approved mobile experience.

### Intelligence

**Claim proved:** analytical/diagnostic/recommendation layer exists only where entitlement and feature claims are approved.

**Constraint:** no implication that Intelligence independently makes agronomic decisions for the user.

### Actual numeric operating scenarios

**Claim proved:** product logic is measurable and concrete.

Use examples as scenarios, not universal agronomic prescriptions.

### Later product photography

**Claim proved:** physical production quality and installed-system reality.

### Later cases

**Claim proved:** real deployment context and operational outcome.

Avoid unsupported yield/ROI claims.

---

## 10. Lead/conversion architecture

### Primary CTA

**`Підібрати конфігурацію`**

This is stronger than a generic “Contact us” because it matches the visitor’s real commercial task.

Primary destination:
- configuration request form / guided lead form.

### Secondary CTA

**`Переглянути конфігурації та ціни`**

Use where visitor is ready to self-educate before contacting.

### Tertiary contextual links

Use as navigation, not competing CTA buttons:
- how actual-volume control works;
- product architecture;
- technology pages.

### Minimum form at early/high-level CTA

- name;
- phone or email;
- number of zones;
- short comment optional.

### Qualified form near pricing/configuration

- name;
- phone/email;
- company/farm optional;
- number of zones;
- irrigation type;
- fertigation required: yes/no/unsure;
- pH correction required: yes/no/unsure;
- comment.

Do not ask for engineering data that a typical owner/manager may not know before first consultation.

---

## 11. SEO intent architecture

### Commercial/product intent

Examples:
- автоматизація поливу;
- керування поливом;
- контролер поливу;
- система фертигації;
- автоматичне внесення добрив.

Best destinations:
- homepage for broad category/brand explanation;
- `/product/` for complete-system intent;
- `/configurations/` for high commercial intent.

### Technology/problem intent

Examples:
- полив за об’ємом;
- контроль фактичного об’єму поливу;
- контроль pH;
- контроль EC;
- автоматична корекція pH;
- контроль витрати води;
- контроль тиску в системі поливу;
- фертигація по зонах.

Best destinations:
- dedicated technology pages.

### Industry/use-case intent

Examples:
- автоматизація ягідника;
- система поливу для теплиці;
- автоматизація розсадника;
- керування живленням рослин у контейнерній культурі.

Best destinations:
- differentiated `/solutions/.../` pages.

### Expert/informational intent

Examples:
- як контролювати фактичний полив;
- чим відрізняється полив за часом від поливу за об’ємом;
- pH та EC у фертигації;
- як побудувати цикл змочування / живлення / промивання;
- як виявляти відхилення витрати по зоні.

Best destinations:
- future expert materials.

### Homepage SEO role

Homepage should target broad product/category understanding, not attempt to rank for every detailed technical query in one long page.

No SEO text walls.

---

## 12. Water Admin data boundary

The final public site must not use hard-coded HTML as the source of truth for configuration/pricing data.

### Required data-driven entities from the start

#### `product_versions`

Suggested fields:
- `id`
- `code`
- `name`
- `short_description`
- `full_description` optional
- `fertigation_channels`
- `ph_mode` (`none`, `monitor`, `correction` as product-approved vocabulary)
- `ec_mode` (`none`, `monitor` unless later approved otherwise)
- `enabled`
- `published`
- `sort_order`
- `valid_from` optional
- `valid_to` optional
- `created_at`
- `updated_at`

#### `zone_configurations`

- `id`
- `code`
- `base_zones`
- `max_zones`
- `description`
- `enabled`
- `published`
- `sort_order`
- `created_at`
- `updated_at`

#### `configuration_prices`

- `id`
- `product_version_id`
- `zone_configuration_id`
- `price_without_hmi`
- `price_with_hmi`
- `currency`
- `published`
- `valid_from`
- `valid_to` optional
- `created_at`
- `updated_at`

### History/versioning

At minimum, operational history should allow reconstructing previous published values. Recommended approaches later:

- append-only price history; or
- revision table/snapshot on publication.

Do not overwrite the only historical value without trace.

### Content classification

#### 1. Code/static/frozen content

Use for:
- core product principle;
- CONTROL/HYDRAULIC/ZONE architecture;
- approved supply boundary;
- stable navigation/page structure;
- stable technology explanations once frozen;
- design-system tokens/components.

#### 2. Admin-managed operational content

Use from Release 1 for:
- product versions;
- zone configurations;
- descriptions associated with versions/configurations;
- price without HMI;
- price with HMI;
- currency;
- enabled/published state;
- sort order;
- current publication timestamps/history.

Potential later operational fields:
- availability/lead-time labels;
- temporary commercial notes;
- featured configuration flag.

#### 3. Future CMS-like content

Use later for:
- cases;
- expert articles;
- industry solution pages if editorial updates become frequent;
- downloadable materials;
- approved new SCADA/Intelligence media.

Do not build a heavy CMS in Release 1 solely for these future needs.

---

## 13. Navigation architecture

### Recommended desktop top navigation

1. `Система`
2. `Як працює`
3. `Технології`
4. `Конфігурації та ціни`
5. `Рішення`
6. `Матеріали` — only when expert content exists
7. primary CTA: `Підібрати конфігурацію`

Avoid navigation labels that mirror old homepage anchors solely because they already exist.

### Mobile navigation

Same information hierarchy, collapsed into a simple menu. Keep primary CTA visible or clearly available without duplicating it excessively.

---

## 14. Localization architecture

Current `UA / EN` is decorative only and must not survive as a fake control.

### Release 1 recommendation

Primary language: **Ukrainian**.

If English content is not fully prepared, do not show EN toggle in Release 1.

### When EN is activated

Use real localized routes, for example:

- `/` or `/uk/...`
- `/en/...`

Requirements:
- translated page content, not machine-placeholder fragments;
- localized metadata;
- hreflang;
- canonical rules;
- localized navigation;
- shared underlying configuration/price data where language-neutral;
- localized descriptions stored separately where managed.

Recommended default: stage EN for later unless supervising/product owner explicitly requires bilingual Release 1.

---

## 15. Release scope

### Release 1 must-have

- new homepage architecture;
- product/system page;
- configurations/pricing page;
- technology page for actual-volume control;
- technology page for fertigation;
- technology page for pH/EC distinction;
- real responsive/mobile architecture;
- real lead conversion path;
- data-driven configuration/pricing source;
- protected Admin architecture for configuration/pricing management;
- real SCADA/system proof;
- SEO metadata/page architecture;
- accessibility baseline;
- rollback-safe release process.

### Release 1 optional

- berry solution page;
- greenhouse solution page;
- richer SCADA page if approved content is ready;
- one or two real case studies if reliable source material exists;
- English localization only if complete and approved.

### Later

- nursery and other industry pages;
- full expert materials hub;
- Mobile standalone page;
- SCADA standalone page expansion;
- Intelligence standalone page after entitlement/product validation;
- CMS-like editorial tools;
- extensive case library;
- downloadable technical resources.

---

## 16. Open product-owner decisions

Only decisions that materially affect IA are listed here.

### Decision 1 — Which current public version names remain valid for Release 1?

Current source includes I, F1, F1-PH, F1-EC, F1-PE, F2, F2-PH, F2-EC, F2-PE.

**Why it matters:** page hierarchy, configuration UI and Admin schema can preserve them technically, but public IA should not promote obsolete naming.

**Default recommendation:** retain all current names as source data and mark unresolved ones **REQUIRES PRODUCT VALIDATION** until product owner confirms the public set.

### Decision 2 — Is EN required in Release 1?

**Why it matters:** affects routing, metadata, content model, navigation and QA scope.

**Default recommendation:** Ukrainian-only Release 1; no fake EN toggle. Add EN only when complete localized content is ready.

### Decision 3 — Is Intelligence publicly included in Release 1 navigation or only referenced inside ecosystem proof?

**Why it matters:** entitlement-driven capabilities are not universal, so standalone prominence can overstate availability.

**Default recommendation:** mention Intelligence only as a clearly qualified ecosystem layer in Release 1; standalone page later after entitlement/feature set is frozen.

### Decision 4 — Which industry page should be first if only one can be produced for Release 1?

**Why it matters:** determines first use-case branch and search-intent priority.

**Default recommendation:** berry operations if the project has the strongest real domain knowledge and proof there; otherwise keep both berry/greenhouse pages out of must-have scope until differentiated content is ready.

---

## 17. Technical architecture constraints carried forward

This IA assumes the future implementation will preserve:

- mobile-first layout;
- indexable HTML;
- minimal heavy JavaScript;
- strong Core Web Vitals;
- responsive images;
- accessibility;
- scalable multi-page SEO structure;
- protected Admin;
- rollback-safe deployment;
- no heavy framework without a concrete need.

No implementation technology is frozen by R2.

---

## 18. R2 acceptance boundary

This document defines information architecture only.

It does not approve:

- final copy;
- wireframes;
- visual system;
- final HERO layout;
- final component design;
- new pricing values;
- final public configuration naming where marked for validation;
- Admin implementation technology;
- backend implementation;
- production changes.

---

## 19. Stage result

**Document:** `BB610 WATER — INFORMATION ARCHITECTURE R2`

**Status:** `REVIEW`

Task 02 is complete at the information-architecture level. In accordance with `docs/website/WORKFLOW.md`, work stops here until the supervising BB610 Water chat / owner assigns `PASS` or returns review findings.
