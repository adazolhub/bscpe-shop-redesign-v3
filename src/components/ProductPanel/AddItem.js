import { ChevronDownIcon, GlobeIcon } from "@heroicons/react/outline";
import React, { useCallback, useState } from "react";
import { ToggleState } from "../../lib/ToggleState";
import Modal from "../Overlay/Modal";
import { motion } from "framer-motion";
import { db, storage } from "../../auth/firebase";
import {
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import getCroppedImg from "../External/cropImage";
import Cropper from "react-easy-crop";
import { UserAuth } from "../../lib/Auth";
import MenuModal from "../Overlay/MenuModal";

const AddItem = () => {
  //context state
  let { currentUser } = UserAuth();
  let { modalToggle, modalToggleHandler } = ToggleState();

  //button text state
  let [publish, setPublish] = useState("Publish Product");

  //local product state
  let [items, setItems] = useState({
    "product-name": null,
    "product-description": null,
    "product-quantity": null,
    "product-image": null,
    "image-name": null,
    "product-category": "men",
  });

  //image cropper config
  const CROP_AREA_ASPECT = 6 / 9;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //form submit handler
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (
        items["product-image"] &&
        items["product-name"] &&
        items["product-quantity"] &&
        items["product-description"] &&
        items["product-price"]
      ) {
        setPublish(
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-6 mx-auto text-center animate-spin"
            >
              <path
                d="M16 2.66663V7.99996"
                stroke="#FAFAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 24V29.3333"
                stroke="#9E9E9E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5733 6.57336L10.3466 10.3467"
                stroke="#F5F5F5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.6533 21.6533L25.4267 25.4267"
                stroke="#9E9E9E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.66666 16H7.99999"
                stroke="#E0E0E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 16H29.3333"
                stroke="#9E9E9E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5733 25.4267L10.3466 21.6533"
                stroke="#BDBDBD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.6533 10.3467L25.4267 6.57336"
                stroke="#9E9E9E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        );
        const croppedImg = await getCroppedImg(
          items["product-image"],
          croppedAreaPixels
        );
        const storageRef = ref(
          storage,
          `products/${currentUser.uid}-${items["image-name"]
            .split(/\s/g)
            .join("-")}`
        );
        uploadBytes(storageRef, croppedImg, {
          contentType: "image/jpeg",
        }).then((snap) => {
          getDownloadURL(storageRef).then((snapshot) => {
            createProductList(
              items["product-category"],
              currentUser.uid,
              items["product-name"],
              items["product-description"],
              +items["product-quantity"],
              snapshot,
              +items["product-price"]
            );
          });
        });

        setTimeout(() => {
          //clear product local state
          setItems({
            "product-name": null,
            "product-description": null,
            "product-quantity": null,
            "product-image": null,
            "image-name": null,
            "product-category": "men",
          });

          //reset button text
          setPublish("Publish Product");

          //reset croppedimage data
          // setCroppedImage(null);

          //close modal
          modalToggleHandler();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //image uploader
  let handleImageChange = (event) => {
    let value = event.target.files[0];

    setItems((values) => ({
      ...values,
      "product-image": URL.createObjectURL(value),
      "image-name": value.name,
    }));
  };

  //input event handler
  let handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setItems((values) => ({ ...values, [name]: value }));
  };

  let category = [
    {
      label: "Men",
      value: "men",
    },
    {
      label: "Women",
      value: "women",
    },
    {
      label: "Kids",
      value: "kids",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  let handleCategory = (e) => {
    let value = e.target.value;
    setItems((values) => ({ ...values, "product-category": value }));
  };

  return (
    <MenuModal
      modalToggle={modalToggle}
      modalToggleHandler={modalToggleHandler}
    >
      <div className="flex justify-between p-2 shadow-sm">
        <p>Product details</p>
        <div>
          <ChevronDownIcon className="w-5 h-5" onClick={modalToggleHandler} />
        </div>
      </div>
      <div className="overflow-hidden rounded-md">
        <form
          className="grid h-full gap-4 px-1"
          onSubmit={async (e) => await handleSubmit(e)}
        >
          <div className="relative px-1 py-2 overflow-y-scroll min-h-[9em] max-h-[52vh] flex flex-col gap-4">
            <label
              className="flex items-center gap-4 text-[.7em] font-thin text-gray-400/70"
              htmlFor="category"
            >
              Category
              {/* <input
                className="p-2 text-sm text-gray-600 border rounded-md outline-none border-gray-300/70"
                type={''}
              /> */}
              <select
                onChange={handleCategory}
                id="category"
                className="p-2 text-sm text-gray-600 border rounded-md outline-none border-gray-300/30 min-w-[10em]"
              >
                {category.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label
              className="flex flex-col gap-1 text-[.7em] font-thin text-gray-400/70"
              htmlFor="name"
            >
              Product name
              <input
                className="p-2 text-sm text-gray-600 border rounded-md outline-none border-gray-300/70"
                type="text"
                name="product-name"
                id="name"
                value={items["product-name"] || ""}
                onChange={handleChange}
                placeholder="T-Shirt Blue"
                autoComplete="off"
              />
            </label>
            <label
              className="flex flex-col gap-1 text-[.7em] font-thin text-gray-400/70"
              htmlFor="description"
            >
              Product description
              <textarea
                className="p-2 text-sm text-gray-600 border rounded-md outline-none resize-none border-gray-300/70"
                name="product-description"
                id="description"
                cols="20"
                rows="3"
                value={items["product-description"] || ""}
                onChange={handleChange}
                placeholder="Product description here"
              ></textarea>
            </label>
            <label
              className="flex flex-col gap-1 text-[.7em] font-thin text-gray-400/70"
              htmlFor="quantity"
            >
              Quantity
              <input
                className="p-2 text-sm text-gray-600 border rounded-md outline-none border-gray-300/70"
                type="number"
                name="product-quantity"
                id="quantity"
                min={1}
                value={items["product-quantity"] || ""}
                onChange={handleChange}
                placeholder="1"
              />
            </label>
            <label
              className="flex flex-col gap-1 text-[.7em] font-thin text-gray-400/70"
              htmlFor="price"
            >
              Price (PHP)
              <input
                className="p-2 text-sm text-gray-600 border rounded-md outline-none border-gray-300/70"
                type="number"
                name="product-price"
                id="price"
                // value={items["product-price"] || ""}
                onChange={handleChange}
                placeholder="500"
              />
            </label>
            {items["product-image"] && (
              <div className="grid p-4 text-xs text-gray-400 rounded-md cursor-pointer outline-dashed outline-1 outline-offset-2 outline-gray-400/90 place-items-center min-h-[20em] relative mx-6">
                <Cropper
                  image={items["product-image"]}
                  aspect={CROP_AREA_ASPECT}
                  crop={crop}
                  zoom={zoom}
                  zoomWithScroll
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  // cropSize={{ width: 100, height: 100 }}
                  objectFit={"auto-cover"}
                  onCropComplete={onCropComplete}
                />
              </div>
            )}
            <label
              htmlFor="upload-image"
              className="relative grid p-1 mt-4 text-xs text-gray-400 rounded-md cursor-pointer outline-dashed outline-1 outline-offset-2 outline-gray-400/90 place-items-center"
            >
              {items["product-image"] ? (
                <p>Change Product Cover</p>
              ) : (
                <p className="grid h-20 place-content-center">
                  Upload Product Cover
                </p>
              )}
            </label>
            <input
              className="hidden"
              type="file"
              name="product-image"
              accept="image/*"
              onChange={handleImageChange}
              id="upload-image"
            />
          </div>
          <div className="flex w-full gap-2 ">
            <button className="flex-1 btn-primary" type="submit" name="button">
              {publish}
            </button>
            <button
              type="cancel"
              className=" btn-secondary"
              onClick={() => {
                setItems({
                  "product-name": null,
                  "product-description": null,
                  "product-quantity": null,
                  "product-image": null,
                });
                modalToggleHandler();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </MenuModal>
  );
};

const createProductList = (
  type,
  UserID,
  name,
  description,
  quantity,
  image,
  price = null
) => {
  let productCollectRef = collection(db, "products");
  return addDoc(productCollectRef, {
    publishedAt: serverTimestamp(),
    product_name: name,
    product_description: description,
    product_quantity: quantity,
    product_image: image,
    ownerID: UserID,
    product_category: type,
    price: price,
  })
    .then(() => {
      console.log("success!");
    })
    .catch((error) => console.log(error));
};

export default AddItem;
