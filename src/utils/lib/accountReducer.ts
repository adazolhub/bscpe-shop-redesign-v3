import { Auth, Unsubscribe } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

interface User {
  user: DocumentData | null | undefined,
  payment: DocumentData | null | undefined,
  shipping: DocumentData | null | undefined,
}
interface State {
  
}

export const initialAcountState : User = {
  user: null,
  payment: null,
  shipping: null,
};

const accountReducer = ( state : User , action : { type: string; payload: DocumentData | null}) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_USER":
      return {
        ...state,
        user: payload?.user,
      };
    case "GET_PAYMENT":
      return {
        ...state,
        payment: payload?.payment,
      };
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payment: payload?.payment,
      };
    case "GET_SHIPPING":
      return {
        ...state,
        shipping: payload?.shipping,
      };
    case "UPDATE_SHIPPING":
      return {
        ...state,
        shipping: payload?.shipping,
      };
    default:
      throw new Error(`No case for type ${type} found in show reducer`);
  }
};

export default accountReducer;
