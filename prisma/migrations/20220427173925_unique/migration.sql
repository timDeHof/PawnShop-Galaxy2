/*
  Warnings:

  - A unique constraint covering the columns `[productId,orderId]` on the table `product_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_orders" DROP CONSTRAINT "product_orders_productId_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "isActive" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "condition" DROP NOT NULL,
ALTER COLUMN "condition" SET DEFAULT true,
ALTER COLUMN "inStock" DROP NOT NULL,
ALTER COLUMN "inStock" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "product_orders_productId_orderId_key" ON "product_orders"("productId", "orderId");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_orders" ADD CONSTRAINT "product_orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
