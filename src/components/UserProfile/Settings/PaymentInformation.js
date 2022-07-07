import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../lib/Auth";
import WrapperScroll from "../../Overlay/WrapperScroll";
import SubContainer from "./SubContainer";
import SubSettingsButton from "./SubSettingsButton";
import {
  ExclamationCircleIcon,
  PencilAltIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/outline";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../auth/firebase";
import config from "../../../config.json";
import Modal from "../../Overlay/Modal";

const PaymentInformation = () => {
  let { currentUser } = UserAuth();
  let docRef = doc(db, `${config.USER}${currentUser.uid}${config.PAYMENT}`);

  let [cardDetails, setCardDetails] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(docRef, (doc) => setCardDetails(doc.data()));
    return () => {
      unsub();
    };
  }, []);

  let [toggleEdit, setToggleEdit] = useState(false);

  let toggleEditHandler = () => {
    setToggleEdit((prev) => !prev);
  };

  return (
    <>
      <WrapperScroll>
        <Advisory />
        <div className="gap-4 overflow-hidden ">
          <div className="flex w-full h-full gap-4 px-8 overflow-x-scroll snap-mandatory snap-x horizontal-snap">
            {cardDetails?.cardType &&
              cardDetails?.cardType.map((card, index) => (
                <VirtualCard
                  key={card}
                  type={card || "VISA"}
                  bank={cardDetails?.bank}
                  card_number={cardDetails?.cardNumber}
                  card_holder={cardDetails?.cardHolder}
                  className={[
                    "w-64  snap-center scroll-px-4",
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
      </WrapperScroll>
      <Form
        toggle={toggleEdit}
        toggleHandler={toggleEditHandler}
        cardDetails={cardDetails}
      />
    </>
  );
};

function Form({ toggle, toggleHandler, cardDetails }) {
  let { currentUser } = UserAuth();

  let docRef = doc(db, `${config.USER}${currentUser.uid}${config.PAYMENT}`);
  let [tempInfo, setTempInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    bank: "",
    defaultCard: "",
  });

  const modifyCard = (e) => {
    e.preventDefault();
    updateDoc(docRef, {
      cardNumber: tempInfo?.cardNumber || cardDetails?.cardNumber,
      cardHolder: tempInfo?.cardHolder || cardDetails?.cardHolder,
      bank: tempInfo?.bank || cardDetails?.bank,
    })
      .then((data) => {
        console.log("> modfied payment successfully ", data);
        toggleHandler();
        setTempInfo({});
      })
      .catch((error) => {
        console.log("> modifying payment error occurred :", error);
      });
  };

  let handleChange = (input) => (e) => {
    setTempInfo((prev) => (prev = { ...prev, [input]: e.target.value }));
  };

  return (
    <Modal modalToggle={toggle} modalToggleHandler={toggleHandler}>
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
          onChange={(e) => {
            handleChange("cardNumber")(e);
          }}
          onKeyPress="return checkDigit(event)"
        />
        <Input
          type="text"
          name={"cardHolder"}
          label
          labelText="Card Holder Name"
          placeholder={cardDetails?.cardHolder || "Juan Dela Cruz"}
          defaultValue={tempInfo?.cardHolder}
          onChange={(e) => {
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
          onChange={(e) => {
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
    </Modal>
  );
}

function checkDigit(event) {
  var code = event.which ? event.which : event.keyCode;

  if ((code < 48 || code > 57) && code > 31) {
    return false;
  }

  return true;
}

function CardDetails({ details, ...props }) {
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
}) {
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
    <div className="flex items-start gap-2 p-3 text-xs text-gray-200 rounded-md shadow-md bg-gradient-to-br from-gray-800 to-neutral-900">
      <div className="">
        <ExclamationCircleIcon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold leading-5">Advisory</h3>
        <div className="text-gray-500/90 text-[0.8em]">
          <p className="mt-1">
            This is a personal project design, so we will not collect or ask for
            any payment information to transact throughout this web app. Here is
            your{" "}
            <span className="italic font-bold text-gray-400">Virtual Card</span>
            {"  "}
            you can use to be able to test the functionality of the application
          </p>
        </div>
      </div>
    </div>
  );
}

function VirtualCard({ type, bank, card_number, card_holder, ...props }) {
  return (
    <div className="relative mx-auto text-gray-500 h-fit">
      <CardSVG className="w-64" {...props} />
      <p className="absolute top-8 left-5  text-[0.5em] text-gray-500 font-thin">
        Virtual Card
      </p>
      <p className="absolute text-[0.65em] top-8 right-5 max-w-[16ch] text-right font-bold">
        {bank}
      </p>
      <p className="absolute text-lg font-light bottom-14 left-5 max-w-[20ch] text-right text-gray-400">
        {card_number}
      </p>
      <p className="absolute text-xs bottom-10 left-5 max-w-[20ch] text-right text-gray-500">
        {card_holder}
      </p>
      <p className="absolute text-lg italic font-thin text-right text-gray-300 right-5 bottom-8">
        {type}
      </p>
    </div>
  );
}

function CardSVG({ ...props }) {
  return (
    <svg
      width="328"
      height="205"
      viewBox="0 0 328 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="328"
        height="205"
        rx="8"
        fill="currrentColor"
        className="drop-shadow-md"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 71C27.7909 71 26 72.7909 26 75V99C26 101.209 27.7909 103 30 103H70C72.2091 103 74 101.209 74 99V75C74 72.7909 72.2091 71 70 71H30ZM33 73C30.7909 73 29 74.7909 29 77V79H41V73H33ZM41 81H29V92H41L41 81ZM41 94H29V97C29 99.2091 30.7909 101 33 101H41V94ZM59 73V79H71V77C71 74.7909 69.2091 73 67 73H59ZM59 101V94H71V97C71 99.2091 69.2091 101 67 101H59ZM71 92H59V81H71V92Z"
        fill="#737070"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M91.3443 92.9396C92.8711 91.3336 93.7226 89.2025 93.7227 86.9866C93.7227 84.7705 92.8712 82.6391 91.3443 81.0329C91.2263 80.9121 91.2278 80.7186 91.3477 80.5996L92.5143 79.4432C92.5751 79.383 92.6574 79.3494 92.743 79.35C92.8285 79.3505 92.9104 79.3852 92.9703 79.4462C97.0099 83.6613 97.0099 90.3111 92.9703 94.5262C92.9103 94.5873 92.8285 94.6218 92.7429 94.6223C92.6573 94.6228 92.5751 94.5892 92.5143 94.5289L91.3477 93.3729C91.228 93.2538 91.2265 93.0605 91.3443 92.9396ZM89.927 86.9866C89.9271 88.2041 89.4746 89.3782 88.6573 90.2806C88.5414 90.4027 88.5439 90.595 88.663 90.714L89.8297 91.8686C89.8909 91.9294 89.9739 91.9632 90.0602 91.9623C90.1464 91.9614 90.2287 91.926 90.2887 91.864C92.8451 89.1158 92.8451 84.8598 90.2887 82.1116C90.2287 82.0496 90.1464 82.0141 90.0601 82.0133C89.9738 82.0125 89.8908 82.0464 89.8297 82.1073L88.663 83.2616C88.5439 83.3806 88.5414 83.5729 88.6573 83.695C89.474 84.5968 89.9265 85.7699 89.927 86.9866ZM87.1427 89.2056C87.2033 89.2673 87.2867 89.3013 87.3732 89.2996C87.4597 89.2978 87.5416 89.2604 87.5997 89.1962C88.6786 87.9207 88.6786 86.0525 87.5997 84.7769C87.5417 84.7127 87.4598 84.6752 87.3733 84.6734C87.2868 84.6716 87.2033 84.7055 87.1427 84.7672L85.127 86.7649C85.0678 86.8235 85.0344 86.9033 85.0344 86.9866C85.0344 87.0699 85.0678 87.1497 85.127 87.2082L87.1427 89.2056Z"
        fill="#626262"
      />
    </svg>
  );
}

export default PaymentInformation;
