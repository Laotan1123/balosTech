import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { OrderStatus, PaymentProvider } from "@prisma/client";
import { createHmac } from "crypto";
import { PrismaService } from "../../prisma.service";
import { FulfillmentMethod } from "./payments.dto";
import { PaymentsService } from "./payments.service";

describe("PaymentsService", () => {
  const order = {
    id: "order-id",
    email: "user@example.com",
    phone: "+2348000000000",
    fulfillment: "pickup",
    address: null,
    city: null,
    totalKobo: 2500,
    status: OrderStatus.Pending,
    paymentProvider: PaymentProvider.Paystack,
    paymentReference: "balostech_ref",
    providerTransactionId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: null
  };
  let prisma: {
    product: { findMany: jest.Mock };
    order: { create: jest.Mock; findUnique: jest.Mock; updateMany: jest.Mock };
  };
  let service: PaymentsService;

  beforeEach(() => {
    prisma = {
      product: { findMany: jest.fn() },
      order: {
        create: jest.fn(),
        findUnique: jest.fn(),
        updateMany: jest.fn()
      }
    };
    service = new PaymentsService(prisma as unknown as PrismaService);
    process.env.PAYSTACK_SECRET_KEY = "test-paystack-secret";
    process.env.FLUTTERWAVE_SECRET_KEY = "test-flutterwave-secret";
    process.env.FLUTTERWAVE_WEBHOOK_HASH = "test-webhook-hash";
  });

  it("fails clearly when a provider secret is missing", async () => {
    delete process.env.PAYSTACK_SECRET_KEY;
    await expect(
      service.initPaystack({
        items: [{ productId: "product-1", quantity: 1 }],
        email: "user@example.com",
        phone: "+2348000000000",
        fulfillment: FulfillmentMethod.PICKUP
      })
    ).rejects.toThrow(InternalServerErrorException);
  });

  it("creates orders using database prices instead of client totals", async () => {
    prisma.product.findMany.mockResolvedValue([
      { id: "product-1", name: "Phone", priceKobo: 2500, inStock: true }
    ]);
    prisma.order.create.mockImplementation(async ({ data }) => ({
      ...order,
      ...data,
      id: "order-id",
      paymentReference: "balostech_ref"
    }));
    const fetch = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ status: true, data: { authorization_url: "https://pay.example/checkout" } }),
        { status: 200 }
      )
    );

    try {
      await service.initPaystack({
        items: [{ productId: "product-1", quantity: 1 }],
        email: "user@example.com",
        phone: "+2348000000000",
        fulfillment: FulfillmentMethod.PICKUP
      });
      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            totalKobo: 2500,
            items: {
              create: [
                expect.objectContaining({
                  productId: "product-1",
                  unitPriceKobo: 2500,
                  quantity: 1
                })
              ]
            }
          })
        })
      );
    } finally {
      fetch.mockRestore();
    }
  });

  it("marks a Paystack order paid only after signature and provider verification", async () => {
    prisma.order.findUnique.mockResolvedValue(order);
    const body = { event: "charge.success", data: { reference: order.paymentReference } };
    const rawBody = Buffer.from(JSON.stringify(body));
    const signature = createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest("hex");
    const fetch = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          status: true,
          data: {
            id: 123,
            status: "success",
            reference: order.paymentReference,
            amount: order.totalKobo,
            currency: "NGN"
          }
        }),
        { status: 200 }
      )
    );

    try {
      await expect(service.handlePaystackWebhook(rawBody, signature, body)).resolves.toEqual({
        received: true,
        processed: true
      });
      expect(prisma.order.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: order.id, status: OrderStatus.Pending },
          data: expect.objectContaining({ status: OrderStatus.Paid, providerTransactionId: "123" })
        })
      );
    } finally {
      fetch.mockRestore();
    }
  });

  it("rejects invalid Paystack webhook signatures", async () => {
    const body = { event: "charge.success", data: { reference: order.paymentReference } };
    await expect(
      service.handlePaystackWebhook(Buffer.from(JSON.stringify(body)), "bad-signature", body)
    ).rejects.toThrow(BadRequestException);
  });

  it("rejects invalid Flutterwave webhook hashes", async () => {
    await expect(service.handleFlutterwaveWebhook({}, "bad-hash")).rejects.toThrow(BadRequestException);
  });
});
