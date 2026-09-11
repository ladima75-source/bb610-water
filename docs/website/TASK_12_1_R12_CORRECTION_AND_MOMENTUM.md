# BB610 WATER — TASK 12.1 / R12 CORRECTION + MOMENTUM PASS

- **Status:** ASSIGNED
- **Base:** R12 review commit `59961056a032b9872902af1c913256d5ecd79cc1`
- **Accepted foundation:** R07.2 remains the design/structure reference
- **Goal:** correct the three owner findings immediately, then continue meaningful full-page maturation in the SAME pass
- **Production:** DO NOT CHANGE
- **Do not create another concept. Do not restart.**

## Owner feedback — mandatory corrections

### 1. HERO copy and visibility

Restore the stronger accepted commercial message and make sure it is fully visible/readable at desktop and mobile sizes.

Use this buyer-facing copy exactly as the working R12.1 hero message:

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ. BB610 WATER БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ**

Lead:

**Задайте потрібний режим для кожної зони. BB610 WATER виконає полив і фертигацію за вашим графіком, проконтролює фактичне виконання та повідомить про відхилення.**

Do not hide, clip, mask, truncate or visually subordinate part of this main message.

The H1 may be typographically split into lines/spans for hierarchy, but the complete sentence must be immediately readable as one proposition.

Keep the current R07.2 irrigation-block explanatory visual; refine its balance against the restored copy rather than replacing it.

### 2. PAGE COLOR RHYTHM

Owner rejects hard alternating pure/near-white and black pages as the default rhythm.

Move the whole R12.1 page toward a **graphite tonal system**:

- darkest technical/anchor sections: deep graphite;
- alternate sections: lighter graphite / charcoal / cool dark-grey surfaces;
- where a lighter surface is genuinely needed for readability, use a restrained cool grey, NOT stark white;
- preserve WATER cyan as functional accent;
- green only for confirmed normal/success;
- amber/red only for warnings/deviations.

The page should feel like one premium BB610 WATER environment with tonal depth, not a zebra of black/white sections.

Do a full-page color pass, not only the first two sections.

Maintain sufficient text contrast and accessibility.

### 3. CONFIGURATOR MODEL SELECTOR

Restore the earlier selector behavior where the **human-readable description is inside/on the model selection button**, not embedded into the product code/name.

Product code must remain clean:

- `I`
- `F1`
- `F1-P`
- `F1-PE`
- `F2`
- `F2-P`
- `F2-PE`

Do NOT produce labels like a long descriptive sentence as part of the code.

Each selection control should present a clean code plus a short understandable descriptor as a separate visual line/label within the button/card, for example conceptually:

`F1-PE`
`1 канал живлення · pH · EC`

The descriptor is UI explanation, not part of the SKU/product code.

Use exact current product truth:

- `I` — irrigation only;
- `F1` — 1 fertigation channel;
- `F1-P` — 1 fertigation channel + pH;
- `F1-PE` — 1 fertigation channel + pH + EC monitoring;
- `F2` — 2 fertigation channels;
- `F2-P` — 2 fertigation channels + pH;
- `F2-PE` — 2 fertigation channels + pH + EC monitoring.

Do not call EC closed-loop regulation.

Zone selection remains separately understandable as `Z4(8)`, `Z8(12)`, `Z12(16)` with installed/expandable zone meaning.

## Momentum requirement — do more than three patches

The owner explicitly notes that progress is too slow. R12.1 must therefore NOT stop after fixing the three visible issues above.

In the same implementation pass, perform a concrete full-page refinement sweep and resolve obvious visual/UX roughness without changing the accepted information architecture.

At minimum inspect and improve:

1. repeated section headings and overly similar card patterns;
2. excessive borders/boxes;
3. inconsistent section padding;
4. inconsistent button sizes/labels;
5. overly long line lengths;
6. desktop alignment of text vs explanatory visuals;
7. mobile vertical density;
8. configurator readability and selection state;
9. final CTA hierarchy;
10. placeholder treatment so missing assets look intentional, not broken;
11. section transitions under the new graphite tonal system;
12. any buyer-visible internal/review language that should not appear in a commercial page.

Do not ask for approval for each micro-correction. Use professional judgment and deliver one visibly more mature page.

## Preserve product/commercial truths already accepted

Do not regress these:

- product name is BB610 WATER when referring to the full system;
- `ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ` remains high on the page;
- irrigation block time = block start, not zone irrigation duration;
- zones execute in queue/order inside a block;
- zone target is shown in litres;
- blueberry example retains pH where relevant;
- `Клумба Коханої` remains exactly this spelling;
- actual-volume proof remains a core differentiator;
- pH control/management and EC monitoring remain distinct;
- PULS uses honest placeholders until real approved screenshots are available;
- no fake equipment photography;
- prices remain centralized/Admin-ready;
- active product line remains `I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`;
- zone line remains `Z4(8) / Z8(12) / Z12(16)`.

## Implementation

Work from the existing R12 review implementation and create/update an isolated R12.1 review path:

`docs/website/review/r12-1/`

Do not overwrite R07.2 staging.
Do not touch production/root deployment/CNAME.

Preserve centralized content/data architecture. The restored HERO copy and model descriptors must live in the appropriate centralized data/content layer, not be scattered through markup.

## QA

Review the complete page at minimum:

- 1366×768
- 1920×1080
- 390×844
- 430×932

Specifically verify:

- full HERO message is visible;
- no clipping/overlap;
- graphite tonal rhythm works across the whole page;
- contrast remains readable;
- configurator codes are clean and descriptors are visually separate;
- no horizontal overflow;
- mobile selector controls remain usable;
- no regression in the accepted R07.2 commercial sequence.

## Deliverable

Create:

`docs/website/R12_1_R12_CORRECTION_AND_MOMENTUM.md`

Set **R12.1 = REVIEW**.

Report:

1. preview URL;
2. exact files changed;
3. confirmation of the three owner corrections;
4. additional full-page refinements completed in this same pass;
5. desktop/mobile QA;
6. unresolved real-asset needs only (do not repeat resolved issues);
7. commit SHA.

Then STOP. Do not merge to staging or production.