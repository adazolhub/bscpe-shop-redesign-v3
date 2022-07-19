import React from "react";
import { BellIcon } from "@heroicons/react/outline";
import { ToggleState } from "../../utils/lib/ToggleState";
import ModalSide from "../UI/Modal/Side/ModalSide";
import { States, StaticState } from "../../types";
const NotificationPanel = () => {
  const { toggleState, toggleStateHandler }: StaticState =
    ToggleState() as StaticState;
  return (
    <ModalSide
      title={"Notification"}
      icon={<BellIcon />}
      state={toggleState["notification"]}
      toggleStateHandler={() => toggleStateHandler("notification")}
    >
      <div className="grid place-content-center min-h-[calc(30vh)]">
        <div className="grid place-items-center">
          <BellIcon className="w-20 h-20 text-gray-400 stroke-1" />
          <p className="text-gray-300">You have no notifications yet</p>
          <div></div>
        </div>
      </div>
    </ModalSide>
  );
};

export default NotificationPanel;
