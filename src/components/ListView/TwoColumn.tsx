import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../utils/lib/Auth";
import ItemModal from "../Product/ItemModal";
import ProductCard from "./ProductCard";

//TODOS : need to fix their types > temporarity set to (any)
const TwoColumn = ({ category, addToCart } : any) => {
  const { list: data } : any = UserAuth();
  let navigate = useNavigate()

  return (
    <>
      <div className="grid grid-cols-2 row-start-1 row-end-4 gap-2 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-center">
        {data &&
          data
            ?.filter((prod : any) => prod.product_category === category)
            .map((product : any) => (
              <React.Fragment
                key={product.product_id}
              >
                <ProductCard
                  key={product.product_id}
                  product_id={product.product_id}
                  name={product.product_name}
                  image={product.product_image}
                  price={product.product_price}
                  onClick={() => navigate(`/product/${product.product_id}`)}
                />
              </React.Fragment>
            ))}
        {/* <ItemModal toggleItem={toggleItem} toggleItemHandler={toggleItemHandler} product={selectedProduct} /> */}
      </div>
    </>
  );
};

export default TwoColumn;
