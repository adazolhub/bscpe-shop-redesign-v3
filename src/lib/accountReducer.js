export const initialAcountState = {
  user: null,
  payment: null,
  shipping: null,
};

const accountReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_USER":
      return {
        ...state,
        user: payload.user,
      };
    case "GET_PAYMENT":
      return {
        ...state,
        payment: payload.payment,
      };
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payment: payload.payment,
      };
    case "GET_SHIPPING":
      return {
        ...state,
        shipping: payload.shipping,
      };
    case "UPDATE_SHIPPING":
      return {
        ...state,
        shipping: payload.shipping,
      };
    default:
      throw new Error(`No case for type ${type} found in show reducer`);
  }
};

export default accountReducer;
