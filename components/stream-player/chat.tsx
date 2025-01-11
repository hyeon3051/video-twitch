"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { ConnectionState } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useChat,
} from "@livekit/components-react";
import {
  ChatHeader,
  ChatHeaderSkeleton,
} from "@/components/stream-player/chat-header";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useMemo, useState } from "react";
import {
  ChatForm,
  ChatFormSkeleton,
} from "@/components/stream-player/chat-form";
import {
  ChatList,
  ChatListSkeleton,
} from "@/components/stream-player/chat-list";
import { ChatCommunity } from "@/components/stream-player/chat-community";
interface ChatProps {
  hostName: string;
  hostIdentity: string;
  viewerName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [message, setMessage] = useState("");
  const { chatMessages: messages, send: sendMessage } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return [...messages].sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  const onSubmit = () => {
    console.log(message);
    if (!sendMessage) return;

    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex flex-col bg-background border-l border-b h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            message={message}
            setMessage={setMessage}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col bg-background border-l border-b h-[calc(100vh-80px)]">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
