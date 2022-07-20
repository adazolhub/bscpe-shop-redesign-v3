import { BellIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import {
  Link,
  matchRoutes,
  useLocation,
  useResolvedPath,
} from "react-router-dom";
import ShoppingCart from "./components/Cart/ShoppingCart";
import ModalNotification from "./components/Notification/ModalNotification";
import NotificationPanel from "./components/Notification/NotificationPanel";
import ModalFull from "./components/UI/Modal/Full/ModalFull";
import ModalIos from "./components/UI/Modal/Ios/ModalIos";
import ModalSide from "./components/UI/Modal/Side/ModalSide";
import ModalStandard from "./components/UI/Modal/Standard/ModalStandard";
import { SidebarNav } from "./components/UI/Sidebar/SidebarNav";
import { StaticState } from "./types";
import { ToggleState } from "./utils/lib/ToggleState";

interface Modal {
  toggleState: {
    [key: string]: boolean;
  };
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

const Home = () => {
  let { toggleState, toggleStateHandler } = ToggleState() as StaticState;
  return (
    <div className="absolute bottom-0 overlay" role={"dialog"}>
      {/** Mobile Sidebar*/}
      <SidebarNav
        state={toggleState["hamburger_mobile"]}
        toggleStateHandler={() => toggleStateHandler("hamburger_mobile")}
      />

      {/** Notification Overlay*/}
      <ModalNotification />

      {/** Cart Overlay*/}
      <ShoppingCart />

      <ModalIos
        state={toggleState["modal_ios"]}
        toggleStateHandler={() => toggleStateHandler("modal_ios")}
      >
        <div>
          <nav className="inline-flex items-center gap-2 mb-2 text-sm text-gray-400">
            <span>
              <ShoppingBagIcon className="w-5 h-5" />
            </span>
            <span>My cart</span>
          </nav>
          <div className="flex flex-col gap-2">
            <div className="p-2 border border-gray-400 border-dashed rounded">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                molestiae saepe, ratione dolorem quo ducimus voluptas animi nam
                iste sunt maiores officiis accusantium magnam amet minus? Fuga
                laborum consectetur minus.
              </p>
            </div>
            <button className="btn_primary">Checkout</button>
            <button className="p-3 underline rounded underline-offset-2">
              Expand cart
            </button>
          </div>
        </div>
      </ModalIos>

      {/* <ModalFull
        state={toggleState["modal_full"]}
        toggleStateHandler={() => toggleStateHandler("modal_full")}
      />

      <ModalStandard
        state={toggleState["modal_standard"]}
        toggleStateHandler={() => toggleStateHandler("modal_standard")}
      /> */}
    </div>
  );
};

export default Home;
