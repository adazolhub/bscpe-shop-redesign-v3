import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "../pages/Home";
import { UserAuth } from "../lib/Auth";
import {
  BellIcon,
  ChevronRightIcon,
  CogIcon,
  HomeIcon,
  InformationCircleIcon,
  LogoutIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from "@heroicons/react/outline";

import { scrollDisableOnOverlay } from "../utils/disableScrollOnOverlay";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};
const backdrop = {
  open: {
    opacity: 1,
    backgroundColor: "hsla(215, 28%, 17%, 0.7)",
    backdropFilter: "blur(4px)",
    display: "block",
  },
  closed: {
    opacity: 0,
    backgroundColor: "hsla(215, 0%, 0%, 0)",
    backdropFilter: "blur(0px)",
    display: "none",
  },
};

function Sidebar({ isOpen, setOpen }) {
  let { currentUser, logout } = UserAuth();

  //Prevent scroll when sidepanel is toggled open
  scrollDisableOnOverlay(isOpen);

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={"2"}
          variants={backdrop}
          transition={{ delay: 0.3 }}
          animate={isOpen ? "open" : "closed"}
          className="fixed top-0 left-0 z-50 w-full min-h-screen overflow-hidden cursor-pointer sm:hidden"
          onClick={handleOpenMenu}
        >
          {/* <div className="fixed rounded-sm close top-4 right-4 hover:bg-gray-600">
            <XIcon className="w-5 h-5 text-white" />
          </div> */}
        </motion.div>
        <motion.nav
          key={"1"}
          className="fixed top-0 left-0 z-50 block w-[calc(70%)] h-full sm:hidden"
          variants={variants}
          transition={{ type: "tween", duration: 0.4 }}
          animate={isOpen ? "open" : "closed"}
        >
          <div className="fixed top-0 z-50 flex flex-col justify-between min-w-full min-h-screen p-4 bg-white shadow-md select-none rounded-r-md before:absolute before:w-10 before:h-full before:bg-white before:-left-10 before:top-0 ">
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
              <div className="flex flex-col gap-4">
                <CustomNavLink to="account" onClick={handleOpenMenu}>
                  <SideNavButton Icon={UserIcon} name={"Account"} />
                </CustomNavLink>

                {currentUser && (
                  <button
                    className="flex items-center justify-between gap-6 p-4 bg-gray-100 rounded-md shadow-inner"
                    onClick={() => {
                      logout();
                      handleOpenMenu();
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <LogoutIcon className="w-4 -h-4" /> Logout
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}

function SideNavButton({ Icon, name }) {
  return (
    <>
      <div className="flex items-center gap-6">
        <div className="icon">
          <Icon className="w-4 h-4" />
        </div>
        <p>{name}</p>
      </div>
      <ChevronRightIcon className="hidden w-4 h-4 group-hover:block" />
    </>
  );
}

function CustomNavLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to?.toLowerCase()}
      activeClassName="bg-gray-700 text-gray-100"
      inactiveClassName="hover:bg-gray-200"
      onClick={onClick}
      className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
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
