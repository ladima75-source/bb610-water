# BB610 WATER — R17 / WATER ADMIN v1

- **Status:** REVIEW
- **Date:** 2026-09-11
- **Base:** R16 `ee7945f8baaf4196598347b544f188c452117ae9`
- **Assignment:** `TASK_17_WATER_ADMIN_V1_CATALOG_PRICING.md`
- **Production:** NOT CHANGED
- **Persistence mode:** REVIEW/EXPORT
- **Authentication:** NOT IMPLEMENTED for production; isolated review admin only

## Admin preview

`docs/website/admin/review/v1/index.html`

The admin reads the same canonical commercial source used by public staging:
`docs/website/staging/data/commercial.js` → `window.BB610_COMMERCIAL_CATALOG`.

## Architecture

Admin v1 follows:
`MODEL → ZONE → OPTIONS → PRICE / AVAILABILITY`

It does not create 21 product cards. Seven model families are listed once; selecting a model opens all three zone commercial rows together.

Implemented:
- model buyer name/description;
- active/hidden model state;
- model sort/capability metadata;
- internal note field;
- three zone rows per model;
- row active/hidden state;
- base and HMI integer UAH price;
- `APPROVED` / `PRICE_ON_REQUEST`;
- updated timestamp;
- buyer preview;
- search + active/hidden + price-on-request filter;
- unsaved edit indicator;
- save/discard review-session actions;
- unsaved-change navigation protection;
- HMI-below-base warning + explicit confirmation;
- immutable normal-UI price-history view;
- canonical payload export;
- change-set export.

## Single commercial data contract

`staging/data/commercial.js` now defines the canonical `BB610_COMMERCIAL_CATALOG` v1.0 and derives the legacy-shaped `R121_COMMERCIAL` object consumed by the current public dialogue configurator.

This means prices are maintained in one source only. The public adapter additionally exposes row availability. Public staging disables unavailable zone rows for the resolved model and prevents an unavailable CTA path.

`PRICE_ON_REQUEST` maps publicly to `Ціна уточнюється`.

## R16 → Admin migration audit

All R16 approved prices were converted from the former `тис. грн` representation to clean integer UAH values. No price was inferred.

| Model | Zone | R16 no HMI / HMI | Canonical v1 | State |
|---|---|---:|---:|---|
| I | Z4(8) | 209 / 234 тис. | 209000 / 234000 UAH | APPROVED |
| I | Z8(12) | 229 / 254 тис. | 229000 / 254000 UAH | APPROVED |
| I | Z12(16) | 252 / 277 тис. | 252000 / 277000 UAH | APPROVED |
| F1 | Z4(8) | 244 / 269 тис. | 244000 / 269000 UAH | APPROVED |
| F1 | Z8(12) | 265 / 290 тис. | 265000 / 290000 UAH | APPROVED |
| F1 | Z12(16) | 287 / 312 тис. | 287000 / 312000 UAH | APPROVED |
| F1-P | Z4(8) | — / — | null / null | PRICE_ON_REQUEST |
| F1-P | Z8(12) | — / — | null / null | PRICE_ON_REQUEST |
| F1-P | Z12(16) | — / — | null / null | PRICE_ON_REQUEST |
| F1-PE | Z4(8) | 337 / 362 тис. | 337000 / 362000 UAH | APPROVED |
| F1-PE | Z8(12) | 357 / 382 тис. | 357000 / 382000 UAH | APPROVED |
| F1-PE | Z12(16) | 380 / 405 тис. | 380000 / 405000 UAH | APPROVED |
| F2 | Z4(8) | 280 / 305 тис. | 280000 / 305000 UAH | APPROVED |
| F2 | Z8(12) | 300 / 325 тис. | 300000 / 325000 UAH | APPROVED |
| F2 | Z12(16) | 322 / 347 тис. | 322000 / 347000 UAH | APPROVED |
| F2-P | Z4(8) | — / — | null / null | PRICE_ON_REQUEST |
| F2-P | Z8(12) | — / — | null / null | PRICE_ON_REQUEST |
| F2-P | Z12(16) | — / — | null / null | PRICE_ON_REQUEST |
| F2-PE | Z4(8) | 372 / 397 тис. | 372000 / 397000 UAH | APPROVED |
| F2-PE | Z8(12) | 392 / 417 тис. | 392000 / 417000 UAH | APPROVED |
| F2-PE | Z12(16) | 415 / 440 тис. | 415000 / 440000 UAH | APPROVED |

