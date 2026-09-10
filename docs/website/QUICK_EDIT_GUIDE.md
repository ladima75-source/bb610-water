# BB610 WATER — QUICK EDIT GUIDE

- **Scope:** staging/review site before Water Admin
- **Status:** WORKING GUIDE
- **Date:** 2026-09-10

## Purpose

The staging implementation intentionally keeps editable copy, CTA labels, commercial data and asset references outside page components. A competent developer should be able to change a slogan, CTA or commercial value in one source location and see the change everywhere that source is rendered.

## Staging path

`docs/website/staging/`

The production root `index.html`, `css/final-original.css`, `js/final-original.js`, `CNAME` and production deployment are not part of this staging implementation.

## 1. HERO / slogans / section copy / CTA

Edit:

`docs/website/staging/data/content.js`

Important sections:

- `meta.title`, `meta.description` — staging page metadata;
- `navigation[]` — nav labels/destinations;
- `cta.primary`, `cta.secondary`, `cta.contact` — shared CTA labels/destinations;
- `hero.*` — eyebrow, headline, subheadline, explanatory proof labels/formula;
- `mechanism.*` — section title/explanation/steps;
- `puls.*` — PULS headings, copy, caption and callout labels;
- `ownerValue.*` — owner/manager value copy;
- `architecture.*` — WATER hierarchy explanations;
- `configurator.*` — selector labels/disclaimer;
- `contact.*` — lead form labels/copy;
- `footer.*` — staging footer.

Key marketing strings are explicitly WORKING COPY and are not frozen.

### Example: change HERO headline once

Change only:

```js
hero: {
  headline: "Новий робочий заголовок",
  ...
}
```

Do **not** edit `index.html` or `app.js` for a copy-only change.

### Example: change primary CTA once

Change only:

```js
cta: {
  primary: { label: "Новий текст CTA", href: "#configurator" },
  ...
}
```

All elements marked with the shared primary CTA render from that object.

## 2. Versions / zones / prices / HMI

Edit:

`docs/website/staging/data/commercial.js`

Data shape is Admin-ready:

- `versions[]` — authoritative product versions and descriptions/features;
- `zones[]` — authoritative zone configurations;
- `hmi` — HMI global display/state metadata;
- `combinations["VERSION|ZONE"]` — combination-specific commercial state and no-HMI / with-HMI prices.

Frozen public versions currently used:

`I / F1 / F1-P / F1-PE / F2 / F2-P / F2-PE`

Frozen zones:

`Z4(8) / Z8(12) / Z12(16)`

### Important pricing rule

The current repository production table contains legacy naming (`F1-PH`, `F2-PH`, etc.). Task 05 does not authorize silently renaming legacy commercial rows.

Therefore:

- exact-name/currently mappable rows use repository price pairs;
- `F1-P` and `F2-P` remain `null` until commercial confirmation;
- UI displays `Ціна уточнюється` for a `null` price;
- do not invent values in HTML or JS components.

When commercial confirmation arrives, update only the affected combination object, for example:

```js
"F1-P|Z8(12)": {
  noHmi: 000,
  withHmi: 000,
  status: "confirmed"
}
```

Desktop and mobile consume the same object.

## 3. PULS / engineering / future photography assets

Edit:

`docs/website/staging/data/assets.js`

Registry areas:

- `puls.desktop` — current real repository PULS/SCADA evidence asset;
- `puls.mobile` — current mobile interface asset;
- `engineering.CONTROL`;
- `engineering.HYDRAULIC`;
- `engineering.ZONE`;
- `proofNeeded` — explicit evidence gaps.

To replace an engineering visualization with an approved serial photo later, change the referenced path and alt/label in `assets.js`; page structure does not need to change.

Do not modify the production asset files merely to update staging.

## 4. Layout / visual changes

Edit only when needed:

`docs/website/staging/styles.css`

The visual base is A — Precision Instrument, with larger PULS evidence treatment from B and clearer WATER architecture treatment from C.

Copy-only and commercial-data-only edits should normally require **no CSS change**.

## 5. Rendering / interaction logic

`docs/website/staging/app.js`

This file reads `BB610_CONTENT`, `BB610_COMMERCIAL` and `BB610_ASSETS` and renders the page.

Change it only for behavior/component logic — not for normal content edits.

Current behavior includes:

- mobile navigation;
- shared CTA rendering;
- content section rendering;
- version/zone/HMI selector;
- resolved configuration and price state;
- lead context inheritance from current selection;
- staging-only lead text generation/copy without fake backend success.

## 6. HTML shell

`docs/website/staging/index.html`

This is the semantic component shell. It intentionally contains very little editable marketing/commercial text.

Normal slogan, CTA, price or product-description edits should not touch this file.

## 7. Future Water Admin mapping

The current split is designed so a future Admin/API can replace the static source while public components remain conceptually unchanged:

- `content.js` → content records/API;
- `commercial.js` → versions, zones, configuration prices, HMI states/revisions;
- `assets.js` → media records/library;
- `app.js` → public rendering logic consuming the normalized data.

Full Admin/backend is intentionally outside Task 05.
