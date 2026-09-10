# BB610 WATER — TASK 06 / COMMERCIAL DIALOGUE R1

- **Task:** 06
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Base:** R05 PASS staging implementation
- **Scope:** rewrite/recompose current staging around one customer dialogue; preserve centralized content/data architecture
- **Production:** DO NOT CHANGE
- **Copy:** WORKING COPY / REVIEW, not FREEZE

## 1. Central commercial idea

The site must stop reading like a feature list or a collection of slogans. It should read like a calm conversation with the owner of a small/medium farm who knows how he wants to grow, but does not want irrigation and feeding to require his personal participation in every routine operation.

Core principle:

**Ви вирішуєте, як вирощувати. BB610 бере на себе рутину поливу та підживлення.**

Supporting product logic:

**Ви вирішуєте → BB610 виконує → BB610 контролює.**

Do not turn these into repeated giant slogans. The page must prove them through concrete workflow and product evidence.

## 2. Customer psychology to preserve

The customer:

- earns investment money through his own business and will not pay 200–400+ thousand UAH for abstract automation;
- knows his plants and remains the decision-maker;
- may personally combine owner, manager, agronomist, irrigation operator and maintenance responsibilities;
- wants irrigation/feeding to work without requiring his presence at every cycle;
- wants different plant groups/zones to have different regimes;
- wants early information when execution deviates from what he set;
- wants professional-level control without having to become an automation engineer.

Do not sell "AI decides for you". Do not imply agronomic decisions are delegated to BB610.

## 3. Homepage dialogue

Rework the current staging homepage into the following commercial sequence. Keep it compact; do not create a long generic landing page.

### Screen 1 — What changes for me?

Working headline:

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ. BB610 БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ**

Working explanation:

Set the required regime for each zone. BB610 executes irrigation and fertigation according to your schedule, controls actual execution and reports deviations.

Show the principle visually and calmly:

**Ви вирішуєте → BB610 виконує → BB610 контролює**

Primary CTA: **Подивитися, як це працює**

This copy remains editable through `content.js`.

### Screen 2 — What no longer requires my presence every time?

Explain concrete operations, not abstract freedom:

- irrigation schedule;
- individual zones;
- irrigation by time or actual volume;
- several irrigation blocks/cycles per day;
- fertigation within the schedule;
- wetting / feeding / flushing structure where configured.

End with the meaning, not a slogan: the owner does not need to be beside the system during every irrigation and feeding cycle.

### Screen 3 — My plants are different

Heading direction: **Кожній зоні — свій режим**.

Explain that each zone has individual settings and can have a human-readable custom name.

Show realistic examples such as:

- `Duke — молоді`
- `Chandler — плодоношення`
- `Томати чері`
- `Улюблена грядка`

The purpose is both functional and emotional: the interface should feel like the customer's actual farm, not anonymous `ZONE 01 / ZONE 02` infrastructure.

Explain that zones may represent cultures, varieties, ages, growing areas or other groups chosen by the owner.

Key working thought:

**Ви налаштовуєте систему під свої рослини, а не рослини під можливості автоматики.**

Do not claim per-plant individual control when hardware control is zone-based.

### Screen 4 — How do I know it actually happened?

Move from command to fact.

Compare calmly:

Ordinary timer/controller evidence: valve was open for a specified time.

BB610 evidence: target volume vs actual measured volume.

Use the explanatory example clearly labeled as an example:

`Задано: 800 л → Фактично: 802 л → Цикл виконано`

Preserve the established product line:

**Полив за фактичним об’ємом, а не лише за тривалістю.**

Explain that the flow meter is the basis of actual-volume measurement. Do not overclaim diagnosis of why a deviation happened.

### Screen 5 — What if execution goes wrong?

Explain the division of responsibility:

The owner decides what plants need. BB610 controls how the instruction is executed.

Use only validated control/alert logic: monitoring, warning, warning + confirmation where applicable, and full emergency stop for applicable critical conditions.

Relevant monitored/controlled signals may include actual flow, pressure, pH, EC monitoring, low-level and system state according to actual product capability.

Do not imply EC closed-loop automatic correction. EC = monitoring/deviation notification in PE.

### Screen 6 — Feeding without a separate manual ritual

Explain fertigation as part of the irrigation workflow rather than a technical F1/F2 feature.

Important distinction:

The user prepares the mother solution / stock solution. BB610 does NOT automatically weigh/mix raw fertilizer into a new stock solution from scratch.

The system's built-in mixing pump(s) automate mixing/recirculation of the prepared stock solution as part of the working process, and fertigation/dosing becomes part of the scheduled irrigation cycle.

Show the cycle concept:

**СМАЧИВАННЯ → ПІДЖИВЛЕННЯ → ПРОМИВКА**

An example such as `15% / 70% / 15%` may be shown only as **an example configuration, not a universal agronomic recommendation**.

Explain the practical benefit: feeding stops being a separate labor-intensive repeated operation; the owner can distribute feeding within the irrigation cycle according to his technology rather than performing every stage manually.

Avoid unsupported claims that this guarantees yield improvement or a specific soil/plant effect.

### Screen 7 — Where do I see and manage all this?

Use **real BB610 PULS evidence**.

