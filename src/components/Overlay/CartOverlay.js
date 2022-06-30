import React, { useEffect, useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/outline";
import MenuModal from "./MenuModal";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
const CartOverlay = ({ cart, products, removeToCart }) => {
  let [toggleCart, setToggleCart] = useState(false);
  let [cartItem, setCartItem] = useState([]);

  let [count, setCount] = useState(1);

  console.log(products);

  let handleCountChange = () => {
    setCount(count++);
  };

  let handleToggleCart = () => {
    setToggleCart((prev) => !prev);
  };

  console.log(cart);

  return (
    <>
      <AnimatePresence>
        (
        <motion.div
          key={1}
          initial={{ opacity: 0, y: "100%", display: "none" }}
          animate={{ opacity: 1, y: 0, display: "flex" }}
          exit={{ opacity: 0, y: "100%", display: "none" }}
          className="fixed left-0 w-[calc(100%)] bg-gray-100 bottom-0 mx-auto px-6 py-4 rounded-md hover:bg-gray-50 shadow-xl shadow-gray-400 flex justify-between items-center text-gray-500 sm:hidden z-30"
        >
          <div className="flex items-center gap-2 text-gray-500">
            <ShoppingCartIcon className="w-5 h-5" />
            <p className="text-sm ">
              Item added to cart{" "}
              <span className="font-bold text-gray-500">({cart?.length})</span>
            </p>
          </div>
          <ChevronUpIcon className="w-5 h-5" onClick={handleToggleCart} />
        </motion.div>
        ) (
        <MenuModal
          modalToggle={toggleCart}
          modalToggleHandler={handleToggleCart}
        >
          <div className="flex flex-col justify-between h-full">
            {/* HEADER SECTION OF THE MODAL */}
            <div className="flex justify-between w-full text-gray-500">
              <div className="flex items-center gap-2 ">
                <ShoppingCartIcon className="w-5 h-5" />
                <p className="text-sm ">Item added to cart</p>
              </div>
              <ChevronDownIcon className="w-5 h-5" onClick={handleToggleCart} />
            </div>

            {/* ARRAY LIST OF ADDED ITEMS */}

            <div className="my-4 overflow-hidden overflow-y-scroll text-gray-600 list max-h-72">
              <ul className="flex flex-col w-[98%] gap-2 py-4">
                {cart.map((item) => {
                  let data = products.find(
                    (product) => product.product_id === item.product_id
                  );
                  return (
                    <motion.li
                      key={item.product_id}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.01 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={data.product_image}
                          alt=""
                          className="object-cover object-top w-10 h-10 rounded"
                        />
                        <div>
                          <h3 className="whitespace-nowrap max-w-[25ch] overflow-hidden text-ellipsis">
                            {data.product_name}
                          </h3>
                          <p className="text-xs font-thin text-gray-400 whitespace-nowrap  w-[25ch] overflow-hidden text-ellipsis">
                            PHP{" "}
                            {Math.round(
                              data.product_price - data.product_price * 0.4
                            )}{" "}
                            <span className="text-[0.75em] ml-2">40% OFF</span>
                          </p>
                        </div>
                      </div>
                      {/* <div>
                                    <button className="p-2" onClick={handleCountChange}>
                                      <MinusIcon className="w-3 h-3" />
                                    </button>
                                    <input
                                      type="text"
                                      pattern="\d*"
                                      maxLength="3"
                                      defaultValue={1}
                                      value={count}
                                      className="w-8 text-center border rounded-md"
                                    />
                                    <button className="p-2" onClick={handleCountChange}>
                                      <PlusIcon className="w-3 h-3" />
                                    </button>
                                  </div> */}
                      <div
                        className="text-gray-400 hover:text-rose-400"
                        onClick={() => removeToCart(item)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <button className="w-full btn-primary">Checkout</button>
          </div>
        </MenuModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartOverlay;
