import React, { useState } from "react";
import { UserAuth } from "../../../utils/lib/Auth";
import SubContainer from "./SubContainer";
import SubSettingsButton from "./SubSettingsButton";
import { ExclamationCircleIcon, PencilAltIcon } from "@heroicons/react/outline";

import VirtualCard from "../VirtualCreditCard/VirtualCard";
import AccountState from "../../../utils/lib/AccountState";
import ModalStandard from "../../UI/Modal/Standard/ModalStandard";
import ModalFull from "../../UI/Modal/Full/ModalFull";

const PaymentInformation = () => {
  let { payment: cardDetails } = AccountState();

  let [toggleEdit, setToggleEdit] = useState(false);

  let toggleEditHandler = () => {
    setToggleEdit((prev) => !prev);
  };

  return (
    <>
      <>
        <Advisory />
        <div className="gap-4 ">
          <div className="flex w-full h-full gap-4 px-12 overflow-x-scroll snap-mandatory snap-x horizontal-snap ">
            {cardDetails?.cardType &&
              cardDetails?.cardType.map((card: any, index: number) => (
                <VirtualCard
                  key={card}
                  type={card || "VISA"}
                  bank={cardDetails?.bank}
                  card_number={cardDetails?.cardNumber}
                  card_holder={cardDetails?.cardHolder}
                  className={[
                    "w-72  snap-center scroll-px-4",
                    cardDetails?.color
                      ? cardDetails?.color[index]
                      : "fill-neutral-800",
                  ].join(" ")}
                />
              ))}
          </div>
        </div>

        <CardDetails
          details={cardDetails}
          onClick={() => toggleEditHandler()}
        />
      </>
      <Form
        toggle={toggleEdit}
        toggleHandler={toggleEditHandler}
        cardDetails={cardDetails}
      />
    </>
  );
};

function Form({ toggle, toggleHandler, cardDetails }: any) {
  let { currentUser }: any = UserAuth();
  let { updatePaymentInfo }: any = AccountState();

  let [tempInfo, setTempInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    bank: "",
    defaultCard: "",
  });

  const modifyCard = (e: any) => {
    e.preventDefault();
    updatePaymentInfo(
      currentUser,
      tempInfo?.cardNumber,
      tempInfo?.cardHolder,
      tempInfo?.bank
    ).then(() => {
      toggleHandler();
      setTempInfo({
        cardNumber: "",
        cardHolder: "",
        bank: "",
        defaultCard: "",
      });
    });
  };

  let handleChange = (input: any) => (e: any) => {
    setTempInfo((prev) => (prev = { ...prev, [input]: e.target.value }));
  };

  return (
    <ModalFull state={toggle} toggleStateHandler={toggleHandler}>
      <p className="mb-4 text-xs text-gray-400">Configure virtual card</p>

      <form className="flex flex-col gap-2">
        <Input
          type="text"
          name={"cardNumber"}
          maxLength={16}
          label
          labelText="Card Number"
          placeholder={cardDetails?.cardNumber || "1234 5678 0000 0000"}
          defaultValue={tempInfo?.cardNumber}
          onChange={(e: any) => {
            handleChange("cardNumber")(e);
          }}
        />
        <Input
          type="text"
          name={"cardHolder"}
          label
          labelText="Card Holder Name"
          placeholder={cardDetails?.cardHolder || "Juan Dela Cruz"}
          defaultValue={tempInfo?.cardHolder}
          onChange={(e: any) => {
            handleChange("cardHolder")(e);
          }}
        />
        <Input
          type="text"
          name={"bank"}
          label
          labelText="Bank"
          placeholder={cardDetails?.bank || "Bank of the Philippine Island"}
          defaultValue={tempInfo?.bank}
          onChange={(e: any) => {
            handleChange("bank")(e);
          }}
        />

        <div className="flex flex-col">
          <button className="btn-primary" onClick={(e) => modifyCard(e)}>
            {" "}
            Confirm Changes{" "}
          </button>
          <button
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setTempInfo({
                cardNumber: "",
                cardHolder: "",
                bank: "",
                defaultCard: "",
              });
              toggleHandler();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalFull>
  );
}

function CardDetails({ details, ...props }: any) {
  return (
    <SubContainer
      title={"Card Details"}
      editable
      modifier={
        <div className="flex items-center gap-1">
          <PencilAltIcon className="w-3 h-3" /> Configure
        </div>
      }
      {...props}
    >
      <SubSettingsButton
        name={"Card Number"}
        value={details?.cardNumber || null}
        editable
      />
      <SubSettingsButton
        name={"Card Holder Name"}
        value={details?.cardHolder || null}
        editable
      />
      <SubSettingsButton name={"Bank"} value={details?.bank || null} editable />
      <SubSettingsButton
        name={"Card Type"}
        value={details?.defaultCard || null}
      />
    </SubContainer>
  );
}

function Input({
  type,
  name,
  placeholder,
  labelText,
  icon,
  label = false,
  className,
  setter,
  ...props
}: any) {
  return (
    <>
      {label ? (
        <label className="flex flex-col text-[0.65em] text-gray-300">
          <p className="ml-1">{labelText}</p>
          <input
            type={type}
            className={[
              "text-field placeholder:text-gray-400 focus:placeholder:text-gray-300 focus:border-gray-400",
              className,
            ].join(" ")}
            name={name}
            placeholder={placeholder}
            {...props}
          />
        </label>
      ) : (
        <input
          type={type}
          className={[
            "text-field placeholder:text-gray-400 focus:placeholder:text-gray-300 focus:border-gray-400",
            className,
          ].join(" ")}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      )}
    </>
  );
}

function Advisory() {
  return (
    <div className="flex items-start w-[100%] mx-auto gap-2 p-3 text-xs text-gray-200 rounded-md shadow-md bg-gradient-to-br from-gray-800/80 to-neutral-800">
      <div className="">
        <ExclamationCircleIcon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold leading-5">Data Privacy</h3>
        <div className="text-gray-500 text-[0.8em]">
          <p className="mt-1">
            This is a personal project design, so we will not collect or ask for
            a real payment information to transact within this web app. Here is
            your{" "}
            <span className="italic font-bold text-gray-400">Virtual Card</span>
            {"  "}
            you can use to be able to test or experience the functionality of
            this application
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;
