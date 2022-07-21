import { DocumentData } from "firebase/firestore";
import { ProductCart } from "../../types";


interface Cart {
  total: number,
  totalQuantity: number,
  products: ProductCart[],
  removeFromCart?: (item: ProductCart) => ProductCart | null 
}

export const initialCartState : Cart = {
  total: 0,
  totalQuantity: 0,
  products: [],
};

const shopReducer = (state : Cart, action : { type: string, payload: DocumentData }) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: payload.products,
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: payload.products,
      };
    case "UPDATE_PRICE":
      return {
        ...state,
        total: payload.total,
        totalQuantity: payload.totalQuantity,
      };
    default:
      throw new Error(`No case for type ${type} found in show reducer`);
  }
};

export default shopReducer;
