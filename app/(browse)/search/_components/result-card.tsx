"use client";

import { Thumbnail } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { VerifiedMark } from "@/components/verified-mark";

interface ResultCardProps {
  streamUser: Stream & { user: User };
}

export const ResultCard = ({ streamUser }: ResultCardProps) => {
  const { user, thumbnailUrl, isLive, name } = streamUser;
  const { username, imageUrl } = user;
  return (
    <Link href={`/${username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={thumbnailUrl || ""}
            fallback={imageUrl || ""}
            isLive={isLive}
            username={username || ""}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="text-lg font-bold cursor-pointer hover:text-blue-500">
              {username}
            </p>
            <VerifiedMark />
          </div>
          <p className="text-sm text-muted-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(streamUser.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <Skeleton className="h-[9rem] w-[16rem]" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};
