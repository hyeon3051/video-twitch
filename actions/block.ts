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
  const self = await getSelf();

  if (self.id == id) return new Error("Cannot block yourself");

  await roomService.removeParticipant(self.id, id);
  const blockedUser = await blockUser(id);

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);
  revalidatePath("/");
  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
};
