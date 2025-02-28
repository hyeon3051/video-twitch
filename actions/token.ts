"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
  let self;
  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }
  const host = await getUserById(hostIdentity);

  if (!host) throw new Error("Host not found");

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) return null;

  const isHost = self.id == host.id;
  const token = new AccessToken(
    process.env.LIVE_API_KEY!,
    process.env.LIVE_API_SECRET!,
    {
      name: self.username,
      identity: isHost ? `host-${self.id}` : self.id,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return Promise.resolve(token.toJwt());
};
