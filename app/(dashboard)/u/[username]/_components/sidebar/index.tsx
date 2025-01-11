import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Navigation } from "./navigation";

export const SideBar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
