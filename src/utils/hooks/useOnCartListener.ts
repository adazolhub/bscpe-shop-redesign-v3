import { useState, useEffect } from "react";
import { ProductList } from "../../types";
import { UserAuth } from "../lib/Auth";

function IsOnCart(products: ProductList) {
  let [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    let { list }: any = UserAuth;
    let productIsInCart = list.find(
      (item: any) => item.name === products?.product_name
    );

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products?.product_name]);
  return isInCart;
}

export default IsOnCart;
