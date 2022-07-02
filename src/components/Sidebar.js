import { Link, matchRoutes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "../pages/Home";
import { UserAuth } from "../lib/Auth";
import { LogoutIcon } from "@heroicons/react/outline";

// function NavLink({
//   to,
//   exact,
//   className,
//   activeClassName,
//   inactiveClassName,
//   ...rest
// }) {
//   let location = useLocation();

//   let isActive = location.pathname === to;

//   let allClassNames =
//     className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
//   return <Link className={allClassNames} to={to} {...rest} />;
// }

function Sidebar({ isOpen, setOpen }) {
  let { currentUser, logout } = UserAuth();
  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };
  let test;

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

  return (
    <>
      {/* {isOpen && ( */}
      <AnimatePresence initial={false}>
        <motion.div
          key={"2"}
          variants={backdrop}
          transition={{ delay: 0.3 }}
          animate={isOpen ? "open" : "closed"}
          className="fixed top-0 left-0 z-50 w-full min-h-screen overflow-hidden cursor-pointer sm:hidden"
          onClick={handleOpenMenu}
        >
          <div className="fixed close top-4 right-4 hover:bg-slate-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#FAFAFA"
              />
            </svg>
          </div>
        </motion.div>
        <motion.nav
          key={"1"}
          className="fixed top-0 left-0 z-50 block w-[calc(70%)] h-full sm:hidden"
          variants={variants}
          transition={{ type: "tween", duration: 0.4 }}
          animate={isOpen ? "open" : "closed"}
        >
          <div className="fixed top-0 z-50 flex flex-col justify-between min-w-full min-h-screen p-4 bg-white rounded-r-lg shadow-md select-none before:absolute before:w-10 before:h-full before:bg-white before:-left-10 before:top-0">
            <div className="flex flex-col gap-16 text-gray-500 title">
              <Link to="/" onClick={handleOpenMenu} className="w-fit">
                <p className="font-thin">
                  <span className="mt-2">BSCPE STORE</span>
                </p>
              </Link>

              <div className="flex flex-col gap-1">
                <NavLink
                  to=""
                  activeClassName="bg-gray-700 text-gray-100"
                  inactiveClassName="hover:bg-gray-200"
                  onClick={handleOpenMenu}
                  className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
                >
                  <div className="flex items-center gap-6">
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 49 49"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M27.4612 30.718C29.8692 30.718 31.8292 32.664 31.8292 35.056V41.208C31.8292 41.722 32.2412 42.134 32.7692 42.146H36.5812C39.5852 42.146 42.0272 39.734 42.0272 36.77V19.322C42.0132 18.302 41.5272 17.342 40.6932 16.704L27.5072 6.188C25.7372 4.786 23.2612 4.786 21.4852 6.192L8.38916 16.7C7.52316 17.358 7.03716 18.318 7.02716 19.356V36.77C7.02716 39.734 9.46916 42.146 12.4732 42.146H16.3212C16.8632 42.146 17.3032 41.716 17.3032 41.188C17.3032 41.072 17.3172 40.956 17.3412 40.846V35.056C17.3412 32.678 19.2892 30.734 21.6792 30.718H27.4612ZM36.5812 45.146H32.7332C30.5292 45.094 28.8292 43.364 28.8292 41.208V35.056C28.8292 34.318 28.2152 33.718 27.4612 33.718H21.6892C20.9512 33.722 20.3412 34.324 20.3412 35.056V41.188C20.3412 41.338 20.3212 41.482 20.2792 41.618C20.0632 43.598 18.3712 45.146 16.3212 45.146H12.4732C7.81516 45.146 4.02716 41.388 4.02716 36.77V19.342C4.04716 17.354 4.96316 15.534 6.54516 14.336L19.6152 3.846C22.4932 1.566 26.5032 1.566 29.3752 3.842L42.5392 14.342C44.0852 15.52 45.0012 17.336 45.0272 19.3V36.77C45.0272 41.388 41.2392 45.146 36.5812 45.146Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p>Home</p>
                  </div>
                  <svg
                    className="hidden group-hover:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 12L10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>
                <NavLink
                  to="dashboard"
                  activeClassName="bg-gray-700 text-gray-100"
                  inactiveClassName="hover:bg-gray-200"
                  onClick={handleOpenMenu}
                  className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
                >
                  <div className="flex items-center gap-6">
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.63605 15.26H16.7262C16.9965 15.26 17.2322 15.0381 17.2322 14.74C17.2322 14.4419 16.9965 14.2201 16.7262 14.2201H8.7539C8.35875 14.2201 8.11612 13.9428 8.05373 13.5199L7.94281 12.792H16.74C17.7522 12.792 18.2721 12.1681 18.4177 11.1768L18.9723 7.50953C18.9861 7.41941 19 7.30849 19 7.2461C19 6.91334 18.7504 6.68458 18.3692 6.68458H7.04853L6.91681 5.80416C6.84749 5.27036 6.65338 5 5.94627 5H3.513C3.2357 5 3 5.24263 3 5.51993C3 5.80416 3.2357 6.04679 3.513 6.04679H5.85615L6.96534 13.6586C7.11092 14.643 7.63085 15.26 8.63605 15.26ZM17.8215 7.73137L17.3293 11.052C17.2738 11.4818 17.0451 11.7452 16.636 11.7452L7.79029 11.7522L7.20104 7.73137H17.8215ZM9.18371 18.6291C9.80763 18.6291 10.3068 18.1369 10.3068 17.5061C10.3068 16.8821 9.80763 16.383 9.18371 16.383C8.55286 16.383 8.05373 16.8821 8.05373 17.5061C8.05373 18.1369 8.55286 18.6291 9.18371 18.6291ZM15.6655 18.6291C16.2964 18.6291 16.7955 18.1369 16.7955 17.5061C16.7955 16.8821 16.2964 16.383 15.6655 16.383C15.0416 16.383 14.5355 16.8821 14.5355 17.5061C14.5355 18.1369 15.0416 18.6291 15.6655 18.6291Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    <p>Cart</p>
                  </div>
                  <svg
                    className="hidden group-hover:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 12L10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>
                <NavLink
                  to="notification"
                  activeClassName="bg-gray-700 text-gray-100"
                  inactiveClassName="hover:bg-gray-200"
                  onClick={handleOpenMenu}
                  className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
                >
                  <div className="flex items-center gap-6">
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.1759 8.88447C17.7785 8.88447 19.1182 7.55326 19.1182 5.94224C19.1182 4.33121 17.7785 3 16.1759 3C14.5564 3 13.2337 4.33121 13.2337 5.94224C13.2337 7.55326 14.5564 8.88447 16.1759 8.88447ZM5.28034 17.5162H13.8188C13.7509 18.6608 13.0217 19.39 11.9958 19.39C10.9783 19.39 10.2406 18.6608 10.1812 17.5162H8.85851C8.92634 19.1441 10.2067 20.5771 11.9958 20.5771C13.7933 20.5771 15.0737 19.1441 15.1415 17.5162H18.7197C19.5167 17.5162 20 17.1007 20 16.4902C20 15.6423 19.1351 14.8792 18.4059 14.1245C17.8463 13.5395 17.6937 12.3355 17.6259 11.3604C17.6174 10.7923 17.575 10.275 17.5241 9.77478C17.1256 9.91044 16.5999 9.98675 16.1844 9.96131C16.2353 10.4107 16.2692 10.9025 16.2777 11.4621C16.354 13.124 16.6423 14.2093 17.2443 14.8877C17.6937 15.3879 18.194 15.8797 18.3466 16.1341V16.2358H5.64494V16.1341C5.79756 15.8797 6.30631 15.3879 6.74722 14.8877C7.35771 14.2093 7.646 13.124 7.72231 11.4621C7.79014 7.76524 8.89242 6.57817 10.3423 6.18813C10.5543 6.13726 10.673 6.02703 10.6815 5.81505C10.7069 4.92475 11.2157 4.30578 11.9958 4.30578C12.1484 4.30578 12.2925 4.33121 12.4112 4.37361C12.5723 3.98357 12.7843 3.61897 13.0556 3.29677C12.7419 3.15262 12.3858 3.05935 11.9958 3.05935C10.7493 3.05935 9.8336 3.94118 9.55379 5.04346C7.29836 5.85745 6.43349 8.01961 6.37414 11.3604C6.30631 12.3355 6.15368 13.5395 5.59406 14.1245C4.85639 14.8792 4 15.6423 4 16.4902C4 17.1007 4.47483 17.5162 5.28034 17.5162Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p>Notification</p>
                  </div>
                  <svg
                    className="hidden group-hover:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 12L10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>
                <NavLink
                  to="settings"
                  activeClassName="bg-gray-700 text-gray-100"
                  inactiveClassName="hover:bg-gray-200"
                  onClick={handleOpenMenu}
                  className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
                >
                  <div className="flex items-center gap-6">
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.2449 19.985H12.7551C13.3308 19.985 13.772 19.6336 13.9065 19.0804L14.228 17.6822L14.4673 17.6L15.686 18.3477C16.172 18.6542 16.7327 18.5794 17.1439 18.1682L18.1907 17.129C18.6019 16.7178 18.6766 16.1495 18.3701 15.671L17.6075 14.4598L17.6972 14.2355L19.0953 13.9065C19.6411 13.772 20 13.3234 20 12.7551V11.2748C20 10.7065 19.6486 10.2579 19.0953 10.1234L17.7121 9.78692L17.615 9.54766L18.3776 8.33645C18.6841 7.85794 18.6093 7.2972 18.1981 6.8785L17.1514 5.83178C16.7477 5.42804 16.1869 5.35327 15.7009 5.65234L14.4822 6.4L14.228 6.3028L13.9065 4.90467C13.772 4.3514 13.3308 4 12.7551 4H11.2449C10.6692 4 10.228 4.3514 10.0935 4.90467L9.76449 6.3028L9.51028 6.4L8.29907 5.65234C7.81308 5.35327 7.24486 5.42804 6.84112 5.83178L5.80187 6.8785C5.39065 7.2972 5.30841 7.85794 5.62243 8.33645L6.37757 9.54766L6.28785 9.78692L4.90467 10.1234C4.3514 10.2579 4 10.7065 4 11.2748V12.7551C4 13.3234 4.35888 13.772 4.90467 13.9065L6.3028 14.2355L6.38505 14.4598L5.62991 15.671C5.31589 16.1495 5.39813 16.7178 5.80935 17.129L6.8486 18.1682C7.25981 18.5794 7.82804 18.6542 8.31402 18.3477L9.52523 17.6L9.76449 17.6822L10.0935 19.0804C10.228 19.6336 10.6692 19.985 11.2449 19.985ZM11.3645 18.8187C11.2374 18.8187 11.1701 18.7664 11.1477 18.6467L10.6991 16.7925C10.243 16.6804 9.81682 16.5009 9.49533 16.2991L7.86542 17.3009C7.7757 17.3682 7.6785 17.3533 7.58878 17.2636L6.70654 16.3813C6.6243 16.2991 6.61682 16.2093 6.67664 16.1047L7.6785 14.4897C7.50654 14.1757 7.31215 13.7495 7.19252 13.2935L5.33832 12.8523C5.21869 12.8299 5.16636 12.7626 5.16636 12.6355V11.3869C5.16636 11.2523 5.21121 11.1925 5.33832 11.1701L7.18505 10.7215C7.30467 10.2355 7.52897 9.79439 7.66355 9.51776L6.66916 7.9028C6.60187 7.79065 6.60935 7.70093 6.69159 7.61121L7.58131 6.74393C7.67103 6.65421 7.75327 6.63925 7.86542 6.70654L9.48037 7.68598C9.80187 7.50654 10.2579 7.31963 10.7065 7.19252L11.1477 5.33832C11.1701 5.21869 11.2374 5.16636 11.3645 5.16636H12.6355C12.7626 5.16636 12.8299 5.21869 12.8449 5.33832L13.3009 7.20748C13.7645 7.3271 14.1682 7.51402 14.5047 7.69346L16.1271 6.70654C16.2467 6.63925 16.3215 6.65421 16.4187 6.74393L17.3009 7.61121C17.3907 7.70093 17.3907 7.79065 17.3234 7.9028L16.329 9.51776C16.471 9.79439 16.6879 10.2355 16.8075 10.7215L18.6617 11.1701C18.7813 11.1925 18.8336 11.2523 18.8336 11.3869V12.6355C18.8336 12.7626 18.7738 12.8299 18.6617 12.8523L16.8 13.2935C16.6804 13.7495 16.4935 14.1757 16.314 14.4897L17.3159 16.1047C17.3757 16.2093 17.3757 16.2991 17.286 16.3813L16.4112 17.2636C16.314 17.3533 16.2243 17.3682 16.1271 17.3009L14.4972 16.2991C14.1757 16.5009 13.757 16.6804 13.3009 16.7925L12.8449 18.6467C12.8299 18.7664 12.7626 18.8187 12.6355 18.8187H11.3645ZM12 14.8486C13.5626 14.8486 14.8486 13.5626 14.8486 11.9925C14.8486 10.4374 13.5626 9.1514 12 9.1514C10.4374 9.1514 9.14393 10.4374 9.14393 11.9925C9.14393 13.5551 10.4299 14.8486 12 14.8486ZM12 13.6897C11.0729 13.6897 10.3103 12.9271 10.3103 11.9925C10.3103 11.0729 11.0729 10.3103 12 10.3103C12.9121 10.3103 13.6748 11.0729 13.6748 11.9925C13.6748 12.9196 12.9121 13.6897 12 13.6897Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p>Settings</p>
                  </div>
                  <svg
                    className="hidden group-hover:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 12L10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>
                <NavLink
                  to="about"
                  activeClassName="bg-gray-700 text-gray-100"
                  inactiveClassName="hover:bg-gray-200"
                  onClick={handleOpenMenu}
                  className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
                >
                  <div className="flex items-center gap-6">
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p>About</p>
                  </div>
                  <svg
                    className="hidden group-hover:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 12L10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>

            <div className="side-footer">
              <div className="flex flex-col gap-4">
                <NavLink
                  to="account"
                  activeClassName="bg-gray-700 text-gray-100"
                  inactiveClassName="hover:bg-gray-200"
                  state={test}
                  onClick={handleOpenMenu}
                  className="flex items-center justify-between gap-6 px-4 py-4 rounded-md cursor-pointer whitespace-nowrap group"
                >
                  <div className="flex items-center gap-6">
                    <div className="icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0046 12.49C14.1843 12.49 15.9611 10.5484 15.9611 8.18546C15.9611 5.84087 14.1935 4 12.0046 4C9.834 4 8.04808 5.8775 8.04808 8.20378C8.05724 10.5575 9.82484 12.49 12.0046 12.49ZM12.0046 11.107C10.6674 11.107 9.52261 9.82484 9.52261 8.20378C9.52261 6.61019 10.6491 5.38294 12.0046 5.38294C13.3692 5.38294 14.4865 6.59187 14.4865 8.18546C14.4865 9.80653 13.3509 11.107 12.0046 11.107ZM6.24385 20.9616H17.7562C19.2765 20.9616 20 20.5037 20 19.4963C20 17.0967 16.9685 13.6256 12.0046 13.6256C7.03148 13.6256 4 17.0967 4 19.4963C4 20.5037 4.72353 20.9616 6.24385 20.9616ZM5.81339 19.5787C5.57527 19.5787 5.47453 19.5146 5.47453 19.3223C5.47453 17.8203 7.8008 15.0086 12.0046 15.0086C16.1992 15.0086 18.5255 17.8203 18.5255 19.3223C18.5255 19.5146 18.4339 19.5787 18.1958 19.5787H5.81339Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <p>Profile</p>
                  </div>
                  <svg
                    className="hidden group-hover:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 12L10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </NavLink>

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
      {/* // )} */}
    </>
  );
}

export default Sidebar;
