import React from "react";
import { BellIcon } from "@heroicons/react/outline";
import WrapperScroll from "../Overlay/WrapperScroll";

const NotificationPanel = () => {
  return (
    <WrapperScroll>
      <div className="grid place-content-center min-h-[calc(30vh)]">
        <div className="grid place-items-center">
          <BellIcon className="w-20 h-20 text-gray-400 stroke-1" />
          <p className="text-gray-300">You have no notifications yet</p>
          <div></div>
        </div>
      </div>
    </WrapperScroll>
  );
};

export default NotificationPanel;
