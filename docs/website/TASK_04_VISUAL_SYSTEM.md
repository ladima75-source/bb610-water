# BB610 WATER — TASK 04 / VISUAL SYSTEM EXPLORATION

- **Task:** 04
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Inputs:** R03.1 PASS, `R03_1_REVIEW_FINDINGS.md`, `PRODUCT_CONFIGURATION_FREEZE_R1.md`, `PRODUCT_ARCHITECTURE_FREEZE_R1.md`
- **Scope:** visual direction and design system exploration only
- **Production:** DO NOT CHANGE
- **Final implementation:** DO NOT START

## 1. Objective

Translate the accepted R03.1 wireframe/content architecture into a coherent premium visual system for BB610 WATER before implementation.

The visual result must feel:

**professional / industrial / calm / precise / modern / trustworthy**.

It must not feel like consumer smart-home irrigation, a cheap controller shop, a generic SaaS dashboard, or futuristic AI theatre.

Every visual element must either explain the product, prove a claim, establish hierarchy, or help conversion. Decoration without a job should be removed.

## 2. Required exploration

Develop **3 genuinely different visual directions** within the same accepted commercial architecture. They must differ in visual language and information presentation, not merely accent color.

For each direction define and demonstrate:

- visual thesis;
- typography hierarchy;
- background/surface system;
- WATER cyan usage;
- neutral palette;
- border/divider logic;
- imagery treatment;
- engineering diagram treatment;
- PULS screenshot treatment;
- numeric proof treatment;
- CTA system;
- configuration/pricing UI treatment;
- desktop rhythm/density;
- mobile rhythm/density;
- motion philosophy;
- accessibility/contrast implications;
- why it supports a 200–400+ thousand UAH professional product.

Recommend one direction at the end, but do not silently choose/freeze it.

## 3. Screens/components to demonstrate

For each direction provide enough concrete visual specification/mockup material to judge at minimum:

1. Desktop HERO.
2. Mobile HERO.
3. Actual-result mechanism/proof section.
4. Real BB610 PULS proof section.
5. BB610 WATER architecture section showing CONTROL / HYDRAULIC / ZONE together with PULS / PULS MOBILE / INTELLIGENCE as one coordinated system.
6. Configuration selector using frozen 7 versions × 3 zone configurations.
7. Pricing state including HMI option where applicable/current data supports it.
8. Primary CTA / lead entry.
9. Header desktop/mobile.

Do not create a full polished website for all three directions. Create a focused comparison sufficient to make a visual decision.

## 4. Product architecture — mandatory

Use the frozen hierarchy:

BB610 WATER = complete system.

Physical layer:
- CONTROL
- HYDRAULIC
- ZONE

Control/software:
- BB610 PULS
- BB610 PULS MOBILE

Intelligence:
- BB610 INTELLIGENCE

`BB610 SYSTEM` remains RESERVED / DO NOT USE publicly.

The design must make these layers feel like one WATER product, not unrelated brands/products.

## 5. Commercial configuration — mandatory

Use only:

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

with:

- Z4(8)
- Z8(12)
- Z12(16)

A visual grouping by F1/F2 family is allowed for comprehension, but final selection must clearly resolve to exact version + zone configuration.

Do not reintroduce legacy F1-PH/F2-PH/F1-EC/F2-EC naming.

## 6. HERO

Use R03.1 HERO Variant A as the working content hierarchy.

The visitor must first understand the value in words. The plan-vs-actual numeric example is supporting proof.

If using an explanatory example such as `800 л → 802 л`, label/style it clearly as an example. Do not make it look like live telemetry from a real installation.

Avoid giant decorative KPI cards, neon telemetry, rotating dashboards or unnecessary 3D.

## 7. Real PULS evidence

BB610 PULS screenshots are product evidence.

Do not redesign, beautify or fabricate a fake PULS screen to fit the marketing composition.

Show how real screenshots/crops are framed, annotated and integrated into the site while remaining legible and credible.

