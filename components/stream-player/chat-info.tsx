import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "@/components/hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) return "Followers chat";
    if (isDelayed && !isFollowersOnly) return "slow chat";
    if (isDelayed && isFollowersOnly) return "slow followers chat";
    return "";
  }, [isFollowersOnly, isDelayed]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) return "Followers chat";
    if (isDelayed && !isFollowersOnly) return "slow chat";
    if (isDelayed && isFollowersOnly) return "slow followers chat";
    return "";
  }, [isFollowersOnly, isDelayed]);

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint} side="left">
        <Info className="w-4 h-4" />
      </Hint>
      <p className="text-sm">{label}</p>
    </div>
  );
};
