import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVE_API_KEY!,
  process.env.LIVE_API_SECRET!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headerPayload = await headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
      return new Response("NO AUTHORIZATION HEADER", { status: 400 });
    }

    if (!body) {
      return new Response("Invalid payload", { status: 400 });
    }

    const event = await receiver.receive(body, authorization);

    if (event.event === "ingress_started") {
      const ingressId = event.ingressInfo?.ingressId;
      await db.stream.update({
        where: {
          ingressId: ingressId,
        },
        data: {
          isLive: true,
        },
      });
    }
    if (event.event === "ingress_ended") {
      const ingressId = event.ingressInfo?.ingressId;
      await db.stream.update({
        where: {
          ingressId: ingressId,
        },
        data: {
          isLive: false,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
