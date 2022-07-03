import { useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ToggleContext = createContext();

function categorySetter(pathname) {
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

export const ToggleStateProvider = ({ children }) => {
  let [modalToggle, setModalToggle] = useState(false);
  let navigate = useNavigate();

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

  return (
    <ToggleContext.Provider
      value={{
        modalToggle,
        modalToggleHandler,
        toggleListGrid,
        handleToggleListGrid,
        settingToggle,
        settingToggleHandler,
        cartToggle,
        cartToggleHandler,
        cartToggleOff,
        category,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export const ToggleState = () => {
  return useContext(ToggleContext);
};
