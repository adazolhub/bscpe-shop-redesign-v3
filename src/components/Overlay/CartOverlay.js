import React, { useState } from "react";
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
import { AnimatePresence, motion } from "framer-motion";
const CartOverlay = () => {
  let [toggleCart, setToggleCart] = useState(false);

  let handleToggleCart = () => {
    setToggleCart((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {!toggleCart ? (
          <motion.div
            key={1}
            className="fixed left-0 w-[calc(100%)] bg-gray-100 bottom-0 mx-auto px-6 py-4 rounded-md hover:bg-gray-50 shadow-xl shadow-gray-400 flex justify-between items-center text-gray-500 sm:hidden"
          >
            <div className="flex items-center gap-2 text-gray-500">
              <ShoppingCartIcon className="w-5 h-5" />
              <p className="text-sm ">
                Item added to cart{" "}
                <span className="font-bold text-gray-500">(6)</span>
              </p>
            </div>
            <ChevronUpIcon className="w-5 h-5" onClick={handleToggleCart} />
          </motion.div>
        ) : (
          <MenuModal
            key={1}
            modalToggle={toggleCart}
            modalToggleHandler={handleToggleCart}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between w-full text-gray-500">
                <div className="flex items-center gap-2 ">
                  <ShoppingCartIcon className="w-5 h-5" />
                  <p className="text-sm ">Item added to cart</p>
                </div>
                <ChevronDownIcon
                  className="w-5 h-5"
                  onClick={handleToggleCart}
                />
              </div>
              <div className="my-4 overflow-y-scroll text-gray-600 list max-h-72">
                <ul className="flex flex-col w-[98%] gap-2 py-4">
                  <li className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="whitespace-nowrap">Product Name Here</h3>
                        <p className="text-xs font-thin text-gray-400 whitespace-nowrap">
                          Short description here
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="p-2">
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="3"
                        value={1}
                        className="w-8 text-center border rounded-md"
                      />
                      <button className="p-2">
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 hover:text-rose-400">
                      <TrashIcon className="w-5 h-5" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="whitespace-nowrap">Product Name Here</h3>
                        <p className="text-xs font-thin text-gray-400 whitespace-nowrap">
                          Short description here
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="p-2">
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="3"
                        value={1}
                        className="w-8 text-center border rounded-md"
                      />
                      <button className="p-2">
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 hover:text-rose-400">
                      <TrashIcon className="w-5 h-5" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="whitespace-nowrap">Product Name Here</h3>
                        <p className="text-xs font-thin text-gray-400 whitespace-nowrap">
                          Short description here
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="p-2">
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="3"
                        value={1}
                        className="w-8 text-center border rounded-md"
                      />
                      <button className="p-2">
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 hover:text-rose-400">
                      <TrashIcon className="w-5 h-5" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="whitespace-nowrap">Product Name Here</h3>
                        <p className="text-xs font-thin text-gray-400 whitespace-nowrap">
                          Short description here
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="p-2">
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="3"
                        value={1}
                        className="w-8 text-center border rounded-md"
                      />
                      <button className="p-2">
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 hover:text-rose-400">
                      <TrashIcon className="w-5 h-5" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="whitespace-nowrap">Product Name Here</h3>
                        <p className="text-xs font-thin text-gray-400 whitespace-nowrap">
                          Short description here
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="p-2">
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="3"
                        value={1}
                        className="w-8 text-center border rounded-md"
                      />
                      <button className="p-2">
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 hover:text-rose-400">
                      <TrashIcon className="w-5 h-5" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between px-2 py-3 border border-gray-400 border-dashed rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                        alt=""
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <h3 className="whitespace-nowrap">Product Name Here</h3>
                        <p className="text-xs font-thin text-gray-400 whitespace-nowrap">
                          Short description here
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="p-2">
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        pattern="\d*"
                        maxlength="3"
                        value={1}
                        className="w-8 text-center border rounded-md"
                      />
                      <button className="p-2">
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-gray-400 hover:text-rose-400">
                      <TrashIcon className="w-5 h-5" />
                    </div>
                  </li>
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
