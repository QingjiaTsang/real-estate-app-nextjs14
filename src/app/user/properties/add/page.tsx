import prisma from "@/libs/prisma"

import UpsertPropertyForm from "@/app/user/properties/add/_components/UpsertPropertyForm"
import PageTitle from "@/app/components/PageTitle"
import { Button } from "@nextui-org/react"
import Link from "next/link"

const AddPropertyPage = async () => {
  const [propertyStatusList, propertyTypeList] = await Promise.all([
    prisma.propertyStatus.findMany(),
    prisma.propertyType.findMany(),
  ])

  return (
    <div>
      <PageTitle
        title="Properties"
        rightContent={<Button color='secondary' href='/user/properties/add' as={Link}>Add Property</Button>}
      />
      <UpsertPropertyForm statusList={propertyStatusList} typeList={propertyTypeList} />
    </div>
  )
}

export default AddPropertyPage