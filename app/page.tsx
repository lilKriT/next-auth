import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="">
      <h1>Home page.</h1>
      {session ? "You are logged in." : "NOT logged in."}
    </main>
  );
}
