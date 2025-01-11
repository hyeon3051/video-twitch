"use client";
import { format } from "date-fns";
import { ReceivedChatMessage } from "@livekit/components-react";
import { stringToColor } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
interface ChatMessageProps {
  message: ReceivedChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const color = stringToColor(message.from?.name || "");
  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-xs text-muted-foreground">
        {format(message.timestamp, "HH:mm")}
      </p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color }}>
            {message.from?.name}:
          </span>
        </p>
        <p className="text-sm break-all">{message.message}</p>
      </div>
    </div>
  );
};

export const ChatMessageSkeleton = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
};
