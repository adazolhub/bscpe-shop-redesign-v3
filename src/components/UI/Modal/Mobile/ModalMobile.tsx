import React from "react";
import style from "../Modal.module.css";

import { Modal } from "../../../../types";

const ModalMobile = ({ state, toggleStateHandler, children }: Modal) => {
  return (
    <>
      {state && (
        <button
          onClick={toggleStateHandler}
          tabIndex={-1}
          className={style.backdrop}
        />
      )}
      <div
        className={[
          style.modal_mobile,
          state ? style.modal_mobile_active : "",
        ].join(" ")}
      >
        <div className={style.modal_mobile_content}>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalMobile;
