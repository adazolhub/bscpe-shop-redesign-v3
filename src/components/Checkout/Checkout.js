import React, { useState } from "react";
import Modal from "../Overlay/Modal";

const Checkout = () => {
  let [toggle, setToggle] = useState(true);
  let handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <div>
        <p>Checkout</p>
      </div>
    </>
  );
};

export default Checkout;
