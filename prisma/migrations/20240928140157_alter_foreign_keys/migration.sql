/*
  Warnings:

  - You are about to drop the column `contactId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `featureId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyId]` on the table `PropertyContact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `PropertyFeature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[propertyId]` on the table `PropertyLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `PropertyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `PropertyFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `PropertyLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_locationId_fkey";

-- DropIndex
DROP INDEX "Property_contactId_key";

-- DropIndex
DROP INDEX "Property_featureId_key";

-- DropIndex
DROP INDEX "Property_locationId_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "contactId",
DROP COLUMN "featureId",
DROP COLUMN "locationId";

-- AlterTable
ALTER TABLE "PropertyContact" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PropertyFeature" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PropertyLocation" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyContact_propertyId_key" ON "PropertyContact"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFeature_propertyId_key" ON "PropertyFeature"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyLocation_propertyId_key" ON "PropertyLocation"("propertyId");

-- AddForeignKey
ALTER TABLE "PropertyLocation" ADD CONSTRAINT "PropertyLocation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyFeature" ADD CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyContact" ADD CONSTRAINT "PropertyContact_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
