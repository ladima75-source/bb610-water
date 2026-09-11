# BB610 WATER — ADMIN DATA MODEL R1

- **Status:** REVIEW
- **Canonical runtime source:** `docs/website/staging/data/commercial.js`
- **Schema:** `BB610_COMMERCIAL_CATALOG` v1.0
- **Hierarchy:** `MODEL → ZONE → OPTIONS → PRICE / AVAILABILITY`

## 1. Model

Each model contains:
- `id`: `I`, `F1`, `F1-P`, `F1-PE`, `F2`, `F2-P`, `F2-PE`;
- `name`: buyer-facing name;
- `description`: buyer-facing short description;
- `active`;
- `sort`;
- `capabilities.irrigation`;
- `capabilities.fertigationChannels` (`0/1/2`);
- `capabilities.phManagement`;
- `capabilities.ecMonitoring`;
- `internalNote` (never exposed intentionally to buyer UI).

## 2. Zone

Each zone contains:
- `id`: `Z4(8)`, `Z8(12)`, `Z12(16)`;
- `installed`;
- `max`;
- `description`;
- `active`;
- `sort`.

## 3. Commercial row

One row exists for every model × zone combination. A row is not an independent product card.

Fields:
- `modelId`;
- `zoneId`;
- `active`;
- `priceState`: `APPROVED` or `PRICE_ON_REQUEST`;
- `prices.base`: integer UAH or `null`;
- `prices.hmi`: integer UAH or `null`;
- `currency`: `UAH`;
- `buyerNote`;
- `updatedAt`;
- `effectiveFrom` (`null` until future-dated pricing is used).

### Validation
- price is a non-negative integer UAH;
- `APPROVED` requires both base and HMI numeric values;
- `PRICE_ON_REQUEST` may contain no numeric values and publicly maps to `Ціна уточнюється`;
- HMI lower than base triggers explicit warning/confirmation;
- inactive row maps to public availability=false.

## 4. Options

v1 contains `options.hmi`. The option container is intentionally extensible: future options can be added without multiplying model cards.

## 5. Price history

`history[]` entries are immutable in normal Admin UI and contain:
- `modelId`;
- `zoneId`;
- `option`: `base` or `hmi`;
- `oldValue` / `newValue`;
- `oldState` / `newState`;
- `timestamp`;
- `actor`.

Review mode actor is `review-admin`. Production must replace this with the authenticated actor identity.

## 6. Public adapter

The same canonical file derives `window.R121_COMMERCIAL` for the current public staging configurator. The adapter converts integer UAH into the existing public `тис. грн` values, emits `availability`, and converts `PRICE_ON_REQUEST` to null price values consumed as `Ціна уточнюється`.

Therefore there is one manually maintained price source, not a second public price table.

## 7. Persistence boundary

Current mode: **REVIEW/EXPORT**.

The isolated admin clones the canonical catalog into an in-browser review session, validates/edits it, generates history, and exports the full canonical payload or change-set. It does **not** claim persistent browser writes.

Production requirement: authenticated server/API persistence that validates the same schema, stores catalog/history transactionally, identifies the actor, and produces/serves the public serialized contract.