"use client";
import { notFound, useParams } from "next/navigation";
import { getUserByUserName } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

const UserPage = async () => {
  const params = useParams();
  const username = params.username as string;
  const user = await getUserByUserName(username);

  if (!user || !user.stream) {
    notFound();
    return null;
  }

  console.log("user", user);

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
    return null;
  }

  return (
    <StreamPlayer stream={user.stream} user={user} isFollowing={isFollowing} />
  );
};

export default UserPage;
