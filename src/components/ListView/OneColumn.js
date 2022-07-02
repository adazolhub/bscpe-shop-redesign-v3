import { motion } from 'framer-motion';
import { UserAuth } from '../../lib/Auth';

const OneColumn = ({ category, addToCart }) => {
    const {  list: data } = UserAuth();
    return (
      <>
        <div className="grid grid-cols-1 row-start-1 row-end-4 gap-4 px-2 mb-6 grid-flow-dense md:grid-cols-2 xl:grid-cols-3 place-items-center ">
          {data &&
            data
              ?.filter((prod) => prod.product_category === category)
              .map((product, index) => (
                <motion.div
                  key={product?.product_id}
                  whileTap={{ scale: 0.97 }}
                  whileFocus={{ scale: 1.03 }}
                  className="flex w-full min-w-full overflow-hidden bg-gray-100 border border-transparent rounded-lg hover:bg-gray-50 hover:shadow-lg h-60 md:h-90 hover:border-gray-300 group"
                >
                  <div className="flex flex-col justify-between w-full h-full gap-2 p-4 ">
                    <div className="flex flex-col gap-2">
                      {/* <p className="text-[0.55em] px-2 py-1 bg-blue-600 w-fit text-white rounded-md">Limited</p> */}
  
                      <h2 className="text-lg font-medium">
                        {product?.product_name}
                      </h2>
                      <p className="text-xs text-gray-400 text-ellipsis line-clamp-3">
                        {product?.product_description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-orange-600">
                          PHP{" "}
                          {product?.product_price - product?.product_price * 0.4}{" "}
                          <span className="text-gray-500/70">Save 40%</span>
                        </p>
                        <p className="text-xs line-through text-gray-500/70">
                          PHP {product?.product_price}
                        </p>
                      </div>
                      <div className="inline-flex gap-4 flex-nowrap">
                        <button className="px-4 py-1 text-sm text-white bg-gray-700 border rounded-md whitespace-nowrap border-gray-400/50">
                          Buy now
                        </button>
                        <button
                          className="px-4 py-1 text-sm text-gray-500 border rounded-md whitespace-nowrap border-gray-400/50"
                          onClick={() =>
                            addToCart
                              ? addToCart(product?.product_id)
                              : console.log("not logged in")
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-full bg-gray-800 w-60">
                    <img
                      className="object-cover w-full h-full transition-all opacity-40 group-hover:opacity-80"
                      src={product?.product_image}
                      alt={product?.product_name}
                    />
                  </div>
                </motion.div>
              ))}
        </div>
      </>
    );
}

export default OneColumn