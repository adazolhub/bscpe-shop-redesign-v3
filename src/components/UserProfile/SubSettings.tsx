import { useLocation } from "react-router-dom";
import About from "../../pages/About";
import { States, StaticState } from "../../types";
import { scrollDisableOnOverlay } from "../../utils/hooks/useScrollDisable";
import { ToggleState } from "../../utils/lib/ToggleState";
import ModalCart from "../Cart/ModalCart";
import ShoppingCart from "../Cart/ShoppingCart";
import NotificationPanel from "../Notification/NotificationPanel";
import ModalSide from "../UI/Modal/Side/ModalSide";
import Profile from "./Profile";
import AccountDetails from "./Settings/AccountDetails";
import AccountOwnershipAndControl from "./Settings/AccountOwnershipAndControl";
import PaymentInformation from "./Settings/PaymentInformation";
import ShippingAddress from "./Settings/ShippingAddress";

const SubSettings = () => {
  let { pathname } = useLocation();
  let location = pathname.split("/")[2];

  const { toggleState, toggleStateHandler } = ToggleState() as StaticState;
  let { settingToggle, settingToggleHandler } = ToggleState() as States;
  //Prevent scroll when modal is toggled open
  scrollDisableOnOverlay(toggleState["settings"]);

  return (
    <ModalSide
      state={toggleState["settings"]}
      toggleStateHandler={() => toggleStateHandler("settings")}
      title={location}
    >
      {location === "notification" ? (
        <NotificationPanel />
      ) : location === "cart" ? (
        <ModalCart />
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
    </ModalSide>
  );
};

export default SubSettings;
