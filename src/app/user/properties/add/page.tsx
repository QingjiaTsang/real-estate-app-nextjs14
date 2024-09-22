import prisma from "@/libs/prisma"

import AddPropertyForm from "@/app/user/properties/add/_components/AddPropertyForm"

const AddPropertyPage = async () => {
  const [propertyStatusList, propertyTypeList] = await Promise.all([
    prisma.propertyStatus.findMany(),
    prisma.propertyType.findMany(),
  ])

  return (
    <div>
      <AddPropertyForm statusList={propertyStatusList} typeList={propertyTypeList} />
    </div>
  )
}

export default AddPropertyPage