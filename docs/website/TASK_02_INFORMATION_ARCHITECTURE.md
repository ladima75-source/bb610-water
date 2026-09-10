# BB610 WATER — TASK 02 / INFORMATION ARCHITECTURE

- **Task:** 02
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Input:** `R01_CURRENT_WEBSITE_TECHNICAL_AUDIT.md` — PASS by supervising BB610 Water chat
- **Scope:** information architecture and commercial/SEO structure only
- **Production:** DO NOT CHANGE
- **Website code:** DO NOT CHANGE

## 1. Decision on R1

`BB610 WATER — CURRENT WEBSITE TECHNICAL AUDIT R1` is accepted as **PASS**.

R1 correctly identifies the current static architecture, accumulated CSS debt, fixed-artboard legacy, hard-coded pricing/configuration data, mobile limitations, missing backend/admin layer, SEO limitations, migration risks and source materials that must be protected.

One adjustment from the supervising chat: the **Water Admin data architecture must be defined early during information architecture**, even though implementation of the admin UI/backend may happen later. Do not build a new public site around another temporary hard-coded pricing table and only then design the data model.

## 2. Objective

Prepare the information architecture for the next BB610 Water website before wireframes, visual design or implementation.

The architecture must combine:

1. the commercial idea of **control of the actual result**;
2. the real BB610 Water product architecture and capabilities;
3. the user journey of an owner/manager of a small or medium agricultural operation;
4. scalable SEO architecture;
5. future Water Admin-managed data;
6. preservation of approved SCADA/system/configuration evidence.

Do not mechanically reproduce the current site's section order.

## 3. Product truth to preserve

BB610 Water is a professional irrigation / fertigation control system, not a timer and not consumer smart irrigation.

Core principle:

**Користувач приймає рішення. BB610 виконує його і контролює фактичний результат.**

Internal product formula:

**Задав → система виконала → система перевірила.**

Existing slogan remains:

**«Полив за фактичним об’ємом, а не лише за тривалістю».**

The system is fundamentally based on flow measurement / flow meter data. The public value proposition may therefore use plan-versus-actual volume as a central proof mechanism.

Example explanatory logic (not mandatory literal copy):

**Задано 800 л → фактично подано 802 л → результат перевірено → цикл виконано / виявлено відхилення.**

Do not imply that BB610 makes agronomic decisions instead of the user.

## 4. Approved functional boundaries

Architecture and copy planning must respect these boundaries:

- irrigation schedules;
- individual zones;
- irrigation by time or actual volume;
- multiple irrigation blocks during the day;
- individual zone modes;
- fertigation;
- pH management/correction in applicable configurations;
- EC monitoring and deviation notification — **do not present EC as closed-loop automatic regulation**;
- wetting / feeding / flushing cycle structure (e.g. 15/70/15 as an explanatory scenario, not a universal prescription);
- design/expected zone flow;
- actual flow;
- plan-vs-actual comparison;
- pressure monitoring;
- warnings and protective reactions;
- history and system state.

Depending on the event, the protection logic may include warning, warning requiring confirmation to continue, or emergency stop. Do not flatten this into generic notifications and do not invent unapproved alarms.

## 5. Product architecture

Preserve the real architecture:

**CONTROL / HYDRAULIC / ZONE**

Preserve current product/configuration families as source data until a separate product decision changes them. R1 audited the current public matrix including I, F1, F1-PH, F1-EC, F1-PE, F2, F2-PH, F2-EC, F2-PE and Z4(8), Z8(12), Z12(16).

Do not independently remove or rename public configurations during IA work. Where current website naming may conflict with newer product decisions, mark it as **REQUIRES PRODUCT VALIDATION** rather than silently resolving it.

## 6. Primary user

Primary user: owner or manager of a small/medium farm, berry operation, nursery, greenhouse or similar professional growing operation.

Often one person carries responsibility for plants, irrigation, nutrition, equipment, personnel, purchasing, sales and day-to-day farm problems.

The site must address the need to:

- know that irrigation/nutrition is actually being executed;
- detect deviations without standing next to the system all day;
- understand actual results;
- remain in control of decisions;
- operate professionally without needing a dedicated automation engineer.

Key psychological value:

**«Я керую господарством професійно і розумію, що відбувається».**

## 7. Commercial positioning

Do not sell PLCs, relays, valves and sensors as the primary value.

Sell **control of the critical water and nutrition process**.

Positioning direction:

**professional-level management of water and nutrition without the complexity and cost structure of large industrial automation.**

Do not position BB610 as a cheap Netafim/Priva substitute, Chinese automation, or household smart irrigation.

Indicative system value/price context is approximately 200–400+ thousand UAH depending on configuration. For this stage, retain the current site's pricing logic/data. Do not invent or update price values.

The architecture must help the visitor understand why the system costs what it costs before or at the point where prices are shown.

## 8. Required R2 deliverable

Create:

`docs/website/R02_INFORMATION_ARCHITECTURE.md`

Status when complete: **REVIEW**.

The document must include the following.

### A. User journey

Define the primary path from landing to commercial action:

**entry/search/ad/referral → first understanding → proof → relevance to farm → configuration understanding → price/value → lead/action**.

Identify likely objections/questions at each step.

### B. Homepage role

Define what the homepage must accomplish and what it should deliberately NOT try to contain.

Provide the recommended homepage narrative sequence by screens/sections. For every section specify:

