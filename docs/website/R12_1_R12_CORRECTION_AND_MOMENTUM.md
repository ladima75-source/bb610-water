# BB610 WATER — R12.1 CORRECTION + MOMENTUM

- **Revision:** R12.1
- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R12 review commit `59961056a032b9872902af1c913256d5ecd79cc1`
- **Accepted foundation:** R07.2 design / structure base
- **Review path:** `docs/website/review/r12-1/`
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED
- **Implementation snapshot before this report:** `1cfa72b1aabdade989ce811789377521e58a3590`

## Preview

Commit-pinned preview after final handoff commit:

`https://rawcdn.githack.com/ladima75-source/bb610-water/<FINAL_COMMIT>/docs/website/review/r12-1/index.html`

Branch preview:

`https://raw.githack.com/ladima75-source/bb610-water/main/docs/website/review/r12-1/index.html`

## Mandatory owner correction 1 — HERO message restored

The complete approved working message is restored in centralized `data.js` and rendered as the primary H1 without clipping or secondary-message treatment:

`ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ. BB610 WATER БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ`

Lead restored exactly:

`Задайте потрібний режим для кожної зони. BB610 WATER виконає полив і фертигацію за вашим графіком, проконтролює фактичне виконання та повідомить про відхилення.`

R07.2 irrigation-block explanatory model is preserved. It remains explanatory web UI, not PULS imitation.

## Mandatory owner correction 2 — graphite tonal system

The R12 black/white alternation has been replaced across the whole page with a coherent graphite tonal family:

- `tone-0` — deepest anchor / configurator / HERO;
- `tone-1` — dark graphite;
- `tone-2` — lighter graphite;
- `tone-3` — charcoal / cool dark grey.

No section uses stark white as its default page surface. WATER cyan remains the functional accent. Green appears only on confirmed result state. Warning colors are not used decoratively.

The pass includes section transitions, forms, configurator, proof slots, architecture placeholders, actual-volume block, zone interaction and footer — not only HERO / WORKDAY.

## Mandatory owner correction 3 — clean model codes + separate descriptors

Configurator now keeps exact clean public model codes:

- `I`
- `F1`
- `F1-P`
- `F1-PE`
- `F2`
- `F2-P`
- `F2-PE`

Each model button renders two separate visual lines:

- code in `<b>`;
- human-readable selector descriptor in `<small>`.

Examples:

- `F1-PE` / `1 канал живлення · pH · EC`;
- `F2-P` / `2 канали живлення · pH`.

EC remains monitoring in the product description and is not called closed-loop regulation.

Zone selector remains separate and human-readable:

- `Z4(8)` / `4 встановлені зони · розширення до 8`;
- `Z8(12)` / `8 встановлених зон · розширення до 12`;
- `Z12(16)` / `12 встановлених зон · розширення до 16`.

Prices remain centralized from the accepted R07.2 source. Missing F1-P / F2-P prices remain `null` and render as `Ціна уточнюється`.

## Additional full-page refinement completed in the same pass

### Navigation / CTA
- header height and spacing normalized;
- mobile menu keeps explicit expanded state;
- CTA heights and labels normalized;
- final configurator CTA uses the stronger farm-specific intent.

### HERO
- full commercial H1 is visible immediately;
- headline scale reduced from the R12 oversized range so the full message can coexist with the accepted queue at 1366 px;
- queue density reduced: tighter row rhythm and restrained visual weight;
- explanatory note retained without competing with sales copy.

### WORKDAY
- kept immediately after HERO;
- comparison remains one coherent two-part composition instead of independent feature cards;
- managed state receives subtle tonal distinction rather than a white panel;
- conclusion remains attached to the comparison.

### ROUTINE
- repetitive four-card grid replaced by a quieter four-line operating rail;
- section now explains where repetitive labour is removed while agronomic decisions remain with owner.

### ZONES
- selector buttons now show zone name plus compact target / recipe line;
- active selection is indicated by cyan rule / tonal surface rather than heavy card styling;
- blueberry keeps `ВОДА + ЖИВЛЕННЯ + pH`;
- `Клумба Коханої` remains exact.

