# BB610 WATER — TASK 13.1 / VISUAL SYSTEM + TYPOGRAPHY PASS

- **Status:** ASSIGNED
- **Base:** execute after/with TASK 13 result; do not restart page architecture
- **Reference:** accepted R07.2 structure + R12.1 graphite direction
- **Goal:** remove visual chaos by introducing one explicit BB610 WATER design system across the whole page
- **Production:** DO NOT CHANGE

## 1. Core design principle

The site must stop looking like a sequence of independently designed sections.

Every section must use the same system for typography, widths, spacing, radii, borders, buttons, color roles and responsive behavior.

Visual character: **professional agricultural engineering** — calm, precise, premium, readable. Not cyberpunk, not generic SaaS, not SCADA everywhere.

## 2. Logo / brand color logic

Use the BB610 WATER header lockup consistently:

- `BB610` = neutral/light brand wordmark on dark surfaces;
- `WATER` = WATER cyan accent;
- leaf/green brand element, if the approved master logo asset contains it, remains brand green and must not recolor the whole site green;
- do not invent alternate logo colorways without an approved asset.

The website color system should **echo the logo**, not copy every logo color equally.

Primary site accent = WATER cyan.
Green = biological/normal/success semantic accent only.
Graphite = primary environment.
White/off-white = text, not page-background rhythm.
Amber/red = warnings/deviations only.

## 3. Color tokens

Implement centralized CSS variables/tokens. Exact values may be tuned slightly for contrast, but use this hierarchy:

- `--bg-0`: #080D10 — deepest anchor/header/footer
- `--bg-1`: #0D1418 — primary page graphite
- `--bg-2`: #121C21 — alternate section graphite
- `--bg-3`: #18252B — raised cards / lighter technical surface
- `--line`: rgba(180,220,235,.14)
- `--text-1`: #F3F7F8 — primary text
- `--text-2`: #B5C2C8 — secondary text
- `--text-3`: #7F929B — tertiary/meta
- `--water`: #22C7EE — BB610 WATER cyan
- `--water-soft`: rgba(34,199,238,.12)
- `--success`: #38D996 — normal/confirmed only
- `--warning`: #F2B84B — warning only
- `--danger`: #F06A67 — alarm/critical only

No pure-white full-page sections. Alternate mainly `bg-1` / `bg-2`; use `bg-3` for contained surfaces.

## 4. Typography family

Use one UI/display sans family already legally/technically available in the project. Prefer the existing family if suitable; do not add a random second display font.

Required characteristics: excellent Ukrainian Cyrillic, clear numerals, technical neutrality, strong bold weights.

Use max **3 weights** in normal page UI: 400 / 600 / 700 (or nearest available equivalents).

Do not use ALL CAPS for long sentences. Uppercase is reserved for eyebrow labels, short UI labels and compact emphasis.

## 5. Desktop type scale

Create centralized tokens/classes rather than arbitrary per-section sizes.

At desktop >= 1200px:

- `Display XL / Hero H1`: 64px, line-height 1.02–1.06, weight 700, letter-spacing -0.025em
- `H2`: 44px, line-height 1.08, weight 700, letter-spacing -0.018em
- `H3`: 28px, line-height 1.15, weight 600/700
- `Lead`: 20px, line-height 1.50, weight 400
- `Body L`: 18px, line-height 1.55
- `Body`: 16px, line-height 1.55
- `UI / button`: 15–16px, line-height 1.2–1.3, weight 600/700
- `Small`: 14px, line-height 1.45
- `Eyebrow/meta`: 12px, line-height 1.3, weight 600/700, tracking +0.08em where uppercase
- `Data XL`: 44–52px, line-height 1.0, tabular numerals where available
- `Data M`: 24–28px, line-height 1.05

Hero H1 should normally occupy max ~11–13 words per visual line group, not stretch across the full viewport.

## 6. Tablet/mobile type scale

