# BB610 WATER — TASK 07 / VISUAL & UX IMPLEMENTATION R1

- **Task:** 07
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Base:** R06 commercial-dialogue staging
- **Source brief:** `BB610_WATER_VISUAL_UX_BRIEF_R1.md`
- **Production:** DO NOT CHANGE
- **Copy:** WORKING COPY / NOT FREEZE

## Objective

Implement the approved visual/UX story from `BB610_WATER_VISUAL_UX_BRIEF_R1.md` on the existing R06 staging site.

Do not restart design exploration. Do not create A/B/C concepts. Work on the current accepted staging base.

## Critical distinction: explanatory visuals vs product proof

You MAY build lightweight explanatory HTML/CSS/SVG UI for concepts that are explicitly described in the brief, including:

- HERO day schedule/status;
- interactive named-zone schedule examples;
- actual-volume `800 → 802 l` explanatory proof;
- fertigation / stock-solution process;
- wet/feed/flush cycle;
- pH vs EC role visualization;
- normal vs deviation state;
- guided configuration interaction;
- installation connection/process diagram when based only on frozen architecture facts.

These must look like explanatory product communication, not fabricated live telemetry or fake PULS screenshots.

You MUST NOT independently invent, redraw or substitute product-proof assets for:

- real BB610 PULS;
- PULS MOBILE;
- physical CONTROL/HYDRAULIC/ZONE product photography;
- unapproved engineering renders;
- claimed real BB610 farm installations.

If proof is not available in the repository as explicitly approved evidence, leave a restrained `PROOF NEEDED`/neutral review state rather than inventing it.

## Real PULS gate

The owner has identified the real current PULS source on his local workstation:

`C:\Users\lahno.DTM\Desktop\дом\голубика\WATER\программы\EDGE WEB SCADA\BB610_EDGE_WEB_v0.28_CLEAN`

This path is NOT accessible to you merely because it is documented here.

Do not use arbitrary `assets/extracted/*` as real PULS evidence.

Build the PULS section/container so an approved screenshot can be inserted later without redesign, but do not fabricate the screenshot.

PULS MOBILE is not approved as a finished real product.

## Required visual sequence

Implement the brief's commercial sequence:

1. HERO — farm/process context + restrained day schedule/status concept.
2. One day / named individual zones — touch/click zone switcher with different example regimes.
3. Actual volume — clear explanatory `target vs actual` proof.
4. Fertigation / stock solution — owner prepares solution; BB610 handles configured mixing/recirculation/dosing sequence.
5. F2 — two stock-solution channels when relevant.
6. pH vs EC — visually distinct roles; never imply EC automatic correction.
7. Normal vs deviation — owner attention is needed for deviations, not routine normal operation.
8. Real PULS section — prepared proof slot only until approved source is supplied.
9. CONTROL → HYDRAULIC → ZONE → plants — one coordinated system, not unrelated cabinet cards.
10. Installation — understandable external connection/process story based on frozen architecture.
11. Guided configuration — customer-language questions before technical version/zone nomenclature.
12. Price/result — resolved configuration + centralized price data.
13. Before / with BB610 — concrete owner-work comparison after price.
14. Final consultative CTA.

## Named zones

Use human-readable demo names such as:

- `Duke — молоді`
- `Chandler — плодоношення`
- `Томати чері`
- `Улюблена грядка`

The user must be able to understand that real zone names and settings are individual.

Do not imply per-plant valve/control if the actual control level is zone-level.

## Fertigation accuracy

Do not say BB610 automatically prepares stock solution from raw fertilizer.

Correct sequence:

owner prepares/connects stock solution → BB610 can manage configured mixing/recirculation and dosing → irrigation cycle executes.

`15 / 70 / 15` is an explanatory cycle example only and must be labeled as non-prescriptive.

## pH / EC accuracy

Public meaning remains:

- pH = management/correction + control;
- EC = monitoring + deviation notification.

Do not implement language or visuals that imply closed-loop EC correction.

## Hardware / installation

Use the frozen architecture facts only.

- CONTROL / HYDRAULIC / ZONE are one BB610 WATER system;
- mixing pumps are inside HYDRAULIC;
- external electrical connections are intended to be quick, moisture-protected and error-resistant;
- installation concept is plug-and-play as far as product architecture allows.

Do not claim zero maintenance or universal no-specialist installation.

If approved hardware renders are not explicitly available, use schematic/explanatory geometry rather than fake product renders.

## Configuration and price

Keep exact frozen family:

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

Zones:

- Z4(8)
- Z8(12)
- Z12(16)

Use `commercial.js` as the source of commercial truth. Do not invent missing prices.

The guided selection should explain capability progression before presenting technical nomenclature.

## Architecture / maintainability

Preserve the centralized content/data architecture from R05/R06.

Do not hard-code editable commercial text in scattered HTML.

If explanatory visual examples need data, place that data in an appropriate centralized data/content structure rather than duplicating it in components.

Keep future Admin integration possible.

## Performance / accessibility

- lightweight HTML/CSS/SVG preferred;
- minimal purposeful JS;
- no heavy animation library unless absolutely necessary;
- no autoplay decorative video;
- no heavy 3D;
- respect `prefers-reduced-motion`;
- semantic HTML;
- keyboard-accessible interactive controls;
- touch-friendly mobile behavior;
- no hover-only functionality;
- avoid layout shifts and horizontal overflow.

## Responsive review

Check at minimum:

- 390×844
- 430×932
- 1366×768
- 1920×1080

Mobile must preserve the dialogue rather than simply shrink desktop graphics.

## Required deliverable

Create:

`docs/website/R07_VISUAL_UX_IMPLEMENTATION.md`

with status **REVIEW**.

R07 must include:

- implementation summary;
- exact staging/review URL;
- files changed;
- explanatory visuals implemented;
- interactions implemented;
- responsive checks;
- explicit list of proof-dependent areas still waiting for owner assets/approval;
- confirmation that production was not changed;
- commit SHA.

## Stop condition

After R07 is committed and staging is accessible:

- set R07 = REVIEW;
- report preview URL/path and commit SHA;
- stop;
- do not deploy production;
- do not invent missing proof;
- do not start the next stage without a new ASSIGNED TASK.
