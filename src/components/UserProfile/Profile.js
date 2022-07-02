import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../lib/Auth";
import { fromUnixTime, formatRelative } from "date-fns";

import User from "./User";
import {
  BellIcon,
  UserIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  CreditCardIcon,
  MapIcon,
  ShieldExclamationIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

const Profile = () => {
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full max-w-screen-sm gap-4 px-4 py-4 mx-auto text-gray-600 lg:max-w-screen-lg bg-slate-100">
      <div className="flex justify-between w-full">
        <User />
        <button>
          <BellIcon className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col lg:min-w-[30em] lg:max-w-screen-md gap-4 lg:mt-6">
          <div className="flex items-start justify-between w-full h-32 px-4 py-8 rounded-lg shadow-lg bg-gradient-to-bl from-gray-800/80 to-gray-900">
            <div className=" text-gray-500  text-[0.65em] ">
              <p className="text-sm font-light text-gray-300">
                Friday Special Promo!
              </p>
              <p className="max-w-[30ch]">
                Get 25% OFF promo code coupon as for friday special sale
              </p>
            </div>
            <h2 className="text-5xl font-medium text-gray-200">25%</h2>
          </div>
          <div className="p-4 text-xs text-gray-500 border border-gray-300 border-dashed rounded-md">
            <div className="flex justify-between">
              <p>Pending orders</p>
              <p className="underline">See all</p>
            </div>
            <div className="flex justify-between gap-4 p-4 mt-2 bg-white rounded-md shadow">
              <div>
                <p className="text-[0.68em] text-gray-500/70">Order ID</p>
                <p>1234676</p>
              </div>
              <div>
                <p className="text-[0.68em] text-gray-500/70">ETA Delivery</p>
                <p>14 days</p>
              </div>
              <div>
                <p className="text-[0.68em] text-gray-500/70">Total Price</p>
                <p>PHP 1,245.00</p>
              </div>
            </div>
            <div className="flex justify-between gap-4 p-4 mt-2 bg-white rounded-md shadow">
              <div>
                <p className="text-[0.68em] text-gray-500/70">Order ID</p>
                <p>1234676</p>
              </div>
              <div>
                <p className="text-[0.68em] text-gray-500/70">ETA Delivery</p>
                <p>14 days</p>
              </div>
              <div>
                <p className="text-[0.68em] text-gray-500/70">Total Price</p>
                <p>PHP 1,245.00</p>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="flex flex-col max-w-screen-sm gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="text-[0.7em] text-gray-400">Settings</p>
            <ButtonWithIcon Icon={ShoppingBagIcon}>
              My shopping cart
            </ButtonWithIcon>
            <ButtonWithIcon Icon={UserIcon}>Account detail</ButtonWithIcon>
            <ButtonWithIcon Icon={CreditCardIcon}>
              Payment information
            </ButtonWithIcon>
            <ButtonWithIcon Icon={MapIcon}>Shipping address</ButtonWithIcon>
            <ButtonWithIcon Icon={ShieldExclamationIcon}>
              Account ownership and control
            </ButtonWithIcon>
            <button
              onClick={handleLogout}
              className="px-16 py-4 mx-auto font-medium rounded-md w-fit text-rose-400 hover:text-rose-600 hover:bg-rose-100/70 "
            >
              Sign Out
            </button>
          </div>
          <Info />
          <p className="text-[0.6em] text-center text-gray-400/70 ">
            Last login:{" "}
            {formatRelative(
              fromUnixTime(currentUser?.metadata.createdAt / 1000),
              new Date()
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

function ButtonWithIcon({ children, Icon }) {
  return (
    <>
      <button className="flex items-center justify-between px-4 py-4 bg-white rounded-md shadow-sm hover:bg-gray-50 group">
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
  return (
    <>
      <div className="flex items-start gap-2 px-2 py-3 bg-white rounded-md shadow-lg">
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

export default Profile;
