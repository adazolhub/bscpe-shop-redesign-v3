import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../auth/firebase";
import CartOverlay from "./Overlay/CartOverlay";

import { UserAuth } from "../lib/Auth";
import { ToggleState } from "../lib/ToggleState";
import OneColumn from "./ListView/OneColumn";
import TwoColumn from "./ListView/TwoColumn";
import ListGridToggler from "./ListView/ListGridToggler";
import ShopState from "../lib/ShopState";

let userRef = collection(db, "users");

const ListGrid = () => {
  const { currentUser, list } = UserAuth();
  return (
    <>
      {!currentUser ? (
        <WithoutProps data={list} />
      ) : (
        <WithProps data={list} currentUser={currentUser} />
      )}
    </>
  );
};

function WithProps({ data, currentUser = null }) {
  let [cart, setCart] = useState([]);
  let { products } = ShopState();

  let docRef = doc(db, "users", currentUser?.uid);
  let { category, toggleListGrid: toggleList } = ToggleState();

  useEffect(() => {
    let qUser =
      currentUser && query(userRef, where("uid", "==", currentUser?.uid));
    let userUnsub =
      currentUser &&
      onSnapshot(qUser, (snapshot) => {
        let qList = [];
        snapshot.forEach((doc) => {
          if (doc.data().cart.length > 0) {
            qList.push(doc.data().cart);
          }
        });
        console.log("[firestore] > fetched new list");
        setCart([...qList]);
      });

    return () => {
      userUnsub();
    };
  }, [currentUser]);

  let addToCart = (product_id) => {
    console.log(product_id);
    updateDoc(docRef, {
      cart: arrayUnion({ product_id: product_id }),
    })
      .then((result) => console.log("update: ", result))
      .catch((err) => console.log("updateErr: ", err));
  };

  let removeToCart = (product_id) => {
    updateDoc(docRef, {
      cart: arrayRemove(product_id),
    }).then(() => {
      console.log("cart selected removed");
      //debugging ....
      document.querySelector("html").style.overflow = null;
    });
  };
  return (
    <>
      <main
        className="lg:col-span-2 lg:order-2 lg:row-span-1 min-h-[40em]"
        id="list"
      >
        {/* //this props need to move to global context props (UPDATED 03/07/2022 [refactor]) */}
        <ListGridToggler />

        {toggleList ? (
          //1 COLUMN
          <OneColumn category={category} addToCart={addToCart} />
        ) : (
          //2 COLUMN
          <TwoColumn category={category} addToCart={addToCart} />
        )}
      </main>
      <div className="block sm:hidden">
        {products.length > 0 && (
          <CartOverlay
            cart={cart[0]}
            products={data}
            removeToCart={removeToCart}
          />
        )}
      </div>
    </>
  );
}

function WithoutProps() {
  let { category, toggleListGrid: toggleList } = ToggleState();

  return (
    <>
      <main className="lg:col-span-2 lg:order-2 lg:row-span-1" id="list">
        {/* //this props need to move to global context props (UPDATED 03/07/2022 [refactor]) */}
        <ListGridToggler />
        {/* //this props need to move to global context props (UPDATED 03/07/2022 [refactor]) */}

        {toggleList ? (
          //1 COLUMN
          <OneColumn category={category} />
        ) : (
          //2 COLUMN
          <TwoColumn category={category} />
        )}
      </main>
    </>
  );
}

export default ListGrid;
