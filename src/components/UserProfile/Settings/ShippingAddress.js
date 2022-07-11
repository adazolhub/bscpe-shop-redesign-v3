import { PencilAltIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../lib/Auth";
import WrapperScroll from "../../Overlay/WrapperScroll";
import SubContainer from "./SubContainer";
import SubSettingsButton from "./SubSettingsButton";
import Modal from "../../Overlay/Modal";
import AccountState from "../../../lib/AccountState";

const ShippingAddress = () => {
  let { shipping: address } = AccountState();

  let [addToggle, setAddToggle] = useState(false);
  let addToggleHandler = () => {
    setAddToggle((prev) => !prev);
  };

  return (
    <WrapperScroll>
      {address && address ? (
        <AddressInformation onClick={addToggleHandler} address={address} />
      ) : (
        <>
          <button onClick={addToggleHandler}>
            <div className="grid w-full h-32 text-xs text-gray-300 border border-gray-300 border-dashed rounded-md place-content-center">
              <h3 className="mb-1 text-base font-thin text-gray-500">
                No shipping address
              </h3>
              <p>Setup new address</p>
            </div>
          </button>
        </>
      )}
      <AddForm
        toggle={addToggle}
        toggleHandler={addToggleHandler}
        address={address}
      />
    </WrapperScroll>
  );
};

function AddressInformation({ address, ...props }) {
  return (
    <SubContainer
      title={"Address"}
      editable
      modifier={
        <div className="flex items-center gap-1">
          <PencilAltIcon className="w-3 h-3" /> Update address
        </div>
      }
      {...props}
    >
      <SubSettingsButton name={"Name"} value={address?.recipient} editable />
      <SubSettingsButton name={"Address"} value={address?.address} editable />
      <SubSettingsButton name={"City"} value={address?.city} editable />
      <SubSettingsButton name={"Zipcode"} value={address?.zipcode} editable />
      <SubSettingsButton name={"Contact"} value={address?.contact} editable />
    </SubContainer>
  );
}

function AddForm({ toggle, toggleHandler, address }) {
  let { currentUser } = UserAuth();

  let [addressInfo, setAddressInfo] = useState({
    recipient: "",
    address: "",
    city: "",
    zipcode: "",
    contact: "",
  });

  let { addShipping, updateShipping } = AccountState();

  const addAddress = (e) => {
    e.preventDefault();

    //Account Reducer - add new shipping
    addShipping(
      currentUser,
      addressInfo?.recipient,
      addressInfo?.address,
      addressInfo?.city,
      addressInfo?.zipcode,
      addressInfo?.contact
    ).then(() => {
      toggleHandler();
      setAddressInfo({
        recipient: "",
        address: "",
        city: "",
        zipcode: "",
        contact: "",
      });
    });
  };

  //Account Reducer - update shipping
  const editAddress = (e) => {
    e.preventDefault();

    updateShipping(
      currentUser,
      addressInfo?.recipient,
      addressInfo?.address,
      addressInfo?.city,
      addressInfo?.zipcode,
      addressInfo?.contact
    ).then(() => {
      toggleHandler();
      setAddressInfo({
        recipient: "",
        address: "",
        city: "",
        zipcode: "",
        contact: "",
      });
    });
  };

  let handleChange = (input) => (e) => {
    setAddressInfo((prev) => (prev = { ...prev, [input]: e.target.value }));
  };

  return (
    <Modal modalToggle={toggle} modalToggleHandler={toggleHandler}>
      {address && address ? (
        <p className="mb-4 text-xs text-gray-400">Update Address</p>
      ) : (
        <p className="mb-4 text-xs text-gray-400">Setup Address</p>
      )}
      <form className="flex flex-col gap-2">
        <Input
          type="text"
          name={"recipient"}
          label
          labelText={"Recipient Name (receiver)"}
          placeholder={address?.recipient || "Juan Dela Cruz"}
          defaultValue={addressInfo?.recipient}
          onChange={(e) => {
            handleChange("recipient")(e);
          }}
        />

        <Input
          type="text"
          name={"address"}
          label
          labelText={"Complete Address"}
          placeholder={
            address?.address ||
            "123 Street, Curve Corner, Lower Taguig, Bicutan"
          }
          defaultValue={addressInfo?.address}
          onChange={(e) => {
            handleChange("address")(e);
          }}
        />

        <Input
          type="text"
          name={"city"}
          label
          labelText={"City"}
          placeholder={address?.city || "New York City"}
          defaultValue={addressInfo?.city}
          onChange={(e) => {
            handleChange("city")(e);
          }}
        />
        <Input
          type="text"
          name={"zipcode"}
          label
          labelText={"Zipcode"}
          placeholder={address?.zipcode || "1234"}
          defaultValue={addressInfo?.zipcode}
          onChange={(e) => {
            handleChange("zipcode")(e);
          }}
        />
        <Input
          type="tel"
          name={"contact"}
          maxLength={14}
          label
          labelText={"Contact Number"}
          placeholder={address?.contact || "+6372345678"}
          defaultValue={addressInfo?.contact}
          onChange={(e) => {
            handleChange("contact")(e);
          }}
        />
        <div className="flex flex-col">
          {address && address ? (
            <button
              className="btn-primary"
              disabled={
                addressInfo?.recipient ||
                addressInfo?.address ||
                addressInfo?.city ||
                addressInfo?.zipcode ||
                addressInfo?.contact
                  ? false
                  : true
              }
              onClick={(e) => editAddress(e)}
            >
              {" "}
              Confirm Changes{" "}
            </button>
          ) : (
            <button
              className="btn-primary"
              disabled={
                addressInfo?.recipient &&
                addressInfo?.address &&
                addressInfo?.city &&
                addressInfo?.zipcode &&
                addressInfo?.contact
                  ? false
                  : true
              }
              onClick={(e) => addAddress(e)}
            >
              Save
            </button>
          )}
          <button
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              setAddressInfo({});
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

export default ShippingAddress;
