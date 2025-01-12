import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
  id: string;
  isFollowing: boolean;
  isBlocked: boolean;
}

export const Actions = ({ id, isFollowing, isBlocked }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(id)
        .then((followedUser) =>
          toast.success(`Followed ${followedUser.follower.username}`)
        )
        .catch((error) => toast.error(error.message));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(id)
        .then((unfollowedUser) =>
          toast.success(`Unfollowed ${unfollowedUser.following.username}`)
        )
        .catch((error) => toast.error(error.message));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(id)
        .then((blockedUser) => {
          if (!(blockedUser instanceof Error)) {
            toast.success(`Blocked ${blockedUser.blocked.username}`);
          } else {
            toast.error(blockedUser.message);
          }
        })
        .catch((error) => toast.error(error.message));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(id)
        .then((unblockedUser) => {
          if (!(unblockedUser instanceof Error)) {
            toast.success(`Unblocked ${unblockedUser.blocked.username}`);
          } else {
            toast.error(unblockedUser.message);
          }
        })
        .catch((error) => toast.error(error.message));
    });
  };

  const onFollowClick = isFollowing ? handleUnfollow : handleFollow;
  const onBlockClick = isBlocked ? handleUnblock : handleBlock;
  return (
    <>
      <Button disabled={isPending} variant="primary" onClick={onFollowClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} variant="secondary" onClick={onBlockClick}>
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
