# BB610 WATER — TASK 17 / WATER ADMIN v1 — CATALOG + PRICING

- **Status:** ASSIGNED
- **Website baseline:** R16 `PASS / WORKING BASE`, commit `ee7945f8baaf4196598347b544f188c452117ae9`
- **Priority:** 1 — mandatory before production
- **Goal:** build a practical BB610 WATER Admin v1 for product nomenclature, configuration availability and pricing so routine commercial changes do not require editing website source code
- **Production:** DO NOT CHANGE

## 1. Product principle

Do NOT build 21 unrelated product cards.

The commercial model is hierarchical:

`MODEL → ZONE CONFIGURATION → OPTIONS → PRICE / AVAILABILITY`

Models:
- `I`
- `F1`
- `F1-P`
- `F1-PE`
- `F2`
- `F2-P`
- `F2-PE`

Zone configurations:
- `Z4(8)` — 4 installed, expansion to 8
- `Z8(12)` — 8 installed, expansion to 12
- `Z12(16)` — 12 installed, expansion to 16

Current option required in v1:
- HMI: `without HMI / with HMI`

The schema must be extensible for future options without redesigning the admin.

## 2. Scope of WATER Admin v1

Admin v1 must let an authorized operator manage, through UI:

### Product model
- technical code;
- buyer-facing name;
- short buyer-facing description;
- active/hidden status;
- sort/order;
- capability flags needed by the configurator: irrigation, fertigation channel count, pH management, EC monitoring;
- optional internal note not exposed to buyer.

### Zone configuration
- code;
- installed zones;
- maximum expandable zones;
- buyer-facing description;
- active/hidden status;
- sort/order.

### Model × zone commercial row
For each valid model/zone combination:
- active/available status;
- price without HMI;
- price with HMI;
- price state: `APPROVED` or `PRICE_ON_REQUEST`;
- currency: UAH;
- optional buyer-facing availability/note if required;
- `updatedAt`;
- optional `effectiveFrom` for future-safe pricing.

Do not invent prices for F1-P/F2-P. Their current state remains `PRICE_ON_REQUEST` until approved values are entered.

## 3. Admin UX

This is an operational B2B admin, not a developer JSON editor.

Preferred layout:

### Left/main model list
Rows/cards for the 7 model families with clean code + description + active state.

### Selected model workspace
Show the three zone rows together in a compact commercial matrix:

| Zone | Active | Without HMI | With HMI | Price state | Updated |

The operator should be able to update all three zone prices for one model without opening three separate product pages.

### Edit model
A focused edit panel/modal/drawer for buyer-facing description and capability metadata.

### Validation / unsaved state
- visibly mark unsaved edits;
- `Save changes` action;
- `Discard`/reset action;
- validation errors next to the field;
- no silent data loss when switching model with unsaved changes.

### Search/filter
At minimum:
- filter active/hidden;
- search by model code/name;
- optional filter `price missing / price on request`.

Mobile admin is NOT a priority for mass editing. Desktop/tablet first. On mobile it must remain viewable and safe, but full mass-edit optimization is not required.

## 4. Price entry rules

Prices are integer UAH amounts unless the current commercial contract explicitly supports decimals.

Validation:
- non-negative;
- numeric;
- HMI price may not accidentally be lower than without-HMI price without an explicit warning/confirmation;
- empty price + `APPROVED` is invalid;
- `PRICE_ON_REQUEST` may have no numeric price;
- hidden/disabled row must not accidentally appear in the public configurator.

Display formatted UAH in preview, but store numeric values cleanly.

## 5. Price history / audit trail

Required from v1.

Every saved price change must produce a history entry containing at minimum:
- model code;
- zone code;
- option (`base` or `HMI`);
- old value/state;
- new value/state;
- timestamp;
- actor identifier if authentication provides one; otherwise an explicit system/admin placeholder field designed for later auth integration.

Admin UI must provide a simple price-history view for the selected model/row.

Do not allow editing history records from the normal UI.

## 6. Preview before save

Before/while editing, show a buyer-facing preview of the resolved configuration, for example:

`BB610 WATER F1-PE / Z8(12)`

`8 зон зараз, розширення до 12 · 1 канал фертигації · керування pH · моніторинг EC`

`389 000 грн` or `Ціна уточнюється`

HMI selection must be previewable.

The preview uses the same formatting/product semantics as the public dialogue configurator, not a separate interpretation.

## 7. Single source of commercial truth

