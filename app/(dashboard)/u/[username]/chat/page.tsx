import { getStreamByUserId } from "@/lib/stream-serivce";
import { ToggleCard } from "./_components/ToggleCard";
import { getSelf } from "@/lib/auth-service";
import { Skeleton } from "@/components/ui/skeleton";
const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self?.id);

  if (!stream) return <div>No stream found</div>;

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Chat Enabled"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Chat Delayed"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="must be a follower to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
