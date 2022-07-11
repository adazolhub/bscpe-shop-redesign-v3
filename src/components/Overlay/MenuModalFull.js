import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { scrollDisableOnOverlay } from "../../utils/disableScrollOnOverlay";

import useMeasure from "react-use-measure";
import { useNavigate } from "react-router-dom";
const modal = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 1, x: "100%" },
};
const backdrop = {
  open: {
    opacity: 1,
    // backgroundColor: "hsla(215, 28%, 17%, 0.7)",
    backdropFilter: "blur(4px)",
    display: "block",
  },
  closed: {
    opacity: 0,
    // backgroundColor: "hsla(215, 0%, 0%, 0)",
    backdropFilter: "blur(0px)",
    display: "none",
  },
};

const MenuModalFull = ({
  children,
  modalToggle,
  modalToggleHandler,
  props,
  title,
}) => {
  let navigate = useNavigate();
  let x = useMotionValue(0);
  //let display = useTransform(x, [0, 200, 250], ["block", "block", "none"]);
  //   x.onChange((latest) => {
  //     if (latest > 201) modalToggleHandler();
  //     else {
  //       modalToggleHandler();
  //     }
  //   });
  return (
    <>
      <AnimatePresence initial={false}>
        {/* MODAL BACKDROP */}
        <motion.div
          key={"4g3"}
          variants={backdrop}
          animate={modalToggle ? "open" : "closed"}
          className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-gray-800/10 z-[100]"
          onClick={() => {
            modalToggleHandler();
            navigate("");
          }}
        />

        {/* MODAL CONTENT */}
        <motion.div
          {...props}
          key={"5g2"}
          drag="x"
          style={{ x }}
          onDragEnd={(e, info) => {
            if (x.get() > 130) {
              navigate("");
              modalToggleHandler();
            }
          }}
          dragConstraints={{ left: 0, right: 0 }}
          variants={modal}
          animate={modalToggle ? "open" : "closed"}
          transition={{ type: "tween" }}
          className="fixed w-full  bottom-0 right-0 mx-auto rounded-l-md min-h-[100vh] lg:max-w-[35em] modal bg-gray-100 z-[101]

          after:bg-gray-100 after:translate-x-[calc(100%)] after:right-0 after:w-full after:h-full after:absolute after:top-0 after:z-[100] "
        >
          <div className="sticky top-0 flex flex-col z-[102] bg-gray-100  mx-2">
            <div className="flex items-center justify-between py-2">
              <button
                className="py-1 pl-1 pr-4 rounded-md sm:pr-2 sm:pl-2 group"
                onClick={() => {
                  navigate("");
                  modalToggleHandler();
                }}
              >
                <ArrowLeftIcon className="w-5 h-5 transition-all group-hover:-translate-x-1" />
              </button>

              <p className="text-[0.68em] font-thin text-gray-500/70">
                {title?.split("-").join(" ").toUpperCase()}
              </p>
              <div className="px-2 w-9" />
            </div>
            <div className="">{children}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MenuModalFull;
