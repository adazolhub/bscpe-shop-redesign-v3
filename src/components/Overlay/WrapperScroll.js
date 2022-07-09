import React from "react";

const WrapperScroll = ({ children }) => {
  return (
    <>
      <div className="min-h-[calc(100vh-10em)] max-h-[calc(100vh-5em)] px-1 overflow-hidden overflow-y-scroll flex flex-col gap-4 ">
        {children}
      </div>
      {/* <a
        className=" bottom-0 mx-auto text-[0.6em] text-gray-400 font-light py-2 mt-2 text-center "
        href="https://www.adazolhub.com"
        target="_blank"
        rel="noreferrer"
      >
        © Copyright 2022 | adazolhub.com
      </a> */}
    </>
  );
};

export default WrapperScroll;
