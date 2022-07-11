import React from "react";
import { useState } from "react";
import MenuModal from "../Overlay/MenuModal";

const ItemModal = ({ toggleItem, toggleItemHandler, product }) => {

  return (
    <>
      <MenuModal modalToggle={toggleItem} modalToggleHandler={toggleItemHandler}>
        <div>
          <button className='btn-primary'>Check details</button>
          <p>{product?.product_name}</p>

          <div className="flex gap-2">
            <img src={product?.product_image} alt={product?.product_name}
              className="object-cover w-56 rounded-md h-52"
            />
            <div className="flex flex-col gap-2 ">
              <div className="w-24 h-16 overflow-hidden bg-gray-600 rounded-md">
                <img src={product?.product_image} alt={product?.product_name}
                  className="object-cover w-full h-full mix-blend-multiply"
                />
              </div>
              <div className="w-24 h-16 overflow-hidden bg-gray-600 rounded-md">
                <img src={product?.product_image} alt={product?.product_name}
                  className="object-cover w-full h-full mix-blend-multiply "
                />
              </div>
              <div className="w-24 h-16 overflow-hidden bg-gray-600 rounded-md">
                <img src={product?.product_image} alt={product?.product_name}
                  className="object-cover w-full h-full mix-blend-multiply "
                />
              </div>

            </div>
          </div>
          <div
            className="flex justify-between"
          >
            <div>
              <p>Size</p>
              <ul className="flex gap-2">
                <button>
                  <li>
                    S
                  </li>
                </button>
                <button>
                  <li>
                    M
                  </li>
                </button>
                <button>
                  <li>
                    L
                  </li>
                </button>
                <button>
                  <li>
                    XL
                  </li>
                </button>
              </ul>
            </div>
            <div>
              <p>Color</p>
              <ul className="flex gap-2">
                <button>
                  <li>
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  </li>
                </button>
                <button>
                  <li>
                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  </li>
                </button>
                <button>
                  <li>
                    <div className="w-4 h-4 rounded-full bg-rose-500" />
                  </li>
                </button>
              </ul>
            </div>
            <div>
              <p>Quantity</p>
              <ul className="flex gap-2">
                <button>
                  <li>
                    +
                  </li>
                </button>
                <button>
                  <li>
                    <input type="number" name="quantity" maxLength={2} max={2} defaultValue="1" className='w-[3ch] border rounded-sm' />
                  </li>
                </button>
                <button>
                  <li>
                    -
                  </li>
                </button>
              </ul>
            </div>
          </div>
          <button className='w-full btn-primary'>Add to cart</button>
        </div>
      </MenuModal>
    </>
  );
};

export default ItemModal;
