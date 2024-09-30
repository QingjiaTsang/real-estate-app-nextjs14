import PageTitle from '@/app/components/PageTitle'

import UpsertPropertyForm from '@/app/user/properties/add/_components/UpsertPropertyForm'
import prisma from '@/libs/prisma'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

async function AddPropertyPage() {
  const [propertyStatusList, propertyTypeList] = await Promise.all([
    prisma.propertyStatus.findMany(),
    prisma.propertyType.findMany(),
  ])

  return (
    <div>
      <PageTitle
        title="Properties"
        rightContent={<Button color="secondary" href="/user/properties/add" as={Link}>Add Property</Button>}
      />
      <UpsertPropertyForm statusList={propertyStatusList} typeList={propertyTypeList} />
    </div>
  )
}

export default AddPropertyPage
