import page from "@/app/page";
import PropertyTable from "@/app/user/properties/_components/PropertyTable";
import prisma from "@/libs/prisma";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString
} from 'nuqs/server'

const ITEMS_PER_PAGE = 10

const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
})

const PropertiesPage = async ({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>
}) => {
  const { page } = searchParamsCache.parse(searchParams)

  const { getUser } = await getKindeServerSession()
  const user = await getUser()

  const propertyCountPromise = prisma.property.count({
    where: {
      userId: user?.id
    }
  })

  const propertiesPromise = prisma.property.findMany({
    where: {
      userId: user?.id
    },
    include: {
      type: true,
      status: true
    },
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE
  })

  const [propertyCount, properties] = await Promise.all([propertyCountPromise, propertiesPromise])

  const totalPage = Math.ceil(propertyCount / ITEMS_PER_PAGE)

  return (
    <PropertyTable
      properties={properties}
      totalPage={totalPage}
      page={page}
    />
  )
}

export default PropertiesPage