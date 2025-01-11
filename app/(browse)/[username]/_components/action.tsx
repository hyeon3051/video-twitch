'use client'
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

export const Actions = ({id, isFollowing, isBlocked}: ActionsProps) =>{

    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(id)
            .then((followedUser)=> toast.success(`Followed ${followedUser.follower.username}`))
            .catch((error)=> toast.error(error.message))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(id)
            .then((unfollowedUser)=> toast.success(`Unfollowed ${unfollowedUser.following.username}`))
            .catch((error)=> toast.error(error.message))
        })
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(id)
            .then((blockedUser)=> toast.success(`Blocked ${blockedUser.blocked.username}`))
            .catch((error)=> toast.error(error.message))
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(id)
            .then((unblockedUser)=> toast.success(`Unblocked ${unblockedUser.blocked.username}`))
            .catch((error)=> toast.error(error.message))
        })
    }

    const onFollowClick = isFollowing ? handleUnfollow : handleFollow;
    const onBlockClick = isBlocked ? handleUnblock : handleBlock;
    return (
        <>
        <Button
        disabled={isPending}
        variant="primary" onClick={onFollowClick}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button
        disabled={isPending}
        variant="secondary" onClick={onBlockClick}>
            {isBlocked ? "Unblock" : "Block"}
        </Button>
        </>
    )
} 