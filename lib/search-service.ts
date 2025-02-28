"use server";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { Stream } from "@prisma/client";

export const getSearchResults = async (term: string) => {
  let userId: string | null = null;
  try {
    const self = await getSelf();
    userId = self?.id;
  } catch {
    userId = null;
  }

  let streams = [];
  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocked: {
              some: {
                blockerId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      include: {
        user: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
