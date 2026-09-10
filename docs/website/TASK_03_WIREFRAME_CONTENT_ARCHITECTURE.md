# BB610 WATER — TASK 03 / WIREFRAME & CONTENT ARCHITECTURE

- **Task:** 03
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Inputs:** `R01_CURRENT_WEBSITE_TECHNICAL_AUDIT.md` (PASS), `R02_INFORMATION_ARCHITECTURE.md` (PASS), `R02_REVIEW_FINDINGS.md`, `PRODUCT_CONFIGURATION_FREEZE_R1.md` (FREEZE)
- **Scope:** low-fidelity wireframe/content architecture; no production implementation
- **Production:** DO NOT CHANGE
- **Website code:** DO NOT CHANGE

## 1. Objective

Turn the accepted R02 information architecture into a concrete low-fidelity page/wireframe system that can be reviewed for commercial logic, content hierarchy, proof placement, mobile behavior and conversion flow before visual design or coding begins.

This task is not a graphic-design exercise. Do not choose final fonts, decorative effects, final photography treatment, final animation or polished UI styling.

The wireframe must answer: **what appears, in what order, why it appears there, what evidence supports it, what the user can do next, and how the same logic works on mobile.**

## 2. Authoritative commercial configuration source

Use `PRODUCT_CONFIGURATION_FREEZE_R1.md`.

Current public versions are exactly:

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

Zone configurations are exactly:

- Z4(8)
- Z8(12)
- Z12(16)

Total commercial matrix: **7 × 3 = 21 configurations**.

Do not use legacy `F1-PH`, `F2-PH`, `F1-EC`, `F2-EC` as separate new-site commercial versions.

EC in PE = monitoring/deviation notification, not automatic EC correction.

## 3. Commercial direction to preserve

The homepage and core journey are built around **control of the actual result**.

Core product logic:

**Користувач приймає рішення → BB610 виконує → BB610 контролює фактичний результат.**

Internal explanatory formula:

**Задав → виконала → перевірила.**

Existing slogan remains available:

**«Полив за фактичним об’ємом, а не лише за тривалістю».**

Do not turn the first screen into hardware sales or a decorative telemetry dashboard.

## 4. Required deliverable

Create:

`docs/website/R03_WIREFRAME_CONTENT_ARCHITECTURE.md`

Status when complete: **REVIEW**.

The R03 document must contain text/ASCII low-fidelity wireframes and content hierarchy for at least:

1. Homepage — desktop and mobile logic.
2. Product/System page.
3. Configurations & Pricing page.
4. Technology template/page system, demonstrated with actual-volume control.
5. Lead/configuration-selection flow.
6. Header/navigation and footer.
7. Pricing/configuration component desktop + mobile.

Do not create image mockups yet. The review must be possible directly from the Markdown document.

## 5. Homepage wireframe

Provide the complete homepage section order, but detail the first four screens most deeply.

For every section include:

- section purpose;
- proposed working headline (not final copy);
- supporting message;
- proof/visual required;
- CTA/action;
- destination;
- desktop composition;
- mobile stacking/priority;
- source type: static/frozen, Admin-managed, or later CMS content.

### First-screen requirement

Within approximately five seconds, a visitor must understand that BB610 controls actual execution/result, not merely irrigation duration or valve command.

Develop 2 low-fidelity HERO variants within the accepted concept, not 2 different marketing concepts. Compare them and recommend one.

Possible evidence language may use a clearly labeled explanatory example such as:

`Задано 800 л → Фактично 802 л → Цикл виконано`

but do not present invented values as live telemetry from a real installation.

### First four screens

The accepted direction is broadly:

1. differentiation / actual-result control;
2. how the mechanism works;
3. real proof (SCADA/process/data);
4. owner/manager operational value.

You may refine the boundaries if the commercial logic improves, but explain why.

## 6. Product/System page

Wireframe a page that explains BB610 Water as one system and then its physical/product architecture:

**CONTROL / HYDRAULIC / ZONE**.

Requirements:

- do not lead with BOM/components;
- explain what each module does for the process;
- show supply/product boundary clearly;
- plan for current engineering visualizations without presenting them as final product photography;
- provide a future slot for real product photography without requiring a redesign;
- connect system architecture back to actual-result control.

## 7. Configurations & Pricing page

This page must make the 7-version × 3-zone system understandable without forcing the visitor to decode 21 unrelated products.

Develop at least two low-fidelity presentation approaches and recommend one. Examples may include version-first selection, progressive configuration, comparison matrix, or another justified pattern.

The user must understand:

- I vs F1 vs F2;
- what P adds;
- what PE adds;
- EC monitoring boundary;
- Z4(8) / Z8(12) / Z12(16);
- HMI price option if retained by current pricing source;
- current price/working-price disclaimer;
- how to move from browsing to configuration request.

### Mobile

