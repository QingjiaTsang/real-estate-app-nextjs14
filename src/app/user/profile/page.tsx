import { getDbUser } from "@/libs/actions/user";

import UserProfile from "@/app/user/profile/_components/UserProfile";

const ProfilePage = async () => {
  const dbUserResult = await getDbUser();
  const user = dbUserResult?.data;

  return (
    <div>
      {user && <UserProfile user={user} />}
    </div>
  );
};

export default ProfilePage;
