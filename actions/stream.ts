"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (value: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });
    if (!selfStream) throw new Error("Stream not found");

    const validData = {
      name: value.name,
      thumbnailUrl: value.thumbnailUrl,
      isChatEnabled: value.isChatEnabled,
      isChatDelayed: value.isChatDelayed,
      isChatFollowersOnly: value.isChatFollowersOnly,
    };

    await db.stream.update({
      where: { id: selfStream.id },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update stream");
  }
};
