import { useState, createContext, useContext } from "react";

const ToggleContext = createContext();

export const ToggleStateProvider = ({ children }) => {
  let [modalToggle, setModalToggle] = useState(false);

  let modalToggleHandler = () => {
    setModalToggle((prev) => !prev);
  };

  return (
    <ToggleContext.Provider
      value={{
        modalToggle,
        modalToggleHandler,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export const ToggleState = () => {
  return useContext(ToggleContext);
};
