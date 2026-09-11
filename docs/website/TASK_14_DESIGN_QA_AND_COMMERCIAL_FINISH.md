# BB610 WATER — TASK 14 / DESIGN QA + COMMERCIAL FINISH

- **Status:** ASSIGNED
- **Base:** R13.1 commit `9f508cf31dd5cd713388bccafef6b53cada9fe3c`
- **Goal:** stop iterating on concepts; bring the current accepted homepage to a coherent near-release visual/commercial state
- **Production:** DO NOT CHANGE
- **No new architecture. No A/B/C. No new hero concept.**

## 1. First principle

R13.1 established the design system. R14 is an application/quality pass, not another redesign.

Treat the page as one finished commercial product. Fix visible composition problems proactively instead of reporting them as future microtasks.

## 2. Logo audit — mandatory

The project has an approved **BB610 WATER** logo asset. It is the only approved product logo for the current site.

Audit `assets/extracted/02_ae24f7eff9c5.webp` visually/semantically against its actual content before using it as the header/footer identity. If the asset is not in fact the approved BB610 WATER logo, do not silently use it merely because an earlier task referenced it: locate the correct existing WATER logo in repository assets and document the exact path.

Rules:

- use the actual approved BB610 WATER logo asset;
- do not reconstruct it with text;
- do not invent PULS/PULS MOBILE logos;
- `BB610 PULS` and `BB610 PULS MOBILE` remain typographic product names;
- preserve original logo proportions and clear space;
- no stretching, cropping, filters or recoloring of the master asset.

Header target logo visual height: approximately 30–36px on desktop, 28–32px mobile, adjusted only to preserve the actual mark legibility.

## 3. Typography visual QA — every section

The token values are not enough; visually inspect actual wrapping and composition.

For each H1/H2/H3 at 1920, 1366, 1024, 768, 430 and 390 widths:

- remove accidental one-word orphan lines;
- avoid ugly Ukrainian preposition/conjunction endings in curated headline/lead copy where practical;
- keep `BB610 WATER`, `BB610 PULS`, `pH`, `EC`, `F1-PE`, `Z8(12)` intact;
- no clipped letters;
- no headings colliding with adjacent visuals;
- no heading should look artificially huge simply because the token allows it;
- use max-width and fluid clamp before adding hard `<br>`;
- preserve the approved HERO wording exactly.

If 64px is visually too large at a particular desktop width, use a fluid clamp within the design system; do not change the hierarchy arbitrarily.

## 4. HERO composition

Keep exact approved proposition:

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ. BB610 WATER БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ**

Lead remains:

**Задайте потрібний режим для кожної зони. BB610 WATER виконає полив і фертигацію за вашим графіком, проконтролює фактичне виконання та повідомить про відхилення.**

Refine actual visual balance:

- message is dominant;
- irrigation-block explanatory model is secondary proof;
- neither column should appear cramped;
- CTA hierarchy obvious;
- first viewport at 1366×768 must show enough of the proposition and proof to understand the product without looking broken or clipped.

Do not introduce a replacement hero image unless an approved asset exists.

## 5. Chapter rhythm

Use the R13.1 four-chapter logic but make transitions visually intentional.

Do not alternate backgrounds mechanically. Use subtle shifts in graphite plus spacing/section separators.

Audit for the current problem of “a lot of separate blocks thrown together”. Reduce visual fragmentation by:

- removing unnecessary outer borders;
- grouping related data within one surface;
- aligning repeated headings and text columns;
- using open space for narrative sections;
- keeping proof/data surfaces denser than narrative surfaces.

## 6. Component consistency

Audit all instances of:

- buttons;
- selected answer cards;
- zone tabs;
- data meters;
- process stages;
- pH/EC cards;
- deviation states;
- architecture modules;
- form fields.

They must use the same radius/border/spacing/type conventions from the design system.

Do not make unrelated components identical when their semantics differ; consistency means shared grammar, not cloning one card everywhere.

## 7. Dialogue configurator — preserve and polish

Do not change the question flow restored in R13.

Make the dialogue feel like a guided consultation rather than a technical form.

Requirements:

- questions visually numbered 1–5;
- answer choices readable before technical code;
- selected state obvious but restrained;
- pH/EC dependent logic visually smooth (no jumping/broken empty gaps);
- result card remains visible/useful on desktop without dominating the questions;
- mobile result follows the dialogue;
- code shown only in result;
- price/result typography aligned;
- HMI visually secondary;
- CTA carries configuration to contact.

## 8. Buyer-facing language cleanup

