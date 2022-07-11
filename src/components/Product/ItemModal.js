import React from "react";
import { useState } from "react";
import MenuModal from "../Overlay/MenuModal";

const ItemModal = () => {
    let [toggleItem, setToggleItem ] = useState(true)

    const toggleItemHandler = () => {
        setToggleItem(!toggleItem)
    }
  return (
    <>
      <MenuModal modalToggle={toggleItem} modalToggleHandler={toggleItemHandler}>
        <div>ItemModal</div>
      </MenuModal>
    </>
  );
};

export default ItemModal;
