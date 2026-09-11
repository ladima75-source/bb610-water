# BB610 WATER — ADMIN OPERATIONS R1

- **Admin v1 mode:** REVIEW / EXPORT
- **Admin path:** `docs/website/admin/review/v1/index.html`
- **Canonical commercial source:** `docs/website/staging/data/commercial.js`

## Change a price

1. Open WATER Admin v1.
2. Select the model on the left.
3. Edit `Без HMI` and/or `З HMI` in the required zone row.
4. Keep `APPROVED` only when both prices are approved numeric UAH values.
5. Review the buyer preview and validation messages.
6. Click `Зберегти зміни` to commit the change to the current review session and generate history entries.
7. Export the canonical payload/change-set. In current REVIEW/EXPORT mode this export must be applied through the repository/server workflow; browser edits do not persist after reload.

## Set `Ціна уточнюється`

For the model/zone row change price state to `Ціна уточнюється` (`PRICE_ON_REQUEST`). Numeric base/HMI values are cleared in the review editor. Public output maps this state to `Ціна уточнюється`.

Do not enter guessed prices. F1-P and F2-P are initially in this state for all zones.

## Hide / show a configuration

Toggle `Активна` on the model/zone row. The canonical contract exports row availability. When applied to staging data, the public dialogue configurator disables that unavailable model/zone path instead of showing a dead selection.

Model-level active/hidden status is edited through `Редагувати модель`.

## HMI pricing

Each commercial row has two option prices:
- `base` = without local HMI;
- `hmi` = with local HMI.

The buyer preview has an HMI toggle. The public configurator uses the same two values. HMI lower than base produces a warning and requires explicit confirmation in Admin review mode.

## Buyer preview

The preview uses the same model capabilities, zone description, UAH pricing state and HMI semantics as the public catalog contract. It is intended to catch commercial mistakes before export.

## Price history

After `Зберегти зміни`, every base/HMI price or price-state change creates a history entry with model, zone, option, old/new value, old/new state, timestamp and actor. Select `Історія` on a zone row to review entries. Normal Admin UI does not edit history.

Current review actor is `review-admin`. Production must use authenticated user identity.

## Unsaved changes

The admin visibly marks unsaved edits. `Скасувати зміни` restores the last review-session save. Switching model with unsaved changes asks for confirmation. Browser navigation/reload also receives unsaved-change protection.

## How changes reach the public site now

Current persistence mode is **REVIEW/EXPORT**, because the repository does not yet expose a safe authenticated write API for WATER Admin.

Workflow:
1. edit + validate + preview in Admin;
2. save inside the review session to generate history;
3. export full canonical payload and/or change-set;
4. authorized implementation step updates the canonical server/repository source;
5. public staging reads the generated adapter from that same source.

Do not use localStorage as production persistence.

## Required before production Admin deployment

- authenticated login/SSO or another approved project auth mechanism;
- authorization limiting catalog/pricing writes;
- server/API validation of the same schema;
- durable catalog + immutable price-history storage;
- authenticated actor in history;
- atomic save/version conflict handling;
- backup/rollback and audit access;
- no secrets in frontend source.