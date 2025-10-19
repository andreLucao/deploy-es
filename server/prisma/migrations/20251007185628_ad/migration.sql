/*
  Warnings:

  - You are about to drop the column `image_url` on the `ad_product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ad_product" DROP COLUMN "image_url",
ADD COLUMN     "biome" TEXT,
ADD COLUMN     "carousel_images" JSONB,
ADD COLUMN     "co2_reduction" DOUBLE PRECISION,
ADD COLUMN     "image_ad" TEXT,
ADD COLUMN     "impact" TEXT,
ADD COLUMN     "local" TEXT,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "project_type" TEXT,
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "standard" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ALTER COLUMN "verified_stamp" DROP NOT NULL,
ALTER COLUMN "active" DROP NOT NULL;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;
