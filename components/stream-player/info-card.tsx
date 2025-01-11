import { cn } from "@/lib/utils";
import { Info, PencilIcon } from "lucide-react";
import Image from "next/image";
import { InfoModal } from "./info-modal";
import { Separator } from "@/components/ui/separator";
interface InfoCardProps {
  hostIdentity: string;
  viewerIdentity: string;
  name: string;
  thumbnailUrl: string;
}

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  name,
  thumbnailUrl,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x.2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <PencilIcon className="h-5 w-5" />
          </div>
          <div className="px-4">
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit Your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maxmize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            <div className="text-sm font-semibold">
              {thumbnailUrl && (
                <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-whtie/10">
                  <Image
                    src={thumbnailUrl}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
