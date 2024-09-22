import Link from 'next/link';

import PageTitle from '@/app/components/PageTitle'
import { Button } from '@nextui-org/react'

const PropertiesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <PageTitle
        title="Properties"
        rightContent={<Button color='secondary' href='/user/properties/add' as={Link}>Add Property</Button>}
      />
      {children}
    </div>
  )
}

export default PropertiesLayout