import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./Following";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const follows = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended recommended={recommended} />
        <Following follows={follows} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 collapsed:lg:w-[70px] h-full bg-background border-r border-[#2d2e35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
      <FollowingSkeleton />
    </aside>
  );
};
