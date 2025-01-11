"use client";

import { Users, MessageCircle } from "lucide-react";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

export const VarientToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar();
  const Icon = variant === ChatVariant.CHAT ? Users : MessageCircle;

  const isChat = variant === ChatVariant.CHAT;

  const onToggle = () => {
    if (isChat) {
      onChangeVariant(ChatVariant.COMMUNITY);
    } else {
      onChangeVariant(ChatVariant.CHAT);
    }
  };

  const label = isChat ? "Community" : "Chat";
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
