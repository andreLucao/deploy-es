/*
  Warnings:

  - You are about to drop the column `calculated_co2e` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `emissionType` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `emission_product_id` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `formData` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `registered_at` on the `emissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inventory_id,scope]` on the table `emissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emissionsData` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_co2e` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."emissions" DROP CONSTRAINT "emissions_emission_product_id_fkey";

-- DropIndex
DROP INDEX "public"."emission_inventories_company_id_year_key";

-- DropIndex
DROP INDEX "public"."emissions_inventory_id_emission_product_id_key";

-- AlterTable
ALTER TABLE "emissions" DROP COLUMN "calculated_co2e",
DROP COLUMN "emissionType",
DROP COLUMN "emission_product_id",
DROP COLUMN "formData",
DROP COLUMN "quantity",
DROP COLUMN "registered_at",
ADD COLUMN     "emissionsData" JSONB NOT NULL,
ADD COLUMN     "emissions_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_co2e" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "emissions_inventory_id_scope_key" ON "emissions"("inventory_id", "scope");
