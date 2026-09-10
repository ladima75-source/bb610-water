# BB610 WATER — VISUAL SYSTEM EXPLORATION R4

- **Revision:** R4
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Source branch:** `main`
- **Source commit:** `7671084b99552895cfcb789fa209fc674b08bae4`
- **Inputs:** `R03_1_WIREFRAME_CONTENT_ARCHITECTURE.md` — PASS, `R03_1_REVIEW_FINDINGS.md`, `PRODUCT_CONFIGURATION_FREEZE_R1.md`, `PRODUCT_ARCHITECTURE_FREEZE_R1.md`, `TASK_04_VISUAL_SYSTEM.md`
- **Scope:** visual system exploration only; no production implementation; no final visual freeze

## 1. Fixed product/content constraints

All three directions below use the same accepted product and commercial architecture.

**Master product:** BB610 WATER.

**Physical layer:** CONTROL / HYDRAULIC / ZONE.

**Control/software layer:** BB610 PULS with BB610 PULS MOBILE.

**Analytical layer:** BB610 INTELLIGENCE.

`BB610 SYSTEM` is not used publicly.

Commercial versions remain exactly:

`I, F1, F1-P, F1-PE, F2, F2-P, F2-PE`

with:

`Z4(8), Z8(12), Z12(16)`.

EC in PE is monitoring/deviation notification, not automatic EC correction.

The working HERO hierarchy remains R03.1 Variant A: value statement first; explanatory plan-vs-actual proof second.

The three directions differ in visual language, density, typography, surface treatment and proof framing — not in product meaning.

---

# DIRECTION A — PRECISION INSTRUMENT

## 2. Visual thesis

**“Professional measuring instrument, not dashboard theatre.”**

The site feels like a high-grade industrial control product: dark graphite, precise alignment, thin calibrated dividers, restrained cyan, strong numeric legibility, almost no decorative surfaces.

The visual system should evoke confidence associated with laboratory/process instrumentation rather than consumer electronics.

### Character

- technical but not cold;
- premium through precision, spacing and restraint;
- dense enough to feel capable;
- calm enough that a farm owner can understand it quickly.

## 3. Typography

Primary candidate: **IBM Plex Sans**.

Reasons:

- strong Cyrillic/Ukrainian support;
- industrial/technical character without gaming or military associations;
- excellent distinction between text and numeric data;
- practical web font with system fallback.

Fallback stack:

`"IBM Plex Sans", "Segoe UI", Arial, sans-serif`.

Working scale:

- Desktop HERO H1: 58–68 px / 0.98–1.04 line-height / 600–650.
- Desktop section H2: 38–46 px / 1.08 / 600.
- Card/module title: 20–24 px / 600.
- Body: 16–18 px / 1.5.
- Meta/labels: 12–13 px / 500, slight tracking.
- Numeric proof: 42–56 px / 600, tabular figures where available.
- Mobile H1: 38–44 px / 1.02.
- Mobile H2: 30–34 px / 1.1.
- Mobile body: 16 px / 1.5.

## 4. Color tokens

```text
--water-bg-0:       #070A0C
--water-bg-1:       #0C1115
--water-surface-1:  #10171C
--water-surface-2:  #141D23
--water-line:       #27343C
--water-line-soft:  #1B262D
--water-text:       #F1F5F6
--water-muted:      #A7B2B8
--water-cyan:       #19C6F3
--water-cyan-soft:  #8DDFF4
--water-positive:   #86C95B
--water-warning:    #E4B557
--water-danger:     #E16F6F
```

Cyan is reserved for:

- primary CTA;
- active state;
- measured/verified value;
- key diagram flow;
- WATER identity accents.

It is not used as a page-wide glow or dominant fill.

## 5. Surfaces / dividers

- page background remains one continuous dark field;
- sections are separated by spacing and 1 px rules, not giant cards;
- surfaces use only small tonal changes;
- corner radius 6–10 px maximum;
- no glassmorphism;
- no persistent shadows except subtle lift for dialogs/menus.

## 6. Desktop HERO mockup

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BB610 WATER     Система  Технології  Конфігурації  Контакти    [Підібрати] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ Полив, результат якого                     ПОЯСНЮВАЛЬНИЙ ПРИКЛАД             │
│ система перевіряє.                         ─────────────────────             │
│                                            ЗАДАНО        800 л               │
│ BB610 WATER виконує заданий полив          ФАКТИЧНО      802 л               │
│ і контролює фактично поданий об’єм.        СТАТУС        ВИКОНАНО            │
│                                                                              │
│ [ Підібрати конфігурацію ]                 Задав → Виконала → Перевірила     │
│   Як це працює                              пояснювальний приклад             │
│                                                                              │
│ Полив за фактичним об’ємом, а не лише за тривалістю.                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

