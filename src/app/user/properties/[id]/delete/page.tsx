import DeleteButton from '@/app/user/properties/_components/DeleteButton'
import { deletePropertyById } from '@/libs/actions/property'
import prisma from '@/libs/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button, Card } from '@nextui-org/react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

interface DeletePropertyPageProps {
  params: { id: string }
}

async function DeletePropertyPage({ params }: DeletePropertyPageProps) {
  const { getUser } = getKindeServerSession()

  const [user, property] = await Promise.all([
    getUser(),
    prisma.property.findUnique({
      where: {
        id: params.id,
      },
      include: {
        type: true,
        status: true,
      },
    }),
  ])

  if (!property) {
    return notFound()
  }

  if (!user || user.id !== property.userId) {
    redirect('/unauthorized')
  }

  const handleDeleteProperty = async () => {
    'use server'
    const result = await deletePropertyById({ id: property.id })
    if (!result?.serverError) {
      redirect('/user/properties')
    }
  }

  return (
    <form action={handleDeleteProperty} className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900">Delete Property</h1>
        <p className="text-center text-gray-600">
          Are you sure you want to delete this property?
        </p>

        <div className="mt-4 space-y-4">
          <p className="text-lg font-medium text-gray-900">{property.name}</p>
          <p className="text-sm text-gray-500">
            {property.type.value}
            {' '}
            •
            {property.status.value}
          </p>
          <p className="text-sm text-gray-500">
            $
            {property.price.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between space-x-4">
          <Button
            as={Link}
            href="/user/properties"
            className="w-full py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </Button>
          <DeleteButton />
        </div>
      </Card>
    </form>
  )
}

export default DeletePropertyPage
