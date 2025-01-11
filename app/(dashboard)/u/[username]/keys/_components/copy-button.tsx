"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clipboard } from "lucide-react";

interface CopyButtonProps {
  value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? ClipboardCheck : Clipboard;
  return (
    <Button
      onClick={onCopy}
      variant="outline"
      disabled={!value || isCopied}
      size="sm"
    >
      <Icon />
      Copy
    </Button>
  );
}
