import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-serivce";
import URLCard from "./_components/url-card";
import { KeyCard } from "./_components/keycard";
import { ConnectModal } from "./_components/ConnectModal";
export default async function KeysPage() {
  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id);

  if (!stream) return <div>No stream found</div>;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-2">
        <URLCard value={stream.serverUrl || ""} />
        <KeyCard value={stream.streamKey || ""} />
      </div>
    </div>
  );
}
