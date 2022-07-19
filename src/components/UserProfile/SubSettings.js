import React from "react";
import { useLocation } from "react-router-dom";
import { ToggleState } from "../../lib/ToggleState";
import MenuModalFull from "../Overlay/MenuModalFull";
import AccountDetails from "./Settings/AccountDetails";
import PaymentInformation from "./Settings/PaymentInformation";
import ShippingAddress from "./Settings/ShippingAddress";
import AccountOwnershipAndControl from "./Settings/AccountOwnershipAndControl";
import NotificationPanel from "../Notification/NotificationPanel";
import ShoppingCart from "../Cart/ShoppingCart";
import About from "../../pages/About";
import Profile from "./Profile";
import { scrollDisableOnOverlay } from "../../utils/disableScrollOnOverlay";

const SubSettings = () => {
  let { pathname } = useLocation();
  let location = pathname.split("/")[2];
  let { settingToggle, settingToggleHandler } = ToggleState();
  //Prevent scroll when modal is toggled open
  scrollDisableOnOverlay(settingToggle);

  return (
    <MenuModalFull
      modalToggle={settingToggle}
      modalToggleHandler={settingToggleHandler}
      title={location}
    >
      {location === "notification" ? (
        <NotificationPanel />
      ) : location === "cart" ? (
        <ShoppingCart />
      ) : location === "account-details" ? (
        <AccountDetails />
      ) : location === "payment-information" ? (
        <PaymentInformation />
      ) : location === "shipping-address" ? (
        <ShippingAddress />
      ) : location === "account-ownership-and-control" ? (
        <AccountOwnershipAndControl />
      ) : location === "about" ? (
        <About />
      ) : (
        <Profile />
      )}
    </MenuModalFull>
  );
};

export default SubSettings;
