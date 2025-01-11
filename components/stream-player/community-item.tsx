"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";

import { Hint } from "@/components/hint";
import { onBlock } from "@/actions/block";
import { cn, stringToColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  viewerName,
  hostName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const color = stringToColor(participantName);
  const [isPending, startTransition] = useTransition();
  const isSelf = participantName == viewerName;
  const isHost = viewerName == hostName;

  const handleBlock = async () => {
    if (!participantIdentity || isSelf || !isHost) return;

    startTransition(async () => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`${participantName} is blocked`);
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="w-4 h-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
