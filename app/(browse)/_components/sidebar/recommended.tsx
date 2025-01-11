"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User, Stream } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  recommended: (User & {
    stream: {
      isLive: boolean;
    } | null;
  })[];
}

export const Recommended = ({ recommended }: RecommendedProps) => {
  const { collapsed } = useSidebar();

  const showLabel = !collapsed && recommended.length > 0;
  return (
    <>
      {showLabel && (
        <div className="pl-6 mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Recommended
          </h3>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {recommended.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl || ""}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="space-y-2 px-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
