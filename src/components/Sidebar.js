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
                  <SideNavButton Icon={HomeIcon} name={"Home"} />
                </CustomNavLink>

                <CustomNavLink to="cart" onClick={handleOpenMenu}>
                  <SideNavButton Icon={ShoppingBagIcon} name={"Cart"} />
                </CustomNavLink>

                <CustomNavLink to="notification" onClick={handleOpenMenu}>
                  <SideNavButton Icon={BellIcon} name={"Notification"} />
                </CustomNavLink>

                <CustomNavLink to="settings" onClick={handleOpenMenu}>
                  <SideNavButton Icon={CogIcon} name={"Settings"} />
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

export default Sidebar;
