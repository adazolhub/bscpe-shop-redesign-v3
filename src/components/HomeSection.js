import HomeCarousel from "./Carousel/HomeCarousel";

import Trending from "./Trending";
import { Outlet } from "react-router-dom";
import { NavLink } from "../pages/Home";
import { ToggleState } from "../lib/ToggleState";

const HomeSection = ({ user }) => {
  return (
    <div className="container gap-4 mx-auto min-h-fit top-11" id="home">
      <div className="grid w-full py-2 mx-auto sm:container lg:gap-4 lg:grid-cols-main-aside lg:grid-rows-main-aside">
        <HomeCarousel />

        <Trending />
        <Tabs />
        {/* //list viewBox */}
        <Outlet />
      </div>
    </div>
  );
};

function Tabs() {
  let { toggleHeadNotify } = ToggleState();
  return (
    <div
      className={[
        "sticky z-40 px-2 mt-2 text-xs font-thin text-center text-gray-400 bg-gray-100 border-b-2 border-gray-100  dark:border-gray-300 lg:col-span-2 lg:col-start-1 mb-[1px]",
        toggleHeadNotify ? "top-20" : "top-11",
      ].join(" ")}
    >
      <ul className="flex -mb-px font-thin flex-nowrap">
        <NavLink
          to={""}
          activeClassName="active"
          className="category-menu"
          exact={true}
        >
          Men{" "}
        </NavLink>
        <NavLink to={"1"} activeClassName="active" className="category-menu">
          Women
        </NavLink>
        <NavLink to={"2"} activeClassName="active" className="category-menu">
          Kids
        </NavLink>
      </ul>
    </div>
  );
}

export default HomeSection;
