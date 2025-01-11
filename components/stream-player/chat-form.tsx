"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "@/components/stream-player/chat-info";
interface ChatFormProps {
  message: string;
  isHidden: boolean;
  isFollowing: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  setMessage: (message: string) => void;
  onSubmit: (message: string) => void;
}

export const ChatForm = ({
  message,
  setMessage,
  onSubmit,
  isHidden,
  isFollowing,
  isFollowersOnly,
  isDelayed,
}: ChatFormProps) => {
  const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

  const isDisabled =
    isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!message || isDisabled) return;

    if (isDelayed) {
      setIsDelayedBlocked(true);
      setTimeout(() => {
        onSubmit(message);
        setIsDelayedBlocked(false);
      }, 3000);
    } else {
      onSubmit(message);
    }
  };

  if (isHidden) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  console.log(message);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={handleChange}
          value={message}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isFollowersOnly || isDelayed) && "rounded-t-none",
            "border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
