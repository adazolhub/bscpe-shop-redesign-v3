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

  const modal = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "100%" },
  };
  const backdrop = {
    open: {
      opacity: 1,
      backgroundColor: "hsla(215, 28%, 17%, 0.7)",
      backdropFilter: "blur(4px)",
      display: "block",
    },
    closed: {
      opacity: 0,
      backgroundColor: "hsla(215, 0%, 0%, 0)",
      backdropFilter: "blur(0px)",
      display: "none",
    },
  };
  return (
    <>
      <AnimatePresence initial={false}>
        {/* MODAL BACKDROP */}
        <motion.div
          key={"4g3"}
          variants={backdrop}
          transition={{
            delay: 0.3,
          }}
          animate={modalToggle ? "open" : "closed"}
          className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-gray-800/70 z-[100]"
          onClick={modalToggleHandler}
        />

        {/* <motion.p
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
            </motion.p> */}

        {/* MODAL CONTENT */}
        <motion.div
          key={"5g2"}
          variants={modal}
          animate={modalToggle ? "open" : "closed"}
          transition={{ type: "tween", duration: 0.4 }}
          {...props}
          className="fixed w-full  bottom-0 left-0 mx-auto p-4 rounded-t-md min-h-[12em] max-h-[96%] modal bg-gray-50 z-[101]"
        >
          {" "}
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MenuModal;
