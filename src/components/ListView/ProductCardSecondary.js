import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShopState from "../../lib/ShopState";
import RadioButtonGroup from "../UI/RadioButtonGroup";

let colors = [
  {
    option: "red",
    label: "R",
    className: "w-3 h-3 rounded-full bg-rose-300/80 cursor-pointer",
    activeClass: 'ring-2 ring-offset-4 ring-rose-600'
  }, {
    option: "blue",
    label: "B",
    className: "w-3 h-3 rounded-full bg-blue-300/80 cursor-pointer",
    activeClass: 'ring-2 ring-offset-4 ring-blue-600'
  }, {
    option: "green",
    label: "G",
    className: "w-3 h-3 rounded-full bg-emerald-300/80 cursor-pointer ",
    activeClass: 'ring-2 ring-offset-4 ring-emerald-600'
  }]
let size = [
  {
    option: "small",
    label: "S",
    className: "grid w-6 h-6 border rounded place-items-center cursor-pointer",
    activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
  }, {
    option: "medium",
    label: "M",
    className: "grid w-6 h-6 border rounded place-items-center cursor-pointer",
    activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
  }, {
    option: "large",
    label: "L",
    className: "grid w-6 h-6 border rounded place-items-center cursor-pointer ",
    activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
  }, {
    option: "extra-large",
    label: "XL",
    className: "grid w-6 h-6 border rounded place-items-center cursor-pointer",
    activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
  }]

const ProductCardSecondary = ({
  product_id,
  name,
  description,
  image,
  price,
  ...props
}) => {
  let { products, addToCart, removeFromCart } = ShopState();
  let [isInCart, setIsInCart] = useState(false);

  let [selectedColorOption, setSelectedColorOption] = useState(colors[0]?.option)
  let [selectedSizeOption, setSelectedSizeOption] = useState(size[0]?.option)

  useEffect(() => {
    let productIsInCart = products.find((product) => product.name === name);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, name]);

  let handleClick = () => {
    let product = {
      product_id,
      name,
      image,
      price: Math.floor(price - price * 0.4),
      color: selectedColorOption,
      size: selectedSizeOption,
      quantity: 1

    };
    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };




  return (
    <motion.div
      // whileTap={{ scale: 0.97 }}
      whileFocus={{ scale: 1.03 }}
      className="flex w-full min-w-full overflow-hidden bg-white border border-transparent rounded-lg hover:bg-gray-50 hover:shadow-lg md:h-90 hover:border-gray-300 group"
      {...props}
    >
      <div className="flex flex-col justify-between w-full gap-2 px-4 py-3  md:h-[24em]">
        <div className="flex flex-col gap-0">
          {/* <p className="text-[0.55em] px-2 py-1 bg-blue-600 w-fit text-white rounded-md">Limited</p> */}
          <div className="flex gap-1">

            <span className="px-2 py-[3px] rounded-md text-emerald-600 font-medium text-[0.6em] bg-emerald-200/40 w-fit mb-1">New</span>
            <span className="px-2 py-[3px] rounded-md text-blue-600 font-medium text-[0.6em] bg-blue-200/40 w-fit mb-1">Sale</span>
          </div>

          <h2 className="font-medium text-md">{name}</h2>

        </div>

        <div className="mb-4 space-y-2 text-xs text-gray-500">
          <div className="space-y-3">
            <p>Color</p>
            <div className="flex gap-4 mt-1 ml-2 text-xs">
              <RadioButtonGroup type="color" values={colors} selectedOption={selectedColorOption} setSelectedOption={setSelectedColorOption} />
            </div>
          </div>
          <div className="space-y-3">
            <p>Size</p>
            <div className="flex gap-2 mt-1 text-xs">
              <RadioButtonGroup type="size" values={size} selectedOption={selectedSizeOption} setSelectedOption={setSelectedSizeOption} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-base font-medium text-orange-600">
              ₱ {(price - price * 0.4)?.toFixed(2)}{" "}
              <span className="text-gray-400/40 text-[0.75em]">Save 40%</span>
            </p>
            <p className="text-[0.75em] line-through text-gray-400/40">
              ₱ {price}
            </p>
          </div>
          <div className="inline-flex gap-4 flex-nowrap">
            <button
              className="w-full px-4 py-1 text-sm text-gray-300 bg-gray-700 border rounded-md whitespace-nowrap border-gray-400/50"
              onClick={handleClick}
            >
              {" "}
              {isInCart ? "Remove from cart" : " Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 min-h-72 w-72 sm:w-96">
        <img
          className="object-cover w-full h-full transition-all opacity-40 group-hover:opacity-80"
          src={image}
          alt={name}
        />
      </div>
    </motion.div>
  );
};

export default ProductCardSecondary;
