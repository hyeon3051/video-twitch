"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSkeleton } from "./toggle";
import { FollowingSkeleton } from "./Following";
interface SidebarWrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: SidebarWrapperProps) => {
  const [isClient, setIsClient] = useState(false)
  const { collapsed } = useSidebar();
  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient) {
    return <aside className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton /> 
      <FollowingSkeleton />
    </aside>
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50",
        collapsed && "w-16"
      )}
    >
      {children}
    </aside>
  );
};
