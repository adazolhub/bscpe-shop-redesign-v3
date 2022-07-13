import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToggleState } from "../../lib/ToggleState";
import Modal from "../Overlay/Modal";
import CardSVG from "./CardSVG";

const PaymentMethod = () => {
  let { checkoutToggle, checkoutToggleHandler } = ToggleState();
  let navigate = useNavigate();
  return (
    <Modal
      modalToggle={checkoutToggle}
      modalToggleHandler={checkoutToggleHandler}
    >
      <div className="absolute top-0 flex justify-between w-[calc(100%-2em)] text-gray-400">
        <p className="text-xs ">Payment method</p>
        <button className="pl-4" onClick={checkoutToggleHandler}>
          <XIcon className="w-4 h-4 " />
        </button>
      </div>
      <div className="mx-auto w-fit">
        <CardSVG />
      </div>

      <hr />
      <div className="flex flex-col gap-2 py-2 text-gray-400 min-h-[14em]">
        <p className="text-xs">Shipping address</p>
        <div className="p-2 border border-dashed rounded-md">
          <p className="text-xs text-gray-600">
            Unit 204, Camp Bagong Diwa, Taguig City
          </p>
        </div>
      </div>
      <div className="absolute bottom-0  w-[calc(100%-3em)] text-xs">
        <button
          className="w-full btn-link"
          onClick={() => {
            navigate("account/payment-information");
            checkoutToggleHandler();
          }}
        >
          Update payment method
        </button>
        <button
          className="w-full btn-primary"
          onClick={() => {
            navigate("checkout");
            checkoutToggleHandler();
          }}
        >
          Confirm Payment method
        </button>
      </div>
    </Modal>
  );
};



export default PaymentMethod;
