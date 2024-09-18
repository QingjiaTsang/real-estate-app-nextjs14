import { User } from '@prisma/client'

type UserProfileProps = {
  user: User
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile