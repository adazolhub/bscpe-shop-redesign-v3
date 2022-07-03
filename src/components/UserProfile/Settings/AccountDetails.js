import { BadgeCheckIcon } from "@heroicons/react/outline";
import React from "react";
import { UserAuth } from "../../../lib/Auth";
import WrapperScroll from "../../Overlay/WrapperScroll";

const AccountDetails = () => {
  let { currentUser } = UserAuth();

  return (
    <WrapperScroll>
      <AccountProfile />
      <AccountInformation />
    </WrapperScroll>
  );
};

function AccountProfile() {
  let { currentUser } = UserAuth();
  console.log(currentUser);
  return (
    <div className="text-sm mb-14 profile">
      <div className="relative ">
        <div className="w-[calc(100%)] px-2 bg-slate-700 relative h-32  rounded-lg">
          <img
            src={
              currentUser.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/bscpe-store-v2.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=60bbf95e-c1ad-4fb5-80a4-c81c07558fa4"
            }
            className="absolute w-24 h-24 bg-gray-800 border-4 border-gray-100 rounded-full -bottom-14"
            alt="profile_picture"
          />
        </div>
        <div className="absolute mt-2 left-[8em]">
          <div className="flex items-center gap-1">
            <p className="">
              {currentUser.displayName} <span></span>
            </p>
            <BadgeCheckIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[0.8em] text-gray-400/60">{currentUser.email}</p>
        </div>
      </div>
    </div>
  );
}

function AccountInformation() {
  let { currentUser } = UserAuth();
  return (
    <div className="p-2 my-1 bg-white rounded-md shadow">
      <p className="text-[0.65em] text-gray-500/50">Account Information</p>

      <div className="flex flex-col gap-4 mt-8 text-gray-500">
        <div className="text-xs">
          <p>{currentUser.uid.toUpperCase()}</p>
          <p className="text-[0.8em] text-gray-400/80">Account Number</p>
        </div>
        <div className="text-xs">
          <p>{currentUser.displayName}</p>
          <p className="text-[0.8em] text-gray-400/80">Display Name</p>
        </div>
        <div className="text-xs">
          <p>----</p>
          <p className="text-[0.8em] text-gray-400/80">Full Name</p>
        </div>
        <div className="text-xs">
          <p>{currentUser.email}</p>
          <p className="text-[0.8em] text-gray-400/80">Email</p>
        </div>
        <div className="text-xs">
          <p>
            {currentUser?.emailVerified
              ? "Verified Account"
              : "Unverified Account"}
          </p>
          <p className="text-[0.8em] text-gray-400/80">Type of Account</p>
        </div>
        <div className="text-xs">
          <p>{currentUser?.metadata.creationTime}</p>
          <p className="text-[0.8em] text-gray-400/80">
            Date of Account Creation
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
