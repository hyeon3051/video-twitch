"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom, LayoutContextProvider } from "@livekit/components-react";
import { ChatToggle } from "./chat-toggle";
import { Chat, ChatSkeleton } from "./chat";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Video, VideoSkeleton } from "./video";
import { User, Stream } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  imageUrl: string | null;
  stream: CustomStream | null;
  _count: {
    followers: number;
  };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  console.log("user", user.id);
  const { token, name, identity } = useViewerToken(user?.id);
  const { collapsed } = useChatSidebar();

  console.log(token, name, identity);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <LayoutContextProvider>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostname={user.username} hostIdentity={user.id} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl || ""}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl || ""}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio || ""}
            followerdByCount={user._count.followers}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            hostName={user.username}
            hostIdentity={user.id}
            viewerName={name}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </LayoutContextProvider>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1">
        <ChatSkeleton />
      </div>
    </div>
  );
};
