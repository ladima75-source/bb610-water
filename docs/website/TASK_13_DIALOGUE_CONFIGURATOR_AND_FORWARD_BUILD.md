# BB610 WATER — TASK 13 / DIALOGUE CONFIGURATOR + FORWARD BUILD

- **Status:** ASSIGNED
- **Base:** R12.1 review commit `ef738aaed05e83861caa419d198b17d1d21763f8`
- **Reference for configurator UX:** accepted R07.2 commit `687cab5c918056450504270c7ed85e667abf75ce`, section `#configurator`
- **Goal:** restore the accepted dialogue-style configurator and then move forward into completion work; do not spend another cycle reworking already accepted sections
- **Production:** DO NOT CHANGE

## 1. Mandatory configurator restoration

The owner explicitly wants the configurator interaction shown in R07.2 back.

Restore the **question-and-answer dialogue**, not a flat seven-model picker.

The user should choose requirements in plain language and the system should resolve the technical model code.

### Step 1

**Потрібен тільки полив чи також підживлення?**

Choices:

- **Тільки полив**  
  `без фертигації`

- **Полив + підживлення**  
  `1 канал фертигації`

- **Полив + підживлення**  
  `2 канали фертигації`

### Step 2

**Потрібне керування pH?**

- `Ні`
- `Так`

For irrigation-only `I`, do not offer an impossible P/PE derivative; resolve product truth cleanly in UI.

### Step 3

**Потрібен моніторинг EC?**

- `Ні`
- `Так`

EC remains monitoring, not automatic closed-loop EC correction.

If product logic requires pH for PE, prevent invalid combinations and explain this in buyer language rather than exposing an internal validation error.

### Step 4

**Скільки зон потрібно зараз?**

- **Z4(8)** — `4 базові зони, розширення до 8`
- **Z8(12)** — `8 базових зон, розширення до 12`
- **Z12(16)** — `12 базових зон, розширення до 16`

### Step 5

**Потрібна локальна HMI?**

- checkbox/toggle `Додати HMI`

## 2. Result panel

Keep the R07.2 principle: requirements on the left, resolved technical configuration on the right.

The result is a consequence of the dialogue, not the first thing the customer has to understand.

Example:

**ВАША КОНФІГУРАЦІЯ**

`BB610 WATER F1-P / Z8(12)`

Then a plain-language summary, e.g.:

`8 зон зараз, розширення до 12 · 1 канал фертигації · керування pH`

Show HMI separately if selected.

Price must come only from centralized commercial data. If a valid configuration has no approved price, show `Ціна уточнюється`; never invent a number.

Remove all buyer-visible repository/debug/internal notes such as legacy-row comments or data-layer explanations.

CTA:

**ОБГОВОРИТИ ЦЮ КОНФІГУРАЦІЮ**

Carry the resolved configuration into the contact request.

## 3. Technical resolution logic

The active model family remains exactly:

- `I`
- `F1`
- `F1-P`
- `F1-PE`
- `F2`
- `F2-P`
- `F2-PE`

The buyer does not need to choose among seven cryptic codes manually.

Resolve:

- irrigation only → `I`;
- 1 fert channel, no pH/EC → `F1`;
- 1 fert channel + pH, no EC → `F1-P`;
- 1 fert channel + pH + EC monitoring → `F1-PE`;
- 2 fert channels, no pH/EC → `F2`;
- 2 fert channels + pH, no EC → `F2-P`;
- 2 fert channels + pH + EC monitoring → `F2-PE`.

Do not create `I-P`, `I-PE`, `F1-EC`, `F2-EC`, `F1-PH`, `F2-PH`.

## 4. Preserve R12.1 improvements

Do not undo the accepted direction from R12.1:

- restored full HERO message;
- graphite tonal system;
- R07.2 information architecture;
- WORKDAY high on page;
- current product truth;
- centralized content/commercial data;
- responsive work;
- no fake PULS/equipment assets.

Only the configurator interaction is explicitly restored from R07.2.

## 5. Forward-build requirement — no more standing still

This task must also move the project toward a shippable site.

After restoring the configurator, perform the following completion work in the SAME pass:

### A. Navigation / anchors

Verify every current header/menu CTA lands on the correct section and the sticky header does not obscure section headings.

### B. Contact handoff

When the user clicks the configurator CTA, prefill/pass at least the resolved configuration string to the final contact area. The customer should not have to retype the model.

### C. Commercial cleanup

Remove remaining buyer-visible implementation/review language, placeholders labels that read like developer notes, English debug fragments, and internal terminology not intended for the customer. Honest missing-image states may remain, but they must look deliberate and commercial.

### D. Interaction QA

Verify all interactive parts already present on the page:

- HERO irrigation block interaction/state;
- named zone selector;
- actual-volume example;
- deviation state where interactive;
- configurator dialogue;
- HMI option;
- contact handoff.

### E. Mobile completion

At `390×844` and `430×932`, the configurator must remain a dialogue, not collapse into an unreadable grid. Result panel follows questions naturally. Touch targets and selected states must be obvious.

### F. Page readiness ledger

In the R13 report, classify every major section as one of:

- `CONTENT READY`
- `UI READY`
- `ASSET BLOCKED`
- `DATA BLOCKED`

This is required so the next task attacks remaining blockers in one batch instead of revisiting accepted work.

## 6. Asset blockers

Do not stop R13 because real media are missing. Keep centralized asset slots for:

- agricultural/HERO imagery if still required;
- real BB610 PULS screenshots;
- CONTROL;
- HYDRAULIC;
- ZONE;
- installation/context photography.

No fake real-world installation imagery.

## 7. Implementation

Create/update isolated review path:

`docs/website/review/r13/`

Base it on R12.1. Do not overwrite R07.2 staging. Do not touch production/CNAME/root production files.

Keep configuration mapping, prices, availability and copy centralized; do not duplicate commercial logic in markup.

## 8. QA

Check complete page at minimum:

- 1366×768
- 1920×1080
- 390×844
- 430×932

Explicitly verify the configurator combinations above and invalid-state prevention.

## 9. Deliverable

Create:

`docs/website/R13_DIALOGUE_CONFIGURATOR_AND_FORWARD_BUILD.md`

Set **R13 = REVIEW**.

Report:

1. preview URL;
2. configurator restoration summary;
3. mapping tests for I/F1/F1-P/F1-PE/F2/F2-P/F2-PE;
4. forward-build work completed;
5. desktop/mobile QA;
6. page readiness ledger by major section;
7. remaining blockers grouped only as ASSET or DATA;
8. commit SHA.

Then STOP. Do not merge to staging or production.