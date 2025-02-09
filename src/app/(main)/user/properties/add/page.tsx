import UpsertPropertyForm from '@/app/(main)/user/properties/add/_components/UpsertPropertyForm'

import PageHeader from '@/components/PageHeader'
import prisma from '@/lib/prisma'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

async function AddPropertyPage() {
  const [propertyStatusList, propertyTypeList] = await Promise.all([
    prisma.propertyStatus.findMany(),
    prisma.propertyType.findMany(),
  ])

  return (
    <div>
      <PageHeader
        title="Add Property"
        rightContent={(
          <Button color="secondary" href="/user/properties/add" as={Link}>
            Add
          </Button>
        )}
        titleClassName="ml-10 md:ml-0"
      />

      <UpsertPropertyForm statusList={propertyStatusList} typeList={propertyTypeList} />
    </div>
  )
}

export default AddPropertyPage
