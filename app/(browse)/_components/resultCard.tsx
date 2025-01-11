import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
  stream: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ stream }: ResultCardProps) => {
  const { user, thumbnailUrl, isLive, name } = stream;
  const { username, imageUrl } = user;
  return (
    <Link href={`/${username}`}>
      <div className="w-full h-full space-y-4">
        <Thumbnail
          src={thumbnailUrl || ""}
          fallback={imageUrl || ""}
          isLive={isLive}
          username={username || ""}
        />
        {isLive && (
          <div className="absolute top-2 left-3 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
            <LiveBadge />
          </div>
        )}
        <div className="flex gap-x-3">
          <UserAvatar
            username={username || ""}
            imageUrl={imageUrl || ""}
            isLive={isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-500">{name}</p>
            <p className="text-muted-foreground">{username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full h-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};