Proof treatment: no dashboard shell. Numbers appear as a measured-result block with thin dividers and explicit “ПОЯСНЮВАЛЬНИЙ ПРИКЛАД”.

## 7. Mobile HERO

```text
BB610 WATER                         [≡]

Полив, результат якого
система перевіряє.

BB610 WATER виконує заданий полив
і контролює фактично поданий об’єм.

ПОЯСНЮВАЛЬНИЙ ПРИКЛАД
────────────────────
Задано       800 л
Фактично     802 л
Статус       Виконано

[ Підібрати конфігурацію ]
Як це працює
```

Tap targets: minimum 44 px. CTA full width on narrow screens.

## 8. Actual-result mechanism

Presentation: thin horizontal process rail on desktop, vertical rail on mobile.

```text
ЗАВДАННЯ ──→ ВИКОНАННЯ ──→ ВИМІРЮВАННЯ ──→ ПЕРЕВІРКА
800 л        зона 04        802 л факт        виконано
```

No decorative moving particles. Optional one-time progression on viewport entry; static state remains fully understandable.

## 9. BB610 PULS proof

PULS screenshot is framed as an evidence plate:

- real screenshot on neutral matte surface;
- no recoloring;
- no fake browser chrome;
- one short caption above: what the screenshot proves;
- optional 1–2 thin callout lines outside the screenshot, never redrawing content.

Example:

```text
ВИДНО ФАКТИЧНЕ ВИКОНАННЯ
┌────────────────────────────────────────────┐
│        REAL BB610 PULS SCREEN/CROP         │
└────────────────────────────────────────────┘
      ↑ фактичний об’єм      ↑ стан зони
```

If an approved screen cannot demonstrate the exact claim: `ASSET/PROOF NEEDED`.

## 10. Complete WATER architecture treatment

Physical and digital layers use one shared system rail:

```text
BB610 WATER
────────────────────────────────────────────────────────
PHYSICAL                  CONTROL / SOFTWARE
CONTROL                   BB610 PULS
HYDRAULIC                 └─ PULS MOBILE
ZONE                      BB610 INTELLIGENCE
```

CONTROL/HYDRAULIC/ZONE engineering visuals are placed in equal neutral media frames. They are labeled as engineering/product visualizations until real photography exists.

## 11. Configuration selector / pricing

Desktop: version-first rail + zone choice + result panel.

```text
ФУНКЦІОНАЛЬНА ВЕРСІЯ
[I] [F1] [F1-P] [F1-PE] [F2] [F2-P] [F2-PE]

КІЛЬКІСТЬ ЗОН
[Z4(8)] [Z8(12)] [Z12(16)]

────────────────────────────────────────────────────────
ОБРАНО: F1-PE / Z8(12)
Ціна без HMI:   [data]
Ціна з HMI:     [data]
[ Підібрати конфігурацію ]
```

Mobile: two stacked segmented selectors or radio-card groups; result stays directly below selection. No matrix scrolling.

Admin-driven fields: version labels/descriptions, enabled state, sort order, zone options, prices, HMI price and publishing state.

## 12. CTA system

Primary: solid WATER cyan background, dark text, 46–52 px desktop height, 48–54 px mobile.

Secondary: text/button with border, no competing cyan fill.

No more than one primary CTA in a viewport-sized composition.

## 13. Motion

- 120–180 ms state transitions;
- selection state crossfade/underline;
- optional one-time mechanism progression;
- no loops;
- no parallax;
- `prefers-reduced-motion` removes non-essential transitions.

## 14. Accessibility / implementation

Contrast target: WCAG AA minimum for normal text; primary body/text combinations should preferably exceed 7:1 where practical.

Implementation cost: **Low–Medium**.

Expected stack: semantic HTML + CSS + SVG + small JS for nav/config selector only. No heavy framework required. Excellent Core Web Vitals potential.

## 15. Why it supports premium pricing

The premium signal comes from disciplined technical precision rather than decoration: exact typography, calm data presentation, real PULS proof and coherent system architecture make the product feel engineered and accountable.

---

