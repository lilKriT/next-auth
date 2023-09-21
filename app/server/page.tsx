import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../components/UserCard";
const ServerPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <div>
      This is a server page.
      <UserCard user={session.user} pagetype="server" />
    </div>
  );
};

export default ServerPage;
