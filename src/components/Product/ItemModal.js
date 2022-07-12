import React, { useState } from "react";
import MenuModal from "../Overlay/MenuModal";
import RadioButtonGroup from "../UI/RadioButtonGroup";

const ItemModal = ({ toggleItem, toggleItemHandler, product }) => {

  let colors = [
    {
      option: "red",
      label: "R",
      className: "w-6 h-6 rounded-full bg-rose-300/80",
      activeClass: 'ring-2 ring-rose-600'
    }, {
      option: "blue",
      label: "B",
      className: "w-6 h-6 rounded-full bg-blue-300/80",
      activeClass: 'ring-2 ring-blue-600'
    }, {
      option: "green",
      label: "G",
      className: "w-6 h-6 rounded-full bg-emerald-300/80 ",
      activeClass: 'ring-2 ring-emerald-600'
    }]
  let size = [
    {
      option: "small",
      label: "S",
      className: "grid w-8 h-8 border rounded place-items-center",
      activeClass: 'ring-2 ring-gray-400'
    }, {
      option: "medium",
      label: "M",
      className: "grid w-8 h-8 border rounded place-items-center",
      activeClass: 'ring-2 ring-gray-400'
    }, {
      option: "large",
      label: "L",
      className: "grid w-8 h-8 border rounded place-items-center ",
      activeClass: 'ring-2 ring-gray-400'
    }, {
      option: "extra-large",
      label: "XL",
      className: "grid w-8 h-8 border rounded place-items-center",
      activeClass: 'ring-2 ring-gray-400'
    }]
  let [selectedColorOption, setSelectedColorOption] = useState(colors[0]?.option)
  let [selectedSizeOption, setSelectedSizeOption] = useState(size[0]?.option)


  return (
    <>
      <MenuModal modalToggle={toggleItem} modalToggleHandler={toggleItemHandler}>
        <div className="mb-2 space-y-4">
          <div className="flex justify-between gap-2 mb-4">
            <p>{product?.product_name}</p>
            <button className='btn-primary whitespace-nowrap'>Check details</button>

          </div>

          <div className="flex gap-2">
            <img src={product?.product_image} alt={product?.product_name}
              className="object-cover w-56 rounded-md h-52"
            />
            <div className="overflow-hidden overflow-y-scroll h-52">
              <div className='flex flex-col w-full gap-2'>
                <div className="w-24 h-24 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply"
                  />
                </div>
                <div className="w-24 h-24 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>
                <div className="w-24 h-24 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>
                <div className="w-24 h-24 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>
                <div className="w-24 h-24 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>

              </div>

            </div>
          </div>
          <div
            className="flex justify-between text-xs"
          >
            <div>
              <p>Size</p>
              <ul className="flex gap-2 mt-2">
                <RadioButtonGroup type="Size" values={size} selectedOption={selectedSizeOption} setSelectedOption={setSelectedSizeOption} />

              </ul>
            </div>
            <div>
              <p>Color</p>
              <ul className="flex gap-2 mt-2">
                <RadioButtonGroup type="Color" values={colors} selectedOption={selectedColorOption} setSelectedOption={setSelectedColorOption} />

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
          <button className="w-full btn-link">Close</button>
        </div>
      </MenuModal>
    </>
  );
};

export default ItemModal;
