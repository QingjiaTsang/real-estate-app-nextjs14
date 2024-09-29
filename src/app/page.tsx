import { getPropertiesByPage } from "@/libs/actions/property"

import PropertyCard from "@/app/components/PropertyCard"
import LoadMore from "@/app/components/LoadMore"
import PropertyCardsContainer from "@/app/components/PropertyCardsContainer"



export default async function HomePage() {
  const properties = await getPropertiesByPage(1)

  return (
    <div className="container mx-auto p-4">
      <PropertyCardsContainer>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </PropertyCardsContainer>
      <LoadMore />
    </div >
  )
}



