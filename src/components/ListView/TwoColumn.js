import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { UserAuth } from "../../lib/Auth";

const TwoColumn = ({ category, addToCart }) => {
  const { list: data } = UserAuth();
  return (
    <>
      <div className="grid grid-cols-2 row-start-1 row-end-4 gap-2 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-center">
        {data &&
          data
            ?.filter((prod) => prod.product_category === category)
            .map((product) => (
              <motion.div
                key={product?.product_id}
                whileTap={{ scale: 0.97 }}
                whileFocus={{ scale: 1.03 }}
                className="relative grid w-full min-w-full overflow-hidden rounded-md h-60 place-content-center hover:shadow-md group"
              >
                <img
                  className="object-cover w-full h-full transition-all duration-300 scale-100 opacity-100 hover:opacity-70 group-hover:scale-110 bg-blend-darken"
                  src={product?.product_image}
                  alt={product?.product_name}
                />
                <div className="absolute w-full h-full transition-all bg-gradient-to-t from-gray-900 via-gray-800/30 to-gray-900 group-hover:via-gray-800/5 group-hover:to-gray-900/40" />

                <div className="absolute bottom-0 w-[calc(100%-1em)] mx-2">
                  <h3 className="px-2 text-xs text-white font-extralight sm:text-sm md:text-lg">
                    {(product?.product_name).toUpperCase()}
                  </h3>
                  {/* <p className="px-2 mb-2 text-[.65em] text-gray-300/60 line-clamp-2 md:text-sm">
                        {product?.product_description}
                      </p> */}
                  <div className="flex items-center justify-between w-full gap-2 mb-2 flex-nowrap">
                    {/* <button className="w-full px-4 py-1 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-300/10 bg-gray-100/5 backdrop-blur-sm">
                      Buy now
                    </button> */}
                    <div className="w-full p-2">
                      <p className="text-sm font-bold text-yellow-600">
                        PHP{" "}
                        {Math.floor(
                          product?.product_price - product?.product_price * 0.4
                        )}{" "}
                      </p>
                      <div className="flex gap-2 whitespace-nowrap text-[0.63em]">
                        <p className="font-thin line-through text-gray-300/70">
                          PHP {product?.product_price}
                        </p>
                        <span className="font-thin text-gray-300/70">
                          Save 40%
                        </span>
                      </div>
                    </div>
                    <button
                      className="p-2 text-sm text-gray-100 border rounded-md whitespace-nowrap border-gray-300/10 bg-gray-100/5 w-fit backdrop-blur-sm"
                      onClick={() =>
                        addToCart
                          ? addToCart(product?.product_id)
                          : console.log("not logged in")
                      }
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </>
  );
};

export default TwoColumn;
