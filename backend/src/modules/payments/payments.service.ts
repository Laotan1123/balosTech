import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { OrderStatus, PaymentProvider } from "@prisma/client";
import { createHmac, timingSafeEqual } from "crypto";
import { PrismaService } from "../../prisma.service";
import { CreateCheckoutDto, FlutterwaveInitDto, PaystackInitDto } from "./payments.dto";

type ProviderResponse = {
  httpOk?: boolean;
  status?: string | boolean;
  message?: string;
  data?: {
    id?: number | string;
    status?: string;
    reference?: string;
    tx_ref?: string;
    authorization_url?: string;
    link?: string;
    amount?: number;
    currency?: string;
  };
};

export type WebhookPayload = {
  event?: string;
  data?: {
    id?: number | string;
    status?: string;
    reference?: string;
    tx_ref?: string;
  };
};

@Injectable()
export class PaymentsService {
  private readonly paystackBaseUrl = "https://api.paystack.co";
  private readonly flutterwaveBaseUrl = "https://api.flutterwave.com/v3";

  constructor(private readonly prisma: PrismaService) {}

  async initPaystack(dto: PaystackInitDto) {
    const secretKey = this.requireEnvironmentVariable("PAYSTACK_SECRET_KEY");
    const order = await this.createPendingOrder(dto, PaymentProvider.Paystack);
    const callbackUrl = this.checkoutCallbackUrl(order.id);

    const response = await fetch(`${this.paystackBaseUrl}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: order.totalKobo,
        email: order.email,
        reference: order.paymentReference,
        callback_url: callbackUrl,
        currency: "NGN"
      })
    });
    const payload = await this.readProviderResponse(response);
    if (!response.ok || payload.status !== true || !payload.data?.authorization_url) {
      await this.markInitializationFailed(order.id);
      throw new BadRequestException(payload.message ?? "Paystack initialization failed.");
    }

    return {
      orderId: order.id,
      checkoutUrl: payload.data.authorization_url,
      reference: order.paymentReference
    };
  }

  async initFlutterwave(dto: FlutterwaveInitDto) {
    const secretKey = this.requireEnvironmentVariable("FLUTTERWAVE_SECRET_KEY");
    const order = await this.createPendingOrder(dto, PaymentProvider.Flutterwave);
    const txRef = order.paymentReference;

    const response = await fetch(`${this.flutterwaveBaseUrl}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount: (order.totalKobo / 100).toFixed(2),
        currency: "NGN",
        redirect_url: this.checkoutCallbackUrl(order.id),
        customer: {
          email: order.email,
          phonenumber: order.phone,
          name: order.email.split("@")[0]
        },
        customizations: {
          title: "BaloTech Checkout",
          description: `Payment for order ${order.id}`
        }
      })
    });
    const payload = await this.readProviderResponse(response);
    if (!response.ok || payload.status !== "success" || !payload.data?.link) {
      await this.markInitializationFailed(order.id);
      throw new BadRequestException(payload.message ?? "Flutterwave initialization failed.");
    }

    return {
      orderId: order.id,
      checkoutUrl: payload.data.link,
      reference: txRef,
      sessionId: payload.data.id?.toString() ?? txRef
    };
  }

  async getOrderStatus(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true, totalKobo: true, createdAt: true, paidAt: true }
    });
    if (!order) {
      throw new NotFoundException("Order not found.");
    }
    return order;
  }

  async verifyOrder(orderId: string, transactionId?: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException("Order not found.");
    }
    if (order.status !== OrderStatus.Pending) {
      return this.getOrderStatus(orderId);
    }

    if (order.paymentProvider === PaymentProvider.Paystack) {
      const result = await this.verifyPaystackTransaction(
        this.requireEnvironmentVariable("PAYSTACK_SECRET_KEY"),
        order.paymentReference
      );
      const payment = result.data;
      const matchesOrder =
        result.httpOk &&
        payment?.reference === order.paymentReference &&
        payment.amount === order.totalKobo &&
        payment.currency === "NGN";
      if (matchesOrder && payment?.status === "success") {
        await this.markOrderPaid(order.id, payment.id?.toString());
      } else if (matchesOrder && ["failed", "abandoned"].includes(payment?.status ?? "")) {
        await this.markOrderFailed(order.id);
      }
    } else if (transactionId) {
      const result = await this.verifyFlutterwaveTransaction(
        this.requireEnvironmentVariable("FLUTTERWAVE_SECRET_KEY"),
        transactionId
      );
      const payment = result.data;
      const matchesOrder =
        result.httpOk &&
        payment?.tx_ref === order.paymentReference &&
        payment.currency === "NGN" &&
        Math.round(Number(payment.amount) * 100) === order.totalKobo;
      if (matchesOrder && payment?.status === "successful") {
        await this.markOrderPaid(order.id, transactionId);
      } else if (matchesOrder && payment?.status === "failed") {
        await this.markOrderFailed(order.id);
      }
    }

    return this.getOrderStatus(orderId);
  }

  async handlePaystackWebhook(rawBody: Buffer | undefined, signature: string | undefined, body: WebhookPayload) {
    const secretKey = this.requireEnvironmentVariable("PAYSTACK_SECRET_KEY");
    if (!signature || !rawBody) {
      throw new BadRequestException("Missing Paystack signature or raw request body.");
    }
    this.assertValidHmac("sha512", secretKey, rawBody, signature, "Invalid Paystack webhook signature.");

    if (body.event !== "charge.success" || !body.data?.reference) {
      return { received: true, processed: false };
    }

    const order = await this.findOrderByReference(body.data.reference, PaymentProvider.Paystack);
    const verification = await this.verifyPaystackTransaction(secretKey, order.paymentReference);
    const payment = verification.data;
    if (
      !verification.httpOk ||
      payment?.status !== "success" ||
      payment.reference !== order.paymentReference ||
      payment.amount !== order.totalKobo ||
      payment.currency !== "NGN"
    ) {
      return { received: true, processed: false };
    }

    await this.markOrderPaid(order.id, payment.id?.toString());
    return { received: true, processed: true };
  }

  async handleFlutterwaveWebhook(body: WebhookPayload, providedHash: string | undefined) {
    const webhookHash = this.requireEnvironmentVariable("FLUTTERWAVE_WEBHOOK_HASH");
    if (!providedHash || !this.constantTimeStringEqual(webhookHash, providedHash)) {
      throw new BadRequestException("Invalid Flutterwave webhook hash.");
    }

    const transactionId = body.data?.id;
    const reference = body.data?.tx_ref;
    if (!transactionId || !reference) {
      return { received: true, processed: false };
    }

    const order = await this.findOrderByReference(reference, PaymentProvider.Flutterwave);
    const verification = await this.verifyFlutterwaveTransaction(
      this.requireEnvironmentVariable("FLUTTERWAVE_SECRET_KEY"),
      transactionId
    );
    const payment = verification.data;
    if (
      !verification.httpOk ||
      payment?.status !== "successful" ||
      payment.tx_ref !== order.paymentReference ||
      payment.currency !== "NGN" ||
      Math.round(Number(payment.amount) * 100) !== order.totalKobo
    ) {
      return { received: true, processed: false };
    }

    await this.markOrderPaid(order.id, transactionId.toString());
    return { received: true, processed: true };
  }

  private async createPendingOrder(dto: CreateCheckoutDto, paymentProvider: PaymentProvider) {
    if (dto.fulfillment === "shipping" && (!dto.address?.trim() || !dto.city?.trim())) {
      throw new BadRequestException("Address and city are required for shipping orders.");
    }

    const quantities = new Map<string, number>();
    for (const item of dto.items) {
      quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
    }
    if ([...quantities.values()].some((quantity) => quantity > 20)) {
      throw new BadRequestException("A product quantity cannot exceed 20.");
    }
    const products = await this.prisma.product.findMany({
      where: { id: { in: [...quantities.keys()] }, inStock: true }
    });
    if (products.length !== quantities.size) {
      throw new BadRequestException("One or more requested products are unavailable.");
    }

    const items = products.map((product) => ({
      productId: product.id,
      productName: product.name,
      unitPriceKobo: product.priceKobo,
      quantity: quantities.get(product.id) ?? 0
    }));
    const totalKobo = items.reduce((total, item) => total + item.unitPriceKobo * item.quantity, 0);
    if (!Number.isSafeInteger(totalKobo) || totalKobo <= 0 || totalKobo > 2_147_483_647) {
      throw new BadRequestException("Order total is invalid.");
    }

    return this.prisma.order.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        fulfillment: dto.fulfillment,
        address: dto.fulfillment === "shipping" ? dto.address?.trim() : null,
        city: dto.fulfillment === "shipping" ? dto.city?.trim() : null,
        totalKobo,
        paymentProvider,
        paymentReference: `balostech_${crypto.randomUUID()}`,
        items: { create: items }
      }
    });
  }

  private async findOrderByReference(reference: string, provider: PaymentProvider) {
    const order = await this.prisma.order.findUnique({ where: { paymentReference: reference } });
    if (!order || order.paymentProvider !== provider) {
      throw new NotFoundException("Payment order not found.");
    }
    return order;
  }

  private async verifyPaystackTransaction(secretKey: string, reference: string) {
    const response = await fetch(
      `${this.paystackBaseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    return this.readProviderResponse(response);
  }

  private async verifyFlutterwaveTransaction(secretKey: string, transactionId: string | number) {
    const response = await fetch(
      `${this.flutterwaveBaseUrl}/transactions/${encodeURIComponent(transactionId.toString())}/verify`,
      { headers: { Authorization: `Bearer ${secretKey}`, Accept: "application/json" } }
    );
    return this.readProviderResponse(response);
  }

  private async markOrderPaid(orderId: string, transactionId?: string) {
    await this.prisma.order.updateMany({
      where: { id: orderId, status: OrderStatus.Pending },
      data: {
        status: OrderStatus.Paid,
        paidAt: new Date(),
        providerTransactionId: transactionId
      }
    });
  }

  private async markInitializationFailed(orderId: string) {
    await this.prisma.order.updateMany({
      where: { id: orderId, status: OrderStatus.Pending },
      data: { status: OrderStatus.Failed }
    });
  }

  private async markOrderFailed(orderId: string) {
    await this.prisma.order.updateMany({
      where: { id: orderId, status: OrderStatus.Pending },
      data: { status: OrderStatus.Failed }
    });
  }

  private checkoutCallbackUrl(orderId: string) {
    const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
    return `${frontendUrl.replace(/\/$/, "")}/checkout/success?orderId=${encodeURIComponent(orderId)}`;
  }

  private requireEnvironmentVariable(name: string) {
    const value = process.env[name];
    if (!value) {
      throw new InternalServerErrorException(`${name} is not configured.`);
    }
    return value;
  }

  private assertValidHmac(
    algorithm: "sha512",
    secret: string,
    rawBody: Buffer,
    signature: string,
    message: string
  ) {
    const expected = createHmac(algorithm, secret).update(rawBody).digest();
    const provided = Buffer.from(signature, "hex");
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
      throw new BadRequestException(message);
    }
  }

  private constantTimeStringEqual(expected: string, provided: string) {
    const expectedBuffer = Buffer.from(expected);
    const providedBuffer = Buffer.from(provided);
    return expectedBuffer.length === providedBuffer.length && timingSafeEqual(expectedBuffer, providedBuffer);
  }

  private async readProviderResponse(response: Response): Promise<ProviderResponse> {
    let payload: ProviderResponse;
    try {
      payload = (await response.json()) as ProviderResponse;
    } catch {
      throw new BadRequestException("Payment provider returned an invalid response.");
    }
    return { ...payload, httpOk: response.ok };
  }
}
