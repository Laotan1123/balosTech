CREATE TYPE "Condition" AS ENUM ('New', 'Refurbished', 'Used');
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Paid', 'Failed');
CREATE TYPE "PaymentProvider" AS ENUM ('Paystack', 'Flutterwave');

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specs" TEXT[] NOT NULL,
    "condition" "Condition" NOT NULL,
    "priceKobo" INTEGER NOT NULL,
    "images" TEXT[] NOT NULL,
    "tags" TEXT[] NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "preferredDate" TEXT NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "imageUrls" TEXT[] NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Swap" (
    "id" TEXT NOT NULL,
    "currentDevice" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "desiredDevice" TEXT NOT NULL,
    "askingPrice" INTEGER NOT NULL,
    "description" TEXT,
    "imageUrls" TEXT[] NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "quoteLow" INTEGER,
    "quoteHigh" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Swap_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fulfillment" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "totalKobo" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "paymentProvider" "PaymentProvider" NOT NULL,
    "paymentReference" TEXT NOT NULL,
    "providerTransactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "unitPriceKobo" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Order_paymentReference_key" ON "Order"("paymentReference");
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_orderId_fkey"
FOREIGN KEY ("orderId") REFERENCES "Order"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
