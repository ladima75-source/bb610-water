# BB610 WATER — OWNER/ADMIN PRODUCTION BOOTSTRAP POLICY R1

- **Status:** REQUIRED PRODUCTION GATE
- **Scope:** R20 production deployment package
- **Date:** 2026-09-11
- **Live deployment:** NOT PERFORMED

## 1. Purpose

The production BB610 WATER Admin must have one primary owner/admin account belonging to the BB610 WATER owner.

Review, preview, CI, test and acceptance credentials are not production user accounts. They must not be copied, promoted, reused or migrated into production.

## 2. Primary owner/admin identity

Before production bootstrap:

1. Agree the production login with the BB610 WATER owner.
2. Use that agreed login only for the primary owner/admin account.
3. Do not invent or preselect a generic login in repository files or review previews.
4. Do not treat any review/test identity as the owner identity.

The production deployment must stop if the owner login has not been agreed.

## 3. Password ownership and secrecy

The production owner/admin password is set separately by the owner.

The real password must never be placed in:

- Git repository;
- committed `.env` examples;
- frontend source or `config.js`;
- Markdown documentation;
- review/preview files;
- GitHub Actions variables or artifacts intended as evidence;
- issue/chat/deployment logs;
- shell history or command arguments where it can be exposed;
- screenshots.

Before production deployment no real owner password may be used in review or preview environments.

## 4. Secure bootstrap

Production bootstrap uses the accepted backend bootstrap mechanism with values supplied only on the production host or an approved secret manager.

Required production variables are written only to the protected runtime secret file:

`/etc/bb610-water-admin/admin.env`

with root ownership and mode `0600`.

The package placeholders remain placeholders:

- `BB610_ADMIN_BOOTSTRAP_EMAIL=REPLACE_WITH_OWNER_APPROVED_LOGIN`
- `BB610_ADMIN_BOOTSTRAP_PASSWORD=REPLACE_WITH_OWNER_SUPPLIED_ONE_TIME_SECRET`

The real values are never committed.

## 5. Bootstrap sequence

1. Owner approves the exact production login.
2. Owner supplies/sets the initial secret separately through the deployment secret channel.
3. Operator writes the login and one-time secret directly into protected production secret storage.
4. Start PostgreSQL + API.
5. Confirm that the owner/admin account is created.
6. Confirm successful owner login through HTTPS.
7. Owner sets/rotates to the intended production password through the accepted secure operational procedure.
8. Remove/clear both bootstrap variables from runtime configuration.
9. Restart the API.
10. Confirm owner login still works and bootstrap is no longer active.

The bootstrap secret is temporary and must not become the long-term owner password.

## 6. Review/test credential boundary

The following identities are test-only by definition:

- CI-generated bootstrap users;
- `r20-owner@example.test` and any similar `.test` identity;
- R18/R19 acceptance users;
- any review-preview credential or mock login used before production deployment.

They are not migrated to production and must not be treated as BB610 WATER users.

A fresh production database bootstrap must create the owner/admin from the owner-approved login, not from test credentials.

## 7. Logging rules

Deployment scripts and operators must not print the production owner password.

Validation evidence may record only non-secret facts such as:

- owner/admin account created: PASS;
- login verified: PASS;
- bootstrap cleared: PASS;
- password rotation completed: PASS.

Evidence must not contain the secret itself.

## 8. Production acceptance gate

Production Admin/API deployment is not accepted until all are true:

- [ ] owner-approved production login recorded in the private deployment record;
- [ ] no review/test account migrated or reused;
- [ ] owner/admin created via secure bootstrap;
- [ ] owner login verified over HTTPS;
- [ ] owner has set/rotated the production password separately;
- [ ] bootstrap email/login and bootstrap secret removed from runtime bootstrap configuration;
- [ ] API restarted after bootstrap removal;
- [ ] owner login reverified;
- [ ] no real password appears in repository/frontend/documentation/logs/review previews.

## 9. R20 effect

This policy is an addendum to `TASK_20_ADMIN_PRODUCTION_DEPLOYMENT_PREP.md` and to the accepted R20 package.

It does not change R17 Admin UX or R18/R19 backend behavior. It tightens only the production identity/bootstrap procedure.

R20 remains **PASS / READY FOR PRODUCTION DEPLOYMENT** because the accepted backend already supports secure named bootstrap and password rotation; actual owner credentials are intentionally deferred to the authorized production deployment and must remain outside source control.
