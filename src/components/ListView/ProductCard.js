import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import ShopState from "../../lib/ShopState";

const ProductCard = ({ product_id, name, image, price }) => {
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
      className="relative grid w-full min-w-full overflow-hidden rounded-md h-60 place-content-center hover:shadow-md group"
    >
      <img
        className="object-cover w-full h-full transition-all duration-300 scale-100 opacity-100 hover:opacity-70 group-hover:scale-110 bg-blend-darken"
        src={image}
        alt={name}
      />
      <div className="absolute w-full h-full transition-all bg-gradient-to-t from-gray-900 via-gray-800/30 to-gray-900 group-hover:via-gray-800/5 group-hover:to-gray-900/40" />

      <div className="absolute bottom-0 w-[calc(100%-1em)] mx-2">
        <h3 className="px-2 text-xs text-white font-extralight sm:text-sm md:text-lg">
          {name.toUpperCase()}
        </h3>
        {/* <p className="px-2 mb-2 text-[.65em] text-gray-300/60 line-clamp-2 md:text-sm">
            {product_description}
          </p> */}
        <div className="flex items-center justify-between w-full gap-2 mb-2 flex-nowrap">
          {/* <button className="w-full px-4 py-1 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-300/10 bg-gray-100/5 backdrop-blur-sm">
          Buy now
        </button> */}
          <div className="w-full p-2">
            <p className="text-sm font-bold text-yellow-600">
              PHP {Math.floor(price - price * 0.4)}{" "}
            </p>
            <div className="flex gap-2 whitespace-nowrap text-[0.63em]">
              <p className="font-thin line-through text-gray-300/70">
                PHP {price}
              </p>
              <span className="font-thin text-gray-300/70">Save 40%</span>
            </div>
          </div>
          <button
            className={[
              "p-2 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-300/10 bg-gray-100/5 w-fit backdrop-blur-sm ",
              isInCart ? "bg-gray-50/5" : "bg-transparent",
            ].join(" ")}
            onClick={handleClick}
          >
            {isInCart ? (
              <ShoppingBagIcon className="w-4 h-4 " />
            ) : (
              <ShoppingCartIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
