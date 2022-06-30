import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  add,
  increment,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../auth/firebase";
import CartOverlay from "./Overlay/CartOverlay";
import { motion } from "framer-motion";

let userRef = collection(db, "users");

const ListGrid = ({ data, category, user, currentUser = null }) => {
  console.log(user);
  const [toggleList, setToggleList] = useState(false);
  let [cart, setCart] = useState([]);

  const handleToggleList = () => {
    setToggleList((prev) => !prev);
  };
  const [toggleTabs, setToggleTabs] = useState(1);

  const handleToggleTabs = (current) => {
    setToggleTabs(current);
  };
  // let docRef = doc(db, "users", user?.uid);

  // useEffect(() => {
  //   let qUser =
  //     user && query(userRef, currentUser && where("uid", "==", user?.uid));
  //   let userUnsub =
  //     user &&
  //     onSnapshot(qUser, (snapshot) => {
  //       let qList = [];
  //       snapshot.forEach((doc) => {
  //         if (doc.data().cart.length > 0) {
  //           qList.push(doc.data().cart);
  //         }
  //       });

  //       // qList.map((user) => {
  //       //   return console.log(user.cart);
  //       // });

  //       setCart([...qList]);
  //     });

  //   return () => {
  //     userUnsub();
  //   };
  // }, []);

  // let addToCart = (product_id) => {
  //   updateDoc(docRef, {
  //     cart: arrayUnion({ product_id: product_id }),
  //   })
  //     .then((result) => console.log("update: ", result))
  //     .catch((err) => console.log("updateErr: ", err));
  // };

  // let removeToCart = (product_id) => {
  //   updateDoc(docRef, {
  //     cart: arrayRemove(product_id),
  //   }).then(() => {
  //     console.log("cart selected removed");
  //   });
  // };
  // console.log(cart);
  return (
    <>
      {/* <WithoutProps data={data} /> */}
      {!data ? (
        <WithoutProps data={data} />
      ) : (
        <WithProps data={data} user={user} currentUser={currentUser} />
      )}
    </>
  );
};

