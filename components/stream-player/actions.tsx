"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
}

export const Actions = ({
  hostIdentity,
  isHost,
  isFollowing,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const router = useRouter();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`you are now following ${data?.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`you are now unfollowing ${data?.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };
  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) return;
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      disabled={isPending || isHost}
      className="w-full lg:w-auto"
    >
      <HeartIcon
        className={cn("w-4 h-4", isFollowing ? "fill-white" : "fill-white/0")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
