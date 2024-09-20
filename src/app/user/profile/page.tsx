import { getDbUser } from "@/libs/actions/user";

import UserProfile from "@/app/user/profile/_components/UserProfile";
import PageTitle from "@/app/components/PageTitle";

const page = async () => {
  const dbUserResult = await getDbUser();
  const user = dbUserResult?.data;

  return (
    <div>
      <PageTitle
        title="Profile"
        backHref="/"
      />
      {user && <UserProfile user={user} />}
    </div>
  );
};

export default page;
