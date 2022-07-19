import React from "react";
import { useLocation } from "react-router-dom";
import { ToggleState } from "../../utils/lib/ToggleState";
import NotificationPanel from "../Notification/NotificationPanel";

import ShoppingCart from "./ShoppingCart";

const CartWrapper = () => {
  let { pathname } = useLocation();
  let location = pathname.split("/")[1];

  //TODOS: Need to fix types of the Toggle State (temporarily set to 'any')
  let { cartToggle, cartToggleHandler } : any = ToggleState();
  return (
    <div>
      <>
        {location === "notification" ? <NotificationPanel /> : <ShoppingCart />}
      </>
    </div>
  );
};

export default CartWrapper;
