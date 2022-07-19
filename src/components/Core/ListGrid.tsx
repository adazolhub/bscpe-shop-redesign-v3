import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  SnapshotOptions,
  DocumentData,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { SetStateAction, useEffect, useState } from "react";



import OneColumn from "../ListView/OneColumn";
import TwoColumn from "../ListView/TwoColumn";
import ListGridToggler from "../ListView/ListGridToggler";
import { db } from "../../auth/firebase";
import { UserAuth } from "../../utils/lib/Auth";
import ShopState from "../../utils/lib/ShopState";
import { ToggleState } from "../../utils/lib/ToggleState";


//TODOS: Need to fix types of States (temporarily set to 'any')
let userRef = collection(db, "users");

const ListGrid = () => {
  const { currentUser, list } : any = UserAuth();
  return (
    <>
      {!currentUser ? (
        <WithoutProps />
      ) : (
        <WithProps data={list} currentUser={currentUser} />
      )}
    </>
  );
};

function WithProps({ data, currentUser = null } : {
  data : any; currentUser: any
}) {
  let [cart, setCart] = useState([]);
  let { products } = ShopState();

  let docRef = doc(db, "users", currentUser?.uid);
  let { category, toggleListGrid: toggleList } : any = ToggleState();

  useEffect(() => {
    let qUser : Query<DocumentData> =
      currentUser && query(userRef, where("uid", "==", currentUser?.uid));
    let userUnsub =
      currentUser &&
      onSnapshot(qUser, (snapshot: QuerySnapshot) => {
        let qList: any = [];
        snapshot.forEach((doc) => {
          if (doc.data().cart.length > 0) {
            qList.push(doc.data().cart);
            setCart(doc.data().cart);
          }
        });
        console.log("[firestore] > fetched new list");
      });

    return () => {
      userUnsub!();
    };
  }, [currentUser]);

  let addToCart = (product_id: string) => {
    console.log(product_id);
    updateDoc(docRef, {
      cart: arrayUnion({ product_id: product_id }),
    })
      .then((result) => console.log("update: ", result))
      .catch((err) => console.log("updateErr: ", err));
  };

  let removeToCart = (product_id: string) => {
    updateDoc(docRef, {
      cart: arrayRemove(product_id),
    }).then(() => {
      console.log("cart selected removed");
      //debugging ....
      let root_html =  document.querySelector("html")
      root_html!.style.overflow = '';
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
        {/* {products.length > 0 && (
          <CartOverlay
            cart={cart[0]}
            products={data}
            removeToCart={removeToCart}
          />
        )} */}
      </div>
    </>
  );
}

function WithoutProps() {
  //TODOS: Need to fix types of the Toggle State (temporarily set to 'any')
  let { category, toggleListGrid: toggleList } : any = ToggleState();
  let { products } = ShopState();

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
        {/* {products.length > 0 && <CartOverlay />} */}
      </main>
    </>
  );
}

export default ListGrid;
