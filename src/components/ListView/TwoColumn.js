import React,{ useState } from "react";
import { UserAuth } from "../../lib/Auth";
import ItemModal from "../Product/ItemModal";
import ProductCard from "./ProductCard";

const TwoColumn = ({ category, addToCart }) => {
  const { list: data } = UserAuth();
  const [toggleItem, setToggleItem] = useState(false)
  let [selectedProduct, setSelectedProduct] = useState(null)

  const toggleItemHandler = () => {
    setToggleItem(!toggleItem)
}
  return (
    <>
      <div className="grid grid-cols-2 row-start-1 row-end-4 gap-2 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-center">
        {data &&
          data
            ?.filter((prod) => prod.product_category === category)
            .map((product) => (
              <React.Fragment
                key={product.product_id}
              >
              <ProductCard
                key={product.product_id}
                product_id={product.product_id}
                name={product.product_name}
                image={product.product_image}
                price={product.product_price}
                onClick={() => { toggleItemHandler()
                  setSelectedProduct(prev => prev = product)
                }}
              />
              </React.Fragment>
            ))}
          <ItemModal toggleItem={toggleItem} toggleItemHandler={toggleItemHandler} product={selectedProduct}/>
      </div>
    </>
  );
};

export default TwoColumn;