# DIRECTION B — TECHNICAL EDITORIAL

## 16. Visual thesis

**“Engineering publication meets premium industrial brand.”**

This direction is less instrument-panel-like and more editorial. It uses large typography, strong whitespace, selective dark/light-neutral surfaces and large real evidence plates. The site feels like a serious technical manufacturer’s product story rather than an interface product.

### Character

- calmer and more spacious than Direction A;
- strongest for owners/managers who do not want to decode automation UI;
- premium through typography, composition and material-like surfaces.

## 17. Typography

Primary candidate: **Source Sans 3**.

Optional display pairing: same family only, using weight/scale rather than a decorative second font.

Fallback:

`"Source Sans 3", "Segoe UI", Arial, sans-serif`.

Working scale:

- Desktop HERO H1: 64–76 px / 0.95–1.0 / 600.
- Section H2: 44–52 px / 1.02 / 600.
- Body: 18 px / 1.55.
- Caption/meta: 13 px / 600 uppercase only where functional.
- Numeric proof: 54–64 px / 600.
- Mobile H1: 40–46 px.
- Mobile H2: 30–36 px.
- Mobile body: 17 px.

## 18. Color tokens

```text
--water-bg-dark:     #0A0D0F
--water-bg-deep:     #050708
--water-paper:       #E9ECEB
--water-paper-2:     #DDE2E1
--water-ink:         #121719
--water-text-dark:   #F4F6F5
--water-muted-dark:  #AAB2B1
--water-cyan:        #12BFEA
--water-cyan-deep:   #007FA3
--water-line-dark:   #2B3336
--water-line-light:  #BEC7C6
```

The site remains predominantly dark but may use one or two “technical sheet” light sections, especially mechanism/architecture or configuration explanation. Cyan remains the common identity bridge.

## 19. Surface logic

- fewer cards than A;
- large full-width editorial bands;
- evidence sits in wide “plates” rather than small widgets;
- a light technical-paper section can interrupt the dark flow and improve comprehension;
- 0–4 px radius for diagrams/tables; 8–12 px only on interactive controls.

## 20. Desktop HERO mockup

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BB610 WATER                                      Система  Конфігурації [CTA]│
│                                                                              │
│ Полив, результат                                                           │
│ якого система перевіряє.              800 л                                 │
│                                        ЗАДАНО                                │
│ BB610 WATER виконує заданий полив.                                           │
│ Фактичний результат не припускається —  802 л                                │
│ він вимірюється.                        ФАКТИЧНО                              │
│                                                                              │
│ [ Підібрати конфігурацію ]              ВИКОНАНО                             │
│                                        пояснювальний приклад                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

The right proof is typographic, almost poster-like, not enclosed in a dashboard card.

## 21. Mobile HERO

Large headline followed by one-line explanation, then a vertical proof sequence with generous spacing.

```text
Полив, результат
якого система
перевіряє.

BB610 WATER виконує заданий полив.
Фактичний результат вимірюється.

800 л
Задано

↓

802 л
Фактично

Виконано
Пояснювальний приклад

[ Підібрати конфігурацію ]
```

## 22. Mechanism/proof treatment

Use a light technical-sheet band:

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ 01 ЗАДАЧА     02 ВИКОНАННЯ     03 ВИМІРЮВАННЯ     04 ПЕРЕВІРКА             │
│ 800 л         зона/цикл        фактична витрата    результат/відхилення     │
└──────────────────────────────────────────────────────────────────────────────┘
```

This direction makes explanatory diagrams feel like engineering documentation rather than UI components.

## 23. PULS treatment

Real PULS image is large and dominant, preferably 60–70% of section width. Copy sits as a narrow editorial column.

No browser frame. No cyan outline around the whole screenshot. One cyan rule or numbered annotation is sufficient.

The objective is to say: “Here is the actual working interface,” not “look at our dashboard design.”

## 24. Architecture treatment

Best suited to a technical drawing/page-spread style.

```text
BB610 WATER / COMPLETE SYSTEM

PHYSICAL FLOW
[CONTROL] — [HYDRAULIC] — [ZONE]

OPERATOR LAYER
BB610 PULS
└─ BB610 PULS MOBILE

ANALYTICAL LAYER
BB610 INTELLIGENCE
```

Engineering product visuals may be shown as cut-out objects on a light neutral technical plane with plain captions, clearly not photography.

## 25. Configuration / pricing treatment

This direction uses an editorial chooser rather than control-panel tabs.

Desktop:

```text
1 / ВЕРСІЯ
I      F1      F1-P      F1-PE      F2      F2-P      F2-PE
                                               ↑ selected

