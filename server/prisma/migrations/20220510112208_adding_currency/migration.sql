/*
  Warnings:

  - Added the required column `currency` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "currency" TEXT NOT NULL;
