"use server";

import { revalidatePath } from "next/cache";
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVE_API_URL!,
  process.env.LIVE_API_KEY!,
  process.env.LIVE_API_SECRET!
);

export const onBlock = async (id: string) => {
  try {
    const self = await getSelf();

    let blockedUser;

    try {
      await roomService.removeParticipant(self.id, id);
      blockedUser = await blockUser(id);
    } catch (error) {
      throw new Error("internal error");
    }
    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch (error) {
    throw new Error("internal error");
  }
};

export const onUnblock = async (id: string) => {
  try {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);
    revalidatePath("/");
    revalidatePath(`/u/${self.username}/community`);
    return unblockedUser;
  } catch (error) {
    throw new Error("internal error");
  }
};
