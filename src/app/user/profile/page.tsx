
import UserProfile from "@/app/user/profile/_components/UserProfile";
import prisma from "@/libs/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const ProfilePage = async () => {
  const { getUser } = await getKindeServerSession()
  const kindleUser = await getUser()

  const user = await prisma.user.findUnique({
    where: {
      id: kindleUser?.id
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
