import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import ShopState from "../../lib/ShopState";
import ItemModal from "../Product/ItemModal";

const ProductCard = ({ product_id, name, image, price, ...props }) => {
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

  const [toggleItem, setToggleItem] = useState(false)
  let [selectedProduct, setSelectedProduct] = useState(null)

  const toggleItemHandler = () => {
    setToggleItem(!toggleItem)
  }

  return (
    <>
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
        <div className="absolute w-full h-full transition-all bg-gradient-to-t from-black via-black/70 to-gray-900/20 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/5" />

        <div className="absolute bottom-0 w-[calc(100%-1em)] mx-2">
          <h3 className="px-2 text-sm font-medium text-gray-300 sm:text-sm md:text-lg ">
            {name.toUpperCase()}
          </h3>
          {/* <p className="px-2 mb-2 text-[.65em] text-gray-300/60 line-clamp-2 md:text-sm">
            {product_description}
          </p> */}
          <div className="flex items-center justify-between w-full gap-2 mb-2 flex-nowrap">
            {/* <button className="w-full px-4 py-1 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-300/10 bg-gray-100/5 backdrop-blur-sm">
          Buy now
        </button> */}
            <div className="w-full p-2"
              {...props}
            >
              <p className="text-sm font-bold text-yellow-600">
                ₱ {(price - price * 0.4).toFixed(2)}{" "}
              </p>
              <div className="flex gap-2 whitespace-nowrap text-[0.72em]">
                <p className="font-thin line-through text-gray-300/40">
                  ₱ {price}
                </p>
                <span className="font-thin text-gray-300/40">Save 40%</span>
              </div>
            </div>
            <button
              className={[
                "p-2 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-300/10 bg-gray-100/5 w-fit backdrop-blur-sm ",
                isInCart ? "bg-gray-50/5" : "bg-transparent",
              ].join(" ")}
              onClick={() => {
                toggleItemHandler()
                setSelectedProduct(prev => prev = { product_id, product_name: name, product_image: image, product_price: price })
              }}
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
      <ItemModal toggleItem={toggleItem} toggleItemHandler={toggleItemHandler} product={selectedProduct} />
    </>
  );
};

export default ProductCard;
