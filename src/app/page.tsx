import HeaderSearchBar from '@/app/components/HeaderSearchBar'
import PropertyList from '@/app/components/PropertyList'
import { getPropertiesByPage } from '@/libs/actions/property'
import {
  createSearchParamsCache,
  parseAsString,
} from 'nuqs/server'

const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
})

export default async function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const { search } = searchParamsCache.parse(searchParams)
  const initialProperties = await getPropertiesByPage(1, search)

  return (
    <>
      <HeaderSearchBar />
      {/* optimize First Contentful Paint (FCP) and add loading state for initialProperties after user search */}
      <div className="container mx-auto p-4">
        <PropertyList initialProperties={initialProperties} initialSearch={search} />
      </div>
    </>
  )
}
