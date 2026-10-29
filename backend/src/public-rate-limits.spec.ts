import "reflect-metadata";

jest.mock("@nestjs/throttler", () => ({
  Throttle:
    (options: { default: { limit: number; ttl: number } }) =>
    (_target: object, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      Reflect.defineMetadata("THROTTLER:LIMITdefault", options.default.limit, descriptor.value);
      Reflect.defineMetadata("THROTTLER:TTLdefault", options.default.ttl, descriptor.value);
    }
}));

import { BookingsController } from "./modules/bookings/bookings.controller";
import { PaymentsController } from "./modules/payments/payments.controller";
import { SwapsController } from "./modules/swaps/swaps.controller";

const THROTTLE_LIMIT_METADATA_KEY = "THROTTLER:LIMITdefault";
const THROTTLE_TTL_METADATA_KEY = "THROTTLER:TTLdefault";

function expectRateLimit(handler: (...args: never[]) => unknown, limit: number) {
  expect(Reflect.getMetadata(THROTTLE_LIMIT_METADATA_KEY, handler)).toBe(limit);
  expect(Reflect.getMetadata(THROTTLE_TTL_METADATA_KEY, handler)).toBe(60_000);
}

describe("public endpoint rate limits", () => {
  it("limits booking and swap submissions to five requests per minute", () => {
    expectRateLimit(BookingsController.prototype.create, 5);
    expectRateLimit(SwapsController.prototype.create, 5);
  });

  it("limits payment initialization to five requests per minute", () => {
    expectRateLimit(PaymentsController.prototype.initPaystack, 5);
    expectRateLimit(PaymentsController.prototype.initFlutterwave, 5);
  });

  it("limits payment status verification to ten requests per minute", () => {
    expectRateLimit(PaymentsController.prototype.verifyOrder, 10);
  });
});
