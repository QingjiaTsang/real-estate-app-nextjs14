import UpsertPropertyForm from '@/app/(main)/user/properties/add/_components/UpsertPropertyForm'
import PageHeader from '@/components/PageHeader'
import prisma from '@/lib/prisma'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'

interface EditPropertyPageProps {
  params: { id: string }
}

async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { getUser } = getKindeServerSession()

  const [user, propertyStatusList, propertyTypeList, propertyToEdit] = await Promise.all([
    getUser(),
    prisma.propertyStatus.findMany(),
    prisma.propertyType.findMany(),
    prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        location: true,
        feature: true,
        contact: true,
        type: true,
        status: true,
        pictures: true,
      },
    }),
  ])

  if (!propertyToEdit) {
    return notFound()
  }

  // Note: Don't forget to check if the user is authorized to edit the property
  if (!user || user.id !== propertyToEdit.userId) {
    redirect('/unauthorized')
  }

  return (
    <div>
      <PageHeader title="Edit Property" />

      <UpsertPropertyForm
        statusList={propertyStatusList}
        typeList={propertyTypeList}
        propertyId={params.id}
        propertyToEdit={{ ...propertyToEdit, price: propertyToEdit.price.toString() }}
      />
    </div>
  )
}

export default EditPropertyPage
