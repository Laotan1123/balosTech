# Project Improvement Checklist

Track progress here as improvements are implemented. Items are unchecked until
the work is completed and verified.

## 1. Replace mock behavior with working backend features

- [x] Connect the storefront to the backend product API.
- [x] Store products, bookings, and swaps in the database instead of placeholder
      arrays or mock data.
- [x] Persist pending orders with server-calculated totals and item price
      snapshots.
- [x] Complete checkout and payment initialization against the selected payment
      providers.
- [x] Add server-side payment webhook handling and verify payment outcomes
      before marking orders as paid.

## 2. Secure administration, forms, and uploads

- [x] Add authentication and authorization to the admin area and admin APIs.
- [x] Validate and sanitize incoming API data on the server.
- [x] Add upload authorization, file type and size limits, and safe storage
      configuration.
- [x] Add abuse protection to public forms with API rate limiting; evaluate CAPTCHA
      where appropriate.
- [x] Ensure sensitive configuration and payment secrets are only used on the
      server.

## 3. Improve user experience and accessibility

- [x] Add consistent loading, empty, validation, and error states to shopping,
      checkout, booking, swap, and upload flows.
- [x] Verify responsive behavior on mobile, tablet, and desktop.
- [x] Check keyboard navigation, focus visibility, labels, contrast, and
      screen-reader semantics.
- [x] Make checkout and form success/failure outcomes clear to users.

## 4. Expand automated testing

- [x] Add backend unit tests for products, bookings, swaps, uploads, and
      payments.
- [x] Add database integration coverage for catalog queries and validation
      tests for product query parameters.
- [ ] Add end-to-end tests for product browsing, cart/checkout, bookings, and
      swaps.
- [x] Configure continuous integration to run tests, lint, and production
      builds.

## 5. Complete launch readiness

- [x] Review page titles, descriptions, canonical URLs, structured data, and
      sitemap/robots behavior.
- [x] Add opt-in Plausible analytics with privacy controls.
- [x] Add configurable Sentry error reporting with data minimization.
- [x] Add health checks and operational logging.
- [x] Document deployment, environment variables, database migrations, and
      payment-provider setup.
