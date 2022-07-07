import { AnimatePresence, motion } from "framer-motion";
import { scrollDisableOnOverlay } from "../../utils/disableScrollOnOverlay";

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

const MenuModal = ({ children, modalToggle, modalToggleHandler, props }) => {
  //Prevent scroll when modal is toggled open
  scrollDisableOnOverlay(modalToggle);

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
          className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-gray-800/70 z-[105]"
          onClick={modalToggleHandler}
        />

        {/* MODAL CONTENT */}
        <motion.div
          key={"5g2"}
          variants={modal}
          animate={modalToggle ? "open" : "closed"}
          transition={{ type: "tween", duration: 0.4 }}
          drag={"y"}
          dragConstraints={{ top: 0, bottom: 0 }}
          {...props}
          className="fixed w-full  bottom-0 left-0 mx-auto p-4 rounded-t-md min-h-[12em] max-h-[96%] modal bg-white z-[105]
          
            after:fixed after:bottom-0 after:translate-y-full after:-mx-10 after:w-full after:h-full after:bg-white 
          "
        >
          {" "}
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MenuModal;
