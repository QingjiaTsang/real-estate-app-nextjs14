'use client'

import PropertyCard, { Property } from '@/app/components/PropertyCard'
import PropertyCardsContainer from '@/app/components/PropertyCardsContainer';
import { getPropertiesByPage } from '@/libs/actions/property';
import { Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";


const LoadMore = () => {
  const { ref, inView } = useInView()

  const [page, setPage] = useState(2)
  const [properties, setProperties] = useState<Property[]>([])
  const [noMore, setNoMore] = useState(false)


  const loadMoreBeers = async () => {
    const nextPage = page + 1
    const newProperties = await getPropertiesByPage(nextPage) ?? []
    setProperties([...properties, ...newProperties])
    setPage(nextPage)
    if (newProperties.length === 0) {
      setNoMore(true)
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreBeers();
    }
  }, [inView]);

  return (
    <>
      <PropertyCardsContainer>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </PropertyCardsContainer>
      {
        !noMore && (
          <div
            className="flex justify-center items-center mt-8 col-span-1 sm:col-span-2 md:col-span-3"
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