2 / ЗОНИ
Z4(8)      Z8(12)      Z12(16)
             ↑ selected

3 / РЕЗУЛЬТАТ
F1-PE / Z8(12)
[price without HMI]
[price with HMI]
[Підібрати конфігурацію]
```

Selected state uses typography, underline and one cyan marker instead of filled cards.

Mobile: each step becomes a vertical chooser with large radio rows. Result summary is sticky only if usability testing proves useful; otherwise normal flow.

## 26. CTA / header

Header is visually quiet: logo, 3–4 top-level destinations, primary CTA.

Primary CTA is dark or cyan depending background; on light sections cyan outline/ink is preferred over huge filled buttons.

## 27. Motion

- restrained section reveal only if it helps orientation;
- number/proof transitions should not count up from zero;
- selection transitions 150–200 ms;
- technical diagrams may reveal connectors once, but no loop.

## 28. Accessibility / implementation

Light technical sections demand careful contrast: dark ink on #E9ECEB; cyan alone should not carry meaning.

Implementation cost: **Medium** because alternating surface themes and large editorial responsive compositions need more layout tuning, but still feasible with HTML/CSS/SVG and minimal JS.

## 29. Why it supports premium pricing

It makes BB610 WATER feel like a mature engineered product from a serious technical manufacturer. Large evidence, controlled whitespace and publication-grade hierarchy reduce the “cheap controller e-commerce” association more strongly than a card-heavy interface.

---

# DIRECTION C — MODULAR INFRASTRUCTURE

## 30. Visual thesis

**“One coordinated system made of clear layers.”**

This direction emphasizes architecture and modularity more than A or B. It visually reinforces that WATER is one complete system, while CONTROL/HYDRAULIC/ZONE, PULS/PULS MOBILE and INTELLIGENCE are coordinated layers inside it.

The design language uses aligned modules, connection rails and structured bands, but avoids turning into a literal wiring diagram.

### Character

- strongest engineering/system identity;
- slightly denser and more structured;
- ideal where modular architecture is a commercial trust factor;
- must be carefully restrained to avoid “automation catalog” feel.

## 31. Typography

Primary candidate: **Inter**.

Fallback:

`Inter, "Segoe UI", Arial, sans-serif`.

Working scale:

- Desktop H1: 56–64 px / 1.0 / 650.
- Section H2: 36–44 px / 1.08 / 650.
- Module labels: 14 px / 650 / slight tracking.
- Body: 16–17 px / 1.5.
- Numeric proof: 44–52 px / 650.
- Mobile H1: 36–42 px.
- Mobile H2: 28–34 px.

## 32. Color tokens

```text
--water-bg:          #06090B
--water-grid:        #11191E
--water-panel:       #0C1317
--water-panel-2:     #111B20
--water-line:        #304048
--water-text:        #F0F4F5
--water-muted:       #9EACB2
--water-cyan:        #16C4EF
--water-cyan-dim:    #0F6478
--water-neutral-hi:  #C7D0D3
--water-positive:    #78BF5A
```

Cyan primarily marks connection/active logic. Neutral white/gray carries typography.

## 33. Background / divider logic

- dark matte background;
- optional very subtle structural grid only in architecture/mechanism areas, never across whole site;
- sections use 1 px rails and alignment guides;
- medium-radius panels 8 px;
- no blur/glass/neon.

## 34. Desktop HERO mockup

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ BB610 WATER        Система  Технології  Конфігурації        [Підібрати]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ Полив, результат якого система перевіряє.                                   │
│ BB610 WATER виконує заданий полив і контролює фактичний результат.          │
│                                                                              │
│ [Підібрати конфігурацію]                                                     │
│                                                                              │
│  ЗАДАНО 800 л  ────────────  ФАКТИЧНО 802 л  ────────────  ВИКОНАНО         │
│                  пояснювальний приклад                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

Unlike A, the proof is integrated as a horizontal system rail under the copy, not a right-side measurement panel.

## 35. Mobile HERO

```text
Полив, результат якого
система перевіряє.

[copy]

ЗАДАНО
800 л
│
├── ФАКТИЧНО
│   802 л
│
└── ВИКОНАНО

Пояснювальний приклад