function WithProps({ data, user, currentUser = null }) {
  const [toggleList, setToggleList] = useState(false);
  let [cart, setCart] = useState([]);

  const handleToggleList = () => {
    setToggleList((prev) => !prev);
  };
  const [toggleTabs, setToggleTabs] = useState(1);

  const handleToggleTabs = (current) => {
    setToggleTabs(current);
  };

  let docRef = doc(db, "users", user?.uid);

  useEffect(() => {
    let qUser =
      user && query(userRef, currentUser && where("uid", "==", user?.uid));
    let userUnsub =
      user &&
      onSnapshot(qUser, (snapshot) => {
        let qList = [];
        snapshot.forEach((doc) => {
          if (doc.data().cart.length > 0) {
            qList.push(doc.data().cart);
          }
        });

        // qList.map((user) => {
        //   return console.log(user.cart);
        // });

        setCart([...qList]);
      });

    return () => {
      userUnsub();
    };
  }, []);

  let addToCart = (product_id) => {
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
    });
  };
  console.log(cart);
  return (
    <>
      <main className="lg:col-span-2 lg:order-2 lg:row-span-1" id="list">
        <div className="sticky z-40 px-2 mt-2 text-xs font-thin text-center text-gray-400 bg-white border-b border-gray-100 dark:border-gray-300 top-11 lg:col-span-1">
          <ul className="flex -mb-px font-thin flex-nowrap">
            <li className="mr-2" onClick={() => handleToggleTabs(1)}>
              <button
                href="#"
                className={
                  toggleTabs === 1 ? "category-menu active" : "category-menu"
                }
              >
                Men
              </button>
            </li>
            <li className="mr-2" onClick={() => handleToggleTabs(2)}>
              <button
                href="#"
                className={
                  toggleTabs === 2 ? "category-menu active" : "category-menu"
                }
                aria-current="page"
              >
                Women
              </button>
            </li>
            <li className="mr-2" onClick={() => handleToggleTabs(3)}>
              <button
                href="#"
                className={
                  toggleTabs === 3 ? "category-menu active" : "category-menu"
                }
              >
                Kids
              </button>
            </li>
          </ul>
        </div>

        <div className="inline-flex justify-end w-full px-2 mt-2 text-gray-400 select-none">
          <button
            className="inline-flex transition-all"
            onClick={handleToggleList}
          >
            <svg
              className={
                toggleList
                  ? "transition-all delay-200"
                  : "text-gray-100 bg-gray-500 rounded-md transition-all delay-200"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.125 9.5C8.1595 9.5 8.25 10.19 8.25 11.625C8.25 12.344 8.25 12.8555 7.948 13.23C7.6005 13.6615 6.968 13.75 6.125 13.75C5.282 13.75 4.6495 13.6615 4.302 13.23C4 12.8555 4 12.3445 4 11.6375L4.375 11.625H4C4 10.19 4.0905 9.5 6.125 9.5ZM11.625 9.5C13.6595 9.5 13.75 10.19 13.75 11.625C13.75 12.344 13.75 12.8555 13.448 13.23C13.1005 13.6615 12.468 13.75 11.625 13.75C10.782 13.75 10.1495 13.6615 9.802 13.23C9.5 12.8555 9.5 12.3445 9.5 11.6375L9.875 11.625H9.5C9.5 10.19 9.5905 9.5 11.625 9.5ZM6.22808 10.2502L6.125 10.25C4.82051 10.25 4.75362 10.3436 4.75019 11.4385L4.7504 11.8651C4.75277 12.3006 4.76936 12.6151 4.8855 12.76C5.018 12.924 5.4115 13 6.125 13C6.8385 13 7.232 12.9235 7.3645 12.7595C7.5 12.591 7.5 12.191 7.5 11.637C7.5 10.3869 7.5 10.2561 6.22808 10.2502ZM11.7281 10.2502L11.625 10.25C10.3205 10.25 10.2536 10.3436 10.2502 11.4385L10.2504 11.8651C10.2528 12.3006 10.2694 12.6151 10.3855 12.76C10.518 12.924 10.9115 13 11.625 13C12.3385 13 12.732 12.9235 12.8645 12.7595C13 12.591 13 12.191 13 11.637C13 10.3869 13 10.2561 11.7281 10.2502ZM6.125 4C8.1595 4 8.25 4.69 8.25 6.125C8.25 6.844 8.25 7.3555 7.948 7.73C7.6005 8.1615 6.968 8.25 6.125 8.25C5.282 8.25 4.6495 8.1615 4.302 7.73C4 7.3555 4 6.8445 4 6.1375L4.375 6.125H4C4 4.69 4.0905 4 6.125 4ZM11.625 4C13.6595 4 13.75 4.69 13.75 6.125C13.75 6.844 13.75 7.3555 13.448 7.73C13.1005 8.1615 12.468 8.25 11.625 8.25C10.782 8.25 10.1495 8.1615 9.802 7.73C9.5 7.3555 9.5 6.8445 9.5 6.1375L9.875 6.125H9.5C9.5 4.69 9.5905 4 11.625 4ZM6.22808 4.75022L6.125 4.75C4.82051 4.75 4.75362 4.84361 4.75019 5.93853L4.7504 6.36509C4.75277 6.80057 4.76936 7.11514 4.8855 7.26C5.018 7.424 5.4115 7.5 6.125 7.5C6.8385 7.5 7.232 7.4235 7.3645 7.2595C7.5 7.091 7.5 6.691 7.5 6.137C7.5 4.8869 7.5 4.75611 6.22808 4.75022ZM11.7281 4.75022L11.625 4.75C10.3205 4.75 10.2536 4.84361 10.2502 5.93853L10.2504 6.36509C10.2528 6.80057 10.2694 7.11514 10.3855 7.26C10.518 7.424 10.9115 7.5 11.625 7.5C12.3385 7.5 12.732 7.4235 12.8645 7.2595C13 7.091 13 6.691 13 6.137C13 4.8869 13 4.75611 11.7281 4.75022Z"
                fill="currentColor"
              />
            </svg>
            <svg
              className={
                toggleList
                  ? "text-gray-100 bg-gray-500 rounded-md transition-all delay-200"
                  : "transition-all delay-200"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 6H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 9H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 12H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 6H4.50406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 9H4.50406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 12H4.50406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {toggleList ? (
          //1 COLUMN
          <div className="grid grid-cols-1 row-start-1 row-end-4 gap-4 px-2 mb-6 grid-flow-dense md:grid-cols-2 xl:grid-cols-3 place-items-center">
            {data &&
              data?.map((product, index) => (
                <motion.div
                  key={product?.product_id}
                  whileTap={{ scale: 0.97 }}
                  whileFocus={{ scale: 1.03 }}
                  className="flex w-full min-w-full overflow-hidden bg-gray-100 border border-transparent rounded-lg hover:bg-gray-50 hover:shadow-lg h-60 md:h-90 hover:border-gray-300 group"
                >
                  <div className="flex flex-col justify-between w-full h-full gap-2 p-4 ">
                    <div className="flex flex-col gap-2">
                      {/* <p className="text-[0.55em] px-2 py-1 bg-blue-600 w-fit text-white rounded-md">Limited</p> */}

                      <h2 className="text-lg font-medium">
                        {product?.product_name}
                      </h2>
                      <p className="text-xs text-gray-400 text-ellipsis line-clamp-3">
                        {product?.product_description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-orange-600">
                          PHP{" "}
                          {product?.product_price -
                            product?.product_price * 0.4}{" "}
                          <span className="text-gray-500/70">Save 40%</span>
                        </p>
                        <p className="text-xs line-through text-gray-500/70">
                          PHP {product?.product_price}
                        </p>
                      </div>
                      <div className="inline-flex gap-4 flex-nowrap">
                        <button className="px-4 py-1 text-sm text-white bg-gray-700 border rounded-md whitespace-nowrap border-gray-400/50">
                          Buy now
                        </button>
                        <button className="px-4 py-1 text-sm text-gray-500 border rounded-md whitespace-nowrap border-gray-400/50">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-full bg-gray-800 w-60">
                    <img
                      className="object-cover w-full h-full transition-all opacity-40 group-hover:opacity-80"
                      src={product?.product_image}
                      alt={product?.product_name}
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          //2 COLUMN
          <div className="grid grid-cols-2 row-start-1 row-end-4 gap-4 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-center">
            {data &&
              data?.map((product) => (
                <motion.div
                  key={product?.product_id}
                  whileTap={{ scale: 0.97 }}
                  whileFocus={{ scale: 1.03 }}
                  className="relative grid w-full min-w-full overflow-hidden rounded-lg h-60 place-content-center hover:shadow-md group"
                >
                  <img
                    className="object-cover w-full h-full transition-all duration-300 scale-100 opacity-100 hover:opacity-70 group-hover:scale-110"
                    src={product?.product_image}
                    alt={product?.product_name}
                  />
                  <div className="absolute w-full h-full transition-all bg-gradient-to-t from-gray-900 via-gray-800/30 to-gray-900 group-hover:via-gray-800/5 group-hover:to-gray-900/20" />
                  <div className="absolute top-0 p-2">
                    <p className="font-bold text-yellow-600">
                      PHP{" "}
                      {Math.floor(
                        product?.product_price - product?.product_price * 0.4
                      )}{" "}
                      <span className="text-xs font-thin text-gray-300/70">
                        Save 40%
                      </span>
                    </p>
                    <p className="text-xs font-thin line-through text-gray-300/70">
                      PHP {product?.product_price}
                    </p>
                  </div>
                  <div className="absolute bottom-0 w-[calc(100%-1em)]">
                    <h3 className="px-2 text-xs font-medium text-white sm:text-sm md:text-lg">
                      {product?.product_name}
                    </h3>
                    <p className="px-2 mb-2 text-[.65em] text-gray-300/60 line-clamp-2 md:text-sm">
                      {product?.product_description}
                    </p>
                    <div className="flex w-full gap-2 mx-2 mb-2 flex-nowrap">
                      <button className="w-full px-4 py-1 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-400/50 bg-gray-500/10 backdrop-blur-lg">
                        Buy now
                      </button>
                      <button
                        className="p-1 px-2 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-400/50 bg-gray-500/10 w-fit backdrop-blur-lg"
                        onClick={() => addToCart(product?.product_id)}
                      >
                        <ShoppingBagIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </main>
      {cart.length > 0 && (
        <CartOverlay
          cart={cart[0]}
          products={data}
          // removeToCart={removeToCart}
        />
      )}
    </>
  );
}
function WithoutProps({ data }) {
  const [toggleList, setToggleList] = useState(false);
  let [cart, setCart] = useState([]);

  const handleToggleList = () => {
    setToggleList((prev) => !prev);
  };
  const [toggleTabs, setToggleTabs] = useState(1);

  const handleToggleTabs = (current) => {
    setToggleTabs(current);
  };
  return (
    <>
      <main className="lg:col-span-2 lg:order-2 lg:row-span-1" id="list">
        <div className="sticky z-40 px-2 mt-2 text-xs font-thin text-center text-gray-400 bg-white border-b border-gray-100 dark:border-gray-300 top-11 lg:col-span-1">
          <ul className="flex -mb-px font-thin flex-nowrap">
            <li className="mr-2" onClick={() => handleToggleTabs(1)}>
              <button
                href="#"
                className={
                  toggleTabs === 1 ? "category-menu active" : "category-menu"
                }
              >
                Men
              </button>
            </li>
            <li className="mr-2" onClick={() => handleToggleTabs(2)}>
              <button
                href="#"
                className={
                  toggleTabs === 2 ? "category-menu active" : "category-menu"
                }
                aria-current="page"
              >
                Women
              </button>
            </li>
            <li className="mr-2" onClick={() => handleToggleTabs(3)}>
              <button
                href="#"
                className={
                  toggleTabs === 3 ? "category-menu active" : "category-menu"
                }
              >
                Kids
              </button>
            </li>
          </ul>
        </div>

        <div className="inline-flex justify-end w-full px-2 mt-2 text-gray-400 select-none">
          <button
            className="inline-flex transition-all"
            onClick={handleToggleList}
          >
            <svg
              className={
                toggleList
                  ? "transition-all delay-200"
                  : "text-gray-100 bg-gray-500 rounded-md transition-all delay-200"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.125 9.5C8.1595 9.5 8.25 10.19 8.25 11.625C8.25 12.344 8.25 12.8555 7.948 13.23C7.6005 13.6615 6.968 13.75 6.125 13.75C5.282 13.75 4.6495 13.6615 4.302 13.23C4 12.8555 4 12.3445 4 11.6375L4.375 11.625H4C4 10.19 4.0905 9.5 6.125 9.5ZM11.625 9.5C13.6595 9.5 13.75 10.19 13.75 11.625C13.75 12.344 13.75 12.8555 13.448 13.23C13.1005 13.6615 12.468 13.75 11.625 13.75C10.782 13.75 10.1495 13.6615 9.802 13.23C9.5 12.8555 9.5 12.3445 9.5 11.6375L9.875 11.625H9.5C9.5 10.19 9.5905 9.5 11.625 9.5ZM6.22808 10.2502L6.125 10.25C4.82051 10.25 4.75362 10.3436 4.75019 11.4385L4.7504 11.8651C4.75277 12.3006 4.76936 12.6151 4.8855 12.76C5.018 12.924 5.4115 13 6.125 13C6.8385 13 7.232 12.9235 7.3645 12.7595C7.5 12.591 7.5 12.191 7.5 11.637C7.5 10.3869 7.5 10.2561 6.22808 10.2502ZM11.7281 10.2502L11.625 10.25C10.3205 10.25 10.2536 10.3436 10.2502 11.4385L10.2504 11.8651C10.2528 12.3006 10.2694 12.6151 10.3855 12.76C10.518 12.924 10.9115 13 11.625 13C12.3385 13 12.732 12.9235 12.8645 12.7595C13 12.591 13 12.191 13 11.637C13 10.3869 13 10.2561 11.7281 10.2502ZM6.125 4C8.1595 4 8.25 4.69 8.25 6.125C8.25 6.844 8.25 7.3555 7.948 7.73C7.6005 8.1615 6.968 8.25 6.125 8.25C5.282 8.25 4.6495 8.1615 4.302 7.73C4 7.3555 4 6.8445 4 6.1375L4.375 6.125H4C4 4.69 4.0905 4 6.125 4ZM11.625 4C13.6595 4 13.75 4.69 13.75 6.125C13.75 6.844 13.75 7.3555 13.448 7.73C13.1005 8.1615 12.468 8.25 11.625 8.25C10.782 8.25 10.1495 8.1615 9.802 7.73C9.5 7.3555 9.5 6.8445 9.5 6.1375L9.875 6.125H9.5C9.5 4.69 9.5905 4 11.625 4ZM6.22808 4.75022L6.125 4.75C4.82051 4.75 4.75362 4.84361 4.75019 5.93853L4.7504 6.36509C4.75277 6.80057 4.76936 7.11514 4.8855 7.26C5.018 7.424 5.4115 7.5 6.125 7.5C6.8385 7.5 7.232 7.4235 7.3645 7.2595C7.5 7.091 7.5 6.691 7.5 6.137C7.5 4.8869 7.5 4.75611 6.22808 4.75022ZM11.7281 4.75022L11.625 4.75C10.3205 4.75 10.2536 4.84361 10.2502 5.93853L10.2504 6.36509C10.2528 6.80057 10.2694 7.11514 10.3855 7.26C10.518 7.424 10.9115 7.5 11.625 7.5C12.3385 7.5 12.732 7.4235 12.8645 7.2595C13 7.091 13 6.691 13 6.137C13 4.8869 13 4.75611 11.7281 4.75022Z"
                fill="currentColor"
              />
            </svg>
            <svg
              className={
                toggleList
                  ? "text-gray-100 bg-gray-500 rounded-md transition-all delay-200"
                  : "transition-all delay-200"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 6H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 9H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 12H13.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 6H4.50406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 9H4.50406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 12H4.50406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {toggleList ? (
          //1 COLUMN
          <div className="grid grid-cols-1 row-start-1 row-end-4 gap-4 px-2 mb-6 grid-flow-dense md:grid-cols-2 xl:grid-cols-3 place-items-center">
            {data &&
              data?.map((product, index) => (
                <motion.div
                  key={product?.product_id}
                  whileTap={{ scale: 0.97 }}
                  whileFocus={{ scale: 1.03 }}
                  className="flex w-full min-w-full overflow-hidden bg-gray-100 border border-transparent rounded-lg hover:bg-gray-50 hover:shadow-lg h-60 md:h-90 hover:border-gray-300 group"
                >
                  <div className="flex flex-col justify-between w-full h-full gap-2 p-4 ">
                    <div className="flex flex-col gap-2">
                      {/* <p className="text-[0.55em] px-2 py-1 bg-blue-600 w-fit text-white rounded-md">Limited</p> */}

                      <h2 className="text-lg font-medium">
                        {product?.product_name}
                      </h2>
                      <p className="text-xs text-gray-400 text-ellipsis line-clamp-3">
                        {product?.product_description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-orange-600">
                          PHP{" "}
                          {product?.product_price -
                            product?.product_price * 0.4}{" "}
                          <span className="text-gray-500/70">Save 40%</span>
                        </p>
                        <p className="text-xs line-through text-gray-500/70">
                          PHP {product?.product_price}
                        </p>
                      </div>
                      <div className="inline-flex gap-4 flex-nowrap">
                        <button className="px-4 py-1 text-sm text-white bg-gray-700 border rounded-md whitespace-nowrap border-gray-400/50">
                          Buy now
                        </button>
                        <button className="px-4 py-1 text-sm text-gray-500 border rounded-md whitespace-nowrap border-gray-400/50">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-full bg-gray-800 w-60">
                    <img
                      className="object-cover w-full h-full transition-all opacity-40 group-hover:opacity-80"
                      src={product?.product_image}
                      alt={product?.product_name}
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          //2 COLUMN
          <div className="grid grid-cols-2 row-start-1 row-end-4 gap-4 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-center">
            {data &&
              data?.map((product) => (
                <motion.div
                  key={product?.product_id}
                  whileTap={{ scale: 0.97 }}
                  whileFocus={{ scale: 1.03 }}
                  className="relative grid w-full min-w-full overflow-hidden rounded-lg h-60 place-content-center hover:shadow-md group"
                >
                  <img
                    className="object-cover w-full h-full transition-all duration-300 scale-100 opacity-100 hover:opacity-70 group-hover:scale-110"
                    src={product?.product_image}
                    alt={product?.product_name}
                  />
                  <div className="absolute w-full h-full transition-all bg-gradient-to-t from-gray-900 via-gray-800/30 to-gray-900 group-hover:via-gray-800/5 group-hover:to-gray-900/20" />
                  <div className="absolute top-0 p-2">
                    <p className="font-bold text-yellow-600">
                      PHP{" "}
                      {Math.floor(
                        product?.product_price - product?.product_price * 0.4
                      )}{" "}
                      <span className="text-xs font-thin text-gray-300/70">
                        Save 40%
                      </span>
                    </p>
                    <p className="text-xs font-thin line-through text-gray-300/70">
                      PHP {product?.product_price}
                    </p>
                  </div>
                  <div className="absolute bottom-0 w-[calc(100%-1em)]">
                    <h3 className="px-2 text-xs font-medium text-white sm:text-sm md:text-lg">
                      {product?.product_name}
                    </h3>
                    <p className="px-2 mb-2 text-[.65em] text-gray-300/60 line-clamp-2 md:text-sm">
                      {product?.product_description}
                    </p>
                    <div className="flex w-full gap-2 mx-2 mb-2 flex-nowrap">
                      <button className="w-full px-4 py-1 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-400/50 bg-gray-500/10 backdrop-blur-lg">
                        Buy now
                      </button>
                      <button
                        className="p-1 px-2 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-400/50 bg-gray-500/10 w-fit backdrop-blur-lg"
                        // onClick={() => addToCart(product?.product_id)}
                      >
                        <ShoppingBagIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </main>
    </>
  );
}

export default ListGrid;
