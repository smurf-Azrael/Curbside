/*
  Warnings:
  - Added the required column `emailVerified` to the `User` table without a default value. This is not possible if the table is not empty.
*/

-- AlterTable

ALTER TABLE
	"User"
ADD
	COLUMN "emailVerified" BOOLEAN NOT NULL,
ALTER COLUMN
	"firstName" DROP NOT NULL,
ALTER COLUMN
	"lastName" DROP NOT NULL,
ALTER COLUMN
	"longitude" DROP NOT NULL,
ALTER COLUMN
	"latitude" DROP NOT NULL,