Use fluid `clamp()` where practical; preserve hierarchy rather than mechanically scaling everything.

At ~390–430px:

- `Hero H1`: 38–42px, line-height 1.04–1.08
- `H2`: 30–34px, line-height 1.10
- `H3`: 22–24px, line-height 1.18
- `Lead`: 18px, line-height 1.45
- `Body L`: 17px, line-height 1.50
- `Body`: 16px, line-height 1.50
- `UI`: 15–16px
- `Small`: 13–14px
- `Eyebrow`: 11–12px
- `Data XL`: 36–42px

Do not reduce core body text below 16px merely to fit content.

## 7. Line length / wrapping rules

This is mandatory. Current random wrapping must be eliminated.

### Main headings

- set deliberate `max-width` in characters/px;
- avoid orphaned final one-word lines where possible;
- never allow `BB610` and `WATER` to split from each other when they form the product name: use a non-breaking wrapper/span;
- keep `pH`, `EC`, `F1-PE`, `Z8(12)` unbroken;
- do not manually insert `<br>` just to match one viewport unless the break is semantically intentional and verified at all target widths;
- prefer CSS width + balanced wrapping (`text-wrap: balance` where supported) over many hard-coded breaks.

### Body/lead

- ideal readable measure: 55–72 characters;
- lead copy max width roughly 620–760px depending on section;
- body copy generally max 680px;
- avoid full-width paragraphs across 1200px containers.

### Ukrainian prepositions/conjunctions

Where practical in key marketing headlines/leads, avoid visually stranded one-letter/short prepositions/conjunctions at line ends (`і`, `в`, `у`, `з`, `до`, `на`, `та`) by using non-breaking spaces selectively in curated copy. Do not globally corrupt text/searchability with blanket replacements.

## 8. HERO exact composition rule

Keep the approved message:

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ. BB610 WATER БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ**

Lead:

**Задайте потрібний режим для кожної зони. BB610 WATER виконає полив і фертигацію за вашим графіком, проконтролює фактичне виконання та повідомить про відхилення.**

Do not force the entire H1 into uppercase if it creates an aggressive wall of text. The wording must remain exact, but visual case treatment may be tested only if Ukrainian spelling/content remains unchanged and readability improves. If current brand direction requires uppercase, constrain width and line count carefully.

Desktop target: H1 visually 3–5 lines, not 7–9 accidental fragments.
Mobile target: coherent phrase groups, no single orphan word lines where avoidable.

## 9. Layout grid

Centralize page geometry:

- max content width: 1280px;
- standard content width: 1180–1200px;
- desktop side padding: 40–48px;
- tablet: 28–32px;
- mobile: 20px;
- 12-column desktop grid where useful;
- major two-column sections default 5/7 or 6/6 depending on content, not arbitrary widths.

Align major section headings to the same left grid line.

## 10. Spacing system

