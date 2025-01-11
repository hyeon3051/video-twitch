"use client";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { onUnblock } from "@/actions/block";
import { toast } from "sonner";

interface UnblockProps {
  blockedUserId: string;
}

export const UnblockButton = ({ blockedUserId }: UnblockProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUnblock = async () => {
    startTransition(() => {
      onUnblock(blockedUserId)
        .then(() => {
          toast.success("User unblocked");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <Button onClick={handleUnblock} disabled={isPending}>
      Unblock
    </Button>
  );
};
