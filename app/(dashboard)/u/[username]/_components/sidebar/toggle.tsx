"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebar();

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} asChild>
            <Button onClick={onExpand} variant="ghost" size="icon">
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="w-full hidden lg:flex items-center justify-between p-3 pl-6 mb-2">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} asChild>
            <Button onClick={onCollapse} variant="ghost" size="icon">
              <ArrowLeftToLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};
