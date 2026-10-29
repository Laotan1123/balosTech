# Balostech API

NestJS API for products, bookings, swaps, uploads, orders, and payment
verification. PostgreSQL persistence is managed with Prisma.

## Local setup

```powershell
cd backend
Copy-Item .env.example .env
# Set DATABASE_URL and any provider, admin, or R2 values you plan to use.
npm ci
npx prisma migrate deploy
npm run seed
npm run start:dev
```

`DATABASE_URL` must point to a PostgreSQL database. Use `npx prisma migrate dev`
when creating a new development migration; use `npx prisma migrate deploy` to
apply committed migrations in a deployed environment. The initial migration is
for a new database. Existing databases with tables created outside Prisma
Migrate must be baselined before deploying it.

## Environment variables

See [.env.example](./.env.example) for the complete list:

- `DATABASE_URL` — PostgreSQL connection string.
- `PORT` — API listening port (defaults to `4000`).
- `FRONTEND_URL` — storefront origin used for payment redirects.
- `PAYSTACK_SECRET_KEY`, `FLUTTERWAVE_SECRET_KEY`,
  `FLUTTERWAVE_WEBHOOK_HASH` — server-side payment credentials.
- `ADMIN_API_KEY` — shared key for protected admin API routes.
- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET` —
  optional object-storage configuration for uploads.

Keep actual secrets in local or deployment secret storage; never commit them.
Replace every placeholder in `.env.example` before using a real provider.

## Operations

- `GET /api/health/live` reports whether the API process is responsive.
- `GET /api/health/ready` checks PostgreSQL and returns HTTP 503 if it is
  unavailable.
- Nest's logger reports startup and readiness failures. Configure an external
  error-monitoring provider in the deployment platform before production use.
- For multiple API instances, configure shared throttler storage; the default
  limiter is in-memory and per process.

## Tests and build

```powershell
npm test -- --runInBand
npm run build
```

The PostgreSQL integration test is enabled with
`RUN_DB_INTEGRATION=true`. It expects a database with committed migrations
already applied. The CI workflow provisions PostgreSQL and runs this test.
Run `npm run lint` from the repository root to lint both frontend and backend
TypeScript source.
