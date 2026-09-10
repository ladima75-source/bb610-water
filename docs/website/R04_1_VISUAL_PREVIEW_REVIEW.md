# BB610 WATER — VISUAL PREVIEW REVIEW R04.1

- **Revision:** R04.1
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Source branch:** `main`
- **Input:** `R04_VISUAL_SYSTEM_EXPLORATION.md` — REVIEW
- **Task:** `TASK_04_1_VISUAL_PREVIEWS.md`
- **Scope:** review-only visual previews A/B/C; no production implementation

## 1. Deliverable summary

Created real static HTML/CSS visual comparison previews for the three R04 directions:

- **A — Precision Instrument**
- **B — Technical Editorial**
- **C — Modular Infrastructure**

Each direction contains:

- desktop composition explicitly designed around a 1920×1080 reference above-the-fold;
- separate mobile composition at 390×844 reference width/above-the-fold;
- header/navigation treatment;
- HERO with value proposition first;
- clearly labeled explanatory `800 л → 802 л → виконано` proof;
- actual-result mechanism section;
- real existing repository PULS screenshot asset used unchanged;
- BB610 WATER architecture treatment;
- 7-version × 3-zone configuration selector fragment;
- resolved example `F1-PE / Z8(12)`;
- HMI price placeholders as Admin-driven data rather than invented prices;
- primary CTA treatment.

No production HTML/CSS/JS files were modified.

## 2. Review-only paths

Comparison landing page:

`docs/website/r04-preview/index.html`

Direction A:

`docs/website/r04-preview/a-precision.html`

Direction B:

`docs/website/r04-preview/b-editorial.html`

Direction C:

`docs/website/r04-preview/c-modular.html`

Shared review-only styling:

`docs/website/r04-preview/shared.css`

## 3. How to review

Open `docs/website/r04-preview/index.html` and use the A/B/C links.

Each direction page shows:

1. desktop preview first;
2. mobile preview below it.

The desktop prototype uses a 1920 px internal reference canvas and is scaled only by the review wrapper for practical browser inspection. The mobile prototype is separately authored at 390 px width; it is not a scaled desktop layout.

The comparison should focus on:

- hierarchy and first-five-second comprehension;
- typography character;
- surface/background treatment;
- WATER cyan restraint;
- proof framing;
- credibility of PULS integration;
- clarity of WATER product hierarchy;
- configuration usability;
- mobile density and readability;
- premium/professional perception.

## 4. Direction A — Precision Instrument

Path: `docs/website/r04-preview/a-precision.html`

Implemented visual thesis:

**Professional measuring instrument, not dashboard theatre.**

Applied characteristics:

- graphite continuous background;
- thin calibrated dividers;
- restrained cyan active/verified states;
- compact measured-result proof panel;
- limited corner radii;
- PULS as neutral evidence plate;
- version/zone selector as precise segmented controls;
- compact, high-information mobile stacking.

Font stack used in preview:

`"IBM Plex Sans", "Segoe UI", Arial, sans-serif`

No font binary is committed. If IBM Plex Sans is not installed locally, the preview intentionally falls back to Segoe UI/Arial.

## 5. Direction B — Technical Editorial

Path: `docs/website/r04-preview/b-editorial.html`

Implemented visual thesis:

**Engineering publication meets premium industrial brand.**

Applied characteristics:

- larger editorial headline scale;
- generous whitespace;
- proof expressed typographically rather than inside a dashboard card;
- alternating dark and light technical-sheet sections;
- wide PULS evidence plate;
- configuration as sequential editorial steps rather than control-panel UI;
- more spacious mobile rhythm.

Font stack used in preview:

`"Source Sans 3", "Segoe UI", Arial, sans-serif`

No external webfont dependency is required for review.

## 6. Direction C — Modular Infrastructure

Path: `docs/website/r04-preview/c-modular.html`

Implemented visual thesis:

**One coordinated system made of clear layers.**

Applied characteristics:

- structural rails and restrained grid language;
- proof integrated into a system rail below HERO copy;
- PULS explicitly framed as `BB610 WATER / OPERATOR LAYER`;
- strongest visual containment of WATER as the master product;
- CONTROL / HYDRAULIC / ZONE and PULS / PULS MOBILE / INTELLIGENCE shown as internal coordinated layers;
- configuration expressed as progressive system selection;
- mobile uses vertical system-path logic.

Font stack used in preview:

`Inter, "Segoe UI", Arial, sans-serif`

No font binary or CDN dependency is added.

## 7. Comparable/frozen facts preserved

All previews use the same product facts and working content.

Public product hierarchy remains:

```text
BB610 WATER
├── CONTROL / HYDRAULIC / ZONE
├── BB610 PULS
│   └── BB610 PULS MOBILE
└── BB610 INTELLIGENCE
```

`BB610 SYSTEM` is not used publicly.

Frozen commercial versions remain exactly:

`I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`

Frozen zones remain exactly:

`Z4(8) / Z8(12) / Z12(16)`

Selected example is consistently:

`F1-PE / Z8(12)`

No legacy F1-PH/F2-PH/F1-EC/F2-EC names were introduced.

No price values were invented or changed. Price fields are visibly represented as future Admin data.

## 8. PULS evidence and asset limitation

The previews reuse the existing repository asset:

`assets/extracted/13_b432ba406d4c.webp`

It is embedded unchanged as current BB610 PULS/SCADA evidence. No fake interface, redraw, recoloring or fabricated telemetry was created.

Current limitation:

The asset is sufficient to judge how a real PULS screenshot is framed within each visual direction, but it may not be sufficient to prove a specific readable target-vs-actual state at every review size.

Therefore the product-proof requirement remains:

`ASSET/PROOF NEEDED — approved BB610 PULS crop showing target vs actual for one zone/cycle`, if the supervising chat requires that exact claim to be readable in the final implementation.

## 9. Engineering imagery

No fake CONTROL/HYDRAULIC/ZONE product photography was created.

The preview architecture is compatible with the existing engineering visualization approach and with future replacement by real product photography, but the review prototypes intentionally focus on layout/system language rather than pretending current engineering renders are serial product photographs.

## 10. Interaction and technical realism

The visual comparison remains useful as static HTML/CSS. No framework, animation library, analytics or production runtime dependency is introduced.

No heavy JS was required for the review prototypes.

Interactive selector states are represented visually rather than connected to production data/backend.

The final implementation may use small purposeful JS for:

- mobile navigation;
- configuration selection;
- state updates.

That implementation is outside Task 04.1.

## 11. Accessibility/review notes

The prototypes preserve text as real HTML rather than rasterized mockup content.

Review direction considerations:

- A: strongest high-contrast compact data readability;
- B: requires careful cyan contrast on light technical-sheet surfaces;
- C: relationships must remain understandable through headings/DOM order, not connector lines alone.

Tap-target intent in mobile previews is approximately 44–48 px minimum for primary controls.

## 12. What was deliberately not done

- no A/B/C winner selected;
- no final visual freeze;
- no production site implementation;
- no production asset replacement;
- no fake PULS state;
- no AI-generated product photography;
- no pricing changes;
- no Admin/backend implementation;
- no fake EN switch;
- no analytics/voting logic.

## 13. Review status

The three visual directions are now available for visual inspection rather than text-only evaluation.

**R04.1 status: REVIEW.**

Do not proceed to a final visual-system freeze or production implementation until the owner/supervising BB610 Water chat selects A, B, C or explicitly requests a controlled hybrid.
