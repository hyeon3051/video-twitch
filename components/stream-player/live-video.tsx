"use client";

import { Participant, Track } from "livekit-client";
import { useRef, useState, useEffect } from "react";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volumne-control";
interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(10);

  const onVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value / 100;
    }
  };

  const toggleMuted = () => {
    const isMuted = volume == 0;
    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      wrapperRef.current?.requestFullscreen();
      setIsFullscreen(true);
    }
  };
  console.log(participant);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication?.track?.attach(videoRef.current);
      }
    });

  const handleFullScreenChange = () => {
    const isCurrentFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentFullscreen);
  };

  useEventListener(
    "fullscreenchange" as keyof WindowEventMap,
    handleFullScreenChange
  );

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 w-full h-full opacity-90 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMuted}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            setIsFullscreen={() => toggleFullscreen()}
          />
        </div>
      </div>
    </div>
  );
};
