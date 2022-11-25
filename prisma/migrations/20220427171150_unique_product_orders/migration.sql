/*
  Warnings:

  - A unique constraint covering the columns `[productId,orderId]` on the table `product_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_orders_productId_orderId_key" ON "product_orders"("productId", "orderId");
