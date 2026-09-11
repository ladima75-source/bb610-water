# BB610 WATER — R15 PRICE MATRIX AUDIT

- **Status:** REVIEW SUPPORT
- **Date:** 2026-09-11
- **Source:** centralized accepted commercial data used by R12.1–R15
- **Currency:** тис. грн
- **Matrix:** 7 product versions × 3 zone configurations = 21 rows
- **HMI handling:** each row carries price without HMI / with HMI; R15 selector applies the appropriate column only after the user selects HMI.

## Audit result

| Model | Zone | Without HMI | With HMI | Status |
|---|---:|---:|---:|---|
| I | Z4(8) | 209 | 234 | APPROVED |
| I | Z8(12) | 229 | 254 | APPROVED |
| I | Z12(16) | 252 | 277 | APPROVED |
| F1 | Z4(8) | 244 | 269 | APPROVED |
| F1 | Z8(12) | 265 | 290 | APPROVED |
| F1 | Z12(16) | 287 | 312 | APPROVED |
| F1-P | Z4(8) | — | — | **MISSING** |
| F1-P | Z8(12) | — | — | **MISSING** |
| F1-P | Z12(16) | — | — | **MISSING** |
| F1-PE | Z4(8) | 337 | 362 | APPROVED |
| F1-PE | Z8(12) | 357 | 382 | APPROVED |
| F1-PE | Z12(16) | 380 | 405 | APPROVED |
| F2 | Z4(8) | 280 | 305 | APPROVED |
| F2 | Z8(12) | 300 | 325 | APPROVED |
| F2 | Z12(16) | 322 | 347 | APPROVED |
| F2-P | Z4(8) | — | — | **MISSING** |
| F2-P | Z8(12) | — | — | **MISSING** |
| F2-P | Z12(16) | — | — | **MISSING** |
| F2-PE | Z4(8) | 372 | 397 | APPROVED |
| F2-PE | Z8(12) | 392 | 417 | APPROVED |
| F2-PE | Z12(16) | 415 | 440 | APPROVED |

## Findings

- **15 of 21 rows APPROVED.**
- **6 of 21 rows MISSING:** every F1-P and F2-P zone row, both without and with HMI.
- No current centralized row is marked LEGACY-ONLY.
- No conflict was found inside the accepted centralized matrix used by the current review build.
- R15 does **not** infer F1-P/F2-P prices from obsolete F1-PH/F2-PH naming or from neighboring models.
- For the six missing rows the buyer UI correctly displays **`Ціна уточнюється`** for either HMI state.

## Exact data request

Approve both price columns for:
1. F1-P / Z4(8)
2. F1-P / Z8(12)
3. F1-P / Z12(16)
4. F2-P / Z4(8)
5. F2-P / Z8(12)
6. F2-P / Z12(16)

No other price data is required to preserve the current 7×3 configurator logic.

## Resolution-path QA

Dialogue mapping remains:
- irrigation only → `I`;
- 1 fert channel, no pH/EC → `F1`;
- 1 fert channel + pH → `F1-P`;
- 1 fert channel + pH + EC monitoring → `F1-PE`;
- 2 fert channels, no pH/EC → `F2`;
- 2 fert channels + pH → `F2-P`;
- 2 fert channels + pH + EC monitoring → `F2-PE`.

Invalid derivatives `I-P`, `I-PE`, `F1-EC`, `F2-EC`, `F1-PH`, `F2-PH` are not generated.
