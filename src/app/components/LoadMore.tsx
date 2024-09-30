'use client'

import type { Property } from '@/app/components/PropertyCard'
import PropertyCard from '@/app/components/PropertyCard'
import { getPropertiesByPage } from '@/libs/actions/property'
import { Spinner } from '@nextui-org/react'
import { parseAsString, useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

function LoadMore() {
  const [search] = useQueryState('search', parseAsString.withDefault(''))

  const { ref, inView } = useInView()

  const [page, setPage] = useState(2)
  const [properties, setProperties] = useState<Property[]>([])
  const [noMore, setNoMore] = useState(false)

  const loadMoreBeers = async () => {
    const nextPage = page + 1
    const newProperties = await getPropertiesByPage(nextPage, search) ?? []
    setProperties([...properties, ...newProperties])
    setPage(nextPage)
    if (newProperties.length === 0) {
      setNoMore(true)
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreBeers()
    }
  }, [inView])

  useEffect(() => {
    setProperties([])
    setPage(2)
    setNoMore(false)
  }, [search])

  return (
    <>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
      {
        !noMore && (
          <div
            className="flex justify-center items-center col-span-full"
            ref={ref}
          >
            <Spinner />
          </div>
        )
      }
    </>
  )
}

export default LoadMore