The current website uses centralized `docs/website/staging/data/commercial.js`.

TASK 17 must define and implement a clean data contract so Admin and public staging do not diverge.

Do NOT create a second manually maintained copy of prices.

Preferred architecture:
- canonical structured commercial data source;
- admin reads/writes that source through an explicit persistence/export mechanism appropriate to the current project architecture;
- staging public site consumes generated/serialized public commercial data from the same canonical model.

If the repository currently has no backend/auth/persistent storage suitable for safe browser writes, do NOT fake persistence with localStorage and call it production-ready.

In that case implement an honest **Admin v1 review workflow**:
1. edit in admin UI;
2. validate;
3. preview;
4. export/download the canonical commercial-data payload/change-set;
5. document the minimal server/API persistence layer required before production.

The report must explicitly state which persistence mode is implemented: `SERVER-PERSISTED` or `REVIEW/EXPORT`.

## 8. Public website compatibility

The current public dialogue configurator must continue to resolve:
- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

and:
- Z4(8)
- Z8(12)
- Z12(16)
- HMI yes/no.

Changing a commercial row in Admin data must not require editing HTML or configurator mapping logic.

`PRICE_ON_REQUEST` maps publicly to:
**Ціна уточнюється**

Inactive/hidden configurations must be handled intentionally in the configurator; do not leave a dead selection path.

## 9. Initial data migration

Seed Admin v1 from the current R16 approved centralized commercial data.

Preserve all approved current prices exactly.

For all F1-P and F2-P × Z4/Z8/Z12 rows:
- do not infer from neighboring models;
- do not copy legacy F1-PH/F2-PH;
- initialize as `PRICE_ON_REQUEST` unless a current approved value exists in the canonical source.

Create a migration/audit report showing old source row → new canonical row.

## 10. Authentication / safety boundary

Do not expose an unauthenticated production admin.

For review, an isolated non-production admin may be used.

Document the production requirement for authentication/authorization before deployment. If an existing project auth mechanism is available, reuse it rather than inventing another login system.

No secrets/tokens/passwords in frontend source or repository.

## 11. Visual system

Admin should inherit BB610 WATER visual tokens enough to feel like the same product family:
- graphite environment;
- WATER cyan primary action/selection;
- green success only;
- amber warning;
- red destructive/error;
- same typography family and basic spacing/radius language.

But prioritize dense operational clarity over marketing-page presentation.

## 12. Implementation location

Create an isolated review implementation, suggested:

`docs/website/admin/review/v1/`

or, if the repository already has a better admin application structure, use that and document why.

Do not alter production website deployment in TASK 17.

Do not make the public staging dependent on an unfinished admin runtime.

## 13. QA scenarios

At minimum test/document:

1. open all 7 models;
2. inspect/edit all 3 zone rows;
3. toggle active/hidden;
4. approved numeric price save/validation;
5. price-on-request state;
6. HMI price;
7. warning for HMI price below base;
8. unsaved-change protection;
9. buyer preview;
10. history entry generation;
11. export/persistence round trip;
12. public-data generation/compatibility;
13. F1-P/F2-P remain without invented prices;
14. no legacy F1-PH/F2-PH naming leaks;
15. desktop 1366/1920 and tablet 1024 layout;
16. mobile safe/read-only-ish behavior at ~390px.

## 14. Documentation

Create:
- `docs/website/BB610_WATER_ADMIN_DATA_MODEL_R1.md`
- `docs/website/BB610_WATER_ADMIN_OPERATIONS_R1.md`
- `docs/website/R17_WATER_ADMIN_V1.md`

The operations document must explain in plain language:
- how owner/admin changes a price;
- how to set `Ціна уточнюється`;
- how to hide/show a configuration;
- how HMI pricing works;
- how to view price history;
- how changes reach the public site in the implemented persistence mode.

## 15. Completion register update

Update `docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md` after implementation.

Admin/catalog/pricing must become an explicit production requirement until persistence/auth integration is genuinely complete.

Do not remove the PULS screenshot blocker.

## 16. Deliverable / stop gate

Set **R17 = REVIEW**.

Report:
1. admin preview URL/path;
2. architecture/persistence mode;
3. canonical data model path;
4. current-data migration result;
5. price-history implementation;
6. public configurator compatibility result;
7. QA results;
8. production auth/persistence blockers if any;
9. completion-register update;
10. final commit SHA.

Then STOP. Do not deploy Admin to production and do not change the live WATER site.