"use client";

import { Maximize, Minimize } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
interface FullscreenControlProps {
  isFullscreen: boolean;
  setIsFullscreen: (isFullscreen: boolean) => void;
}

export const FullscreenControl = ({
  isFullscreen,
  setIsFullscreen,
}: FullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <Button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          variant="ghost"
        >
          <Icon className="h-5 w-5" />
        </Button>
      </Hint>
    </div>
  );
};
