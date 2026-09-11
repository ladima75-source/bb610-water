# BB610 WATER — WEB DESIGN SYSTEM R1

- **Status:** REVIEW REFERENCE
- **Applies to:** BB610 WATER website review implementation from R13.1 forward
- **Foundation:** accepted R07.2 structure + R12.1 graphite direction + R13 dialogue configurator
- **Production:** not changed by creation of this document

## 1. Brand identity rule

The only approved website brand mark currently available is the approved **BB610 WATER** logo asset:

`assets/extracted/02_ae24f7eff9c5.webp`

Use this asset directly. Do not reconstruct the BB610 WATER wordmark with HTML/CSS typography and do not invent alternate logo colorways.

`BB610 PULS` and `BB610 PULS MOBILE` currently remain **text product names** inside the common website typography system. No separate approved PULS / PULS MOBILE logos exist in the current website scope; do not draw or simulate them.

The site visually echoes the master logo through WATER cyan and neutral graphite. Green is not a general brand fill; it is reserved for biological/normal/success semantics.

## 2. Visual character

Target character:

- professional agricultural engineering;
- calm;
- precise;
- premium;
- readable;
- trustworthy;
- agricultural context without generic SaaS styling;
- technical proof without turning the full site into SCADA.

Avoid neon, cyberpunk, glassmorphism, decorative gradients, fake 3D equipment, floating KPI decoration and unnecessary shadows.

## 3. Color tokens

Implemented CSS tokens:

```css
--bg-0: #080D10;
--bg-1: #0D1418;
--bg-2: #121C21;
--bg-3: #18252B;
--line: rgba(180,220,235,.14);
--text-1: #F3F7F8;
--text-2: #B5C2C8;
--text-3: #7F929B;
--water: #22C7EE;
--water-soft: rgba(34,199,238,.12);
--success: #38D996;
--warning: #F2B84B;
--danger: #F06A67;
```

Usage:

- `bg-0` — strongest anchors: header/footer, real proof or technical anchor sections when needed;
- `bg-1` — primary narrative environment;
- `bg-2` — alternate/process chapter surfaces;
- `bg-3` — raised cards, grouped technical information and result panels;
- `water` — primary CTA, active selection, functional emphasis;
- `success` — confirmed normal/result only;
- `warning` — warning state only;
- `danger` — alarm/critical state only.

Do not use pure-white page sections as rhythmic alternation.

## 4. Font family and weights

Implemented UI family:

`Inter, "Segoe UI", Arial, sans-serif`

No additional decorative/display family is introduced.

Normal page UI uses max three weight roles:

- 400 — body / lead;
- 600 — labels / H3 / selectable controls;
- 700 — H1 / H2 / major values / primary actions.

The family must preserve good Ukrainian Cyrillic readability and clear technical numerals.

## 5. Type scale

### Desktop target

- Hero H1: `64px`, line-height `1.04`, weight `700`, letter-spacing `-0.025em`;
- H2: `44px`, line-height `1.08`, weight `700`, letter-spacing `-0.018em`;
- H3: `28px`, line-height `1.15`, weight `600`;
- Lead: `20px`, line-height `1.50`;
- Body L: `18px`, line-height `1.55`;
- Body: `16px`, line-height `1.55`;
- UI/button: `15px`, weight `600–700`;
- Small: `14px`;
- Eyebrow/meta: `12px`, weight `700`, tracking `0.08em` where uppercase;
- Data XL: `48px`, tabular numerals;
- Data M: `26px`, tabular numerals.

### Mobile target ~390–430px

- Hero H1: `40px`, line-height `1.06`;
- H2: `32px`, line-height `1.10`;
- H3: `23px`, line-height `1.18`;
- Lead: `18px`, line-height `1.45`;
- Body L: `17px`;
- Body: `16px`;
- UI: `15px`;
- Small: `13px`;
- Data XL: `40px`.

Core body text is not reduced below 16px to force content to fit.

## 6. Wrapping and line-length rules

- H1/H2 use deliberate max-widths and `text-wrap: balance` where supported.
- Do not hard-code many `<br>` breaks for a single viewport.
- Product name `BB610 WATER` is non-breaking in curated static copy and normalized to a non-breaking space in centralized dynamic review content.
- Technical tokens such as `pH`, `EC`, `F1-PE`, `F2-PE`, `Z8(12)` are kept visually intact.
- Lead copy: target measure approximately 55–72 characters, max around 620–760px depending on section.
- General body paragraphs: max approximately 680px.
- Avoid accidental one-word orphan lines in major marketing headings; control wrapping by width and balanced text before considering manual breaks.
- Curated Ukrainian short prepositions/conjunctions may use selective non-breaking spaces when a visible orphan occurs; do not globally transform text.

## 7. Page geometry

Implemented geometry:

