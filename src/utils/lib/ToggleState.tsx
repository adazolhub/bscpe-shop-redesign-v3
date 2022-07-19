import { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { States, StaticState, TypeJSX } from "../../types";

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
  let [modalToggle, setModalToggle] = useState(false);

  const [toggleState, setToggleState] = useState<{ [state: string]: boolean }>({
    modal: false,
    notification: false,
    cart: false,
    modal_ios: false,
    modal_full: false,
    modal_standard: false,
    header_notify: true,
    side_bar: false,
    hamburger_mobile: false,
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
  ) =>
    setToggleState(
      (prev) => (prev = { ...prev, [modal_type]: !prev[modal_type] })
    );

  let modalToggleHandler = () => {
    setModalToggle((prev) => !prev);
  };

  const [toggleListGrid, setToggleListGrid] = useState(false);

  const handleToggleListGrid = () => {
    setToggleListGrid((prev) => !prev);
  };

  let [settingToggle, setSettingToggle] = useState(false);
  let settingToggleHandler = () => {
    setSettingToggle((prev) => !prev);
  };

  let { pathname } = useLocation();
  let category = categorySetter(pathname);

  let [cartToggle, setCartToggle] = useState(false);

  let cartToggleHandler = () => {
    setCartToggle((prev) => !prev);
  };
  let cartToggleOff = () => {
    setCartToggle(false);
  };

  let [notifyToggle, setNotifyToggle] = useState(false);

  let notifyToggleHandler = () => {
    setNotifyToggle((prev) => !prev);
  };
  let notifyToggleOff = () => {
    setNotifyToggle(false);
  };

  let [checkoutToggle, setCheckoutToggle] = useState(false);

  let checkoutToggleHandler = () => {
    setCheckoutToggle((prev) => !prev);
  };
  let [toggleHeadNotify, setToggleHeadNotify] = useState(true);

  let toggleHeadNotifyHandler = () => {
    setToggleHeadNotify((prev) => !prev);
  };

  let values = {
    modalToggle,
    modalToggleHandler,
    toggleListGrid,
    handleToggleListGrid,
    settingToggle,
    settingToggleHandler,
    checkoutToggle,
    checkoutToggleHandler,
    cartToggle,
    cartToggleHandler,
    cartToggleOff,
    notifyToggle,
    notifyToggleHandler,
    notifyToggleOff,
    toggleHeadNotify,
    toggleHeadNotifyHandler,
    category,

    toggleState,
    toggleStateHandler,
  };

  return (
    <ToggleContext.Provider value={values}>{children}</ToggleContext.Provider>
  );
};

export const ToggleState = () => {
  return useContext(ToggleContext);
};
