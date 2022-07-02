import HomeCarousel from "./Carousel/HomeCarousel";
import ListGrid from "./ListGrid";
import CartOverlay from "./Overlay/CartOverlay";
import Trending from "./Trending";
import { db } from "../auth/firebase";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../lib/Auth";
import { Outlet } from "react-router-dom";

let productRef = collection(db, "products");
let userRef = collection(db, "users");

class Product {
  constructor(
    product_id,
    product_name,
    product_description,
    product_image,
    product_quantity,
    product_price,
    product_category
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_image = product_image;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
    this.product_category = product_category;
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

let currentUser;
const HomeSection = ({ user }) => {
  let [list, setList] = useState([]);
  let [cart, setCart] = useState([]);
  let { currentUser } = UserAuth();
  // currentUser = suspend(getInitialAuthState, "user");

  useEffect(() => {
    let q = query(productRef, limit(12));
    let unsub = onSnapshot(q, (snapshot) => {
      let qList = [];
      snapshot.forEach((doc) => {
        qList.push(
          new Product(
            doc.id,
            doc.data().product_name,
            doc.data().product_description,
            doc.data().product_image,
            doc.data().product_quantity,
            doc.data().price,
            doc.data().product_category
          ).get()
        );
      });
      setList([...qList]);
    });

    // let qUser =
    //   user && query(userRef, currentUser && where("uid", "==", user?.uid));
    // let userUnsub =
    //   user &&
    //   onSnapshot(qUser, (snapshot) => {
    //     let qList = [];
    //     snapshot.forEach((doc) => {
    //       qList.push(doc.data().cart);
    //     });

    //     // qList.map((user) => {
    //     //   return console.log(user.cart);
    //     // });
    //     setCart(qList);
    //   });

    return () => {
      unsub();
      // user && userUnsub();
    };
  }, []);

  // console.log(cart);
  return (
    <div className="container gap-4 mx-auto mt-12 min-h-fit" id="home">
      <div className="grid w-full mx-auto sm:container lg:gap-4 lg:grid-cols-main-aside lg:grid-rows-main-aside">
        <HomeCarousel />

        <Trending />
        <Outlet />
        <ListGrid data={list} user={user} currentUser={currentUser} />
        {/* <ul>
          <ListProduct list={list} />
        </ul> */}
      </div>
    </div>
  );
};

function userListener(ui) {
  let qUser = query(userRef, currentUser && where("uid", "==", ui));
  let userUnsub = onSnapshot(qUser, (snapshot) => {
    let qList = [];
    snapshot.forEach((doc) => {
      console.log(doc);
      qList.push(doc.data());
      // return doc;
    });

    qList.map((user) => {
      console.log(user);
      return user;
    });
  });

  return userUnsub();
}

export default HomeSection;
