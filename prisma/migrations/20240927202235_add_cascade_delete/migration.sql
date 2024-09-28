-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_locationId_fkey";

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "PropertyLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "PropertyFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "PropertyContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
