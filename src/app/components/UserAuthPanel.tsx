import React from 'react'

import { Button, User, } from '@nextui-org/react'
import Link from 'next/link'
import { getDbUser } from '@/libs/actions/user'

const UserAuthPanel = async () => {
  const dbUserResult = await getDbUser()
  const user = dbUserResult?.data

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button as={Link} href='/api/auth/login'>
          Login
        </Button>
        <Button as={Link} color="primary" variant="flat" href='/api/auth/register'>
          Sign Up
        </Button>
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
          src: user!.avatarUrl! ?? '/images/default-user-avatar.png',
        }}
      />
    </div>
  )
}

export default UserAuthPanel