- max outer width: `1280px`;
- standard content width: `1200px`;
- desktop side padding: `40px` baseline;
- tablet side padding: `28–32px`;
- mobile side padding: `20px`;
- major two-column default: 5/7 or content-appropriate 4/8;
- headings align to the same content grid line.

## 8. Spacing tokens

8px-base system with named values:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128`

CSS tokens:

```css
--sp-1: 4px;
--sp-2: 8px;
--sp-3: 12px;
--sp-4: 16px;
--sp-5: 24px;
--sp-6: 32px;
--sp-7: 48px;
--sp-8: 64px;
--sp-9: 80px;
--sp-10: 96px;
--sp-11: 128px;
```

Guidance:

- normal desktop section: 96px;
- chapter start/end may reach 128px;
- mobile major section: 80px;
- heading → lead: 20–28px;
- lead → main content: 40–56px;
- standard card padding: 24–32px desktop, 18–24px mobile.

## 9. Radius / border / shadow

Radius tokens:

- controls/small: `8px`;
- standard cards: `12px`;
- large panels: `16px`.

Borders use one neutral graphite/cyan system based on `--line`. Do not outline every narrative statement.

Use tonal separation before shadows. Neon/glow shadows are prohibited.

## 10. Buttons

Three roles only:

1. Primary — WATER cyan fill, dark text.
2. Secondary — transparent/graphite surface, subtle border, light text.
3. Tertiary/text — no box unless interaction requires it.

Common rules:

- standard control height: `50px` desktop, never below 48px touch height;
- radius: 8px;
- UI type: 15px, weight 600–700;
- sentence/short-action labels; avoid shouting solely through all caps.

## 11. Cards and selectable controls

Cards are reserved for:

- selectable options;
- grouped process/state information;
- product modules;
- measured proof/data;
- interactive controls.

Narrative copy remains open on section surfaces.

Selectable state:

- same component geometry in selected/unselected states;
- selected = WATER cyan border + subtle WATER soft background;
- never introduce a completely different component only because it is selected.

## 12. Visual chapters

Content order remains unchanged. Visual rhythm is grouped into chapters:

1. **Promise / owner value** — HERO + WORKDAY + owner-decision/routine bridge.
2. **How control works** — zones + actual volume + fertigation + pH/EC.
3. **Proof / system** — deviations + BB610 PULS + CONTROL/HYDRAULIC/ZONE.
4. **Choose / buy** — installation + dialogue configurator + contact.

Chapter transitions use spacing and tonal depth rather than mechanical black/white alternation.

## 13. Header / logo

- approved BB610 WATER logo asset on the left;
- navigation is visually secondary;
- one primary CTA on desktop;
- sticky header must not cover anchored headings (`scroll-padding-top` / `scroll-margin-top`);
- mobile header reduces to logo + menu trigger;
- WATER cyan from the logo echoes only in selected nav/controls/primary CTA, not as decoration everywhere.

## 14. Data and process UI

For litres, pH, EC, pressure, progress and configurator results:

- use tabular numerals where available;
- unit remains visually attached but subordinate;
- cyan = active/information/control;
- green = confirmed successful/normal result only;
- amber/red = actual warning/alarm only;
- explanatory widgets must not imitate full PULS/SCADA styling.

## 15. Dialogue configurator

R13 dialogue configurator is the standard interaction pattern:

- numbered questions use eyebrow/meta hierarchy;
- buyer chooses plain-language requirements;
- technical model resolves automatically;
- answer controls use standard selectable components;
- clean technical code remains visually separate from explanation;
- EC remains monitoring; selecting EC implies the valid PE configuration including pH;
- irrigation-only removes impossible P/PE branches;
- result panel uses H3/Data hierarchy;
- selected configuration is passed into contact context/request;
- mobile questions stack vertically without a cryptic model grid.

## 16. Asset policy

Never fabricate product proof.

Current asset roles:

- master logo — approved BB610 WATER asset only;
- BB610 PULS real screenshots — asset-gated until approved files are present;
- CONTROL/HYDRAULIC/ZONE — approved presentation media when available; otherwise intentional neutral slot;
- agricultural/context imagery — approved context photography may be added later;
- no AI/generated scene may be presented as a real BB610 WATER installation.

## 17. Responsive targets

Required review sizes:

- 1920×1080;
- 1366×768;
- 1024×768;
- 768×1024;
- 430×932;
- 390×844.

Check at each:

- H1/H2/H3 wrapping;
- product-name/code splits;
- line lengths;
- no clipped content;
- no horizontal overflow;
- >=48px primary touch targets;
- dialogue configurator remains a dialogue;
- result follows questions naturally on narrow screens;
- no hover-only information.

## 18. Implementation reference

R13.1 implementation uses these design-system rules in:

`docs/website/review/r13-1/styles.css`

This document is the design reference for subsequent BB610 WATER website work until explicitly superseded or frozen by a later approved revision.
