# BB610 WATER — R14 DESIGN QA + COMMERCIAL FINISH

- **Revision:** R14
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R13.1 commit `9f508cf31dd5cd713388bccafef6b53cada9fe3c`
- **Review path:** `docs/website/review/r14/`
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED

## Preview

Commit-pinned preview after final handoff commit:

`https://rawcdn.githack.com/ladima75-source/bb610-water/<FINAL_COMMIT>/docs/website/review/r14/index.html`

## Approved WATER logo audit

R14 uses exactly:

`assets/extracted/02_ae24f7eff9c5.webp`

This is not a text reconstruction. The repository production `index.html` already uses this exact asset as the header logo with `alt="BB610 Water"` and intrinsic dimensions `1719 × 915`; the centralized website asset registry also identifies it as the BB610 WATER logo. R14 preserves the master aspect ratio, uses `object-fit: contain`, does not crop, filter or recolor it, and renders it at approximately 34 px header height / 29 px mobile / 32 px footer.

No BB610 PULS or BB610 PULS MOBILE logo/brand mark was invented. Those remain typographic product names.

## Typography / wrapping finish

- HERO wording remains exact and dominant.
- HERO H1 now uses a bounded fluid range `48–64px` on desktop, `38–42px` on phone, balanced wrapping and a controlled line measure.
- H2 uses a controlled `34–44px` desktop range and `30–34px` phone range rather than arbitrary per-section sizing.
- `BB610 WATER`, `BB610 PULS`, `pH`, `EC` and technical codes remain non-breaking where used as semantic units.
- Main copy measures are constrained; long paragraphs no longer run across the full container.
- Major anchors include sticky-header offset via `scroll-margin-top`.
- At the target width rules (1920, 1366, 1024, 768, 430, 390) the layout has explicit responsive states; mobile removes multi-column pressure before text becomes cramped.

## Visual fragmentation removed

- Four established chapters remain, but tonal changes are grouped rather than alternating mechanically.
- Narrative sections rely more on open graphite space; proof/data sections carry the stronger raised surfaces.
- Outer borders were reduced to meaningful separators and grouped surfaces.
- Actual volume, fertigation and pH/EC are visually weighted as product differentiators.
- CONTROL / HYDRAULIC / ZONE stay one modular system with stable 4:3 media reservations.
- PULS frames are stable proof reservations, not mock UI.

## Dialogue configurator / contact finish

The R13 question flow is unchanged:

1. irrigation only / 1 fertigation channel / 2 fertigation channels;
2. pH requirement;
3. EC monitoring requirement;
4. Z4(8) / Z8(12) / Z12(16);
5. local HMI.

Resolution remains exactly:

- irrigation only → `I`;
- 1 channel → `F1` / `F1-P` / `F1-PE`;
- 2 channels → `F2` / `F2-P` / `F2-PE`;
- EC automatically implies pH;
- irrigation-only hides pH/EC questions and cannot create impossible `I-P` / `I-PE` states.

Selected states use one restrained WATER-cyan grammar. On desktop the result remains adjacent to the questions; on mobile it follows them naturally. The CTA carries the resolved configuration into the contact section.

The final form no longer exposes a technical `<pre>` result. Submission produces a normal buyer-facing confirmation state containing the resolved configuration.

## Buyer-facing cleanup

Removed/replaced buyer-visible internal wording such as review/asset-gate/live-debug language in R14 surfaces. Missing media states now use deliberate commercial language:

- `Інтерфейс BB610 PULS` / `візуал готується`;
- `Візуал модуля готується`;
- numeric proof uses `Приклад роботи`.

## Responsive / accessibility QA

Target breakpoint rules reviewed for:

- `1920×1080`
- `1366×768`
- `1024×768`
- `768×1024`
- `430×932`
- `390×844`

Implemented checks/fixes:

- no intentional horizontal-scroll component;
- multi-column sections collapse before phone widths;
- dialogue choices become single-column on phone;
- touch controls are >= 48 px where practical;
- visible `:focus-visible` treatment on nav, buttons, selectors and form controls;
- zone/config choices expose selected state with `aria-pressed`;
- menu keeps `aria-expanded` / `aria-controls` state;
- form controls have explicit labels;
- reduced-motion preference is respected;
- sticky header offset is applied to section anchors.

## Readiness table

| Section | R14 status | Note |
|---|---|---|
| Header / navigation | **READY FOR STAGING MERGE** | approved WATER logo asset, simplified anchors, sticky offset |
| HERO | **READY FOR STAGING MERGE** | exact proposition; optional agriculture photo is not required for current composition |
| WORKDAY | **READY FOR STAGING MERGE** | commercial copy / hierarchy complete |
| Routine / owner decision | **READY FOR STAGING MERGE** | narrative presentation complete |
| Named zones | **READY FOR STAGING MERGE** | selector and responsive states complete |
| Actual volume | **READY FOR STAGING MERGE** | key proof presentation complete |
| Fertigation | **READY FOR STAGING MERGE** | cycle hierarchy complete |
| pH / EC | **READY FOR STAGING MERGE** | roles separated; EC monitoring-only truth preserved |
| Deviations / protection | **READY FOR STAGING MERGE** | hierarchy and semantics complete |
| BB610 PULS proof | **ASSET BLOCKED** | requires approved real screenshots only |
| CONTROL / HYDRAULIC / ZONE | **ASSET BLOCKED** | requires approved module visuals/photos; stable media areas reserved |
| Installation | **READY FOR STAGING MERGE** | copy/layout complete; context photography remains optional |
| Dialogue configurator | **DATA BLOCKED** | interaction complete; F1-P / F2-P price cells still unapproved |
| Contact flow | **READY FOR STAGING MERGE** | configuration handoff + buyer confirmation complete |
| Footer | **READY FOR STAGING MERGE** | approved WATER logo asset |

## Remaining blockers only

### ASSET

1. Approved real BB610 PULS screenshots: New Task / Schedule / MAIN.
2. Approved CONTROL / HYDRAULIC / ZONE visuals/photos.
3. Optional approved agricultural/context photography — not blocking current HERO or staging merge of the surrounding section.

### DATA

1. Approved prices for F1-P combinations.
2. Approved prices for F2-P combinations.

## Scope integrity

R14 adds only isolated review implementation and this handoff document. No production/root deployment, CNAME, or R07.2 staging change is part of this revision.

**R14 = REVIEW**
