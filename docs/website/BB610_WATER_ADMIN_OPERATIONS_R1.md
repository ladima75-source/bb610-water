# BB610 WATER — ADMIN OPERATIONS R1

- **Admin UX:** R17 PASS, preserved in R18
- **Review Admin path:** `docs/website/admin/review/v2/`
- **Server implementation:** `services/water-admin-api/`
- **Persistence:** PostgreSQL + immutable versions/audit
- **Live production WATER site:** unchanged

## Login / logout

1. Open the deployed/review Admin v2 URL.
2. Sign in with your named account.
3. Role is shown in the header/workspace.
4. Use `Вийти` to revoke the current bearer session immediately.
5. Tokens expire automatically according to server TTL.

Repeated invalid login attempts are throttled server-side. No password or token is stored in repository/frontend source.

## Roles

- `viewer` — view catalog, versions and audit only;
- `editor` — viewer + save draft versions;
- `admin` — editor + publish, rollback and user creation.

## Change a price

1. Select the model on the left.
2. Edit `Без HMI` and/or `З HMI` in the required zone row.
3. Keep `APPROVED` only when both prices are approved integer UAH values.
4. Review Buyer preview.
5. Click `Зберегти draft`.
6. Server validates and creates a new immutable draft version.
7. Public data does **not** change yet.

If another operator saved first, stale save is rejected and Admin must refresh/review.

## Set `Ціна уточнюється`

Change the row state to `PRICE_ON_REQUEST` / `Ціна уточнюється`.

Numeric base/HMI values are cleared by the editor. Public output maps this state to `Ціна уточнюється`.

Do not guess F1-P/F2-P prices.

## Hide / show

Toggle `Активна` on the model×zone row.

Model-level visibility is in `Редагувати модель`.

Hidden configuration remains in canonical history/data but public projection marks it unavailable. Dialogue configurator must not expose a dead selection path.

## HMI

Each row has:
- `base` — without local HMI;
- `hmi` — with local HMI.

HMI lower than base causes warning. Server requires explicit confirmation before draft save/publish proceeds.

## Buyer preview

Buyer preview uses the same model capabilities, zone semantics and price state as canonical data. It is for review before draft save/publish.

## Save draft

`Зберегти draft` creates a new immutable catalog version.

Every changed price/state/availability/model/zone field receives an append-only server audit event with actor, role, timestamp, version and old/new data.

Draft save alone never changes `/public/commercial`.

## Publish diff and publish

Admin role only.

1. Save the draft first.
2. Click `Переглянути diff і опублікувати`.
3. Admin requests server `publish-diff` comparing current published snapshot with latest draft.
4. Review model/zone/field old → new changes.
5. Confirm publish.
6. Server checks that draft version has not changed since review.
7. Server creates a new immutable **published** version.
8. `/public/commercial` atomically switches to that published version.

No repository/source edit is required for the commercial data change once production cutover is approved.

## Price/history audit

Use `Історія` on a row or review the audit panel.

Normal Admin UI cannot edit/delete audit events.

Events include PRICE_CHANGE, AVAILABILITY_CHANGE, MODEL_CHANGE, ZONE_CHANGE, DRAFT_SAVE, PUBLISH and ROLLBACK, each with authenticated actor/role/time.

## Versions / rollback

Admin role only.

`Rollback + publish` does not overwrite an old version. It creates a new version copied from the selected historical snapshot and publishes the new version. The rollback itself is audited.

## Server unavailable behavior

Admin writes are unavailable when API is down; no browser-local write fallback is used.

Public staging behavior is different: it tries the published API snapshot, then browser last-known-good published snapshot, then the accepted source-controlled seed fallback. It never invents/zeros prices.

## Review environment

1. Create private `.env` from `services/water-admin-api/.env.example`.
2. Run `docker compose --env-file .env -f docker-compose.review.yml up --build` inside `services/water-admin-api/`.
3. Check `http://localhost:8080/health`.
4. From repository root run a static server on port 8000.
5. Open `http://localhost:8000/docs/website/admin/review/v2/`.

## Before production activation

Follow:
- `BB610_WATER_ADMIN_SERVER_ARCHITECTURE_R1.md`;
- `BB610_WATER_ADMIN_DEPLOYMENT_R1.md`;
- `BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`.

Production WATER public-site cutover remains a separate owner-approved gate.
