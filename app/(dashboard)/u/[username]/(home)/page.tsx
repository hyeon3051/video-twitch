import React from "react";
import { currentUser } from "@clerk/nextjs/server";

import { getUserByUserName } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-player";
import { getSelf } from "@/lib/auth-service";

export default async function page() {
  const self = await getSelf();
  const username = self?.username;
  const externalUser = await currentUser();
  const user = await getUserByUserName(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
}
