import React from 'react'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { Avatar, Button, } from '@nextui-org/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const UserAuthPanel = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession()

  if (!(await isAuthenticated())) {
    return (
      <div className="flex items-center gap-2">
        <Button>
          <LoginLink>Sign in</LoginLink>
        </Button>
        <Button color="primary" variant="flat">
          <RegisterLink>Sign up</RegisterLink>
        </Button>
      </div>
    )
  }

  const user = await getUser()

  return (
    <div className="flex items-center gap-2">
      {user.picture ? (
        <Avatar src={user.picture} />
      ) : (
        <UserCircleIcon className="w-10 h-10" />
      )}
      <p className="text-lg font-bold">{user.given_name}</p>
    </div>
  )
}

export default UserAuthPanel
