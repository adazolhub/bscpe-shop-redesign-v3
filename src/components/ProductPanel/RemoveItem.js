import React, { useState } from "react";
import { ToggleState } from "../../lib/ToggleState";
import MenuModal from "../Overlay/MenuModal";
import Modal from "../Overlay/Modal";

const RemoveItem = ({ modalToggle, modalToggleHandler }) => {
  return (
    <MenuModal
      modalToggle={modalToggle}
      modalToggleHandler={modalToggleHandler}
    >
      <div className="overflow-hidden rounded-md">
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
      </div>
    </MenuModal>
  );
};

export default RemoveItem;
