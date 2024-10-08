import type { Prisma } from '@prisma/client'

import Attribute from '@/app/user/profile/_components/Attribute'
import SectionTitle from '@/app/user/profile/_components/SectionTitle'
import UploadAvatarButton from '@/app/user/profile/_components/UploadAvatarButton'
import { Avatar, Card } from '@nextui-org/react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface UserProfileProps {
  user: Prisma.UserGetPayload<{
    include: {
      properties: true
    }
  }>
}

function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="container mx-auto p-4">
      <Card className="p-4">
        <SectionTitle title="Basic Information" />
        <div className="mb-4 flex items-end gap-4">
          <Zoom>
            <Avatar src={user.avatarUrl ?? '/images/default-avatar.png'} className="w-20 h-20" />
          </Zoom>
          <UploadAvatarButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Attribute title="Name" value={`${user.firstName} ${user.lastName}`} />
          <Attribute title="Email" value={user.email} />
          <Attribute title="Registered On" value={user.createdAt.toLocaleDateString()} />
          <Attribute title="Properties Posted" value={user.properties.length} />
        </div>
      </Card>
    </div>
  )
}

export default UserProfile
