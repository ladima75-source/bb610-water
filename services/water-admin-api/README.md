# BB610 WATER Admin API

Production-grade persistence layer for the accepted WATER Admin v1 UX.

## Review run

1. Copy `.env.example` to a local `.env` outside Git and set strong values for `POSTGRES_PASSWORD`, `BB610_ADMIN_JWT_SECRET`, `BB610_ADMIN_BOOTSTRAP_EMAIL`, and `BB610_ADMIN_BOOTSTRAP_PASSWORD`.
2. From this directory run `docker compose --env-file .env -f docker-compose.review.yml up --build`.
3. API: `http://localhost:8080`; health: `GET /health`.
4. In repository root serve static files: `python -m http.server 8000`.
5. Open `http://localhost:8000/docs/website/admin/review/v2/` and sign in with the bootstrap account configured in `.env`.

## Security boundary

- No credentials or JWT secrets are committed.
- Passwords are stored only as Argon2 hashes.
- Access tokens are signed HS256 JWTs with configurable TTL and are kept only in browser memory by the review UI.
- Roles: `viewer`, `editor`, `admin`.
- Production must terminate TLS and place the API behind the intended host/reverse proxy before deployment.

## Persistence/versioning

- PostgreSQL is the intended persistent store.
- Every save creates a new immutable `catalog_versions` snapshot.
- Per-price, availability, model and zone changes are appended to `catalog_audit_events` with actor + timestamp + version.
- Rollback creates a new version copied from an old snapshot; it never mutates prior history.
- Publish creates a publication event pointing to an existing immutable version.
- `GET /public/commercial` returns only the explicitly published version projected to buyer-safe fields.

## Seed guarantee

`seed_catalog.json` is the accepted R17/R16 commercial state: 15 APPROVED model×zone rows and 6 PRICE_ON_REQUEST rows for F1-P/F2-P, unchanged.
