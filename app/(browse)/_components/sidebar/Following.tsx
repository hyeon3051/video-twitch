"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  follows: (Follow & {
    following: User & {
      stream: {
        isLive: boolean;
      } | null;
    };
  })[];
}

export const Following = ({ follows }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (!follows.length) return null;
  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {follows.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive ?? false}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="space-y-2 px-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
