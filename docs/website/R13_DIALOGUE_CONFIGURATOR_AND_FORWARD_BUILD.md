# BB610 WATER — R13 DIALOGUE CONFIGURATOR + FORWARD BUILD

- **Revision:** R13
- **Status:** REVIEW
- **Base:** R12.1 `ef738aaed05e83861caa419d198b17d1d21763f8`
- **Review path:** `docs/website/review/r13/`
- **Production:** NOT CHANGED
- **R07.2 staging:** NOT CHANGED

## Preview

`https://rawcdn.githack.com/ladima75-source/bb610-water/b28f268c43a44269ec05e706c83f50da48f52b33/docs/website/review/r13/index.html`

## Configurator restoration

Restored R07.2-style buyer dialogue:

1. irrigation only / 1 fertigation channel / 2 fertigation channels;
2. pH yes/no;
3. EC monitoring yes/no;
4. Z4(8) / Z8(12) / Z12(16);
5. local HMI toggle.

Technical code is resolved from requirements rather than selected directly.

Mapping verified in implementation:

- irrigation only → `I`;
- 1 channel → `F1`;
- 1 channel + pH → `F1-P`;
- 1 channel + pH + EC monitoring → `F1-PE`;
- 2 channels → `F2`;
- 2 channels + pH → `F2-P`;
- 2 channels + pH + EC monitoring → `F2-PE`.

Invalid states are prevented: irrigation-only hides pH/EC; EC selection forces pH because PE includes pH. No `I-P`, `I-PE`, `F1-EC`, `F2-EC`, `F1-PH`, `F2-PH` are generated.

Prices remain sourced from inherited centralized R12.1 commercial data. Missing approved F1-P/F2-P prices remain `Ціна уточнюється`.

## Forward-build completed

- anchor flow retained with sticky-header offset;
- mobile menu closes after navigation;
- resolved configuration is carried to the final contact block and generated request;
- buyer-visible repository/debug notes removed from configurator;
- honest PULS/hardware asset slots retained without fake UI;
- dialogue controls stack cleanly on mobile and keep obvious selected states.

## QA targets

Source/layout review completed for 1366×768, 1920×1080, 390×844 and 430×932. Configurator is a vertical dialogue at mobile widths, result follows naturally, and no control requires hover or horizontal scrolling.

## Page readiness ledger

| Section | State |
|---|---|
| HERO | UI READY |
| WORKDAY | CONTENT READY / UI READY |
| ROUTINE | CONTENT READY / UI READY |
| ZONES | CONTENT READY / UI READY |
| ACTUAL VOLUME | CONTENT READY / UI READY |
| FERTIGATION | CONTENT READY / UI READY |
| pH / EC | CONTENT READY / UI READY |
| DEVIATIONS | CONTENT READY / UI READY |
| BB610 PULS | ASSET BLOCKED |
| CONTROL / HYDRAULIC / ZONE | ASSET BLOCKED |
| INSTALLATION | CONTENT READY; optional context asset blocked |
| CONFIGURATOR | CONTENT READY / UI READY; F1-P/F2-P price rows DATA BLOCKED |
| CONTACT | CONTENT READY / UI READY |

## Remaining blockers

**ASSET:** approved real BB610 PULS screenshots; approved presentation-quality CONTROL/HYDRAULIC/ZONE media; optional agricultural/context photography.

**DATA:** approved prices for F1-P and F2-P combinations.

Implementation commit before TASK 13.1 continuation: `b28f268c43a44269ec05e706c83f50da48f52b33`.
