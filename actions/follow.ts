"use server";

import { revalidatePath } from "next/cache";

import { unfollowUser } from "@/lib/follow-service";
import { followUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);
    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.follower.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("internal error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
    return unfollowedUser;
  } catch (error) {
    throw new Error("internal error");
  }
};
