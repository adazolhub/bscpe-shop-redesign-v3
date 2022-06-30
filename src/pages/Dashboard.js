import React, { useEffect, useState } from "react";
import AddItem from "../components/ProductPanel/AddItem";
import RemoveItem from "../components/ProductPanel/RemoveItem";
import { ToggleState, ToggleStateProvider } from "../lib/ToggleState";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { UserAuth } from "../lib/Auth";
import { getInitialAuthState } from "../lib/AuthState";
import { suspend } from "suspend-react";

let docRef = collection(db, "products");

class Product {
  constructor(
    product_id,
    product_name,
    product_description,
    product_image,
    product_quantity,
    product_price
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_image = product_image;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
  }

  get() {
    return {
      product_id: this.product_id,
      product_name: this.product_name,
      product_description: this.product_description,
      product_image: this.product_image,
      product_quantity: this.product_quantity,
      product_price: this.product_price || null,
    };
  }
}

const Dashboard = ({ user }) => {
  let { modalToggleHandler } = ToggleState();
  let [modalToggle, setModalToggle] = useState(false);
  let [list, setList] = useState([]);

  let handleToggle = () => {
    setModalToggle((prev) => !prev);
  };

  useEffect(() => {
    let q = query(docRef, where("ownerID", "==", user.uid));
    const unsub = onSnapshot(q, (qSnapshot) => {
      let qList = [];
      qSnapshot.forEach((doc) => {
        qList.push(
          new Product(
            doc.id,
            doc.data().product_name,
            doc.data().product_description,
            doc.data().product_image,
            doc.data().product_quantity
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
            className="btn-primary"
            onClick={() => modalToggleHandler("test")}
          >
            {" "}
            Add item
          </button>
          <button className="btn-primary" onClick={() => handleToggle("test")}>
            {" "}
            Remove item
          </button>

          <ul>
            <ListProduct id={"WATJwMdQvmNGyuaa35BnmpJP9Qx2"} list={list} />
          </ul>
        </section>
      </div>
      <AddItem />
      <RemoveItem modalToggle={modalToggle} modalToggleHandler={handleToggle} />
    </>
  );
};

const ListProduct = ({ list = [] }) => {
  let handleDelete = (id) => {
    deleteDoc(doc(db, "products", id));
  };
  return (
    <>
      {list.length > 0 ? (
        list?.map((data, index) => (
          <li key={index}>
            <h3>{data.product_name}</h3>
            <p>{data.product_description}</p>
            <p>{data.product_quantity}</p>
            <img
              src={data.product_image}
              alt={data.product_name}
              className="object-cover w-44 h-44"
            />
            <button
              className="btn-link"
              onClick={() => handleDelete(data?.product_id)}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <li> No Published product yet</li>
      )}
    </>
  );
};

export default Dashboard;
