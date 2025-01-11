"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  CreateIngressOptions,
  IngressVideoOptions,
  IngressAudioOptions,
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVE_API_URL!,
  process.env.LIVE_API_KEY!,
  process.env.LIVE_API_SECRET!
);

const ingressClient = new IngressClient(
  process.env.LIVE_API_URL!,
  process.env.LIVE_API_KEY!,
  process.env.LIVE_API_SECRET!
);

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });
  const rooms = await roomService.listRooms([hostIdentity]);
  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    await ingressClient.deleteIngress(ingress.ingressId);
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngress(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };
  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS_HIGH_MOTION,
      },
    } as IngressVideoOptions;
    options.audio = {
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: "preset",
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      },
    } as IngressAudioOptions;
  }
  const ingress = await ingressClient.createIngress(ingressType, options);

  if (!ingress || !ingress.url || !ingress.ingressId) {
    throw new Error("Failed to create ingress");
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
};
