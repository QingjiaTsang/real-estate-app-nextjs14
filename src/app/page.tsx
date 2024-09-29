import { getPropertiesByPage } from "@/libs/actions/property"

import PropertyCard from "@/app/components/PropertyCard"
import LoadMore from "@/app/components/LoadMore"
import PropertyCardsContainer from "@/app/components/PropertyCardsContainer"
import HeaderSearchBar from "@/app/components/HeaderSearchBar"

import {
  createSearchParamsCache,
  parseAsString,
} from 'nuqs/server'

const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
})


export default async function HomePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { search } = searchParamsCache.parse(searchParams)

  const properties = await getPropertiesByPage(1, search)

  return (
    <>
      <HeaderSearchBar />
      <div className="container mx-auto p-4">
        <PropertyCardsContainer>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          <LoadMore />
        </PropertyCardsContainer>
      </div >
    </>

  )
}



