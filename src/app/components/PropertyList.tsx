'use client'

import { useState, useEffect } from 'react'
import PropertyCard, { Property } from '@/app/components/PropertyCard'
import PropertyCardsContainer from '@/app/components/PropertyCardsContainer'
import LoadMore from '@/app/components/LoadMore'
import { Spinner } from '@nextui-org/react'
import { parseAsString, useQueryState } from 'nuqs'

type PropertyListProps = {
  initialProperties: Property[]
  initialSearch: string
}

export default function PropertyList({ initialProperties, initialSearch }: PropertyListProps) {
  const [search] = useQueryState('search', parseAsString.withDefault(''))

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Note: search from client side will immediately update after user changes input value
    // while initialSearch from server side will not update immediately.
    // initialSearch only update after server side refresh triggered by search change in HeaderSearchBar.tsx.
    if (search !== initialSearch) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [search, initialSearch])

  if (loading) {
    return <div className="text-center p-4"><Spinner /></div>
  }

  return (
    <PropertyCardsContainer>
      {initialProperties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
      <LoadMore />
    </PropertyCardsContainer>
  )
}