"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

export const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar();
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand Chat" : "Collapse Chat";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className="h-auto p-3 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon />
      </Button>
    </Hint>
  );
};
