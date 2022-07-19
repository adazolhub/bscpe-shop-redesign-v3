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
} from "react-router-dom";
import { UserAuth } from "../../lib/Auth";
import { ToggleState } from "../../lib/ToggleState";
import { scrollDisableOnOverlay } from "../../utils/disableScrollOnOverlay";

const Settings = () => {

  const { currentUser, logout } = UserAuth();
  let { settingToggle, settingToggleHandler } = ToggleState();
  scrollDisableOnOverlay(settingToggle);
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
      <div className="flex items-start gap-2 px-2 py-3 text-gray-300 rounded-md shadow-lg cursor-pointer bg-gradient-to-br from-gray-700/95 to-neutral-900">
        <div className="pt-1 pb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
        </div>
        <div className="text-[.65em] ">
          <h3
            className="text-[1.08em] font-medium my-1 "
            onClick={() => {
              navigate("about");
              settingToggleHandler();
            }}
          >
            BSCPE STORE V2 <span>(re-design)</span>
          </h3>
          {/* <h4 className="font-medium text-gray-600/80">About</h4> */}
          <p className="leading-3 tracking-normal mr-7 text-gray-400/50 ">
            This is a personal project design. Selected as the case study on
            redesigning the User Interface and User Experience, to implement the
            knowledged i've through taking up{" "}
            <span className="font-medium text-gray-300/60">
              bootcamp courses online
            </span>{" "}
            (coursera, udemy, other open-source learning platform), specially
            the{" "}
            <a
              className="font-medium underline text-gray-300/60"
              href="https://www.coursera.org/professional-certificates/google-ux-design"
              target="_blank"
              rel="noreferrer"
            >
              Google UX Design Professional Certificate
            </a>{" "}
            course on coursera which tackle some discline on building design.
          </p>
          <span
            className="font-medium text-[1.05em] text-gray-300/80 inline-flex items-center border border-gray-500 px-2 py-1 rounded-md mt-3"
            onClick={() => {
              navigate("about");
              settingToggleHandler();
            }}
          >
            Read more <ChevronRightIcon className="h-3" />
          </span>
        </div>
      </div>
    </>
  );
}

export default Settings;
