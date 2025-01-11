"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import {
  ChatMessage,
  ChatMessageSkeleton,
} from "@/components/stream-player/chat-message";

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages || messages.length === 0)
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is hidden" : "Welcome to the chat!"}
        </p>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      <ChatMessageSkeleton />
    </div>
  );
};
