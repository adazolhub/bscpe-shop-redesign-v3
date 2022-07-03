import React from "react";
import { UserAuth } from "../../../lib/Auth";
import WrapperScroll from "../../Overlay/WrapperScroll";

const ShippingAddress = () => {
  return (
    <WrapperScroll>
      <AccountInformation />
    </WrapperScroll>
  );
};

function AccountInformation() {
  let { currentUser } = UserAuth();
  return (
    <div className="p-2 my-1 bg-white rounded-md shadow">
      <p className="text-[0.65em] text-gray-500/50">Address</p>

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

export default ShippingAddress;
