import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCart, ProductList, StaticState } from "../../types";
import IsOnCart from "../../utils/hooks/useOnCartListener";
import { UserAuth } from "../../utils/lib/Auth";
import { ToggleState } from "../../utils/lib/ToggleState";
import ItemModal from "../Product/ItemModal";
import ProductCardGrid from "../UI/Cards/ProductCardGrid";
import ModalMobile from "../UI/Modal/Mobile/ModalMobile";
import ProductCard from "./ProductCard";
import SelectedProduct from "./SelectedProduct";

//TODOS : need to fix their types > temporarity set to (any)
const TwoColumn = ({ category, addToCart }: any) => {
  const { toggleState, toggleStateHandler, selectedProduct } =
    ToggleState() as StaticState;
  const { list: data }: any = UserAuth();
  let navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-2 row-start-1 row-end-4 gap-2 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-start place-content-start">
        {data &&
          data
            ?.filter((prod: any) => prod.product_category === category)
            .map((product: ProductList) => (
              <React.Fragment key={product.product_id}>
                <ProductCardGrid product={product} isInCart={false} />
              </React.Fragment>
            ))}
        <ModalMobile
          state={toggleState["modal_mobile"]}
          toggleStateHandler={() => toggleStateHandler("modal_mobile")}
        >
          {selectedProduct && <SelectedProduct product={selectedProduct} />}
        </ModalMobile>
      </div>
    </>
  );
};

export default TwoColumn;
