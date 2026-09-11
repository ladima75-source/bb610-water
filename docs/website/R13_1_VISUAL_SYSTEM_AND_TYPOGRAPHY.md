# BB610 WATER — R13.1 VISUAL SYSTEM + TYPOGRAPHY

- **Revision:** R13.1
- **Status:** REVIEW
- **Base:** R13 dialogue configurator + accepted R07.2 structure + R12.1 graphite direction
- **Review path:** `docs/website/review/r13-1/`
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED

## Preview

Final commit-pinned preview is reported in the handoff message after this report is committed.

## Design-system reference

`docs/website/BB610_WATER_WEB_DESIGN_SYSTEM_R1.md`

This document records the implemented tokens and usage rules for subsequent website work.

## Brand asset rule implemented

The header/footer use the approved source asset directly:

`assets/extracted/02_ae24f7eff9c5.webp`

The BB610 WATER wordmark is not reconstructed typographically in R13.1.

`BB610 PULS` and `BB610 PULS MOBILE` remain text product names in the common typography system. No alternate PULS/PULS MOBILE logo marks were created.

## Font actually used

`Inter, "Segoe UI", Arial, sans-serif`

No second display family was introduced. Normal UI roles are limited to 400 / 600 / 700.

## Implemented type scale

Desktop reference:

- Hero: 64px / 1.04 / 700;
- H2: 44px / 1.08 / 700;
- H3: 28px / 1.15 / 600;
- Lead: 20px / 1.50;
- Body L: 18px;
- Body: 16px;
- UI: 15px;
- Small: 14px;
- Meta: 12px;
- Data XL: 48px;
- Data M: 26px.

Mobile reference:

- Hero: 40px / 1.06;
- H2: 32px / 1.10;
- H3: 23px;
- Lead: 18px;
- Body L: 17px;
- Body: 16px;
- UI: 15px;
- Small: 13px;
- Data XL: 40px.

## Implemented color tokens

- `--bg-0 #080D10`
- `--bg-1 #0D1418`
- `--bg-2 #121C21`
- `--bg-3 #18252B`
- `--line rgba(180,220,235,.14)`
- `--text-1 #F3F7F8`
- `--text-2 #B5C2C8`
- `--text-3 #7F929B`
- `--water #22C7EE`
- `--water-soft rgba(34,199,238,.12)`
- `--success #38D996`
- `--warning #F2B84B`
- `--danger #F06A67`

The full page now uses chapter-based graphite tonal depth rather than mechanical section-by-section alternation.

## Wrapping and typography corrections

- Hero H1 uses centralized max-width, fluid scale and `text-wrap: balance` rather than arbitrary breaks.
- The exact approved HERO wording remains sourced from centralized data.
- `BB610 WATER` is kept visually indivisible in curated markup and dynamic centralized data uses a non-breaking space before render.
- Active model strings use non-breaking hyphen treatment in dynamic content to reduce accidental split of `F1-P`, `F1-PE`, `F2-P`, `F2-PE`.
- `pH` / `EC` are wrapped as indivisible technical labels in key configurator headings.
- Body/lead measures were capped instead of stretching across the full content width.
- Long ALL-CAPS treatment was reduced in static section headings where it did not carry a UI/meta function; eyebrow/meta labels retain uppercase.

## Page system / chapters

Without changing the accepted content order, the page is grouped visually into:

1. Promise / owner value — HERO, WORKDAY, routine bridge;
2. How control works — zones, actual volume, fertigation, pH/EC;
3. Proof / system — deviations, BB610 PULS, physical modules;
4. Choose / buy — installation, dialogue configurator, contact.

Chapter changes use tonal shift + spacing, not new content architecture.

## Cards / controls simplified

- narrative content remains open on the graphite section surface;
- raised cards are reserved for grouped technical data, selectable states, proof panels and product modules;
- one border language based on `--line`;
- radius system limited to 8 / 12 / 16px;
- shadows removed where tonal separation is enough;
- buttons consolidated to primary / secondary roles with common 50px control height;
- zone selector, process proof and dialogue configurator now share the same selection/component language.

## Dialogue configurator preserved from TASK 13

R13 interaction remains intact:

- plain-language Q1–Q5 flow;
- exact resolution to I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE;
- irrigation-only suppresses impossible P/PE choices;
- EC selection implies valid PE logic with pH and remains monitoring only;
- zone configuration remains separate;
- HMI remains separate;
- result/price is derived from centralized commercial data;
- selected configuration carries into contact/request.

## Responsive QA

Review targets addressed in the R13.1 responsive system:

- **1920×1080:** max/content widths prevent over-stretched lines; Hero scale capped at 64px; two-column 5/7 geometry retained.
- **1366×768:** fluid Hero/H2 scale and balanced wrapping preserve hierarchy without forcing many hard breaks.
- **1024×768:** content begins collapsing to single-column section geometry; sticky nav switches to mobile/menu behavior before crowding.
- **768×1024:** proof/configurator/result ordering is linear; zone selector remains touch-readable.
- **430×932:** 20px side padding; 40px Hero / 32px H2; dialogue answer controls become one column; result follows questions.
- **390×844:** same mobile scale; body remains >=16px; product tokens and BB610 WATER are protected from normal wrapping; no component intentionally requires horizontal scrolling or hover.

QA in this execution environment is DOM/CSS/source-level responsive review rather than screenshot-based browser capture. The implemented rules explicitly target the six required viewport classes; final owner browser review remains the visual acceptance gate.

## Files created for R13.1

- `docs/website/review/r13-1/index.html`
- `docs/website/review/r13-1/styles.css`
- `docs/website/review/r13-1/system.js`
- `docs/website/BB610_WATER_WEB_DESIGN_SYSTEM_R1.md`
- `docs/website/R13_1_VISUAL_SYSTEM_AND_TYPOGRAPHY.md`

R13 files created immediately before this pass:

- `docs/website/review/r13/index.html`
- `docs/website/review/r13/styles.css`
- `docs/website/review/r13/app.js`
- `docs/website/R13_DIALOGUE_CONFIGURATOR_AND_FORWARD_BUILD.md`

## Remaining blockers only

### ASSET

- approved real BB610 PULS screenshots;
- approved presentation-quality CONTROL / HYDRAULIC / ZONE visuals or photos;
- optional approved agricultural/context photography where later selected.

### DATA

- approved prices for F1-P and F2-P combinations.

No fake PULS, equipment photography or alternate logos were created.

## Implementation snapshot

R13.1 implementation + design-system document before this report: `710889ef059496070c97a1a5f717e202ea54a5e7`.

Final handoff commit is reported in the accompanying chat response.

**STOP CONDITION:** R13.1 = REVIEW. Do not merge to R07.2 staging or production until reviewed.
