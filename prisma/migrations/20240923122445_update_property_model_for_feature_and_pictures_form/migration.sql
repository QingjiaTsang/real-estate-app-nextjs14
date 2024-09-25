-- CreateTable
CREATE TABLE "PropertyPicture" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "PropertyPicture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyPicture" ADD CONSTRAINT "PropertyPicture_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
