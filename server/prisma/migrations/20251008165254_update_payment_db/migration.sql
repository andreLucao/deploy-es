/*
  Warnings:

  - You are about to drop the column `order_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_session_id` on the `payments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_order_id_fkey";

-- DropIndex
DROP INDEX "public"."payments_order_id_key";

-- DropIndex
DROP INDEX "public"."payments_stripe_session_id_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "order_id",
DROP COLUMN "stripe_session_id";
