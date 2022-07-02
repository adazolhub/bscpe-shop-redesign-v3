import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../lib/Auth";
import { fromUnixTime, formatDistanceToNow, formatRelative } from "date-fns";

import { auth } from "../../auth/firebase";
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
    <div className="flex flex-col w-full max-w-screen-sm px-4 py-4 mx-auto text-gray-600 bg-slate-100">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <User />
          <button>
            <BellIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="h-32 w-full bg-gradient-to-bl from-gray-800/80 to-gray-900 rounded-lg shadow-lg flex px-8 py-8 items-start justify-between">
          <div className=" text-gray-500  text-[0.65em] ">
            <p className="text-sm font-light text-gray-300">
              Friday Special Promo!
            </p>
            <p className="max-w-[30ch]">
              Get 25% OFF promo code coupon as for friday special sale
            </p>
          </div>
          <h2 className="text-4xl font-medium text-gray-200">25%</h2>
        </div>

        <div className="flex flex-col gap-2 my-4">
          <ButtonWithIcon Icon={ShoppingBagIcon}>Shopping cart</ButtonWithIcon>
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
            className="font-medium w-fit mx-auto text-rose-400 hover:text-rose-600 py-4 px-16 hover:bg-rose-100/70 rounded-md "
          >
            Sign Out
          </button>
        </div>
        <Info />
        <p className="text-xs text-center text-gray-400 ">
          Last login:{" "}
          {formatRelative(
            fromUnixTime(currentUser?.metadata.createdAt / 1000),
            new Date()
          )}
        </p>
      </div>
    </div>
  );
};

function ButtonWithIcon({ children, Icon }) {
  return (
    <>
      <button className="flex hover:bg-gray-50 justify-between py-4 px-4 items-center shadow-sm rounded-md bg-white group">
        <span className="inline-flex gap-4 items-center ">
          {Icon && (
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400/70 group-hover:text-gray-400/50 group-hover:scale-95 transition-all" />
          )}
          <p className="text-gray-500/90 group-hover:text-gray-500/50 text-sm md:text-base transition-all ">
            {children}
          </p>
        </span>
        <ChevronRightIcon className="group-hover:translate-x-1 transition-transform w-5 h-5 text-gray-400/70" />
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
          <h4 className="text-gray-600/80 font-medium">About</h4>
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
