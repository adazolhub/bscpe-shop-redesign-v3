import React from "react";

const WrapperScroll = ({ children }) => {
  return (
    <div className="max-h-[calc(100vh-4em)]  overflow-hidden overflow-y-scroll flex flex-col gap-4 ">
      {children}
    </div>
  );
};

export default WrapperScroll;
