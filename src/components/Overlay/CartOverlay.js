import React, { useEffect, useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import MenuModal from "./MenuModal";
import { AnimatePresence, motion } from "framer-motion";
import ShopState from "../../lib/ShopState";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../Checkout/PaymentMethod";
const CartOverlay = () => {
  let [toggleCart, setToggleCart] = useState(false);
  let { products, removeFromCart, total } = ShopState();

  let navigate = useNavigate();

  let handleToggleCart = () => {
    setToggleCart((prev) => !prev);
  };

  useEffect(() => {
    if (products.length < 2)
      document.querySelector("html").style.overflow = null;
  }, [products]);

  return (
    <>
      <AnimatePresence key={"4"}>
        (
        <motion.div
          key={"1"}
          initial={{ opacity: 0, y: "100%", display: "none" }}
          animate={{ opacity: 1, y: 0, display: "flex" }}
          exit={{ opacity: 0, y: "100%", display: "none" }}
          drag={"y"}
          dragConstraints={{ top: 0, bottom: 0 }}
          className="fixed left-0  w-[calc(100%-1em)] md:w-[calc(50%)]  md:left-1/4  bg-white bottom-2 mx-2 px-4 py-4 rounded-md hover:bg-gray-50 shadow-xl shadow-gray-400 flex justify-between items-center text-gray-500 sm:hidden z-30"
        >
          <div
            className="flex items-center gap-4 text-gray-500"
            onClick={handleToggleCart}
          >
            <div className="relative">

              <ShoppingBagIcon className="w-5 h-5" />
              {products.length > 0 && (
                <div className="absolute -top-2 -right-2 px-1 py-[1px] rounded-full bg-gray-700 text-white leading-3 text-[0.62em] ">
                  <p className="w-[2ch] text-center">{products.length}</p>
                </div>
              )}
            </div>
            <p className="text-sm ">
              Item added to cart
            </p>
          </div>
          <ChevronUpIcon className="w-5 h-5" onClick={handleToggleCart} />
        </motion.div>
        ) (
        <MenuModal
          key={"2"}
          modalToggle={toggleCart}
          modalToggleHandler={handleToggleCart}
        >
          <div className="flex flex-col justify-between h-full">
            {/* HEADER SECTION OF THE MODAL */}
            <div className="flex justify-between w-full text-gray-500">
              <div
                className="flex items-center gap-4 "
                onClick={handleToggleCart}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <p className="text-sm ">
                  Item added to cart{" "}
                  {/* <span className="font-bold text-gray-500">
                    ({products?.length})
                  </span> */}
                </p>
              </div>
              <ChevronDownIcon className="w-5 h-5" onClick={handleToggleCart} />
            </div>

            {/* ARRAY LIST OF ADDED ITEMS */}

            <div className="my-4 overflow-hidden overflow-y-scroll text-gray-600 list max-h-72">
              <ul className="flex flex-col w-[98%] gap-2 py-2">
                {products.map((item) => {
                  return (
                    <motion.li
                      key={item.product_id}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.01 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      className="flex items-center justify-between p-2 border border-gray-400 border-dashed rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt=""
                          className="object-cover object-top w-10 h-10 rounded"
                        />
                        <div>
                          <h3 className="whitespace-nowrap max-w-[25ch] overflow-hidden text-ellipsis">
                            {item.name}
                          </h3>
                          <p className="text-xs font-thin text-gray-400 whitespace-nowrap  w-[25ch] overflow-hidden text-ellipsis">
                            P {item.price}{" "}
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
                        className="pl-4 text-gray-400 hover:text-rose-400"
                        onClick={() => {
                          removeFromCart(item);
                        }}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <hr />
            <div className="flex flex-col items-end text-gray-400">
              <div className="flex flex-col w-full gap-2 px-4 py-4">
                <div className="flex justify-between text-xs">
                  <p>Items on cart : </p>
                  <p>{products.length}</p>
                </div>
                <div className="flex justify-between text-xs">
                  <p>Total price:</p>
                  <p>{total}.00 PHP</p>
                </div>
              </div>
              <button
                className="w-full btn-primary"
                onClick={() => navigate("checkout")}
              >
                Checkout
              </button>
              <button
                className="w-full py-1 text-xs"
                onClick={() => navigate("cart")}
              >
                Expand Cart
              </button>
            </div>
          </div>
        </MenuModal>
        <PaymentMethod key={"3"} />)
      </AnimatePresence>
    </>
  );
};

export default CartOverlay;
