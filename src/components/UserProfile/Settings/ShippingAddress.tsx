import { PencilAltIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { UserAuth } from "../../../utils/lib/Auth";
import SubContainer from "./SubContainer";
import SubSettingsButton from "./SubSettingsButton";
import AccountState from "../../../utils/lib/AccountState";
import ModalStandard from "../../UI/Modal/Standard/ModalStandard";
import ModalFull from "../../UI/Modal/Full/ModalFull";
import Input from "../../UI/Forms/Input";

const ShippingAddress = () => {
  let { shipping: address }: any = AccountState();

  let [addToggle, setAddToggle] = useState(false);
  let addToggleHandler = () => {
    setAddToggle((prev) => !prev);
  };

  return (
    <>
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
    </>
  );
};

function AddressInformation({ address, ...props }: any) {
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

function AddForm({ toggle, toggleHandler, address }: any) {
  let { currentUser }: any = UserAuth();

  let [addressInfo, setAddressInfo] = useState({
    recipient: "",
    address: "",
    city: "",
    zipcode: "",
    contact: "",
  });

  let { addShipping, updateShipping }: any = AccountState();

  const addAddress = (e: any) => {
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
  const editAddress = (e: any) => {
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

  let handleChange = (input: any) => (e: any) => {
    setAddressInfo((prev) => (prev = { ...prev, [input]: e.target.value }));
  };

  return (
    <ModalFull state={toggle} toggleStateHandler={toggleHandler}>
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
          onChange={(e: Event) => {
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
          onChange={(e: Event) => {
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
          onChange={(e: Event) => {
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
          onChange={(e: Event) => {
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
          onChange={(e: Event) => {
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
              setAddressInfo({
                recipient: "",
                address: "",
                city: "",
                zipcode: "",
                contact: "",
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

export default ShippingAddress;
