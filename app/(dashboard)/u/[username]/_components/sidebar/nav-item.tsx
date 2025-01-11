"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

export const NavItem = ({ href, icon: Icon, label }: NavItemProps) => {
  const { collapsed } = useCreatorSidebar();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start pl-3",
          isActive && "bg-accent"
        )}
      >
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Button>
    </Link>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
