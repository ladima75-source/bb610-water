# BB610 WATER — R22 EXTERNAL REVIEW STAGING

**Status:** DEPLOYMENT PREP / OWNER-APPROVED LIVE VISUAL REVIEW  
**Target:** `https://water.bb610.com.ua`  
**Source:** R21 `1043cc8693ef114dfa665eb9fa35cd89d1923783`  
**Publishing:** existing GitHub Pages repository `ladima75-source/bb610-water`

## Owner decision

The previous `review.water.bb610.com.ua` plan is cancelled. Existing `water.bb610.com.ua` is explicitly approved as the live visual-review environment.

## Existing public state / rollback

Pre-deployment Pages/main rollback commit:

`2d4f18f3fdab5665ff64d02a776720064c32f244`

The existing custom-domain declaration is retained unchanged:

`CNAME = water.bb610.com.ua`

Rollback is a Git ref rollback/revert to the pre-deployment commit. No DNS, VPS Nginx, Admin/API/PostgreSQL or Market state is part of this deployment.

## Deployment model

- R21 canonical site remains `docs/website/staging/`.
- GitHub Pages continues publishing from the existing repository/main source.
- Root `index.html` is a launcher for the canonical staging tree using `<base href="/docs/website/staging/">` so the browser stays on `https://water.bb610.com.ua/` while all R21 relative assets resolve from their canonical repository paths.
- No public API endpoint is configured; R21 source-controlled commercial fallback remains active.
- No PULS screenshots, hero photography or connection scheme are added by R22.
- F1-P/F2-P remain `PRICE_ON_REQUEST`.

## Isolation

R22 does not change:

- `admin.water.bb610.com.ua`;
- `api.water.bb610.com.ua`;
- WATER Admin/PostgreSQL/Docker;
- BB610 Market / `api.market.bb610.com.ua`;
- PLC/SCADA;
- DNS records.

## Validation gate

After Pages publication, validate externally in a real browser:

- HTTPS root `https://water.bb610.com.ua/`;
- desktop/mobile rendering;
- CSS/JS/assets;
- navigation/mobile menu;
- configurator and `PRICE_ON_REQUEST` behavior;
- source fallback commercial data;
- no console/JS errors or broken images/resources;
- no localhost/127.0.0.1 in public runtime;
- Admin/API/Market endpoints remain reachable and unchanged.

No next visual-correction stage is authorized by R22.
