import Image from "next/image";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

const UserCard = ({ user, pagetype }: Props) => {
  const greeting = user?.name ? <div>Hello {user.name}!</div> : null;

  const userImage = user?.image ? (
    <Image
      className="border border-neutral-400"
      src={user.image}
      width={200}
      height={200}
      alt={user.name ?? "Profile pic"}
    />
  ) : null;

  return (
    <div className="flex flex-col gap-4">
      {greeting}
      {userImage}
      <p>{pagetype} Page!</p>
    </div>
  );
};

export default UserCard;
