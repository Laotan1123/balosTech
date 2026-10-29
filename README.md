# Balostech

Balostech is a Next.js storefront backed by a NestJS API and PostgreSQL database.
The backend handles products, bookings, swaps, uploads, orders, and payment
verification.

## Local development

1. Install PostgreSQL and create a database named `balostech`.
2. Configure and migrate the backend:

   ```powershell
   cd backend
   Copy-Item .env.example .env
   # Set DATABASE_URL and the local provider/admin/upload settings in .env.
   npm ci
   npx prisma migrate deploy
   npm run seed
   npm run start:dev
   ```

3. In a second terminal, install and start the storefront:

   ```powershell
   npm ci
   $env:NEXT_PUBLIC_API_BASE = "http://localhost:4000"
   $env:NEXT_PUBLIC_SITE_URL = "http://localhost:3000"
   npm run dev
   ```

Do not commit either `.env` file. See [DEPLOYMENT.md](./DEPLOYMENT.md) for
environment-variable definitions, production migrations, provider setup, and
health-check endpoints.

## Validation

```powershell
npm test
npm run lint
npm run build

cd backend
npm test -- --runInBand
npm run lint
npm run build
```

The backend database integration test runs when `RUN_DB_INTEGRATION=true` and a
migrated PostgreSQL database is available. The CI workflow starts PostgreSQL
and runs it automatically.

## Performance and search indexing

Product API responses are cached for 60 seconds. Product-backed pages render at
request time, so production builds do not depend on the API being available.
The app also provides page metadata, product structured data, and generated
`/sitemap.xml` and `/robots.txt` routes. Set `NEXT_PUBLIC_SITE_URL` to the real
canonical site origin in each deployment environment.