Use an 8px base rhythm with named tokens:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128`

Recommended:

- major desktop section vertical padding: 96–128px;
- compact/related section: 72–96px;
- mobile major section: 64–80px;
- heading → lead: 20–28px;
- lead → primary content: 40–56px;
- card internal padding desktop: 24–32px;
- mobile: 18–24px.

Remove arbitrary one-off margins unless technically necessary.

## 11. Radius / borders / shadows

Use max three radius tokens:

- `8px` controls/small items
- `12px` standard cards
- `16px` large visual panels

Avoid excessive pill shapes except tags/statuses.

Borders: one subtle graphite/cyan-neutral border system. Do not outline every object.

Shadows: minimal; use tonal separation before shadow. No glowing neon cyan cards.

## 12. Buttons

Only three button roles:

1. Primary — WATER cyan filled, dark text
2. Secondary — graphite/transparent with subtle border, light text
3. Text/tertiary — no box unless interaction requires it

Standard desktop height ~48–52px; mobile >=48px touch height.

One consistent radius, font weight and horizontal padding.

CTA labels use sentence/short action language; avoid visual shouting through unnecessary uppercase unless it is the established button convention everywhere.

## 13. Cards / information hierarchy

Stop making every statement a card.

Use cards only for:

- selectable options;
- grouped process/state information;
- distinct product modules;
- actual proof/data;
- interactive controls.

Narrative copy should often remain open on the section background.

Within cards use one hierarchy: eyebrow → title → explanation/data → action/state.

## 14. Section rhythm

The page should read as a continuous story, not 15 unrelated slides.

Use tonal alternation sparingly:

- `bg-1` normal narrative;
- `bg-2` alternate/value/process;
- `bg-0` strong anchor/technical proof such as PULS if useful;
- `bg-3` contained modules/cards.

Do not alternate color mechanically every section. Group related sections into chapters visually.

Suggested visual chapters without changing content order:

1. **Promise / owner value** — HERO + WORKDAY
2. **How control works** — zones + actual volume + fertigation + pH/EC
3. **Proof / system** — deviations + PULS + CONTROL/HYDRAULIC/ZONE
4. **Choose / buy** — installation + dialogue configurator + contact

Use spacing/tonal shifts to signal chapters.

## 15. Logo/header

Header must use the approved BB610 WATER identity consistently.

- Logo/lockup left;
- nav secondary in visual hierarchy;
- primary CTA right on desktop;
- header height and logo scale consistent across pages/states;
- sticky header must not cover anchors;
- mobile header simplified; do not cram desktop nav.

WATER cyan from the lockup should visually echo in active nav, primary CTA and selected states — not everywhere.

## 16. Data / process UI

For litres, pH, EC, pressure, progress and configurator results:

- use tabular numerals where available;
- unit visually subordinate but attached to value;
- align comparable numbers;
- cyan = active/control/information;
- green only confirmed OK/result;
- warning colors only abnormal states.

Do not mimic full SCADA styling in explanatory website widgets.

## 17. Dialogue configurator integration

TASK 13 dialogue configurator remains mandatory.

Its visual design must use this system:

- numbered question labels = small/eyebrow hierarchy;
- answer buttons = standard selectable card/control component;
- selected state = cyan border/background accent, not a completely different component;
- product result = strong H3/Data hierarchy;
- technical code remains clean and unbroken;
- explanation is separate body/small text;
- mobile questions stack cleanly.

## 18. Responsive typography QA

Check at least:

- 1920×1080
- 1366×768
- 1024×768
- 768×1024
- 430×932
- 390×844

For every viewport inspect all major H1/H2/H3 for:

- orphan words;
- accidental 1-word lines;
- clipped text;
- code/product-name splits;
- oversized headings dominating content;
- tiny explanatory text;
- inconsistent line-height.

Do not merely run automated overflow checks; visually inspect wrapping.

## 19. Design tokens / documentation

Create a centralized design-token layer in R13/R13.1 implementation (CSS custom properties or equivalent) for:

- colors;
- typography sizes/line heights;
- content widths;
- spacing;
- radii;
- controls.

Create:

`docs/website/BB610_WATER_WEB_DESIGN_SYSTEM_R1.md`

Document the final implemented tokens and usage rules. This becomes the design reference for subsequent website work.

## 20. Deliverable

Apply this design system across the **entire current review page**, not a demo style-guide page.

Create/update review implementation and report:

`docs/website/R13_1_VISUAL_SYSTEM_AND_TYPOGRAPHY.md`

Set **R13.1 = REVIEW**.

Report:

1. preview URL;
2. design-system file path;
3. font family actually used;
4. implemented type scale;
5. implemented color tokens;
6. major wrapping corrections;
7. sections/cards simplified;
8. responsive visual QA results;
9. remaining asset/data blockers only;
10. commit SHA.

Then STOP. Production and accepted R07.2 staging remain untouched.