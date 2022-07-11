import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "../pages/Home";
import { UserAuth } from "../lib/Auth";
import {
  BellIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  LogoutIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

import { scrollDisableOnOverlay } from "../utils/disableScrollOnOverlay";

function Sidebar({ isOpen, setOpen }) {
  let { currentUser, logout } = UserAuth();

  //Prevent scroll when sidepanel is toggled open
  scrollDisableOnOverlay(isOpen);

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatedSideBar isOpen={isOpen} handleOpenMenu={handleOpenMenu}>
        <div className="flex flex-col gap-16 text-gray-500 title">
          <div className="flex justify-between">
            <Link to="/" onClick={handleOpenMenu} className="w-fit">
              <p className="text-xs font-thin">
                <span className="mt-2">BSCPE STORE</span>
              </p>
            </Link>
            <button className="pl-4" onClick={handleOpenMenu}>
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <CustomNavLink to="" onClick={handleOpenMenu}>
              <SideNavButton Icon={CustomHomeIcon} name={"Home"} />
            </CustomNavLink>

            <CustomNavLink to="cart" onClick={handleOpenMenu}>
              <SideNavButton Icon={ShoppingBagIcon} name={"Cart"} />
            </CustomNavLink>

            <CustomNavLink to="notifications" onClick={handleOpenMenu}>
              <SideNavButton Icon={BellIcon} name={"Notification"} />
            </CustomNavLink>

            <CustomNavLink to="about" onClick={handleOpenMenu}>
              <SideNavButton Icon={InformationCircleIcon} name={"About"} />
            </CustomNavLink>
          </div>
        </div>

        <div className="side-footer">
          <hr className="mb-2" />
          <div className="flex flex-col gap-2">
            <CustomNavLink to="account" onClick={handleOpenMenu}>
              <SideNavButton Icon={UserIcon} name={"Account"} />
            </CustomNavLink>

            {currentUser && (
              <button
                className="flex items-center justify-between gap-4 p-4 text-xs rounded-md shadow-inner bg-gray-50"
                onClick={() => {
                  logout();
                  handleOpenMenu();
                }}
              >
                <div className="flex items-center gap-4">
                  <LogoutIcon className="w-4 text-gray-400 -h-4" />{" "}
                  <p className="text-gray-600">Logout</p>
                </div>
              </button>
            )}
          </div>
          <div className="mt-10">
            <a href="https://adazolhub.com" target="_blank" rel="noreferrer">
              <p className="text-[0.65em] text-center text-gray-400">
                © Copyright 2022 | Adazolhub.com
              </p>
            </a>
          </div>
        </div>
      </AnimatedSideBar>
    </>
  );
}

function AnimatedSideBar({ isOpen, handleOpenMenu, children }) {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };
  const backdrop = {
    open: {
      opacity: 1,
      backgroundColor: "hsla(215, 28%, 17%, 0.7)",
      backdropFilter: "blur(1px)",
      display: "block",
    },
    closed: {
      opacity: 0,
      backgroundColor: "hsla(215, 0%, 0%, 0)",
      backdropFilter: "blur(0px)",
      display: "none",
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        key={"2"}
        variants={backdrop}
        animate={isOpen ? "open" : "closed"}
        className="fixed top-0 left-0 z-50 w-full h-full overflow-hidden cursor-pointer sm:hidden"
        onClick={handleOpenMenu}
      ></motion.div>
      <div
        className={[
          "fixed top-0 left-0 z-50 block w-56 h-full sm:hidden transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <nav
          className="relative top-0 z-50 flex flex-col justify-between w-full h-full p-4 bg-white shadow-md select-none rounded-r-md before:absolute before:w-full before:h-full before:bg-white before:-translate-x-full before:top-0 "
        >
          {children}
        </nav>
      </div>
    </AnimatePresence>
  );
}

function SideNavButton({ Icon, name }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="icon">
          <Icon className="w-4 h-4 text-gray-400/60" />
        </div>
        <p className="">{name}</p>
      </div>
      <ChevronRightIcon className="hidden w-4 h-4 group-hover:block" />
    </>
  );
}

function CustomNavLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to?.toLowerCase()}
      activeClassName="bg-gray-700 text-gray-200 shadow"
      inactiveClassName="hover:bg-gray-100 hover:shadow"
      onClick={onClick}
      className="flex items-center justify-between gap-4 px-4 py-4 text-xs transition-colors rounded-md cursor-pointer whitespace-nowrap text-gray-500/80 group"
    >
      {children}
    </NavLink>
  );
}

function CustomHomeIcon({ ...props }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.4612 30.718C29.8692 30.718 31.8292 32.664 31.8292 35.056V41.208C31.8292 41.722 32.2412 42.134 32.7692 42.146H36.5812C39.5852 42.146 42.0272 39.734 42.0272 36.77V19.322C42.0132 18.302 41.5272 17.342 40.6932 16.704L27.5072 6.188C25.7372 4.786 23.2612 4.786 21.4852 6.192L8.38916 16.7C7.52316 17.358 7.03716 18.318 7.02716 19.356V36.77C7.02716 39.734 9.46916 42.146 12.4732 42.146H16.3212C16.8632 42.146 17.3032 41.716 17.3032 41.188C17.3032 41.072 17.3172 40.956 17.3412 40.846V35.056C17.3412 32.678 19.2892 30.734 21.6792 30.718H27.4612ZM36.5812 45.146H32.7332C30.5292 45.094 28.8292 43.364 28.8292 41.208V35.056C28.8292 34.318 28.2152 33.718 27.4612 33.718H21.6892C20.9512 33.722 20.3412 34.324 20.3412 35.056V41.188C20.3412 41.338 20.3212 41.482 20.2792 41.618C20.0632 43.598 18.3712 45.146 16.3212 45.146H12.4732C7.81516 45.146 4.02716 41.388 4.02716 36.77V19.342C4.04716 17.354 4.96316 15.534 6.54516 14.336L19.6152 3.846C22.4932 1.566 26.5032 1.566 29.3752 3.842L42.5392 14.342C44.0852 15.52 45.0012 17.336 45.0272 19.3V36.77C45.0272 41.388 41.2392 45.146 36.5812 45.146Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Sidebar;
