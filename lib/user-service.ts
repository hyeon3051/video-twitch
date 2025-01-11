import NotFoundPage from "@/app/(browse)/[username]/not-found";
import { db } from "@/lib/db";

export const getUserByUserName = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username: username },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          name: true,
          thumbnailUrl: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
        },
      },
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return NotFoundPage;

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};
