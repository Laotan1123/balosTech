import { Body, Controller, Get, Headers, Param, Post, Query, RawBodyRequest, Req } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { Request } from "express";
import { PaymentsService, WebhookPayload } from "./payments.service";
import { FlutterwaveInitDto, PaystackInitDto } from "./payments.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("paystack/initialize")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  initPaystack(@Body() dto: PaystackInitDto) {
    return this.paymentsService.initPaystack(dto);
  }

  @Post("flutterwave/initialize")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  initFlutterwave(@Body() dto: FlutterwaveInitDto) {
    return this.paymentsService.initFlutterwave(dto);
  }

  @Get("orders/:orderId")
  getOrderStatus(@Param("orderId") orderId: string) {
    return this.paymentsService.getOrderStatus(orderId);
  }

  @Post("orders/:orderId/verify")
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  verifyOrder(@Param("orderId") orderId: string, @Query("transaction_id") transactionId?: string) {
    return this.paymentsService.verifyOrder(orderId, transactionId);
  }

  @Post("paystack/webhook")
  paystackWebhook(
    @Body() body: WebhookPayload,
    @Req() request: RawBodyRequest<Request>,
    @Headers("x-paystack-signature") signature?: string
  ) {
    return this.paymentsService.handlePaystackWebhook(request.rawBody, signature, body);
  }

  @Post("flutterwave/webhook")
  flutterwaveWebhook(@Body() body: WebhookPayload, @Headers("verif-hash") verifHash?: string) {
    return this.paymentsService.handleFlutterwaveWebhook(body, verifHash);
  }
}
