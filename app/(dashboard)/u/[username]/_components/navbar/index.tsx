"use client";

import { Logo } from "./logo";
import { Actions } from "./actions";

export const NavBar = () => {
  return (
    <nav className="fixed top j-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center">
      <Logo />
      <Actions />
    </nav>
  );
};
