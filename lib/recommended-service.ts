import { db } from "@/lib/db";
import { getSelf } from "./auth-service";
import { User } from "@prisma/client";
export const getRecommended = async () => {
  let userId: string | null = null;
  try {
    const self = await getSelf();
    if (!self) return [];
    userId = self.id;
  } catch {
    userId = null;
  }

  let users: User[] = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: userId,
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocked: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
