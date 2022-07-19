import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../auth/firebase";

import Modal from "../Overlay/Modal";

const RemoveItem = ({ modalToggle, modalToggleHandler }) => {
  let handleDelete = () => {
    deleteDoc(doc(db, "products", "NClTd3Zb8b3hDJOE29Ef"));
  };
  return (
    <Modal modalToggle={modalToggle} modalToggleHandler={modalToggleHandler}>
      <div className="overflow-hidden rounded-md">
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
        <p className="grid gap-4 p-4 bg-gray-200 ">Remove Item</p>
      </div>
      <button onClick={handleDelete}> Delelete</button>
    </Modal>
  );
};

export default RemoveItem;
