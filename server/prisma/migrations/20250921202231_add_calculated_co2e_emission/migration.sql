/*
  Warnings:

  - Added the required column `calculated_co2e` to the `emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."emissions" ADD COLUMN     "calculated_co2e" DOUBLE PRECISION NOT NULL;
