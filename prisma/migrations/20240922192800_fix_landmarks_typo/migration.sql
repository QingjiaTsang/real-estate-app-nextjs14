/*
  Warnings:

  - You are about to drop the column `landmark` on the `PropertyLocation` table. All the data in the column will be lost.
  - Added the required column `landmarks` to the `PropertyLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyLocation" DROP COLUMN "landmark",
ADD COLUMN     "landmarks" TEXT NOT NULL;
