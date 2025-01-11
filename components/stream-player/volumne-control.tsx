"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

export const VolumeControl = ({
  onToggle,
  onChange,
  value,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  let Icon = Volume1;
  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";
  const handleChange = (value: number) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <Button
          onClick={onToggle}
          variant="ghost"
          className="text-white hover:bg-white/10 rounded-lg p-1.5"
        >
          <Icon className="h-5 w-5" />
        </Button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        value={[value]}
        onValueChange={handleChange}
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  );
};
