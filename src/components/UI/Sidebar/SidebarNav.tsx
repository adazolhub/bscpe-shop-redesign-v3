import {
  ArrowRightIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon,
  LogoutIcon,
  ShoppingBagIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  HomeIcon as HomeIconLine,
  ShoppingBagIcon as ShoppingBagIconLine,
  ViewGridIcon as ViewGridIconLine,
} from "@heroicons/react/outline";
import React, { SVGProps } from "react";
import style from "./SidebarNav.module.css";
import { Modal, StaticState } from "../../../types";
import CustomNavLink from "../../../utils/others/CustomNavLink";
import { UserAuth } from "../../../utils/lib/Auth";
import { useNavigate } from "react-router-dom";
import { ToggleState } from "../../../utils/lib/ToggleState";
import Dropdown from "../Buttons/Dropdown";
export const SidebarNav = ({ state, toggleStateHandler }: Modal) => {
  let { currentUser, logout }: any = UserAuth();

  let navigate = useNavigate();
  let { toggleStateHandler: rootStateHandler } = ToggleState() as StaticState;
  return (
    <>
      {state && (
        <button onClick={toggleStateHandler} className={style.backdrop} />
      )}
      <div
        className={[
          style.side_bar,
          state ? style.side_bar_active : "",
          currentUser
            ? "grid-rows-[144px,_1fr,_144px]"
            : "grid-rows-[144px,_1fr,_78px]",
        ].join(" ")}
      >
        <div className={style.side_bar_header}>
          <div className="bg-[url(https://images.unsplash.com/photo-1604066867775-43f48e3957d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)] h-full bg-cover bg-center mix-blend-multiply absolute inset-0"></div>
          <div className={style.top}>
            <button
              tabIndex={state ? 0 : -1}
              onClick={() => {
                toggleStateHandler();
                rootStateHandler("notification");
              }}
              className="btn_icon"
            >
              <BellIcon />
            </button>
            <button
              tabIndex={state ? 1 : -1}
              className="btn_icon"
              onClick={toggleStateHandler}
            >
              <XIcon />
            </button>
          </div>
          <div className={style.bottom}>
            <h2>BSCPE Store V2</h2>
            <p>Lorem ipsum dolor sit.</p>
          </div>
        </div>

        <nav>
          {/* <button className={style.active}>
          <div>
          <span><HomeIcon /> </span>
          <span>Home</span>
          </div>
        </button>
        <button>
          <div>
          <span><ShoppingBagIconLine /></span>
          <span>Shopping cart</span>
          </div>
        </button>
        <button>
          <div>
          <span><ViewGridIconLine /></span>
          <span>Categories</span>

          </div>
          <span><ChevronDownIcon /></span>
        </button>
        <button>
          <div>
          <span><InformationCircleIcon /></span>
          <span>About</span>

          </div>
        </button> */}
          <CustomNavLink to="" onClick={toggleStateHandler}>
            <SideNavButton Icon={HomeIconLine} name={"Home"} />
          </CustomNavLink>

          <button
            onClick={() => {
              toggleStateHandler();
              rootStateHandler("cart");
            }}
          >
            <SideNavButton Icon={ShoppingBagIcon} name={"Shopping cart"} />
          </button>

          <Dropdown />

          <CustomNavLink to="about" onClick={toggleStateHandler}>
            <SideNavButton Icon={InformationCircleIcon} name={"About"} />
          </CustomNavLink>
        </nav>
        <footer className={style.footer}>
          {currentUser ? (
            <CustomNavLink to="account" onClick={toggleStateHandler}>
              <SideNavButton Icon={UserIcon} name={"Account"} />
            </CustomNavLink>
          ) : (
            <button
              onClick={() => {
                toggleStateHandler();
                navigate("/login");
              }}
              className={style.login}
            >
              <span />
              <span>Login/Signup</span>
              <span>
                <ArrowRightIcon />
              </span>
            </button>
          )}

          {currentUser && (
            <button
              className="flex items-center justify-between gap-4 p-4 text-xs rounded-md shadow-inner bg-gray-50"
              onClick={() => {
                logout();
                toggleStateHandler();
              }}
            >
              <div className="flex items-center gap-4">
                <LogoutIcon className="w-4 text-gray-400 -h-4" />{" "}
                <p className="text-gray-600">Logout</p>
              </div>
            </button>
          )}
        </footer>
      </div>
    </>
  );
};

function SideNavButton({ Icon, name }: { Icon?: any; name: string }) {
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
