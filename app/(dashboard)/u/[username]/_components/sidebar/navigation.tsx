"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

import { usePathname } from "next/navigation";
export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Dashboard",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Users",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
  ];
  if (!user?.username)
    return (
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    );

  return (
    <div className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};
