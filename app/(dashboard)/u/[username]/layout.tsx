"use client";

import { getSelfByUsername } from "@/lib/auth-service";
import { redirect, useParams } from "next/navigation";

import { NavBar } from "./_components/navbar";
import { SideBar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  children: React.ReactNode;
  params: {
    username: string;
  };
}

const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");

  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <SideBar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
