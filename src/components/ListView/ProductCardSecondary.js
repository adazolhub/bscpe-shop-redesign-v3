import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShopState from "../../lib/ShopState";

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
    };
    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileFocus={{ scale: 1.03 }}
      className="flex w-full min-w-full overflow-hidden bg-white border border-transparent rounded-lg hover:bg-gray-50 hover:shadow-lg md:min-h-90 hover:border-gray-300 group"
      {...props}
    >
      <div className="flex flex-col justify-between w-full gap-2 p-4 min-h-72 ">
        <div className="flex flex-col gap-2">
          {/* <p className="text-[0.55em] px-2 py-1 bg-blue-600 w-fit text-white rounded-md">Limited</p> */}

          <h2 className="font-medium text-md">{name}</h2>
          <p className="text-xs text-gray-400 text-ellipsis line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex gap-4 text-xs text-gray-500">
          <div>
            <p>Size</p>
            <div className="flex gap-2 mt-1 text-xs">
              <button className="px-2 py-1 text-gray-100 bg-gray-500 border border-gray-200 rounded">
                XS
              </button>
              <button className="px-2 py-1 text-gray-400 border border-gray-200 rounded">
                S
              </button>
              <button className="px-2 py-1 text-gray-400 border border-gray-200 rounded">
                M
              </button>
              <button className="px-2 py-1 text-gray-400 border border-gray-200 rounded">
                L
              </button>
            </div>
          </div>
          <div>
            <p>Color</p>
            <div className="flex gap-2 mt-1 text-xs">
              <button className="w-5 h-5 text-gray-100 border border-gray-600 rounded-full bg-emerald-300"></button>
              <button className="w-5 h-5 text-gray-400 bg-indigo-600 border border-gray-600 rounded-full"></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xs text-orange-600">
              PHP {Math.floor(price - price * 0.4)}{" "}
              <span className="text-gray-500/70">Save 40%</span>
            </p>
            <p className="text-[0.65em] line-through text-gray-500/70">
              PHP {price}
            </p>
          </div>
          <div className="inline-flex gap-4 flex-nowrap">
            <button
              className="w-full px-4 py-1 text-sm text-gray-500 border rounded-md whitespace-nowrap border-gray-400/50"
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