Scan all rendered copy and remove/rewrite anything that reads like developer documentation.

Do not expose terms such as:

- repository;
- legacy row;
- centralized data layer;
- asset gate;
- placeholder path;
- review;
- implementation;
- fake/live-data disclaimer language that sounds internal.

Where a visual is not yet available, use a clean commercial neutral state, e.g. `Інтерфейс BB610 PULS` with a subtle `візуал готується`, rather than engineering notes.

For explanatory numeric examples, a short customer-safe label such as `Приклад роботи` is sufficient unless a stronger disclaimer is legally/product-truth necessary.

## 9. PULS section without fake logo/UI

Keep the commercial story:

**Ви задали → BB610 WATER виконав → BB610 WATER перевірив.**

Use three prepared real-screenshot frames, but no fake UI.

Labels:

1. `ВИ ЗАДАЛИ` — task/recipe/volume;
2. `BB610 WATER ВИКОНАВ` — schedule/block/queue;
3. `BB610 WATER ПЕРЕВІРИВ` — MAIN actual/progress/process.

Until real screenshots are committed, frames must look deliberate and quiet, not like broken placeholders.

## 10. Physical product section

CONTROL / HYDRAULIC / ZONE must read as one modular system.

Without approved visuals, do not fabricate equipment. Improve hierarchy and reserve stable aspect-ratio media areas so later image replacement does not reflow the page.

The textual hierarchy should remain simple:

- CONTROL — керування;
- HYDRAULIC — підготовка води / фертигація / вимірювання according to configuration;
- ZONE — розподіл по зонах.

## 11. Actual volume / fertigation / pH-EC proof

These are commercial differentiators. They must visually carry more weight than generic narrative cards.

Ensure:

- `Задано` vs `Фактично` is immediately understood;
- litres are visually attached to values;
- fertigation cycle is understandable without reading a paragraph;
- pH and EC roles cannot be confused;
- EC is monitoring only in current product truth;
- blueberry/pH example remains agronomically sensible.

## 12. Navigation and CTA hierarchy

Header navigation should contain only useful anchors; avoid too many equal-priority links.

Primary CTA wording stays oriented to selection/configuration.

Audit CTA sequence across page so there are not five different phrases for the same action.

Preferred action family:

- `Підібрати конфігурацію`
- `Обговорити цю конфігурацію`
- final `Підібрати BB610 WATER під моє господарство`

Use sentence case consistently unless the approved component convention requires otherwise.

## 13. Contact form finish

Make the final contact section feel like continuation of the configurator.

If configuration exists, show it prominently but compactly.

Fields remain low-friction. Do not add unnecessary CRM fields.

Form output/debug preview must not be visible as a technical `<pre>` to a normal buyer unless explicitly triggered as a review-only diagnostic; for commercial UI, show a normal confirmation state.

## 14. Accessibility / interaction polish

- visible keyboard focus;
- labels bound to inputs;
- sufficient contrast;
- buttons/choices >=44px touch target, preferably 48px;
- no hover-only critical content;
- menu keyboard/ARIA state correct;
- `prefers-reduced-motion` respected if motion exists;
- no horizontal scrolling at target widths.

## 15. Readiness goal

After R14, all sections that do not genuinely require external media or missing commercial prices should be marked **READY FOR STAGING MERGE**.

Do not leave ordinary CSS/copy polish as a blocker.

Only acceptable remaining blockers:

### ASSET
- real approved BB610 PULS screenshots;
- approved CONTROL / HYDRAULIC / ZONE visuals/photos;
- optional approved agricultural photography.

### DATA
- approved missing prices for F1-P / F2-P combinations, if still unavailable.

## 16. Implementation

Create isolated:

`docs/website/review/r14/`

Base on R13.1.

Do not modify R07.2 staging or production.

Use the established centralized data and design tokens; if a token must be tuned, update the R1 design-system document with the implemented value and explain why.

## 17. Deliverable

Create:

`docs/website/R14_DESIGN_QA_AND_COMMERCIAL_FINISH.md`

Set **R14 = REVIEW**.

Report only useful acceptance information:

1. preview URL;
2. exact approved WATER logo asset used;
3. typography/wrapping issues fixed;
4. major visual fragmentation removed;
5. configurator/contact polish completed;
6. responsive/accessibility checks;
7. readiness table: each section `READY FOR STAGING MERGE`, `ASSET BLOCKED`, or `DATA BLOCKED`;
8. remaining blockers only;
9. commit SHA.

Then STOP. No new concept and no R14.1 self-assignment.