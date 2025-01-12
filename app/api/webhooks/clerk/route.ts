import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Request missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        stream: {
          create: {
            name: `${payload.data.username}'s Stream`,
          },
        },
      },
    });
  }
  if (eventType === "user.updated") {
    const currentUser = await db.user.findUnique({
      where: {
        externalUserId: id,
      },
    });
    if (!currentUser) {
      return new Response("Error: User not found", { status: 404 });
    }
    await db.user.update({
      where: { id: currentUser.id },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.deleted") {
    const currentUser = await db.user.findUnique({
      where: {
        externalUserId: id,
      },
    });
    if (!currentUser) {
      return new Response("Error: User not found", { status: 404 });
    }
    await db.user.delete({
      where: { id: currentUser.id },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
