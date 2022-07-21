import { BadgeCheckIcon, CameraIcon } from "@heroicons/react/outline";
import React from "react";
import { UserAuth } from "../../../utils/lib/Auth";

import SubSettingsButton from "./SubSettingsButton";
import SubContainer from "./SubContainer";

const AccountDetails = () => {
  return (
    <>
      <AccountProfile />
      <AccountInformation />
    </>
  );
};

function AccountProfile() {
  let { currentUser }: any = UserAuth();
  return (
    <div className="text-sm mb-14 profile">
      <div className="relative ">
        <div className="w-[calc(100%)] px-2 bg-[url(https://images.unsplash.com/photo-1502491679664-f49ac0da5b58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)] bg-cover bg-center bg-slate-400 bg-blend-multiply h-32  rounded-md relative">
          <img
            src={
              currentUser.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/bscpe-store-v2.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=60bbf95e-c1ad-4fb5-80a4-c81c07558fa4"
            }
            className="absolute w-24 h-24 bg-gray-800 border-4 border-gray-100 rounded-full -bottom-14"
            alt="profile_picture"
          />
          <button className="absolute p-2 border-2 border-gray-400 rounded-full -bottom-7 left-[2.4em] bg-gray-800/60">
            <CameraIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="absolute mt-2 left-[8em]">
          <div className="flex items-center gap-1">
            <p className="">
              {currentUser.displayName} <span></span>
            </p>
            {currentUser?.emailVerified && (
              <BadgeCheckIcon className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <p className="text-[0.75em] text-gray-400/60 leading-4">
            {currentUser.email}
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountInformation() {
  let { currentUser }: any = UserAuth();
  return (
    <SubContainer title={"Account Information"}>
      <SubSettingsButton
        name="Account Number"
        value={currentUser?.uid.toUpperCase()}
      />
      <SubSettingsButton
        name="Display Name"
        value={currentUser?.displayName}
        editable
        modifier={"Change Name"}
      />
      {currentUser?.emailVerified && (
        <SubSettingsButton name="Full Name" value={currentUser?.displayName} />
      )}
      <SubSettingsButton name="Email" value={currentUser?.email} />
      <SubSettingsButton
        name="Type of Account"
        value={
          currentUser?.emailVerified ? "Verified Account" : "Unverified Account"
        }
        editable={currentUser?.emailVerified ? false : true}
        modifier={"Verify Now"}
      />
      <SubSettingsButton
        name="Date of Account Creation"
        value={currentUser?.metadata.creationTime}
      />
    </SubContainer>
  );
}

export default AccountDetails;
