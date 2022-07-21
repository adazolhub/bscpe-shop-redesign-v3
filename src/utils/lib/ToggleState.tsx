import { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ProductList, States, StaticState, TypeJSX } from "../../types";

const ToggleContext = createContext<States | StaticState>({});

function categorySetter(pathname: string) {
  switch (pathname) {
    case "/":
      return "men";
    case "/1":
      return "women";
    case "/2":
      return "kids";
    default:
      return "men";
  }
}

export const ToggleStateProvider = ({ children }: any) => {
  const [toggleState, setToggleState] = useState<{ [state: string]: boolean }>({
    modal: false,
    notification: false,
    cart: false,
    modal_ios: false,
    modal_full: false,
    modal_standard: false,
    modal_mobile: false,
    header_notify: true,
    side_bar: false,
    hamburger_mobile: false,
    settings: false,
  });

  /**
   * Function for toggling the state
   * @param modal_type This is state that toggles some components
   * example @param modal_type:
   *   - string<type>
   *   - modal
   *   - cart
   *   - notification
   *   - header_notify
   *   - modal_ios
   *   - modal_full
   *   - modal_standard
   *   - side_bar
   *   - hamburger_mobile
   */
  const toggleStateHandler = (
    modal_type:
      | string
      | "modal"
      | "cart"
      | "notification"
      | "header_notify"
      | "modal_ios"
      | "modal_full"
      | "modal_standard"
      | "side_bar"
      | "hamburger_mobile"
      | "settings"
      | "modal_mobile"
  ) =>
    setToggleState(
      (prev) => (prev = { ...prev, [modal_type]: !prev[modal_type] })
    );

  let { pathname } = useLocation();
  let category = categorySetter(pathname);

  let [selectedProduct, setSelectedProduct] = useState<ProductList>();

  let values = {
    category,
    toggleState,
    toggleStateHandler,
    selectedProduct,
    setSelectedProduct,
  };

  return (
    <ToggleContext.Provider value={values}>{children}</ToggleContext.Provider>
  );
};

export const ToggleState = () => {
  return useContext(ToggleContext);
};