If a needed proof state does not exist in approved assets, mark `ASSET/PROOF NEEDED`.

## 8. Engineering/product imagery

There are not yet approved final presentation photographs of assembled CONTROL/HYDRAULIC/ZONE modules.

Use existing engineering visualizations only as engineering/product visualizations; do not imply they are real photography.

Do not use AI-generated fake product photography.

Design the system so real photography can replace engineering visuals later without redesigning the page.

## 9. BB610 INTELLIGENCE

INTELLIGENCE must not visually become the hero/master product over WATER.

Avoid AI clichés: glowing brains, neural networks, magic gradients, autonomous-control claims.

Present it as a qualified analytical/intelligent layer within WATER.

## 10. Configuration/pricing UI

Visually test the accepted version-first selector on desktop and mobile.

Requirements:

- seven real versions remain understandable;
- three Z configurations remain understandable;
- long names F1-PE/F2-PE fit cleanly;
- price and HMI states are legible;
- mobile is native, not a squeezed desktop matrix;
- price/configuration content is visually compatible with future Admin-driven data;
- result is clearly something like `F1-PE / Z8(12)`.

Do not change prices in this task.

## 11. Typography

Propose actual web-safe/licensable font families or practical stacks, with reasons.

Avoid typography that makes WATER look like gaming, crypto, military fiction or generic startup SaaS.

Ukrainian characters must be fully supported.

Define working sizes/weights/line heights for desktop and mobile sufficiently for comparison, but final implementation tuning comes later.

## 12. Color

Keep WATER cyan as the primary product accent, but do not flood the interface with cyan.

Build a restrained dark/neutral industrial palette with clear semantic roles.

Do not use pure visual spectacle such as large neon glows.

Specify candidate color tokens and contrast considerations for each direction.

## 13. Motion

Define only meaningful motion:

- CTA feedback;
- simple state transitions;
- explanatory process progression if it genuinely helps;
- restrained reveal where useful.

Respect `prefers-reduced-motion`.

No heavy scroll choreography, parallax show, looping decorative animation or motion required to understand content.

## 14. Mobile-first review

Mobile is not a later crop of desktop.

For each direction explicitly demonstrate:

- mobile HERO hierarchy;
- readable proof/numbers;
- PULS evidence treatment;
- architecture stacking;
- version/zone selector;
- CTA/tap targets;
- navigation.

## 15. Working copy status

R03.1 copy is working copy, not final copy freeze.

Do not rewrite the entire marketing strategy in Task 04. You may flag a phrase where typography reveals a serious copy/hierarchy problem, but keep focus on visual system.

## 16. Technical realism

For each direction note likely implementation cost/weight.

Prefer solutions achievable with semantic HTML/CSS, SVG and small purposeful JS.

Flag anything likely to damage Core Web Vitals or require a heavy dependency.

Do not choose a heavy framework simply for visual effects.

## 17. Deliverable

Create:

`docs/website/R04_VISUAL_SYSTEM_EXPLORATION.md`

Status: **REVIEW**.

The document must include the three directions, comparison, concrete token/component specifications, desktop/mobile examples or mockup references, implementation implications, and a recommendation.

If actual preview assets are created, store them in a clearly named review-only path under `docs/website/r04/` and reference them from R04. Do not replace production assets.

## 18. Acceptance criteria

Before REVIEW verify:

- three directions are genuinely different;
- each still looks unmistakably like the same BB610 WATER product architecture;
- value is stronger than hardware decoration;
- real PULS is treated as evidence;
- no fake product photography/UI is introduced;
- configuration UI survives desktop and mobile;
- visual language supports premium professional pricing;
- Ukrainian typography is correct;
- accessibility/contrast is considered;
- implementation is technically realistic;
- production/code remains untouched.

## 19. Handoff

Save R04, commit it, mark REVIEW, report exact path and commit SHA, and stop. Do not begin final visual freeze or implementation until the supervising chat/owner selects and approves a direction.