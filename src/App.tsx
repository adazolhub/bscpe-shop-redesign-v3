import React, { useState } from "react";

import "./style/App.css";
import NavHeader from "./components/UI/Nav/NavHeader";
import { ArrowNarrowRightIcon, ArrowDownIcon } from "@heroicons/react/outline";
import Home from "./Home";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";
import { Route, Routes, useLocation } from "react-router-dom";

import HomeSection from "./components/Core/HomeSection";
import HomePage from "./pages/Homepage";

function App() {
  //Internal state management (test only)

  const [toggleState, setToggleState] = useState({
    modal: false,
    notification: false,
    cart: false,
    modal_ios: false,
    modal_full: false,
    modal_standard: false,
    header_notify: true,
    side_bar: false,
  });

  const setToggleStateHandler = (
    modal_type:
      | "modal"
      | "cart"
      | "notification"
      | "header_notify"
      | "modal_ios"
      | "modal_full"
      | "modal_standard"
      | "side_bar"
  ) =>
    setToggleState(
      (prev) => (prev = { ...prev, [modal_type]: !prev[modal_type] })
    );

  //TESTING REACT SPRING ANIMATION
  const AnimatedHomeContent = animated(HomeContent);

  let { pathname } = useLocation();
  // let element = useRoutes(routes)

  return (
    <div className="">
      <NavHeader />
      {pathname === "/" && (
        <div
          className={`relative h-screen -top-[var(--height-top)] bg-gradient-to-t from-black to-black/30`}
        >
          <img
            src="https://images.unsplash.com/photo-1657928196334-26146c4e5702?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="girl-texting-on-hod"
            className="object-cover w-full h-full mix-blend-color"
          />
          <AnimatedHomeContent setToggleStateHandler={setToggleStateHandler} />
        </div>
      )}

      <HomePage />

      <Home
        toggleState={toggleState}
        setToggleStateHandler={setToggleStateHandler}
      />
    </div>
  );
}

interface Modal {
  setToggleStateHandler: (
    mode:
      | "modal"
      | "cart"
      | "notification"
      | "header_notify"
      | "modal_ios"
      | "modal_full"
      | "modal_standard"
      | "side_bar"
  ) => void;
}

function HomeContent({ setToggleStateHandler }: Modal) {
  const [ref, { height, top }] = useMeasure();
  const props = useSpring({
    to: { opacity: 1, y: 0, height: height },
    from: { opacity: 0, y: 50, height: 0 },
    config: { duration: 300 },
  });

  console.log(props.height.to((y) => y.toFixed(0)));

  return (
    <animated.div
      style={props}
      className="absolute bottom-0 m-5 text-sm text-gray-500 h-fit"
    >
      <div ref={ref} className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-medium text-gray-200">Hello world</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur explicabo labore assumenda amet placeat facere
            aspernatur. Provident ut, quo fuga recusandae ratione voluptate
            amet, assumenda sit nostrum voluptates debitis similique.
          </p>
        </div>
        <button
          onClick={() => setToggleStateHandler("modal_ios")}
          className="inline-flex items-center justify-center gap-4 px-6 py-3 text-white border rounded border-gray-300/40 bg-white/5 backdrop-blur"
        >
          Shop now{" "}
          <span>
            <ArrowNarrowRightIcon className="animate-pulse" />
          </span>{" "}
        </button>

        <button
          onClick={() => setToggleStateHandler("modal_full")}
          className="grid px-6 mx-auto mt-10 text-xs text-gray-500 animate-bounce place-items-center w-fit"
        >
          <span>Scroll</span>
          <ArrowDownIcon className="w-4" />
        </button>
      </div>
    </animated.div>
  );
}

export default App;
