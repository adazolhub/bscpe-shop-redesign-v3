import Trending from "./Trending";
import { Outlet } from "react-router-dom";

import { ToggleState } from "../../utils/lib/ToggleState";
import HomeCarousel from "../Carousel/HomeCarousel";
import NavLink from "../../utils/others/NavLink";
import useMeasure from "react-use-measure";

const HomeSection = () => {
  return (
    <>
      <div className="container gap-4 mx-auto min-h-fit top-11" id="home">
        <div className="grid w-full py-2 mx-auto sm:container lg:gap-4 lg:grid-cols-main-aside lg:grid-rows-main-aside">
          <HomeCarousel />

          <Trending />
          <Tabs />
          {/* //list viewBox */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

function Tabs() {
  //TODOS: Need to fix types of the Toggle State (temporarily set to 'any')
  // let { toggleHeadNotify }: any = ToggleState();
  const [ref, { top, y }] = useMeasure({ polyfill: IntersectionObserver });
  console.log(y);
  return (
    <div
      ref={ref}
      className={[
        "sticky z-40 px-2 mt-2 text-xs font-thin text-center text-gray-400 bg-white  lg:col-span-2 lg:col-start-1 mb-[1px] top-[var(--height-top)] ",
      ].join(" ")}
    >
      <ul className="grid grid-cols-3 p-1 -mb-px font-thin transition-all duration-500 lg:flex flex-nowrap transform-gpu">
        <NavLink
          to={"0"}
          activeClassName="bg-black w-full lg:w-auto text-gray-200 "
          className="px-6 py-3 rounded"
          exact={true}
        >
          <>Men</>
        </NavLink>
        <NavLink
          to={"1"}
          activeClassName="bg-black w-full lg:w-auto text-gray-200 "
          className="px-6 py-3 rounded"
        >
          Women
        </NavLink>
        <NavLink
          to={"2"}
          activeClassName="bg-black w-full lg:w-auto text-gray-200 "
          className="px-6 py-3 rounded"
        >
          Kids
        </NavLink>
      </ul>
    </div>
  );
}

export default HomeSection;