[ Підібрати конфігурацію ]
```

## 36. Actual-result mechanism

This is Direction C’s strongest component: a process rail with four functional nodes.

Each node is mostly text, not a glowing card.

Desktop rail may visually connect to later architecture vocabulary, creating a consistent “system path” language across the site.

## 37. PULS proof

Screenshot sits inside a system-layer frame labeled:

`BB610 WATER / OPERATOR LAYER / BB610 PULS`.

This makes PULS visibly part of WATER without treating it as a separate product.

Callouts use small numbered markers along frame edges. No fake inner highlights.

PULS MOBILE appears as a secondary narrow frame only where a real approved mobile screen proves a validated capability.

INTELLIGENCE is represented as a simple analytical layer block connected to PULS/data, without AI visual clichés.

## 38. Complete architecture section

Direction C provides the clearest visual hierarchy:

```text
BB610 WATER
┌───────────────────────────────────────────────────────────────┐
│ PHYSICAL PROCESS                                              │
│ [CONTROL] ───────── [HYDRAULIC] ───────── [ZONE]             │
│                                                               │
│ OPERATOR / CONTROL                                            │
│ [BB610 PULS] ── [PULS MOBILE]                                │
│                                                               │
│ ANALYSIS                                                      │
│ [BB610 INTELLIGENCE]                                         │
└───────────────────────────────────────────────────────────────┘
```

The containing WATER frame is visually strongest; internal modules never look like sibling master brands.

## 39. Configuration / pricing treatment

Use a compact configurator rail that resolves progressively:

```text
VERSION
[I] [F1] [F1-P] [F1-PE] [F2] [F2-P] [F2-PE]
                         │
                         └────────────┐
ZONE                                  │
[Z4(8)] [Z8(12)] [Z12(16)]           │
             │                        │
             └────────────────────────┤
                                      ▼
                              F1-PE / Z8(12)
                              без HMI: [data]
                              з HMI:   [data]
                              [CTA]
