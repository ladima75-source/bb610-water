# BB610 WATER — TASK 04.1 / VISUAL PREVIEWS A/B/C

- **Task:** 04.1
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Input:** `R04_VISUAL_SYSTEM_EXPLORATION.md` — REVIEW
- **Purpose:** allow owner and supervising chat to judge the three R04 directions visually before selecting/finalizing a direction
- **Production:** DO NOT CHANGE

## 1. Objective

R04 contains three valid written visual directions, but a visual-system decision must not be made from Markdown/ASCII alone.

Create **real reviewable visual previews** for all three directions using the same approved content and comparable viewport sizes.

The owner must be able to open the previews and immediately compare A vs B vs C with his eyes.

Do not implement the production website and do not silently select a winner.

## 2. Directions

Create previews for exactly:

- **A — Precision Instrument**
- **B — Technical Editorial**
- **C — Modular Infrastructure**

Preserve the visual thesis, tokens and typography direction defined in R04. Do not make the three previews converge into one design.

## 3. Comparable content

All three previews must use the **same working content and same product facts**, so the comparison is visual rather than copy-driven.

At minimum each preview must show:

1. Header/navigation.
2. HERO with primary value proposition.
3. Clearly labeled explanatory `800 л → 802 л → виконано` proof.
4. Actual-result mechanism section.
5. BB610 PULS evidence section using a real existing approved/repository PULS screenshot/crop where available; otherwise use an explicitly labeled neutral `ASSET/PROOF NEEDED` placeholder — never fake UI.
6. Enough of the WATER architecture section to judge CONTROL / HYDRAULIC / ZONE + PULS / PULS MOBILE / INTELLIGENCE hierarchy.
7. Configuration selector fragment sufficient to judge the 7-version × 3-zone interaction language.
8. Primary CTA treatment.

This is a visual comparison prototype, not a complete final homepage.

## 4. Required viewports

For every direction create:

- **Desktop:** 1920 × 1080 reference viewport/composition.
- **Mobile:** 390 × 844 reference viewport/composition.

The previews may extend vertically to show the required comparison sections, but the viewport width and above-the-fold composition must be designed explicitly for these sizes.

Do not merely scale desktop down to mobile.

## 5. Preferred review format

Create static review HTML/CSS previews under:

`docs/website/r04-preview/`

Recommended structure:

- `index.html` — comparison landing page with links/cards for A/B/C desktop/mobile;
- `a-precision.html`;
- `b-editorial.html`;
- `c-modular.html`;
- shared/local CSS/assets as appropriate.

The preview must be self-contained and must not modify or depend on production runtime.

If repository/browser preview constraints make HTML inconvenient, also provide PNG screenshots for quick review. The priority is that the owner can actually SEE the three alternatives, not only read their specification.

## 6. Review index

`index.html` must clearly label A, B and C and provide a short one-line thesis for each.

Include an obvious way to inspect desktop and mobile behavior for each direction.

Do not add voting logic or analytics.

## 7. Real assets

Reuse existing repository assets where appropriate.

Rules:

- do not alter production assets;
- do not fabricate PULS screens;
- do not generate fake CONTROL/HYDRAULIC/ZONE photography;
- engineering visuals must look/label as engineering visuals;
- missing proof remains visibly marked `ASSET/PROOF NEEDED`.

## 8. Typography and colors

Actually apply the candidate typography/palette for each R04 direction rather than describing it.

If a proposed webfont is not locally available and external loading would make the preview unreliable, use the defined fallback while documenting that limitation. Do not commit font binaries merely for this review.

## 9. Interaction

Only minimal review interaction is needed:

- mobile navigation state if useful;
- configuration selection state;
- basic CTA hover/focus;
- restrained direction-specific motion where it materially demonstrates the concept.

No heavy JS or animation library.

The visual comparison must remain useful as static content.

## 10. Configuration facts

Keep frozen versions exactly:

`I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`

and zones:

`Z4(8) / Z8(12) / Z12(16)`.

Any shown resolved example must use exact version + zone naming, e.g. `F1-PE / Z8(12)`.

Do not invent or alter prices for the visual preview.

## 11. Product hierarchy

All three previews must preserve:

- BB610 WATER = complete system;
- CONTROL / HYDRAULIC / ZONE = physical layer;
- BB610 PULS = main control software / SCADA;
- BB610 PULS MOBILE = mobile interface;
- BB610 INTELLIGENCE = analytical/intelligent layer;
- BB610 SYSTEM = not public.

## 12. No premature polish trap

The previews should look real enough to judge hierarchy, typography, spacing, color, proof framing and mobile behavior, but do not spend time producing a fully finished 8-section site three times.

The goal is **decision-quality visual evidence**.

## 13. Deliverable

Create:

- `docs/website/r04-preview/` visual previews;
- `docs/website/R04_1_VISUAL_PREVIEW_REVIEW.md` describing exactly what was created, paths, any missing assets/limitations, and how to open/review A/B/C.

Set R04.1 document status to **REVIEW**.

Commit all review-only files.

## 14. Stop condition

After committing previews and R04.1:

- report exact paths + commit SHA;
- stop;
- do not choose A/B/C;
- do not create the final visual freeze;
- do not modify production/site code.

The owner and supervising chat will select A, B, C or a controlled hybrid after visual inspection.