Do not solve mobile by shrinking or horizontally scrolling a desktop matrix by default.

Propose a native mobile interaction/presentation using the same structured data source.

### Admin/data dependency

Clearly annotate which fields come from Water Admin/data source and which explanatory text remains frozen/static.

No backend implementation in Task 03.

## 8. Technology page system

Design one reusable content/wireframe template for technology/problem pages.

Demonstrate it using:

**Полив за фактичним об’ємом / контроль фактичного об’єму.**

The template should be reusable later for fertigation, pH, EC monitoring, flow/pressure and similar topics without producing thin duplicate SEO pages.

Show:

- user problem;
- principle;
- how BB610 handles it;
- evidence;
- limitations/boundaries where relevant;
- related configuration(s);
- CTA.

## 9. SCADA proof

Use real SCADA as evidence, not decoration.

In the wireframe specify exactly which type of SCADA screenshot/crop belongs where and what claim it proves.

Do not redesign SCADA in this task.

Where an existing SCADA asset is insufficient to prove a claim, mark `ASSET/PROOF NEEDED` rather than inventing a UI.

## 10. Owner/manager value

The site must connect technical control to the real working context of the primary user without turning into lifestyle advertising.

Show how the wireframe communicates:

- the owner does not have to stand beside irrigation all day;
- the user remains the decision-maker;
- the system executes and checks;
- deviations become visible/actionable;
- professional control is possible without presenting BB610 as autonomous agronomy.

## 11. Conversion architecture

Primary CTA direction remains:

**Підібрати конфігурацію**.

Wireframe the minimum useful lead/configuration flow.

Recommend the minimum fields needed initially. Avoid a long engineering questionnaire before first contact.

Separate:

- high-intent configuration request;
- lower-intent consultation/contact if needed.

Show confirmation/success state conceptually.

Do not implement form handling.

## 12. Navigation

Wireframe desktop and mobile navigation based on accepted IA.

Release 1 language is Ukrainian only unless superseded by a later owner decision. Do not include a fake EN toggle.

Do not include empty navigation destinations simply because they may exist later.

## 13. Release 1 scope discipline

R03 must distinguish:

### Core commercial path — cannot be blocked

- homepage;
- system/product understanding;
- configurations/pricing;
- configuration/contact conversion;
- actual-volume technology proof;
- responsive/mobile path;
- real SCADA evidence.

### Supporting pages

Fertigation and pH/EC technology pages should use the same template/system. Their existence must not delay validation of the core commercial path.

### Later

Industry pages, expert hub, standalone Intelligence, expanded SCADA/Mobile pages, English localization and case library remain later unless separately approved.

Do not create thin berry/greenhouse pages for SEO during R03.

## 14. Content/copy discipline

R03 may propose working Ukrainian headlines and microcopy needed to judge hierarchy, but these are not final copy freeze.

Do not invent:

- yield increases;
- water-saving percentages;
- ROI numbers;
- customer testimonials;
- final-product photographs;
- autonomous agronomic decisions;
- automatic EC correction.

Use `PROOF NEEDED`, `COPY VALIDATION`, or `PRODUCT VALIDATION` where evidence is missing.

## 15. Visual-system boundary

Do not perform Task 04 visual design early.

You may annotate only structural visual intent such as:

- real SCADA crop;
- process diagram;
- actual-vs-target numeric proof;
- engineering module visualization;
- neutral product photography slot;
- chart/flow visualization.

Do not freeze colors, typography, shadows, glass effects, animation or final component styling in R03.

Future direction remains professional / industrial / calm / precise / modern / trustworthy.

## 16. Technical annotations

For each major component, annotate implementation implications where useful:

- semantic HTML structure;
- whether JS is necessary;
- data-driven fields;
- responsive behavior;
- accessibility considerations;
- SEO/indexability;
- image/SVG needs.

Do not choose or implement a heavy framework.

## 17. Acceptance checklist

Before marking R03 REVIEW, verify that:

- a visitor can understand the difference from a timer/controller in the first screen;
- the first four screens form one commercial argument;
- hardware appears as proof/system architecture, not the primary value proposition;
- real SCADA has a defined proof role;
- the 7×3 configuration model is understandable;
- mobile pricing/configuration is designed natively;
- pH vs EC claims are accurate;
- the primary CTA has a clear destination;
- no fake EN control exists;
- no unsupported claims were added;
- Admin-managed pricing/configuration fields are identified;
- no production/code changes were made.

## 18. Handoff

When complete:

1. save as `docs/website/R03_WIREFRAME_CONTENT_ARCHITECTURE.md`;
2. set status `REVIEW`;
3. commit it;
4. report exact path and commit SHA in Developer chat;
5. stop before visual design or implementation.

The supervising BB610 Water chat will review R03 directly from GitHub. The owner must not be used as a courier between chats.