```

Family grouping may be indicated by subtle labels `IRRIGATION / F1 / F2`, but every selectable item remains the exact frozen version name.

Mobile: each dimension is one vertically stacked radio group; selected result is a plain summary block below.

## 40. Header / CTA

Header uses a thin bottom rail and strong active destination marker. Mobile menu follows the same structured vertical rail language.

CTA is cyan filled, but smaller and more technical than Direction B.

## 41. Motion

- state connectors may animate once when selection changes;
- no continuous data-flow animation;
- architecture connections remain visible statically;
- 140–180 ms UI transitions;
- `prefers-reduced-motion` disables line progression.

## 42. Accessibility / implementation

The main accessibility risk is over-reliance on lines/position to communicate relationships. Every relationship must also exist in headings, labels and DOM order.

Implementation cost: **Medium**. SVG or CSS rails add some implementation complexity, but no heavy library is necessary.

## 43. Why it supports premium pricing

It makes the customer see an integrated professional system, not a controller plus accessories. The premium value is expressed through coordinated architecture and the clear relationship between physical process, operator software and analytical layer.

---

# 44. Cross-direction comparison

| Criterion | A — Precision Instrument | B — Technical Editorial | C — Modular Infrastructure |
|---|---|---|---|
| Immediate professional feel | Very strong | Very strong | Strong |
| Ease for non-technical owner | Strong | **Strongest** | Medium-strong |
| Actual-result proof | **Strongest** | Strong | Strong |
| PULS credibility | Very strong | **Strongest visual evidence** | Very strong |
| Architecture clarity | Strong | Strong | **Strongest** |
| Configuration usability | **Strongest** | Strong | Very strong |
| Risk of looking like SaaS | Low | Lowest | Low-medium if over-panelized |
| Risk of hardware/catalog feel | Low | Lowest | Medium if architecture dominates |
| Mobile simplicity | **Very strong** | Strong | Strong |
| Visual distinctiveness | Strong | **Very strong** | Strong |
| Implementation weight | **Low–Medium** | Medium | Medium |
| Core Web Vitals risk | Low | Low | Low-medium |
| Premium 200–400k+ positioning | Very strong | **Very strong** | Very strong |

---

# 45. Component comparison snapshots

## HERO

- **A:** copy left + measured-result panel right.
- **B:** editorial headline + large typographic numbers with little enclosure.
- **C:** copy above + integrated system/proof rail below.

## PULS

- **A:** evidence plate with precise external callouts.
- **B:** large editorial screenshot with narrow explanatory column.
- **C:** screenshot within explicitly labeled WATER/PULS system layer.

## Architecture

- **A:** clean two-column physical/software taxonomy.
- **B:** technical-page spread.
- **C:** contained master WATER frame with internal connected layers.

## Configuration

- **A:** segmented controls and direct result panel.
- **B:** large editorial step chooser.
- **C:** progressive version/zone rail with resolved result.

---

# 46. Shared visual rules regardless of selected direction

The following should remain common unless the supervising chat explicitly changes them:

1. WATER cyan is an accent, not ambient decoration.
2. No neon glow, glassmorphism, giant floating KPI cards or AI spectacle.
3. Real BB610 PULS screenshots are not redrawn, recolored or fabricated.
4. Engineering module visuals are labeled/treated as engineering/product visualizations until real photography exists.
5. Real product photography must be able to replace engineering visuals later without structural redesign.
6. `800 л / 802 л` is always visibly labeled as an explanatory example.
7. Primary CTA remains `Підібрати конфігурацію`.
8. Mobile configuration is native and stacked; no squeezed 21-cell matrix.
9. Final result always resolves to an exact frozen pair such as `F1-PE / Z8(12)`.
10. INTELLIGENCE stays subordinate to WATER and capability-qualified.
11. No fake EN toggle in Release 1.
12. Motion is optional and never required to understand content.
13. Core information remains semantic/indexable HTML; diagrams supplement rather than replace text.

---

# 47. Recommendation

**Recommended direction for next review: Direction A — PRECISION INSTRUMENT.**

Reasoning:

- it expresses BB610 WATER’s core differentiation — measured and verified actual result — most directly;
- it gives numeric proof a premium professional treatment without looking like fake live telemetry;
- it keeps PULS credible as evidence;
- it produces the clearest desktop/mobile configuration selector;
- it is visually premium without relying on expensive motion or decorative effects;
- it is the least risky technically and best aligned with strong Core Web Vitals;
- it leaves room to borrow one strength from Direction B later: larger editorial treatment for selected real PULS evidence;
- it avoids Direction C’s main risk of over-emphasizing architecture/hardware before customer value.

This is a recommendation only. **No direction is frozen in R04.** The supervising chat/owner must select or request a controlled hybrid before final visual-system freeze or implementation.

---

# 48. Implementation implications after future PASS

If Direction A is selected, expected implementation architecture remains lightweight:

- semantic HTML;
- modular CSS tokens/components;
- SVG for mechanism/architecture diagrams;
- responsive local image sources (`srcset`/AVIF/WebP where appropriate);
- minimal JS for mobile navigation, configuration selector and form-state behavior;
- Admin-driven configuration/price data shared by desktop/mobile views;
- no visual dependency requiring React/Vue or a heavy animation library.

If Direction B is selected, additional effort is mainly responsive editorial composition and dual dark/light surface testing.

If Direction C is selected, additional effort is mainly semantic/SVG system-rail components and responsive relationship rendering.

None of the three directions requires a heavy framework.

---

# 49. Proof/assets still required before polished implementation

- `ASSET/PROOF NEEDED` if no approved PULS crop clearly shows target vs actual for one zone/cycle.
- Confirm which current PULS overview screenshot is approved for public website use.
- Confirm which PULS MOBILE screenshot(s) demonstrate validated mobile scope.
- Confirm current approved engineering visualizations for CONTROL / HYDRAULIC / ZONE.
- Later: real serial product photography in the same media slots.

No substitute/fake UI or AI-generated product photography should be created to fill these gaps.

---

# 50. Acceptance self-check

- Three genuinely different visual languages: **PASS**.
- Same frozen BB610 WATER architecture preserved in all three: **PASS**.
- Value stronger than hardware decoration: **PASS**.
- Real PULS treated as evidence: **PASS**.
- No fake PULS/product photography introduced: **PASS**.
- Seven versions × three zones preserved: **PASS**.
- Mobile selector is native in all directions: **PASS**.
- Ukrainian-compatible typography proposed: **PASS**.
- Accessibility/contrast implications addressed: **PASS**.
- Technically realistic without heavy framework: **PASS**.
- Production/site code untouched: **PASS**.

## Stage result

**Document:** `BB610 WATER — VISUAL SYSTEM EXPLORATION R4`

**Status:** `REVIEW`

Task 04 is complete for review. Do not begin final visual freeze or implementation until the supervising BB610 Water chat / owner selects and approves a direction.
