import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (userId: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!otherUser) return new Error("User not found");

    if (otherUser.id === self.id) return false;

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export async function blockUser(userId: string) {
  try {
    const self = await getSelf();
    if (self.id == userId) return new Error("Cannot block yourself");
    const otherUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!otherUser) return new Error("User not found");

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (existingBlock) return new Error("User already blocked");

    const block = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocked: true,
      },
    });

    return block;
  } catch (error) {
    throw new Error("Failed to block user");
  }
}

export async function unblockUser(userId: string) {
  try {
    const self = await getSelf();
    if (self.id == userId) return new Error("Cannot block yourself");
    const otherUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!otherUser) return new Error("User not found");

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (!existingBlock) return new Error("not blocked");

    const unblock = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocked: true,
      },
    });

    return unblock;
  } catch (error) {
    throw new Error("Failed to unblock user");
  }
}

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockedUsers;
};
