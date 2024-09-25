/*
  Warnings:

  - A unique constraint covering the columns `[contactId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "contactId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PropertyContact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PropertyContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_contactId_key" ON "Property"("contactId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "PropertyContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
