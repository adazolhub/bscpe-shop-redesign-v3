import React, { useEffect, useState } from "react";
import AddItem from "../components/ProductPanel/AddItem";

import { ToggleState } from "../lib/ToggleState";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { UserAuth } from "../lib/Auth";
import { Outlet } from "react-router-dom";
import { TrashIcon, XIcon } from "@heroicons/react/outline";
import Modal from "../components/Overlay/Modal";

let docRef = collection(db, "products");

class Product {
  constructor(
    product_id,
    product_name,
    product_description,
    product_image,
    product_quantity,
    product_price,
    product_category,
    publishedAt
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_image = product_image;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
    this.product_category = product_category;
    this.publishedAt = publishedAt;
  }

  get() {
    return {
      product_id: this.product_id,
      product_name: this.product_name,
      product_description: this.product_description,
      product_image: this.product_image,
      product_quantity: this.product_quantity,
      product_price: this.product_price || null,
      product_category: this.product_category,
      publishedAt: this.publishedAt,
    };
  }
}

const Dashboard = () => {
  let { modalToggleHandler } = ToggleState();
  let [modalToggle, setModalToggle] = useState(false);
  let [list, setList] = useState([]);
  let { currentUser: user } = UserAuth();
  let [currentItem, setCurrentItem] = useState(null);

  let handleToggle = (data) => {
    setModalToggle((prev) => !prev);
    setCurrentItem(data);
  };
  // console.log(list);
  useEffect(() => {
    let q = query(docRef, where("ownerID", "==", user.uid));
    const unsub = onSnapshot(q, (qSnapshot) => {
      let qList = [];
      qSnapshot.forEach((doc) => {
        // console.log(doc.data());
        qList.push(
          new Product(
            doc.id,
            doc.data().product_name,
            doc.data().product_description,
            doc.data().product_image,
            doc.data().product_quantity,
            doc.data().price,
            doc.data().product_category,
            doc.data().publishedAt
          ).get()
        );
      });

      setList([...qList]);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-6em)] mt-12 mx-3">
        <section>
          <p>Dashboard</p>
          <button
            className="mr-2 btn-primary"
            onClick={() => modalToggleHandler("test")}
          >
            {" "}
            Add new product
          </button>
          <button className="btn-primary"> Modal</button>
          <ListProduct id={user.uid} list={list} handleToggle={handleToggle} />

          <Outlet />
        </section>
      </div>

      <AddItem />
      <ProductDetails
        modalToggle={modalToggle}
        modalToggleHandler={handleToggle}
        data={currentItem}
      />
    </>
  );
};

const ListProduct = ({ list = [], handleToggle }) => {

  return (
    <>
      <ul className="flex flex-col gap-2 mb-2 text-gray-400">
        {list.length > 0 ? (
          list?.map((data, index) => (
            <li
              key={index}
              onClick={() => handleToggle(data)}
              className="flex gap-2 p-2 transition-all bg-white border border-gray-300 border-dashed rounded-md cursor-pointer hover:scale-[1.02]"
            >
              <img
                src={data.product_image}
                alt={data.product_name}
                className="object-cover w-20 h-full rounded-md opacity-100 bg-blend-overlay"
              />

              <div className="relative">
                <p className="text-[0.55em] line-clamp-1 text-gray-400/80 ">
                  SKU: {data.product_id.toUpperCase()}
                </p>
                <h3 className="font-medium text-gray-500 line-clamp-2">
                  {data.product_name}
                </h3>
                {/* <p className="text-xs line-clamp-1">
                  {data.product_description}
                </p> */}
                <div className="absolute flex gap-4 mt-2 bottom-1">
                  <p className="text-xs">
                    Quantity:{" "}
                    <span className="font-medium text-gray-500/90">
                      {data.product_quantity}
                    </span>{" "}
                  </p>
                  <p className="text-xs">
                    Price:{" "}
                    <span className="font-medium text-gray-500/90">
                      {data.product_price}.00 PHP
                    </span>
                  </p>
                </div>
              </div>

              {/* <button
                className=" btn-link"
                onClick={() => handleDelete(data?.product_id)}
              >
                <TrashIcon className="w-5 h-5 text-red-400" />
              </button> */}
            </li>
          ))
        ) : (
          <li> No Published product yet</li>
        )}
      </ul>
    </>
  );
};

function ProductDetails({ modalToggle, modalToggleHandler, data }) {
  // let test = modalToggleHandler();
  let handleDelete = (id) => {
    deleteDoc(doc(db, "products", id)).then(() => modalToggleHandler());
  };
  return (
    <>
      {modalToggle && (
        <Modal
          modalToggle={modalToggle}
          modalToggleHandler={modalToggleHandler}
        >
          <div className="relative -mt-4 text-xs text-gray-400 ">
            <div className="sticky flex items-start justify-between pb-2 -top-4 bg-gray-50 ">
              <div className="my-1 text-[0.8em]"></div>

              <button className="pl-6" onClick={() => modalToggleHandler()}>
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="">
                <img
                  src={data?.product_image}
                  alt={data?.product_name}
                  className="object-cover h-full rounded-md w-28"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-[0.8em]">
                    SKU: {data?.product_id.toUpperCase()}
                  </p>
                  <p className="text-base text-gray-600 ">
                    {data?.product_name}
                  </p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p>Category: </p>
                    <p className="text-gray-500">{data?.product_category}</p>
                  </div>
                  <div>
                    <p>Quantity: </p>
                    <p className="text-gray-500">{data?.product_quantity}</p>
                  </div>
                  <div>
                    <p>Price: </p>
                    <p className="text-gray-500">{data?.product_price}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4">
              <p>Description: </p>
              <p className="mt-1 text-sm text-gray-500">
                {data?.product_description}
              </p>
            </div>
            <div className="my-4">
              <p>Description: </p>
              <p className="mt-1 text-sm text-gray-500">
                {data?.product_description}
              </p>
            </div>

            <button className="w-full btn-secondary">UPDATE PRODUCT</button>
            <button
              className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-md text-rose-500 bg-rose-100/70 hover:shadow"
              onClick={() => handleDelete(data?.product_id)}
            >
              <TrashIcon className="w-5 h-5" />
              <p>Delete Product</p>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
