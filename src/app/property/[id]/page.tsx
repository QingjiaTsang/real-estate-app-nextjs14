import PageTitle from '@/app/components/PageTitle'
import ImageSlider from '@/app/property/[id]/_components/ImageSlider'
import PropertyInfoCard from '@/app/property/[id]/_components/PropertyInfoCard'
import prisma from '@/libs/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Card } from '@nextui-org/card'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PropertyDetailPageProps {
  params: { id: string }
}

async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { getUser } = await getKindeServerSession()

  const [kindeUser, property] = await Promise.all([
    getUser(),
    prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        type: true,
        status: true,
        location: true,
        feature: true,
        pictures: true,
        contact: true,
      },
    }),
  ])

  if (!property) {
    return notFound()
  }

  return (
    <div>
      <PageTitle
        title="Property Details"
        rightContent={
          property.user.id === kindeUser?.id && (
            <Button color="secondary" href={`/user/properties/${property.id}/edit`} as={Link}>Edit Property</Button>
          )
        }
      />
      <div className="container mx-auto p-4">
        <div className="text-lg md:text-xl font-bold mb-2 md:my-4">{property.name}</div>

        <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
          <Card className="w-full md:w-2/3">
            <ImageSlider images={property.pictures} />
          </Card>
          <Card className="w-full md:w-[360px] lg:w-[1/3] ">
            <PropertyInfoCard features={property.feature!} contact={property.contact!} location={property.location!} />
          </Card>
        </div>

        <div className="text-lg md:text-xl font-bold my-2 md:my-4">
          $
          {' '}
          {property.price.toString()}
          {' '}
          /
          {' '}
          {property.status.value}
        </div>

        <p className="text-sm md:text-base text-gray-500 mt-7">{property.description}</p>
      </div>
    </div>
  )
}

export default PropertyDetailPage
