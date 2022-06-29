import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MenuModal = ({ children, modalToggle, modalToggleHandler, props }) => {
  //Prevent scroll when modal is open
  useEffect(() => {
    if (modalToggle) {
      document.querySelector("html").style.overflow = "hidden";
    }

    return () => {
      document.querySelector("html").style.overflow = null;
    };
  }, [modalToggle]);
  return (
    <>
      <AnimatePresence initial="false">
        {modalToggle && (
          <div className="fixed bottom-0 left-0 w-full h-screen overflow-hidden z-[100] grid place-content-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.1,
                type: "tween",
                bounce: 0,
                stiffness: 300,
              }}
              className="absolute top-0 left-0 w-full h-screen backdrop-blur-sm bg-gray-800/70 "
              onClick={modalToggleHandler}
            />
            <motion.p
              initial={{ y: 1000, opacity: 0 }}
              animate={{ y: -700, opacity: 1 }}
              exit={{ y: 1000, opacity: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
              }}
              className="absolute bottom-0 w-full text-gray-400 z-[101] font-thin text-center cursor-pointer transition-all translate-y-10"
              onClick={modalToggleHandler}
            >
              close
            </motion.p>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                type: "tween",
              }}
              {...props}
              className="absolute w-full bottom-0 left-0 mx-auto p-4 rounded-t-md min-h-[24em] modal bg-gray-50 z-[101]"
            >
              {" "}
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuModal;
