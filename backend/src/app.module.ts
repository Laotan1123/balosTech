import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ProductsModule } from "./modules/products/products.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { SwapsModule } from "./modules/swaps/swaps.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { UploadModule } from "./modules/upload/upload.module";
import { AdminModule } from "./modules/admin/admin.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ThrottlerModule.forRoot([{ name: "default", ttl: 60_000, limit: 60 }]),
    ProductsModule,
    BookingsModule,
    SwapsModule,
    PaymentsModule,
    UploadModule,
    AdminModule,
    HealthModule
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
