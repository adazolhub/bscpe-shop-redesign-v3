import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import ShopState from "../../utils/lib/ShopState";
import { ToggleState } from "../../utils/lib/ToggleState";
import ScrollToTop from "../../utils/hooks/useScrollToTop";
import { colorFormater, sizeFormater } from "../Checkout/Checkout";
import ModalSide from "../UI/Modal/Side/ModalSide";

const ShoppingCart = () => {
  let { products: list, total, removeFromCart, totalQuantity } = ShopState();

  //TODOS: Need to fix types of the Toggle State (temporarily set to 'any')

  const { toggleState, toggleStateHandler }: any = ToggleState();

  return (
    <ModalSide
      title={"Cart"}
      icon={<ShoppingBagIcon />}
      state={toggleState["cart"]}
      scrollable={list.length > 2}
      enableFooter={list.length > 0}
      footer={<FooterSummary total={total} totalQuantity={totalQuantity} />}
      toggleStateHandler={() => toggleStateHandler("cart")}
    >
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
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[0.65em] text-gray-400">
                          Price
                        </span>
                        <p className="text-sm font-medium text-gray-500">
                          {" "}
                          <span>₱ {data?.price}.00</span> x {data?.quantity}
                        </p>
                      </div>
                      <div>
                        <span className="text-[0.65em]  text-gray-400">
                          Size
                        </span>
                        {sizeFormater(data?.size)}
                      </div>
                      <div>
                        <span className="text-[0.65em] text-gray-400 ">
                          Color
                        </span>
                        <div className="mt-2 font-medium text-gray-500">
                          {colorFormater(data?.color)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="absolute px-4 py-2 top-1 right-2 btn-link"
                    onClick={() => {
                      data && removeFromCart!(data);
                    }}
                  >
                    <TrashIcon className="w-5 h-5 text-red-400" />
                  </button>
                </li>
              ))
            ) : (
              <li className="py-4 mx-auto text-gray-400">Cart is empty</li>
            )}
          </ul>
        </div>
      </>
    </ModalSide>
  );
};

function FooterSummary({
  total,
  totalQuantity,
}: {
  total: number;
  totalQuantity: number;
}) {
  const { toggleStateHandler }: any = ToggleState();
  let navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1 h-fit">
      <div>
        <table className="w-full border-separate table-fixed border-spacing-2">
          <tbody className="w-full">
            <tr className="text-sm text-gray-500">
              <td>Quantity</td>
              <td className="text-end">{totalQuantity?.toFixed(0)}</td>
            </tr>
            <tr className="text-sm text-gray-500">
              <td>Discount</td>
              <td className="text-end">40%</td>
            </tr>
            <tr className="text-lg font-medium ">
              <td>Total ammount</td>
              <td className="text-end">₱ {total?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          navigate("/checkout");
        }}
        className="w-full p-4 text-gray-200 bg-black/90"
      >
        Checkout
      </button>
      <button
        onClick={() => toggleStateHandler("cart")}
        className="w-full p-4 underline bg-transparent underline-offset-2"
      >
        Cancel
      </button>
    </div>
  );
}

export default ShoppingCart;
