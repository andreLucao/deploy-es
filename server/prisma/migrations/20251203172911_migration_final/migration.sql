/*
  Warnings:

  - You are about to drop the column `stripe_customer_id` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `emissionsData` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `emissions_count` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_id` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the `emission_inventories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calculator_data` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."emission_inventories" DROP CONSTRAINT "emission_inventories_company_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."emissions" DROP CONSTRAINT "emissions_inventory_id_fkey";

-- DropIndex
DROP INDEX "public"."companies_stripe_customer_id_key";

-- DropIndex
DROP INDEX "public"."emissions_inventory_id_scope_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "stripe_customer_id",
ADD COLUMN     "annual_revenue_range" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "company_type" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "onboarded" BOOLEAN DEFAULT false,
ADD COLUMN     "sustainability_goals" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "emissionsData",
DROP COLUMN "emissions_count",
DROP COLUMN "inventory_id",
DROP COLUMN "scope",
ADD COLUMN     "calculator_data" JSONB NOT NULL,
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "scope1_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scope2_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scope3_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."emission_inventories";

-- DropEnum
DROP TYPE "public"."InventoryStatus";

-- AddForeignKey
ALTER TABLE "emissions" ADD CONSTRAINT "emissions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
