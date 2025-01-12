"use server";

import { revalidatePath } from "next/cache";

import { unfollowUser } from "@/lib/follow-service";
import { followUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  const followedUser = await followUser(id);
  revalidatePath("/");

  if (followedUser) {
    revalidatePath(`/${followedUser.follower.username}`);
  }

  return followedUser;
};

export const onUnfollow = async (id: string) => {
  const unfollowedUser = await unfollowUser(id);
  revalidatePath("/");
  if (unfollowedUser) {
    revalidatePath(`/${unfollowedUser.following.username}`);
  }
  return unfollowedUser;
};
