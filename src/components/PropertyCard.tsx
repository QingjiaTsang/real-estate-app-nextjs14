import type { Prisma } from '@prisma/client'

import { Card } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export type Property = Prisma.PropertyGetPayload<{
  select: {
    id: true
    name: true
    price: true
    location: {
      select: {
        city: true
        state: true
        country: true
      }
    }
    pictures: {
      select: {
        url: true
      }
    }
  }
}>

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="h-[350px] shadow-md w-72 flex flex-col hover:shadow-xl hover:scale-105 transition-all duration-300 group">
      <div className="relative h-[320px] w-[288px]">
        <Image
          src={property.pictures[0].url}
          alt={property.name}
          fill
          className="max-w-full max-h-full object-cover rounded-none"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold flex-nowrap truncate">{property?.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {property?.location?.city}
          ,
          {' '}
          {property?.location?.state}
          ,
          {' '}
          {property?.location?.country}
        </p>
      </div>

      <div className="p-4 mt-auto group-hover:bg-gray-100 flex justify-between">
        <p className="text-lg font-bold">
          $
          {property?.price.toLocaleString()}
        </p>
        <Link
          href={`/property/${property.id}`}
          className="text-base text-gray-500 group-hover:text-blue-500 cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </Card>
  )
}

export default PropertyCard
