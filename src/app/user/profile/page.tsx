
import UserProfile from "@/app/user/profile/_components/UserProfile";
import prisma from "@/libs/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession()
  const kindeUser = await getUser()

  const user = await prisma.user.findUnique({
    where: {
      id: kindeUser?.id ?? ''
    },
    include: {
      properties: true
    }
  })

  return (
    <div>
      {user && <UserProfile user={user} />}
    </div>
  );
};

export default ProfilePage;
