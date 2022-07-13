import React from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
const MiniModal = ({ children, modalToggle, modalToggleHandler, ...props }) => {

    const loadFeatures = () => import("../../utils/features").then(res => res.default)

    return (
        <>
            <LazyMotion features={loadFeatures}>
                <AnimatePresence>
                    {modalToggle && (
                        <m.div
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
                            <m.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
                                {...props}
                                className="relative min-w-[calc(100vw-2em)] mx-2 max-w-full lg:max-w-[40em] md:min-w-[30em] max-h-[100%] m-auto p-4  rounded-md min-h-[10em] modal overflow-hidden  bg-gray-50 z-[106]"
                            >
                                {children}
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </>
    );
};

export default MiniModal;
