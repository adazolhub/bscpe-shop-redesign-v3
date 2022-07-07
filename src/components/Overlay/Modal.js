import React from "react";
import { AnimatePresence, motion } from "framer-motion";
const Modal = ({ children, modalToggle, modalToggleHandler, ...props }) => {
  return (
    <>
      <AnimatePresence>
        {modalToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
              type: "tween",
              stiffness: 200,
            }}
            className="fixed top-0 left-0 w-full h-screen overflow-hidden   z-[105] grid place-content-center"
          >
            <div
              className="absolute top-0 left-0 w-full h-screen backdrop bg-gray-800/70 "
              onClick={() => modalToggleHandler()}
            />
            {/* <p
              className="mb-10 text-gray-200 z-[101] font-thin text-center cursor-pointer"
              onClick={modalToggleHandler}
            >
              close
            </p> */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
              {...props}
              className="relative min-w-[20em] max-w-[94%] lg:max-w-[40em] max-h-[100%] m-auto py-4  rounded-md min-h-[24em] modal overflow-hidden  bg-gray-50 z-[106]"
            >
              <div className="relative min-w-[20em] max-w-[100%] lg:max-w-[40em] max-h-[30em] lg:max-h-[40em] m-auto px-4  rounded-md min-h-[24em] modal overflow-hidden  bg-gray-50 z-[101]">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
