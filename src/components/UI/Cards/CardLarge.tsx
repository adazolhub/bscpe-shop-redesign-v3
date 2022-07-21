import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon as ShoppingCartIconFill } from "@heroicons/react/solid";
import React from "react";
import style from "./Card.module.css";
const CardLarge = () => {
  return (
    <div className={`${style.large} hover:grayscale-0 group`}>
      <div className={style.large__image}>
        <img
          src="https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="polo"
          className="group-hover:scale-125"
        />
      </div>
      <div className={style.large__details}>
        <h2 className={style.large__title}>
          Antonios Clothing Solid Elegant Long-Sleeve Shirt
        </h2>
        <p className={style.large__price}>
          {" "}
          P 870.00{" "}
          <span className={style.large__original_price}>P 1425.50</span>{" "}
        </p>
        <div className={style.large__footer}>
          <button className={style.large__navigate}>View product</button>
          <button className={style.large__cart}>
            <ShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardLarge;
