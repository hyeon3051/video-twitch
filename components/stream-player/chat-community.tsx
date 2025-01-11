"use client";

import { useParticipants } from "@livekit/components-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "@/components/stream-player/community-item";
import { RemoteParticipant, LocalParticipant } from "livekit-client";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 1000);
  const participants = useParticipants();

  const onChange = (newvalue: string) => {
    setValue(newvalue);
  };

  const filterdParticipants = useMemo(() => {
    const dedupedParticipants = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${hostName}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);
    return dedupedParticipants.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <p className="text-sm text-muted-foreground">
          Community is disabled now
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block">
          No results
        </p>
        {filterdParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name || ""}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
