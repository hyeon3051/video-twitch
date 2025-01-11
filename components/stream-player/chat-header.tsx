"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChatToggle } from "@/components/stream-player/chat-toggle";
import { VarientToggle } from "@/components/stream-player/varient-toggle";
export const ChatHeader = () => {
  return (
    <div className="relative p-3 border-b">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="font-semibold text-primary text-center">Sream Chat</p>
      <div className="absolute right-2 top-2">
        <VarientToggle />
      </div>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-5 left-3 top-3" />
      <Skeleton className="h-6 w-20 mx-auto" />
    </div>
  );
};
