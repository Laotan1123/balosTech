# Deployment and environment setup

## Frontend

Set these variables in the frontend deployment environment:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE` | Yes | Public origin of the backend API, without a trailing `/api` (for example `https://api.example.com`). |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical storefront origin used for metadata, canonical URLs, sitemap, and robots output. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible site domain; analytics remains off until a visitor opts in. |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN for client-side error reporting. |
| `SENTRY_DSN` | No | Server-side Sentry DSN for Next.js request errors. |

The product-backed pages render at request time, and their backend product
responses are cached for 60 seconds. Keep the API reachable from the frontend
server at runtime. A production build does not need to fetch products from the
API.

## Backend

Copy `backend/.env.example` to `backend/.env` for local work, or configure the
same variables in your deployment's secret/environment manager:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. URL-encode reserved characters in credentials. |
| `PORT` | No | API port; defaults to `4000`. |
| `FRONTEND_URL` | Yes for checkout | Storefront origin used in payment redirects. |
| `PAYSTACK_SECRET_KEY` | For Paystack | Server-side Paystack key. |
| `FLUTTERWAVE_SECRET_KEY` | For Flutterwave | Server-side Flutterwave key. |
| `FLUTTERWAVE_WEBHOOK_HASH` | For Flutterwave webhooks | Exact hash configured for the Flutterwave webhook. |
| `ADMIN_API_KEY` | For admin API routes | Long, unique random key. |
| `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET` | For uploads | Cloudflare R2/S3-compatible storage credentials and bucket. |
| `SENTRY_DSN` | No | Server-side Sentry DSN for backend 5xx errors. |

Never put backend credentials in `NEXT_PUBLIC_*` variables, commit `.env` files,
or reuse the example placeholders as production secrets.

## Database migrations

For a new local database, create it in PostgreSQL, set `DATABASE_URL`, and run:

```powershell
cd backend
npx prisma migrate deploy
npm run seed
```

Apply committed migrations in deployment/release steps with
`npx prisma migrate deploy` before rolling out API code that depends on the new
schema. Use `npx prisma migrate dev --name <description>` only to create new
development migrations. If an existing database was created outside Prisma
Migrate, baseline it before applying the initial migration.

## Health checks and monitoring

- Configure the platform liveness probe to call `GET /api/health/live`.
- Configure readiness to call `GET /api/health/ready`; it checks PostgreSQL and
  responds with HTTP 503 if the database is unavailable.
- The API uses Nest's built-in logger for startup and readiness errors. Sentry
  reports backend and Next.js errors only when the corresponding DSN is set.
  Configure the frontend client DSN as `NEXT_PUBLIC_SENTRY_DSN`, and configure
  server-side DSNs as `SENTRY_DSN` in the relevant deployment environments.
- Plausible analytics is not loaded until visitors opt in. Set
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to the domain registered with Plausible; visitors
  can change their choice from the privacy policy page.
- The in-memory API rate limiter is process-local. Use shared throttler storage
  when scaling to multiple backend instances.

## Payment provider setup

Configure provider credentials only on the backend. Register these public
webhook endpoints with the corresponding providers:

- Paystack: `/api/payments/paystack/webhook`
- Flutterwave: `/api/payments/flutterwave/webhook`

Set the Flutterwave webhook hash to the value configured in the provider
dashboard. Use provider test credentials and webhook tooling in staging, then
configure production credentials separately. Verify a successful test checkout
and webhook before enabling live payments.

## CI

The GitHub Actions workflow runs frontend tests, lint, and a production build,
and runs backend tests (including a PostgreSQL integration test), lint, and
build against a temporary PostgreSQL service.
