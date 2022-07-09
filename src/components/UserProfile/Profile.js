import { Outlet, useNavigate } from "react-router-dom";
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
import Settings from "./Settings";
import { ToggleState } from "../../lib/ToggleState";
import ScrollToTop from "../../utils/ScrollToTop";

const Profile = () => {
  let { settingToggleHandler } = ToggleState();
  let navigate = useNavigate();
  return (
    <div className="flex flex-col w-full max-w-screen-sm gap-4 px-4 py-4 mx-auto text-gray-600 lg:max-w-screen-lg bg-slate-100">
      <div className="flex justify-between w-full">
      <ScrollToTop />
        <User />
        <button>
          <BellIcon
            className="w-5 h-5 text-gray-400"
            onClick={() => {
              navigate("notification");
              settingToggleHandler();
            }}
          />
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
          {/* <div className="p-4 text-xs text-gray-500 border border-gray-300 border-dashed rounded-md">
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
          </div> */}
        </div>
        <hr />
        {/* <Settings /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
