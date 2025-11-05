/*
  Warnings:

  - A unique constraint covering the columns `[order_number]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_number` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "order_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_number_key" ON "payments"("order_number");