### ACTUAL VOLUME
- proof stays visually stronger than generic features;
- `800 л → 802 л` result uses one restrained technical panel;
- ordinary-controller vs BB610 WATER contrast remains adjacent to factual proof.

### FERTIGATION
- process graphic simplified into one coherent cycle strip;
- F1 / F2 channel distinction remains separate from the cycle;
- explanatory 15 / 70 / 15 example retained as non-universal.

### pH / EC
- roles remain visually separate but share one consistent section language;
- pH management/correction and EC monitoring remain distinct.

### DEVIATIONS / SAFETY
- three response levels changed from similar cards to a numbered vertical hierarchy;
- no universal response is implied.

### REAL BB610 PULS proof
- no fake dashboard or old extracted screenshot is shown;
- three placeholders remain for approved real `Нове завдання / Тижневий розклад / MAIN` screenshots;
- placeholder treatment is visually deliberate and no repository path/debug text is shown to buyer.

### CONTROL / HYDRAULIC / ZONE
- architecture stays as three commercial modules;
- missing product visuals are represented by consistent intentional asset slots instead of broken-image treatment.

### INSTALLATION
- copy tightened around modular external connections and professional commissioning;
- no claim of installation-free setup.

### CONFIGURATOR
- model and zone choices are visually different groups;
- selector state is clearer on desktop and touch layouts;
- result panel remains sticky only where useful; becomes normal flow on tablet/mobile;
- selected context still carries into contact form request.

### CONTACT
- final CTA hierarchy strengthened;
- field styles and focus states normalized;
- no fake backend-success message added.

## Desktop QA

### 1366×768
- complete HERO H1 + lead + CTA remain in the left hierarchy;
- accepted irrigation-block visual fits alongside copy without becoming a SCADA-like dominant screen;
- no headline masking/truncation rule exists;
- section max width is capped at 1220 px;
- configurator choices remain readable and code/descriptor hierarchy is distinct.

### 1920×1080
- 1220 px max-width prevents over-expansion and long lines;
- graphite tone changes remain visible but coherent rather than hard black/white cuts;
- proof / architecture / configurator sections retain balanced text-to-visual proportions.

## Mobile QA

### 390×844 / 430×932
- HERO becomes one column intentionally;
- H1 uses `38px / 1.02` mobile sizing so the complete approved sentence remains readable;
- queue rows restructure with volume below zone text and no horizontal dependency;
- CTA becomes full-width stacked controls;
- WORKDAY stacks to maintain readable before/after contrast;
- zone selector becomes one column with touch-readable name + recipe/volume context;
- actual-volume panel uses smaller numeric scale;
- F1/F2 channels and pH/EC become one column;
- PULS proof and architecture slots stack;
- configurator model / zone selectors become one column;
- form becomes one column;
- no hover-only meaning is required;
- all layouts use bounded container widths and no intentional horizontal overflow.

## Buyer-visible internal language cleanup

Removed from the commercial page surface:

- R12 review strip;
- review/base-commit footer language;
- raw asset file paths inside PULS placeholders;
- `ASSET GATE` developer wording.

Only neutral placeholder meaning remains where real approved visual assets are still missing.

## Unresolved real-asset needs

Only unresolved asset needs remain:

1. approved real BB610 PULS screenshots:
   - `Нове завдання`;
   - `Тижневий розклад`;
   - `MAIN`;
2. approved presentation-quality CONTROL visual/photo;
3. approved presentation-quality HYDRAULIC visual/photo;
4. approved presentation-quality ZONE visual/photo.

R12.1 does not fabricate these assets and does not treat old `assets/extracted/*` as proof merely because they exist.

## Files created

- `docs/website/review/r12-1/index.html`
- `docs/website/review/r12-1/styles.css`
- `docs/website/review/r12-1/data.js`
- `docs/website/review/r12-1/commercial.js`
- `docs/website/review/r12-1/app.js`
- `docs/website/R12_1_R12_CORRECTION_AND_MOMENTUM.md`

## Safety

- R07.2 staging was not changed.
- Production/root files were not changed.
- `CNAME` was not changed.
- No new concept / A-B-C exploration was created.
- R12.1 remains structurally mergeable after PASS.

**STOP CONDITION:** R12.1 = REVIEW. Do not merge into staging or production until reviewed.