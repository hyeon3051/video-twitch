import { NavBar } from "../(browse)/_components/navbar";
import { Sidebar, SidebarSkeleton } from "../(browse)/_components/sidebar";
import { Container } from "../(browse)/_components/container";
import { Suspense } from "react";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
