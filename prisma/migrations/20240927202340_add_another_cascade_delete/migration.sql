-- DropForeignKey
ALTER TABLE "PropertyPicture" DROP CONSTRAINT "PropertyPicture_propertyId_fkey";

-- AddForeignKey
ALTER TABLE "PropertyPicture" ADD CONSTRAINT "PropertyPicture_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
