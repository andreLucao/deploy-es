/*
  Warnings:

  - You are about to drop the column `company_id` on the `emissions` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `emissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inventory_id,emission_product_id]` on the table `emissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emissionType` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventory_id` to the `emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."InventoryStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'AUDITED');

-- DropForeignKey
ALTER TABLE "public"."emissions" DROP CONSTRAINT "emissions_company_id_fkey";

-- DropIndex
DROP INDEX "public"."emissions_company_id_emission_product_id_year_key";

-- AlterTable
ALTER TABLE "public"."emissions" DROP COLUMN "company_id",
DROP COLUMN "year",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "emissionType" TEXT NOT NULL,
ADD COLUMN     "formData" JSONB,
ADD COLUMN     "inventory_id" TEXT NOT NULL,
ADD COLUMN     "scope" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."emission_inventories" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."InventoryStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emission_inventories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emission_inventories_company_id_year_key" ON "public"."emission_inventories"("company_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "emissions_inventory_id_emission_product_id_key" ON "public"."emissions"("inventory_id", "emission_product_id");

-- AddForeignKey
ALTER TABLE "public"."emissions" ADD CONSTRAINT "emissions_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "public"."emission_inventories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."emission_inventories" ADD CONSTRAINT "emission_inventories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
