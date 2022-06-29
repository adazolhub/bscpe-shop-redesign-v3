import { GlobeIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { ToggleState } from "../../lib/ToggleState";
import Modal from "../Overlay/Modal";

const AddItem = () => {
  let { modalToggle, modalToggleHandler } = ToggleState();
  let [publish, setPublish] = useState("Publish");
  let [items, setItems] = useState({
    "product-name": null,
    "product-description": null,
    "product-quantity": null,
    "product-image": null,
  });

  let handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target["button"]);
    setPublish(
      <GlobeIcon className="w-full h-6 mx-auto text-center animate-spin" />
    );

    setTimeout(() => {
      setItems({
        "product-name": null,
        "product-description": null,
        "product-quantity": null,
        "product-image": null,
      });
      setPublish("Publish");
    }, 3000);
  };

  let handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setItems((values) => ({ ...values, [name]: value }));
  };

  return (
    <Modal modalToggle={modalToggle} modalToggleHandler={modalToggleHandler}>
      <div className="overflow-hidden rounded-md">
        <form className="grid gap-4 px-2 " onSubmit={handleSubmit}>
          <input
            className="p-2 rounded-sm outline-none "
            type="text"
            name="product-name"
            id=""
            value={items["product-name"] || ""}
            onChange={handleChange}
            placeholder="T-Shirt Blue"
          />
          <input
            className="p-2 rounded-sm outline-none "
            type="number"
            name="product-quantity"
            id=""
            min={1}
            value={items["product-quantity"] || ""}
            onChange={handleChange}
            placeholder="1"
          />
          <textarea
            className="p-2 rounded-sm outline-none resize-none"
            name="product-description"
            id=""
            cols="20"
            rows="10"
            value={items["product-description"] || ""}
            onChange={handleChange}
            placeholder="Product description here"
          ></textarea>
          <label
            htmlFor="upload-image"
            className="grid p-4 text-xs text-gray-400 rounded-md cursor-pointer outline-dashed outline-1 outline-offset-2 outline-gray-400/90 place-items-center"
          >
            <p>Upload Product Cover</p>
          </label>
          <input
            className="hidden"
            type="file"
            name="product-image"
            accept="image/*"
            value={items["product-image"] || ""}
            onChange={handleChange}
            id="upload-image"
          />
          <button className="flex-1 btn-primary" type="submit" name="button">
            {publish}
          </button>
        </form>
        <div className="flex w-full gap-4 px-2">
          <button type="cancel" className="w-full btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddItem;
