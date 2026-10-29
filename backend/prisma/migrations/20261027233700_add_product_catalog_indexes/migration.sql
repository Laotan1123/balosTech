CREATE INDEX "Product_inStock_createdAt_idx"
    ON "Product"("inStock", "createdAt");

CREATE INDEX "Product_inStock_brand_condition_idx"
    ON "Product"("inStock", "brand", "condition");

CREATE INDEX "Product_inStock_priceKobo_idx"
    ON "Product"("inStock", "priceKobo");
