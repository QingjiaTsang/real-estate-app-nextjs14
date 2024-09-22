/*
  Warnings:

  - A unique constraint covering the columns `[locationId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `statusId` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_statusId_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "locationId" TEXT NOT NULL,
ALTER COLUMN "statusId" SET NOT NULL;

-- CreateTable
CREATE TABLE "PropertyLocation" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "PropertyLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_locationId_key" ON "Property"("locationId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "PropertyStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "PropertyLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
