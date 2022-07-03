import React, { useState } from "react";
import { ToggleState } from "../../lib/ToggleState";
import MenuModalFull from "../Overlay/MenuModalFull";
import ShoppingCart from "./ShoppingCart";

const CartWrapper = () => {
  let { cartToggle, cartToggleHandler } = ToggleState();
  return (
    <div>
      <MenuModalFull
        modalToggle={cartToggle}
        modalToggleHandler={cartToggleHandler}
      >
        <ShoppingCart />
      </MenuModalFull>
    </div>
  );
};

export default CartWrapper;
