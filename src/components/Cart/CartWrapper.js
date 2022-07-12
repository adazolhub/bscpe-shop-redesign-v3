import React from "react";
import { useLocation } from "react-router-dom";
import { ToggleState } from "../../lib/ToggleState";
import NotificationPanel from "../Notification/NotificationPanel";
import MenuModalFull from "../Overlay/MenuModalFull";
import ShoppingCart from "./ShoppingCart";

const CartWrapper = () => {
  let { pathname } = useLocation();
  let location = pathname.split("/")[1];
  let { cartToggle, cartToggleHandler } = ToggleState();
  return (
    <div>
      <MenuModalFull
        modalToggle={cartToggle}
        modalToggleHandler={cartToggleHandler}
      >
        {location === "notification" ? <NotificationPanel /> : <ShoppingCart />}
      </MenuModalFull>
    </div>
  );
};

export default CartWrapper;
