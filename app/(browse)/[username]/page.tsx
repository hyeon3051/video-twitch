import { notFound } from "next/navigation";
import { getUserByUserName } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  console.log("user", user);

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }
  return (
    <StreamPlayer stream={user.stream} user={user} isFollowing={isFollowing} />
  );
};

export default UserPage;
