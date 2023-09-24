"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "../components/UserCard";

const ClientPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  // You can also do it this way - but it's better to just use middleware.
  // if (session?.user.role !== "admin" && session?.user.role !== "manager") {
  //   return <h1 className="text-5xl">Access Denied</h1>;
  // }

  // This wont be needed with middleware.
  if (!session?.user) return;

  return (
    <div>
      <UserCard user={session.user} pagetype={"Client"} />
    </div>
  );
};

export default ClientPage;
