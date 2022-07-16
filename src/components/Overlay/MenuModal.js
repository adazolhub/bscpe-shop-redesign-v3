import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { scrollDisableOnOverlay } from "../../utils/disableScrollOnOverlay";

const modal = {
  open: {
    opacity: 1, y: 0, transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.04, 1]
    }
  },
  closed: {
    opacity: 0, y: "100%", transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.04, 1]
    }
  },
};
const backdrop = {
  open: {
    opacity: 1,
    backgroundColor: "hsla(215, 28%, 17%, 0.7)",
    backdropFilter: "blur(2px)",
    transition: {
      duration: 0.4,
      ease: [0.36, 0.66, 0.04, 1]
    },
    display: "block",
  },
  closed: {
    opacity: 0,
    backgroundColor: "hsla(215, 0%, 0%, 0)",
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.36, 0.66, 0.04, 1]
    },
    display: "none",
  },
};

const MenuModal = ({ children, modalToggle, modalToggleHandler, props }) => {
  //Prevent scroll when modal is toggled open
  scrollDisableOnOverlay(modalToggle);

  const loadFeatures = () => import("../../utils/features").then(res => res.default)

  return (
    <>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence key={3} initial={false}>

          {/* MODAL BACKDROP */}
          <m.div
            key={1}
            variants={backdrop}
            transition={{
              delay: 0.3,
            }}
            animate={modalToggle ? "open" : "closed"}
            className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-gray-800/70 z-[105]"
            onClick={modalToggleHandler}
          />
          {/* MODAL CONTENT */}
          <m.div
            key={2}
            variants={modal}
            animate={modalToggle ? "open" : "closed"}
            transition={{ type: "tween", duration: 0.4 }}
            drag={"y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            {...props}
            className="fixed w-full  bottom-0   my-auto left-0  mx-auto p-4 rounded-t-md min-h-[12em] max-h-[96%]   modal bg-white z-[105]

            lg:w-[50%] lg:rounded-b-md lg:inset-y-1/4 lg:left-1/4 lg:max-h-max lg:after:hidden

          after:fixed  after:bottom-0 after:translate-y-full after:-mx-4 after:w-full after:h-full after:bg-white
          "
          >
            {" "}
            {children}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </>
  );
};

export default MenuModal;
