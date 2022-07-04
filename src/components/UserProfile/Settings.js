import {
  ChevronRightIcon,
  CreditCardIcon,
  ExclamationCircleIcon,
  MapIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { formatRelative, fromUnixTime } from "date-fns";
import React from "react";
import {
  Outlet,
  useNavigate,
  useParams,
  use,
  useLocation,
} from "react-router-dom";
import { UserAuth } from "../../lib/Auth";
import { ToggleState } from "../../lib/ToggleState";

const Settings = () => {
  let location = useLocation();
  const { currentUser, logout } = UserAuth();
  let { settingToggleHandler } = ToggleState();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex flex-col max-w-screen-sm gap-4 ">
      <div className="flex flex-col gap-2">
        <p className="text-[0.7em] text-gray-400">Settings</p>
        <ButtonWithIcon
          Icon={ShoppingBagIcon}
          onClick={() => {
            navigate("cart");
            settingToggleHandler();
          }}
        >
          My shopping cart
        </ButtonWithIcon>
        <ButtonWithIcon
          Icon={UserIcon}
          onClick={() => {
            navigate("account-details");
            settingToggleHandler();
          }}
        >
          Account detail
        </ButtonWithIcon>
        <ButtonWithIcon
          Icon={CreditCardIcon}
          onClick={() => {
            navigate("payment-information");
            settingToggleHandler();
          }}
        >
          Payment information
        </ButtonWithIcon>
        <ButtonWithIcon
          Icon={MapIcon}
          onClick={() => {
            navigate("shipping-address");
            settingToggleHandler();
          }}
        >
          Shipping address
        </ButtonWithIcon>
        <ButtonWithIcon
          Icon={ShieldExclamationIcon}
          onClick={() => {
            navigate("account-ownership-and-control");
            settingToggleHandler();
          }}
        >
          Account ownership and control
        </ButtonWithIcon>
        <button
          onClick={handleLogout}
          className="px-16 py-4 mx-auto font-medium rounded-md w-fit text-rose-400 hover:text-rose-600 hover:bg-rose-100/70 "
        >
          Sign Out
        </button>
      </div>

      <Outlet />
      <Info />
      <p className="text-[0.6em] text-center text-gray-400/70 ">
        Last login:{" "}
        {formatRelative(
          fromUnixTime(currentUser?.metadata.createdAt / 1000),
          new Date()
        )}
      </p>
    </div>
  );
};

function ButtonWithIcon({ children, Icon, ...props }) {
  return (
    <>
      <button
        {...props}
        className="flex items-center justify-between px-4 py-4 bg-white rounded-md shadow-sm hover:bg-gray-50 group"
      >
        <span className="inline-flex items-center gap-4 ">
          {Icon && (
            <Icon className="w-5 h-5 transition-all md:w-6 md:h-6 text-gray-400/70 group-hover:text-gray-400/50 group-hover:scale-95" />
          )}
          <p className="text-sm transition-all text-gray-500/90 group-hover:text-gray-500/50 md:text-base ">
            {children}
          </p>
        </span>
        <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 text-gray-400/70" />
      </button>
    </>
  );
}

function Info() {
  const navigate = useNavigate();
  let { settingToggleHandler } = ToggleState();
  return (
    <>
      <div
        className="flex items-start gap-2 px-2 py-3 bg-white rounded-md shadow-lg cursor-pointer"
        onClick={() => {
          navigate("about");
          settingToggleHandler();
        }}
      >
        <div className="py-1 text-slate-700/70">
          <ExclamationCircleIcon className="w-5 h-5" />
        </div>
        <div className="text-[.65em] text-gray-500/70">
          <h3 className="text-[1.08em] text-slate-600/80 font-medium my-1 ">
            BSCPE STORE V2 <span>(re-design)</span>
          </h3>
          <h4 className="font-medium text-gray-600/80">About</h4>
          <p className="mr-6 leading-3 tracking-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquid
            dolorem asperiores eveniet laboriosam, cupiditate error delectus
            adipisci optio voluptas.
          </p>
        </div>
      </div>
    </>
  );
}

export default Settings;
