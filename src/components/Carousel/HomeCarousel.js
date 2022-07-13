import React, { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import Dot from "./Dot";
function HomeCarousel() {
  let [count, setCount] = useState(0);

  let prev = usePrevious(count);

  let direction = count > prev ? "+" : "-";

  useEffect(() => {
    let timer = setInterval(() => {

      handleNext()
    }, 8000);

    return () => clearInterval(timer)

  }, [count])

  let handleNext = () => {
    if (count < images?.length - 1) setCount(count + 1)
    else {
      setCount(0)
    }
  }
  let handlePrev = () => {
    if (count > 0) setCount(count - 1)
    else {
      setCount(images.length - 1)
    }
  }

  return (
    <div className="relative h-40 mx-2 overflow-hidden rounded-md md:h-60 lg:h-80 lg:col-span-3 lg:row-span-3">
      <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full h-full text-white">
        <button
          className="mx-2 rounded-full h-fit bg-gray-500/5 backdrop-blur-sm"
          onClick={handlePrev}
        >
          <ChevronLeftIcon className="w-[1.5em] lg:w-[3em] h-6 " />
        </button>
        <button
          className="mx-2 rounded-full h-fit bg-gray-500/5 backdrop-blur-sm"
          onClick={handleNext}
        >
          <ChevronRightIcon className="w-[1.5em] lg:w-[3em] h-6 " />
        </button>
        <Dot length={images?.length} activeIndex={count} setActiveIndex={setCount} />
      </div>

      <div className="relative top-0 left-0 flex items-center justify-between w-full h-full -z-0">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={count}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={{ duration: 0.6 }}
            className={`absolute top-0 left-0 flex  w-full h-full justify-center items-center  ${colors[Math.abs(count) % colors.length]
              }`}
          >
            <img
              className="object-cover w-full h-full mix-blend-multiply"
              src={`${images[Math.abs(count) % images.length]}`}
              alt="clothes"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

let variants = {
  enter: (direction) => ({ x: direction === "+" ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction === "+" ? "-100%" : "100%" }),
};

let images = [
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80",
  "https://images.unsplash.com/flagged/photo-1564468781192-f023d514222d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];
let colors = [
  "bg-gray-300",
  "bg-red-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-orange-300",
  "bg-purple-300",
];

function usePrevious(state) {
  let [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }
  return tuple[0];
}

export default HomeCarousel;