PULS should answer the customer question, not merely decorate the page.

Annotate/call out only what the real screenshot actually shows. Where supported, help the viewer recognize zones, schedule/current state, actual values, warnings/history etc.

Use human-readable zone names in staging/demo data where this does not falsify a real screenshot.

BB610 PULS = main control software/SCADA.
BB610 PULS MOBILE = mobile access/interface within the PULS family.

Do not fabricate PULS UI.

### Screen 8 — What system do I need and what does it cost?

Lead naturally into the existing configuration selector.

Customer language first:

1. irrigation only or feeding too?
2. one or two fertigation channels?
3. pH management needed?
4. EC monitoring needed?
5. how many zones now / expansion need?

Then resolve to exact frozen names:

`I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`

and

`Z4(8) / Z8(12) / Z12(16)`.

Do not hide the price after the customer understands the value. Use current validated commercial data only; do not invent F1-P/F2-P prices.

## 4. Product value hierarchy

The homepage should allow the customer to infer these benefits rather than presenting them as four marketing cards:

- less personal presence required for routine irrigation/feeding operations;
- individual regime for each zone;
- actual execution measurement rather than command-only automation;
- earlier visibility of controlled deviations;
- irrigation and feeding managed as one coordinated process;
- professional control tools accessible to a small/medium farm without requiring the owner to operate inside an automation cabinet.

Avoid giant labels such as `СВОБОДА / РИЗИК / ПРОФЕСІЙНІСТЬ`.

## 5. pH / EC language

Be precise:

- pH: management/correction + control according to configured product version;
- EC in PE: monitoring/deviation notification;
- never describe EC as closed-loop automatic EC correction.

Working thought for detailed content: water management is not only litres; the owner can control the conditions of the irrigation/fertigation process within the capabilities of the selected configuration.

## 6. Installation / ownership burden

Introduce the product's plug-and-play design without saying maintenance is unnecessary.

Explain that the modular CONTROL / HYDRAULIC / ZONE architecture and protected quick external electrical connections are designed to reduce on-site wiring/commissioning complexity and avoid routine manual work inside cabinets.

HYDRAULIC contains the mixing pump(s): one for one fertigation channel, two for two channels, according to configuration.

Do not claim zero maintenance.

## 7. Detailed page architecture to prepare

Do not fully implement all subpages in Task 06 unless already trivial in the current architecture. However, make homepage navigation/content architecture ready for these future pages and document the intended routes:

- `/irrigation/` — irrigation scheduling, actual volume, zones, multiple daily cycles;
- `/fertigation/` — feeding workflow, stock solution mixing/recirculation, wet/feed/flush cycle;
- `/ph-ec/` — pH management and EC monitoring;
- `/puls/` — real PULS product evidence;
- `/puls/mobile/` or appropriate nested PULS mobile section;
- `/system/` — CONTROL / HYDRAULIC / ZONE, plug-and-play physical architecture;
- `/configurations/` — selector, versions, zones, prices;
- later industry pages such as blueberry, nursery, greenhouse, container growing.

Do not expose `BB610 SYSTEM` as a public product name.

## 8. Maintainability

Preserve R05 centralized architecture.

All new working copy must live in the centralized content/data layer, not be scattered through HTML.

All demo zone names/settings used by site components should be centralized data too.

Do not break future Water Admin readiness.

## 9. Real PULS screenshot requirement

The repository already references existing PULS assets through `docs/website/staging/data/assets.js`:

- desktop PULS: `assets/extracted/13_b432ba406d4c.webp`;
- mobile interface: `assets/extracted/12_09ab0debbc03.webp`.

Use these as existing repository evidence unless review shows they are not the correct/current real screens.

Do not generate a fake screenshot.

If a cleaner screenshot/crop is needed, create a derivative review asset from the real source without altering UI content, and clearly document source → derivative. Cropping, framing and non-destructive annotation for the marketing page are allowed; redesigning the SCADA screenshot is not.

If the current asset cannot prove target-vs-actual, keep that explanatory proof as HTML/site graphics and mark a dedicated PULS proof crop as `ASSET/PROOF NEEDED` rather than fabricating it.

## 10. Visual/UX instruction

Keep the accepted R05 visual base. This task is primarily commercial dialogue/content hierarchy, not another redesign.

Use whitespace, real UI evidence, simple diagrams and concrete examples. Reduce generic feature-card language and excessive slogans.

The visitor should feel he is being shown how his work changes, not being advertised at.

Mobile must preserve the dialogue sequence and readability.

## 11. Deliverable

Implement Task 06 in the current isolated staging and create:

`docs/website/R06_COMMERCIAL_DIALOGUE.md`

Status: **REVIEW**.

R06 must include:

- exact staging/preview URL/path;
- homepage dialogue implemented;
- content/data files changed;
- PULS asset used and whether derivative crop/annotation was created;
- any statements/assets still requiring owner confirmation;
- responsive checks;
- confirmation production was not changed;
- commit SHA.

## 12. Stop condition

After implementation and commit:

- set R06 = REVIEW;
- report preview URL/path and commit SHA;
- stop;
- do not deploy production;
- do not freeze copy;
- do not invent missing product capabilities/prices;
- wait for owner/supervising review.