Result: **15 APPROVED + 6 PRICE_ON_REQUEST**. F1-P/F2-P remain unpriced exactly as required. No F1-PH/F2-PH legacy name appears in the canonical contract.

## Price history

When review-session `Save changes` is used, every changed base/HMI value or price state adds a history record containing:
- model;
- zone;
- option;
- old/new value;
- old/new state;
- timestamp;
- actor.

Review actor is explicitly `review-admin`. History cannot be edited through normal Admin UI. Export includes history/change data for later persistence integration.

## Buyer preview

The preview resolves model code, selected model capability semantics, zone description, HMI state and UAH formatting from the same working catalog object. `PRICE_ON_REQUEST` displays `Ціна уточнюється`.

## Persistence / authentication status

### Implemented
**REVIEW/EXPORT** only.

The browser does not write repository/server state and does not use localStorage as fake persistence. Changes live in the review session; full canonical payload and change-set can be exported.

### Required before production
- authenticated admin access;
- role/authorization for commercial writes;
- server/API schema validation;
- durable catalog storage;
- immutable price-history storage;
- authenticated actor identity;
- atomic/version-conflict-safe saves;
- backup/rollback;
- public serialization/cache invalidation after save.

No credentials/secrets were added to frontend source.

## QA scenarios

1. **7 models openable:** PASS — all seven seeded and selectable.
2. **3 zone rows/model:** PASS — matrix always renders the three canonical zones.
3. **active/hidden:** PASS — model editor + row toggle; canonical adapter emits availability.
4. **approved numeric validation:** PASS — APPROVED requires non-negative integer base/HMI.
5. **PRICE_ON_REQUEST:** PASS — permits null prices and maps public output to `Ціна уточнюється`.
6. **HMI:** PASS — separate base/HMI values and buyer-preview toggle.
7. **HMI below base:** PASS — warning plus explicit save confirmation.
8. **unsaved protection:** PASS — visual state, discard, model-switch confirmation, beforeunload guard.
9. **buyer preview:** PASS — same catalog semantics and formatted UAH.
10. **history generation:** PASS — save generates old/new option records; UI read-only.
11. **export round trip boundary:** PASS for export generation; server import is a production blocker and is not faked.
12. **public compatibility:** PASS — current `R121_COMMERCIAL` generated from canonical model; no HTML price edits required.
13. **F1-P/F2-P:** PASS — six rows remain PRICE_ON_REQUEST/null.
14. **legacy naming:** PASS — no F1-PH/F2-PH in canonical/admin UI.
15. **1366/1920/1024:** PASS by responsive desktop/tablet layout rules; matrix remains horizontally contained in table wrapper.
16. **~390 mobile safety:** PASS — admin becomes viewable/safe; mass edit remains desktop/tablet-oriented as required.

## Files

Created:
- `docs/website/admin/review/v1/index.html`
- `docs/website/admin/review/v1/styles.css`
- `docs/website/admin/review/v1/app.js`
- `docs/website/BB610_WATER_ADMIN_DATA_MODEL_R1.md`
- `docs/website/BB610_WATER_ADMIN_OPERATIONS_R1.md`
- `docs/website/R17_WATER_ADMIN_V1.md`

Changed:
- `docs/website/staging/data/commercial.js` — canonical catalog + public adapter;
- `docs/website/staging/app.js` — intentional inactive-row handling;
- `docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md` — production auth/persistence requirement added.

## Result

**R17 = REVIEW**

Admin is suitable for owner/operational review, but not production deployment until authenticated server persistence is implemented.