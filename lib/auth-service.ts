"use server";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) throw new Error("unauthorized");

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) throw new Error("unauthorized");

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();
  if (!self || !self.username) throw new Error("unauthorized");

  const user = await db.user.findFirst({
    where: { username: username },
  });

  if (!user) throw new Error("User not found");
  if (self.username !== user.username) throw new Error("unauthorized");

  return user;
};
