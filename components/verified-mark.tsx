import { Check } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div className="p-0.5 flex items-center justify-center rounded-full bg-blue-600 w-4">
      <Check className="w-[10px] h-[10px] text-primary stroke-[4px]" />
    </div>
  );
};
