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

  return (
    <div>
      <UserCard user={session?.user} pagetype={"Client"} />
    </div>
  );
};

export default ClientPage;
