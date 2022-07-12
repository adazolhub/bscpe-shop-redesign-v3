import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import ShopState from "../../lib/ShopState";
import { ToggleState } from "../../lib/ToggleState";
import ScrollToTop from "../../utils/ScrollToTop";

const ShoppingCart = () => {
  let { products: list, total, removeFromCart } = ShopState();
  let { cartToggleOff } = ToggleState();
  let navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <>
        <div className="container relative p-2 mx-auto  max-h-[calc(100vh-4em)] overflow-hidden overflow-y-scroll">
          <ul className="flex flex-col gap-2 pb-4 min-h-[calc(100vh-18em)] max-h-[calc(100vh-16em)]">
            {list.length > 0 ? (
              list?.map((data, index) => (
                <li
                  key={index}
                  //   onClick={() => handleToggle(data)}
                  className="flex gap-2 p-2 transition-all bg-gray-50 border border-gray-300 border-dashed rounded-md cursor-pointer hover:scale-[1.02] relative max-h-[14em]"
                >
                  <div className="h-[6em] md:h-[8em] lg:min-h-[10em] w-[8em] sm:w-[10em] lg:max-w-[12em]  rounded-md opacity-100">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="object-cover w-full h-full rounded-md opacity-100 bg-blend-overlay"
                    />
                  </div>

                  <div className="relative w-72">
                    <p className="text-[0.55em] text-gray-400/80 my-1">
                      SKU: {data.product_id.toUpperCase()}
                    </p>
                    <h3 className="mr-8 font-thin text-gray-500 line-clamp-1 sm:line-clamp-3 lg:line-clamp-none">
                      {data.name}
                    </h3>

                    <div className="absolute flex flex-col gap-2 mt-2 text-gray-400 bottom-1">
                      <p className="text-xs whitespace-nowrap">
                        Quantity:{" "}
                        <span className="font-medium text-gray-500/90">1</span>{" "}
                      </p>
                      <p className="text-xs whitespace-nowrap">
                        Price:{" "}
                        <span className="font-medium text-gray-500">
                          {data.price}.00 PHP
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    className="absolute px-4 py-2 top-1 right-2 btn-link"
                    onClick={() => removeFromCart(data)}
                  >
                    <TrashIcon className="w-5 h-5 text-red-400" />
                  </button>
                </li>
              ))
            ) : (
              <li className="py-4 mx-auto text-gray-400">Cart is empty</li>
            )}
          </ul>

          {list.length > 0 && (
            <div className="fixed bottom-0 left-0 w-full gap-2 px-2 pb-2 text-xs bg-white ">
              <hr />
              <div className="flex justify-between px-4 pt-2 pb-1 text-gray-400">
                <p>Total items: </p>
                <p className="font-medium ">{list.length} </p>
              </div>
              <div className="flex justify-between px-4 pb-2 text-gray-400">
                <p>Total price: </p>
                <p className="font-medium text-gray-500">PHP {total}.00 </p>
              </div>
              <div className="flex flex-col ">
                <button
                  className="w-full btn-primary"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  Proceed to checkout
                </button>
                <button
                  className="btn-secondary whitespace-nowrap"
                  onClick={() => {
                    cartToggleOff();
                    navigate("/");
                  }}
                >
                  Continue shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default ShoppingCart;
