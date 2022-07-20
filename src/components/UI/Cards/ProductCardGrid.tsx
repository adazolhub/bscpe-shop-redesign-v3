import { ShoppingCartIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon as ShoppingCartIconFill } from "@heroicons/react/solid";
import React from "react";
import { ProductCart, ProductList } from "../../../types";
import style from "./Card.module.css";
const ProductCardGrid = ({
  product,
  cartStatus,
}: {
  product: ProductList;
  cartStatus: boolean;
}) => {
  return (
    <div
      className={`${style.product} hover:ring-1 hover:ring-black/5 hover:shadow-sm hover:bg-white`}
    >
      <div className={style.product__top}>
        <div className={`${style.product__image} group`}>
          <img
            src={product.product_image}
            alt="jacket"
            className="group-hover:scale-125 group-hover:grayscale-0 "
          />
          <span className={style.product__tag}>Sale</span>
        </div>
      </div>

      <div className={style.product__bottom}>
        <div className={style.product__details}>
          <h3 className={style.product__title}>{product.product_name}</h3>
          <p className={style.product__price}>
            ₱ {(product.product_price * 0.6).toFixed(2)}
            <span className={style.product__original_price}>
              ₱ {product.product_price.toFixed(2)}
            </span>
          </p>
        </div>

        <button className={style.product__cart}>
          {cartStatus ? <ShoppingCartIconFill /> : <ShoppingCartIcon />}
        </button>
      </div>
    </div>
  );
};

export default ProductCardGrid;
