import React from "react";
import { BellIcon } from "@heroicons/react/outline";
import { ToggleState } from "../../utils/lib/ToggleState";
import ModalSide from "../UI/Modal/Side/ModalSide";
import { States, StaticState } from "../../types";
import NotificationPanel from './NotificationPanel'
const ModalNotification = () => {
  const { toggleState, toggleStateHandler }: StaticState =
    ToggleState() as StaticState;
  return (
    <ModalSide
      title={"Notification"}
      icon={<BellIcon />}
      state={toggleState["notification"]}
      toggleStateHandler={() => toggleStateHandler("notification")}
    >
      <NotificationPanel />
    </ModalSide>
  );
};

export default ModalNotification;
