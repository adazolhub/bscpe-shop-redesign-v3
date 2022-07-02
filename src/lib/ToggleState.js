import { useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

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

  let modalToggleHandler = () => {
    setModalToggle((prev) => !prev);
  };

  const [toggleListGrid, setToggleListGrid] = useState(false);

  const handleToggleListGrid = () => {
    setToggleListGrid((prev) => !prev);
  };

  let { pathname } = useLocation();
  let category = categorySetter(pathname);

  return (
    <ToggleContext.Provider
      value={{
        modalToggle,
        modalToggleHandler,
        toggleListGrid,
        handleToggleListGrid,
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
