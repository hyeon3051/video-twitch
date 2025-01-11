"use client";

import { Switch } from "@/components/ui/switch";

import { toast } from "sonner";
import { updateStream } from "@/actions/stream";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type FieldsTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  value: boolean;
  field: FieldsTypes;
}

export const ToggleCard = ({
  field,
  label,
  value = false,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const onChange = async (value: boolean) => {
    startTransition(async () => {
      await updateStream({ [field]: value })
        .then(() => {
          toast.success(`${label} updated`);
        })
        .catch((error) => {
          toast.error(`Failed to update ${label}`);
        });
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shirnk-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
};
export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl bg-muted p-6 h-20" />;
};
