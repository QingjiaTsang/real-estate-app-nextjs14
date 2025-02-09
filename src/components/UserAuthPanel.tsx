import AuthButtons from '@/components/AuthButtons'
import { getDbUser } from '@/lib/actions/user'
import { User } from '@nextui-org/react'

import React from 'react'

async function UserAuthPanel() {
  const dbUserResult = await getDbUser()
  const user = dbUserResult?.data

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <AuthButtons />
      </div>
    )
  }

  // Note: do not render with kinde user info, instead use db user info
  // because kinde will merge the user info when user with the same email logging in by email+code and google oAuth2
  // which may cause the user info stored in kinde not completely the same as db user info
  return (
    <div className="flex items-center">
      <User
        as="button"
        className="transition-transform"
        name={user!.firstName}
        avatarProps={{
          isBordered: true,
          src: user!.avatarUrl ?? '/images/default-user-avatar.png',
        }}
      />
    </div>
  )
}

export default UserAuthPanel
