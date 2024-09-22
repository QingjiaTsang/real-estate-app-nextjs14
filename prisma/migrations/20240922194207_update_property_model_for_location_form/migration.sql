/*
  Warnings:

  - A unique constraint covering the columns `[featureId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "featureId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PropertyFeature" (
    "id" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenOrYard" BOOLEAN NOT NULL,
    "hasBalconyOrPatio" BOOLEAN NOT NULL,

    CONSTRAINT "PropertyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_featureId_key" ON "Property"("featureId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "PropertyFeature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
