import { getDbUser } from '@/libs/actions/user'

import UserProfile from '@/app/profile/_components/UserProfile'

const page = async () => {
  const dbUserResult = await getDbUser()
  const user = dbUserResult?.data

  return (
    <div>
      {user &&
        <UserProfile user={user} />
      }
    </div>
  )
}

export default page