- purpose;
- visitor question it answers;
- core message;
- evidence/visual type;
- primary CTA if any;
- destination or next logical step;
- whether content is static or future Admin-managed.

Do not produce visual design yet.

### C. First 3–4 screens

Detail the commercial logic of the first 3–4 screens.

The first five seconds must communicate that BB610 controls **actual execution/result**, not merely the command to irrigate.

Determine where/how to use plan-vs-actual, SCADA evidence, system process and owner/manager value without turning HERO into a technical dashboard show.

### D. Site map

Propose a scalable public site map following the general direction:

**Homepage → Product → Technologies → Industry/use cases → Expert materials**

but change it where justified.

For each proposed page state:

- purpose;
- main search/user intent;
- relationship to conversion;
- whether needed for initial release or later phase.

Avoid creating pages only to inflate SEO footprint.

### E. Product/configuration architecture

Define where visitors understand:

- CONTROL / HYDRAULIC / ZONE;
- I / F1 / F1-PH / F2 etc.;
- zone configurations;
- HMI option;
- differences between monitoring, control and correction;
- what is included / boundary of BB610 versus source pump/filtering infrastructure.

Do not turn the homepage into a BOM.

### F. Pricing/value architecture

Recommend the exact point in the user journey where prices/configurations appear and explain why.

Retain current pricing data for now.

Define what context must precede the table so a 200–400+ thousand UAH system is evaluated by value rather than compared with a timer/controller.

Define mobile behavior conceptually; do not assume a 1120px horizontally scrolling desktop table is the final mobile solution.

### G. Proof architecture

Map approved evidence to the journey:

- real SCADA development/screens;
- plan-vs-actual data;
- system/process diagrams;
- CONTROL/HYDRAULIC/ZONE engineering visualizations (clearly not final product photography);
- Mobile UI;
- Intelligence where entitlement/product claims are validated;
- actual numeric scenarios;
- later real product photography/cases.

For every proof item state what claim it proves.

### H. Lead/conversion architecture

Define primary and secondary conversion actions. Avoid generic CTA spam.

Consider actions such as system selection/configuration request, consultation, configuration/price review and contact, but recommend the strongest hierarchy rather than using all equally.

Specify what minimum information a lead form should request at different stages. Do not implement backend yet.

### I. SEO architecture

Build a search-intent map around real user language, including themes such as:

- автоматизація поливу;
- система фертигації;
- керування поливом;
- полив за об’ємом;
- контроль pH;
- контроль EC;
- автоматичне внесення добрив;
- контролер поливу;
- автоматизація ягідника;
- система поливу для теплиці;
- керування живленням рослин.

Separate commercial/product intent, technology/problem intent, industry intent and expert/informational intent.

Recommend which intents belong on homepage versus dedicated pages.

No SEO text walls.

### J. Water Admin data boundary — EARLY ARCHITECTURE REQUIREMENT

Define at IA level which public content must be data-driven from the start.

At minimum, configuration/price data must not be hard-coded into final public markup as the source of truth.

Refine the R1 model for:

- product versions;
- zone configurations;
- price without HMI;
- price with HMI;
- currency;
- enabled/published state;
- sort order;
- descriptions;
- timestamps/version history as appropriate.

Also classify homepage/site content into:

1. **code/static/frozen content**;
2. **Admin-managed operational content**;
3. **future CMS-like content** (cases/articles etc.).

Do not build Admin yet.

### K. Navigation and localization

Recommend top navigation for desktop/mobile based on user tasks, not current anchors by default.

Current UA/EN is decorative only. Propose a real localization architecture or explicitly stage EN for later. Do not leave a fake language switch in the new architecture.

### L. Release scope

Propose:

- **Release 1 must-have**;
- **Release 1 optional**;
- **later**.

Keep Release 1 commercially complete but technically controlled.

### M. Open product-owner decisions

Ask only questions that genuinely block or materially change IA. Do not re-ask facts already established in this task or R1.

For each question explain:

- why it matters;
- what default you recommend if the owner does not choose otherwise.

## 9. Design constraints for IA

No visual design is requested in R2, but IA must respect the future visual principle:

**professional / industrial / calm / precise / modern / trustworthy**.

No neon/futuristic show, decorative 3D for its own sake, meaningless glassmorphism, floating KPI spectacle, unsupported yield claims or AI-generated fake product photography.

Every future visual element must either **explain** or **prove**.

## 10. Technical constraints

R2 may recommend technology but must not implement it.

Future system requirements remain:

- mobile-first;
- fast/indexable HTML;
- strong Core Web Vitals;
- minimal heavy JS;
- scalable multi-page SEO architecture;
- responsive image delivery;
- accessibility;
- extensibility for cases and SCADA visualization;
- protected Admin;
- rollback-safe deployment.

Do not choose a heavy framework without a concrete benefit.

## 11. What NOT to do in Task 02

Do not:

- edit production website code;
- redesign HERO;
- create final copy;
- create wireframes;
- create visual mockups;
- implement Admin;
- change prices;
- invent product capabilities;
- remove current assets;
- modify `main` website files except adding the R2 review document under `docs/website/`;
- proceed to Task 03 before R2 receives PASS.

## 12. Handoff

When R2 is complete:

1. save the full document as `docs/website/R02_INFORMATION_ARCHITECTURE.md`;
2. set status to `REVIEW`;
3. commit it;
4. report the exact path and commit SHA in the Developer chat;
5. stop.

The supervising chat will read R2 directly from GitHub. The owner must not be used as a courier between chats.
