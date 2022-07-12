import { createContext, useContext, useReducer } from "react";
import shopReducer, { initialCartState } from "./shopReducer";

const ShopContext = createContext(initialCartState);

export const ShopStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialCartState);

  const addToCart = (product) => {
    const updatedCart = state.products.concat(product);
    updatePrice(updatedCart);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCart,
      },
    });
  };
  const removeFromCart = (product) => {
    const updatedCart = state.products.filter(
      (currentProduct) => currentProduct.name !== product.name
    );
    updatePrice(updatedCart);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart,
      },
    });
  };

  const updatePrice = (products) => {
    let total = 0;
    products.forEach((product) => (total += product.price));

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        total,
      },
    });
  };

  let value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const ShopState = () => {
  return useContext(ShopContext);
};

export default ShopState;
