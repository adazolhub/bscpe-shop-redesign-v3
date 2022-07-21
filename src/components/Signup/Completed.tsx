import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  let navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 z-[105] bg-gray-100 w-full h-screen">
      <div className="flex flex-col items-start justify-between w-full h-full p-4">
        <div className="w-full h-[40vh] flex flex-col justify-between items-start">
          <button className="p-2 w-fit " onClick={() => navigate("/")}>
            <XIcon className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center mx-auto">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M58.6666 29.5467V32C58.6633 37.7505 56.8013 43.3458 53.3581 47.9516C49.915 52.5573 45.0753 55.9267 39.5609 57.5571C34.0464 59.1876 28.1526 58.9918 22.7585 56.9989C17.3644 55.0061 12.759 51.323 9.62915 46.4989C6.4993 41.6748 5.0127 35.9682 5.39106 30.2302C5.76942 24.4922 7.99247 19.0302 11.7287 14.6589C15.4649 10.2876 20.514 7.24106 26.1231 5.97377C31.7322 4.70647 37.6006 5.28628 42.8533 7.62671"
                stroke="#424242"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M58.6667 10.6667L32 37.3601L24 29.3601"
                stroke="#424242"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h1 className="mt-4 text-4xl font-thin leading-10 text-gray-500">
              You're all set up!
            </h1>
            <p className="text-xs leading-7 text-gray-300">
              Welcome to BSCPE STORE V2 <i>(re-design)</i>
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full ">
          <button
            className="w-full btn-primary whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            Shop now
          </button>
          <button
            className="w-full btn-secondary whitespace-nowrap"
            onClick={() => navigate("/account")}
          >
            Setup Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completed;
