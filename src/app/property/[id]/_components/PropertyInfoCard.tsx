import type { PropertyContact, PropertyFeature, PropertyLocation } from '@prisma/client'
import { Divider } from '@nextui-org/divider'

interface PropertyInfoCardProps {
  features: PropertyFeature
  contact: PropertyContact
  location: PropertyLocation
}

function PropertyInfoCard({ features, contact, location }: PropertyInfoCardProps) {
  return (
    <div className="w-full h-full flex-col bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col gap-y-4">
        <section>
          <Title title="Features" />
          <div className="flex flex-col gap-y-2 text-gray-500 text-sm md:text-base">
            <Attribute label="Bedrooms" value={features.bedrooms} />
            <Attribute label="Bathrooms" value={features.bathrooms} />
            <Attribute label="Parking" value={features.parkingSpots} />
            <Attribute label="Area" value={features.area} />
          </div>
        </section>

        <section>
          <Title title="Address" />
          <div className="flex flex-col gap-y-2 text-sm md:text-base text-gray-500">
            <Attribute label="City" value={location.city} />
            <Attribute label="Landmark" value={location.landmarks} />
            <Attribute label="Zipcode" value={location.zip} />
            <Attribute label="Address" value={location.address} />
          </div>
        </section>

        <section>
          <Title title="Owner Details" />
          <div className="flex flex-col gap-y-2 text-sm md:text-base text-gray-500">
            <Attribute label="Owner name" value={contact.name} />
            <Attribute label="Email" value={contact.email} />
            <Attribute label="Phone" value={contact.phone} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default PropertyInfoCard

function Title({ title }: { title: string }) {
  return (
    <>
      <h2 className="font-semibold text-lg mb-2 text-gray-700">{title}</h2>
      <Divider className="mb-1 -mt-2" />
    </>
  )
}

function Attribute({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex justify-between gap-x-2">
      <span className="text-gray-500 font-semibold">{label}</span>
      <span className="text-gray-600 text-right break-words">{value}</span>
    </div>
  )
}
