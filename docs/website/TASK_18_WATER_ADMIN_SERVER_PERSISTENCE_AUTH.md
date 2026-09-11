# BB610 WATER — TASK 18 / WATER ADMIN — SERVER PERSISTENCE + AUTH

- **Status:** ASSIGNED
- **Base:** current main after R17 Admin v1
- **Decision:** R17 Admin UX/function concept accepted. Do not redesign it without a concrete technical need.
- **Priority:** mandatory before production
- **Goal:** turn Admin v1 from REVIEW/EXPORT into a real server-persisted authenticated commercial-management system while preserving the single commercial truth and current public configurator behavior.
- **Live production WATER site:** DO NOT CHANGE in this task.

## 1. Preserve accepted Admin v1
Keep `MODEL → ZONE CONFIGURATION → OPTIONS → PRICE / AVAILABILITY`, 7 models, 3 zone configurations, base/HMI prices, APPROVED/PRICE_ON_REQUEST, active/hidden, buyer metadata/capabilities, preview, history UI and unsaved-change protection. No redesign unless backend integration exposes a concrete defect.

## 2. Real server persistence
Implement a real server/API persistence layer. No localStorage/browser-only JSON/repository commits/download payloads as primary persistence. Prefer existing project backend/runtime if available. Document selected architecture and rationale.

## 3. Canonical data and migration
Server persistence becomes canonical mutable commercial source. Cover models, zones, model×zone rows, base/HMI prices, price state, active state, metadata, capabilities, timestamps/effectiveFrom and catalog version. Initial migration must preserve current R17 exactly: 15 APPROVED, 6 PRICE_ON_REQUEST for F1-P/F2-P; no inferred prices and no F1-PH/F2-PH.

## 4. Durable storage
Use durable server storage appropriate to deployment. Require atomic writes, migrations, backup/export, unique model-zone keys, consistent timestamps and safe integer UAH representation. SQLite is acceptable for a guaranteed single persistent instance; PostgreSQL preferred if already available/multi-instance expected.

## 5. Authentication + authorization
Admin routes/API require authentication. No credentials in frontend/repo; secure hashes if local credentials; logout/session expiry; login brute-force protection; CSRF where applicable; secure cookies in HTTPS. Minimum roles: `viewer`, `editor`, `publisher/admin`. Server API enforces permissions. Provide secure first-admin bootstrap with no universal default password.

## 6. Draft / publish
Do not make every edit instantly public. Implement explicit `Published` and `Draft` catalog states:
1. edit;
2. validate;
3. save draft;
4. preview diff;
5. publish;
6. public commercial data changes atomically.
Admin clearly shows current state.

## 7. Publish diff
Before publish show model/zone, changed field, old published value/state and new draft value/state. Highlight prices, hidden/shown, APPROVED↔PRICE_ON_REQUEST and HMI price. Explicit confirmation required.

## 8. Immutable audit
Append immutable server audit events with id, actor, role, timestamp, action (`DRAFT_SAVE`, `PUBLISH`, `ROLLBACK`, etc.), catalog version, affected row/field, old/new values and optional reason. Normal UI cannot edit/delete audit.

## 9. Versioning / rollback
Each publish creates immutable catalog version. List versions with version, timestamp, actor, summary. Authorized rollback creates a NEW published version from historical snapshot, never rewrites history, and creates audit event.

## 10. Public commercial contract
Provide stable read-only public contract exposing buyer-needed data only. Preserve `PRICE_ON_REQUEST` → `Ціна уточнюється`, intentional hidden configurations, seven current model codes, three zone codes and HMI behavior. Public reads must remain safe during admin write failures.

## 11. Staging integration and failure fallback
Integrate canonical `docs/website/staging/` configurator with non-production public commercial endpoint/data. If API unavailable, never fabricate/zero prices or break configurator. Prefer last-known-good published snapshot/cache; otherwise safe `Ціна уточнюється`. Live production is not switched in TASK 18.

## 12. API capabilities
Equivalent endpoints/actions required: login/logout/session, get published catalog, get draft, save/validate draft, publish diff, publish, audit/history, versions, rollback, public published catalog. All writes server-validated.

## 13. Concurrency
Prevent silent overwrites via catalog version/ETag/optimistic locking or equivalent. Stale save/publish must return conflict and require refresh/review.

## 14. Secrets/config
Use environment variables/secure deployment config for DB, session secret, bootstrap/admin setup, origins/base URL and secure-cookie mode. Commit no real secrets.

## 15. Backup/recovery
Document/implement credible database/catalog backup, restore, published snapshot export and public-site continuity if Admin service is unavailable.

## 16. QA minimum
Test: unauth denied; login/logout/session; role permissions; exact 15+6 migration; draft does not change public; publish does; PRICE_ON_REQUEST; hide/show; HMI; server validation; audit actor/time; version creation; rollback as new version; concurrency conflict; public contract excludes internal fields; public fallback on API failure; no invented F1-P/F2-P prices; no legacy naming.

## 17. Deployment boundary
May prepare non-production environment/manifests. Do not replace live `water.bb610.com.ua`, change production DNS/CNAME, expose unauthenticated Admin or commit credentials. Production deployment is a separate owner-approved gate.

## 18. Documentation
Create:
- `docs/website/BB610_WATER_ADMIN_SERVER_ARCHITECTURE_R1.md`
- `docs/website/BB610_WATER_ADMIN_DEPLOYMENT_R1.md`
- `docs/website/BB610_WATER_ADMIN_BACKUP_RECOVERY_R1.md`
- `docs/website/R18_WATER_ADMIN_SERVER_PERSISTENCE_AUTH.md`

Update:
- `docs/website/BB610_WATER_ADMIN_OPERATIONS_R1.md`
- `docs/website/BB610_WATER_WEBSITE_COMPLETION_REGISTER.md`

Operations guide: login, price change, save draft, diff, publish, `Ціна уточнюється`, hide/show, history, rollback, server-unavailable behavior.

## 19. Deliverable / stop gate
Set **R18 = REVIEW** unless every server/auth/persistence requirement is actually implemented and tested in non-production. Report architecture, review/run instructions, storage, auth/roles, migration, draft/publish, audit/version/rollback, staging integration, API failure fallback, QA, remaining production blockers, register changes and final commit SHA. Then STOP. Do not deploy live production.