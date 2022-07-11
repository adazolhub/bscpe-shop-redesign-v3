import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";

import { UserAuth } from "../lib/Auth";
import { motion } from "framer-motion";

import Sidebar from "./Sidebar";
import { NavLink } from "../pages/Home";
import ShopState from "../lib/ShopState";
import { ToggleState } from "../lib/ToggleState";
import {
  DotsVerticalIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  ShoppingBagIcon,
  LoginIcon,
} from "@heroicons/react/outline";
const Heading = () => {
  //Navigation header title
  let { pathname } = useLocation();

  let { products } = ShopState();

  const [open, setOpen] = useState(false);

  const { currentUser } = UserAuth();

  let { cartToggleHandler } = ToggleState();

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };
  let navigate = useNavigate();
  // console.log(currentUser)
  return (
    <>
      <header className="sticky top-0 z-30 w-full px-2 text-xs font-thin text-gray-500 bg-white sm:px-4 lg:px-5">
        {/* HEADER NOTIFICATION */}
        <HeaderNotifier />

        {/* NAVIGATION HEADER */}
        <nav className="flex justify-between items-center container mx-auto min-h-[48px]">
          <div className="block hambuger sm:hidden">
            <button
              className={[
                "p-1 transition-all rounded-md hover:text-gray-700 focus:text-gray-900 hover:bg-gray-100 ",
                open ? "-rotate-90" : "rotate-0",
              ].join(" ")}
              onClick={handleOpenMenu}
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="logo flex leading-[0.6em] my-auto">
            {pathname === "/1" ||
            pathname === "/2" ||
            pathname === "/" ||
            pathname === "/notification" ? (
              <>
                <h1 className="whitespace-nowrap ">BSCPE STORE</h1>
                <span className="bg-gray-100 px-1 rounded-md font-light text-emerald-500 text-[0.6em] ml-1 border border-gray-300 mb-1">
                  Beta
                </span>
              </>
            ) : pathname === "/login" || pathname === "/register" ? (
              <>
                {/* <h1 className="whitespace-nowrap ">BSCPE STORE</h1>
                <span className="bg-gray-100 px-1 rounded-md font-light text-emerald-500 text-[0.6em] ml-1 border border-gray-300 mb-1">
                  Beta
                </span> */}
              </>
            ) : (
              <>
                <h1 className="whitespace-nowrap ">
                  {pathname.split("/")[1].toUpperCase()}
                </h1>
              </>
            )}
          </div>
          <div className="flex items-center side">
            <ul className="items-center hidden gap-2 text-gray-400 sm:flex lg:gap-2">
              <li>
                <NavLink
                  activeClassName="bg-gray-200 text-gray-500"
                  inactiveClassName="hover:bg-gray-100"
                  className="flex items-center gap-2 p-2 rounded-md lg:px-4 lg:py-2 "
                  to={""}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.4612 30.718C29.8692 30.718 31.8292 32.664 31.8292 35.056V41.208C31.8292 41.722 32.2412 42.134 32.7692 42.146H36.5812C39.5852 42.146 42.0272 39.734 42.0272 36.77V19.322C42.0132 18.302 41.5272 17.342 40.6932 16.704L27.5072 6.188C25.7372 4.786 23.2612 4.786 21.4852 6.192L8.38916 16.7C7.52316 17.358 7.03716 18.318 7.02716 19.356V36.77C7.02716 39.734 9.46916 42.146 12.4732 42.146H16.3212C16.8632 42.146 17.3032 41.716 17.3032 41.188C17.3032 41.072 17.3172 40.956 17.3412 40.846V35.056C17.3412 32.678 19.2892 30.734 21.6792 30.718H27.4612ZM36.5812 45.146H32.7332C30.5292 45.094 28.8292 43.364 28.8292 41.208V35.056C28.8292 34.318 28.2152 33.718 27.4612 33.718H21.6892C20.9512 33.722 20.3412 34.324 20.3412 35.056V41.188C20.3412 41.338 20.3212 41.482 20.2792 41.618C20.0632 43.598 18.3712 45.146 16.3212 45.146H12.4732C7.81516 45.146 4.02716 41.388 4.02716 36.77V19.342C4.04716 17.354 4.96316 15.534 6.54516 14.336L19.6152 3.846C22.4932 1.566 26.5032 1.566 29.3752 3.842L42.5392 14.342C44.0852 15.52 45.0012 17.336 45.0272 19.3V36.77C45.0272 41.388 41.2392 45.146 36.5812 45.146Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden text-gray-500 lg:block">Home</span>
                </NavLink>
              </li>

              {pathname !== "/login" && pathname !== "/register" && (
                <li>
                  <NavLink
                    activeClassName="bg-gray-200 text-gray-500"
                    inactiveClassName="hover:bg-gray-100"
                    className="flex items-center gap-2 p-2 rounded-md lg:px-4 lg:py-2"
                    to={"notification"}
                    onClick={() => cartToggleHandler()}
                  >
                    <BellIcon className="w-4 h-4 text-gray-400" />
                    <span className="hidden text-gray-500 lg:block">
                      Notification
                    </span>
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  activeClassName="bg-gray-200 text-gray-500"
                  inactiveClassName="hover:bg-gray-100"
                  className="flex items-center gap-2 p-2 rounded-md lg:px-4 lg:py-2"
                  to={"cart"}
                >
                  <div className="relative">
                    <ShoppingBagIcon className="w-4 h-4" />
                    {products.length > 0 && (
                      <div className="absolute -top-2 -right-2 px-1 py-[1px] rounded-full bg-gray-700 text-white leading-3 text-[0.62em] ">
                        <p className="w-[2ch] text-center">{products.length}</p>
                      </div>
                    )}
                  </div>
                  <span className="hidden text-gray-500 lg:block">Cart </span>
                </NavLink>
              </li>
              {currentUser ? (
                <li>
                  <NavLink
                    activeClassName="bg-gray-200 text-gray-500"
                    inactiveClassName="hover:bg-gray-100"
                    className="flex items-center gap-2 p-2 rounded-md lg:px-4 lg:py-2"
                    to={"account"}
                  >
                    <div className="w-5 h-5 rounded-full">
                      <img
                        src={
                          currentUser?.photoURL ||
                          "https://firebasestorage.googleapis.com/v0/b/bscpe-store-v2.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=60bbf95e-c1ad-4fb5-80a4-c81c07558fa4"
                        }
                        alt={currentUser?.displayName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="hidden text-gray-500 lg:block">
                      {currentUser?.displayName}
                    </span>
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    className="flex items-center gap-2 px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-900 hover:text-gray-50 lg:px-4 lg:py-2"
                    to={"login"}
                  >
                    {" "}
                    Login{" "}
                  </NavLink>
                </li>
              )}
            </ul>
            {currentUser ? (
              <button
                className="block px-1 rounded-md sm:hidden"
                onClick={() => navigate("/account")}
              >
                <div className="w-5 h-5 rounded-full">
                  <img
                    src={
                      currentUser?.photoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/bscpe-store-v2.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=60bbf95e-c1ad-4fb5-80a4-c81c07558fa4"
                    }
                    alt={currentUser?.displayName}
                    className="object-cover w-full h-full"
                  />
                </div>
              </button>
            ) : (
              <button
                className="flex sm:hidden items-center gap-2 px-1 py-1 text-[0.8em] text-gray-500 bg-gray-50 rounded-md hover:bg-gray-100 hover:text-gray-600/70"
                onClick={() => navigate("/login")}
              >
                <LoginIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </nav>
      </header>
      <motion.div>
        <Sidebar isOpen={open} setOpen={setOpen} />
      </motion.div>
    </>
  );
};

function HeaderNotifier() {
  let { toggleHeadNotify, toggleHeadNotifyHandler } = ToggleState();
  let navigate = useNavigate();
  return (
    <>
      {" "}
      {toggleHeadNotify && (
        <div className="flex justify-between items-center px-4 py-2 -mx-2 sm:-mx-4 lg:-mx-5 text-[0.8em] text-gray-300/80 bg-gradient-to-tr from-gray-900 to-emerald-800">
          <div />
          <p onClick={() => navigate("/about")}>
            This is a new version of Bscpe Store web app.{" "}
            <span className="underline">More details</span>{" "}
          </p>
          <XIcon className="w-3 h-3" onClick={toggleHeadNotifyHandler} />
        </div>
      )}
    </>
  );
}

export default Heading;
