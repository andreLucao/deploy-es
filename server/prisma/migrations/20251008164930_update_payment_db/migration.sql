/*
  Warnings:

  - You are about to drop the column `last_payment_error` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_url` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_session_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ad_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits_bought` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_order_id_fkey";

-- AlterTable
ALTER TABLE "ad_product" ADD COLUMN     "sold" INTEGER;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "last_payment_error",
DROP COLUMN "receipt_url",
DROP COLUMN "status",
DROP COLUMN "updated_at",
ADD COLUMN     "ad_id" TEXT NOT NULL,
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "credits_bought" INTEGER NOT NULL,
ADD COLUMN     "stripe_session_id" TEXT,
ALTER COLUMN "order_id" DROP NOT NULL,
ALTER COLUMN "stripe_payment_intent_id" DROP NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'brl';

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripe_session_id_key" ON "payments"("stripe_session_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ad_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
