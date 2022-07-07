import { PencilAltIcon } from "@heroicons/react/outline";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../auth/firebase";
import { UserAuth } from "../../../lib/Auth";
import WrapperScroll from "../../Overlay/WrapperScroll";
import SubContainer from "./SubContainer";
import SubSettingsButton from "./SubSettingsButton";
import config from "../../../config.json";
import Modal from "../../Overlay/Modal";

const ShippingAddress = () => {
  let { currentUser } = UserAuth();
  let [address, setAddress] = useState({});

  let docRef = doc(db, `${config.USER}${currentUser.uid}${config.ADDRESS}`);
  useEffect(() => {
    const unsub = onSnapshot(docRef, (doc) => setAddress(doc.data()));

    return () => {
      unsub();
    };
  }, []);

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
  });

  let docRef = doc(db, `${config.USER}${currentUser.uid}${config.ADDRESS}`);

  const addAddress = (e) => {
    e.preventDefault();
    if (
      addressInfo?.recipient ||
      addressInfo?.address ||
      addressInfo?.city ||
      addressInfo?.zipcode
    ) {
      setDoc(docRef, {
        uid: currentUser?.uid,
        recipient: address?.recipient || addressInfo?.recipient,
        address: address?.address || addressInfo?.address,
        city: address?.city || addressInfo?.city,
        zipcode: address?.zipcode || addressInfo?.zipcode,
      })
        .then((data) => {
          toggleHandler();
          console.log("> address successfully added", data);
          setAddressInfo({
            recipient: "",
            address: "",
            city: "",
            zipcode: "",
          });
        })
        .catch((error) => {
          console.log("> address error occurred :", error);
        });
    }
  };

  const editAddress = (e) => {
    e.preventDefault();
    updateDoc(doc(db, `${config.USER}${currentUser.uid}${config.ADDRESS}`), {
      recipient: addressInfo?.recipient || address?.recipient,
      address: addressInfo?.address || address?.address,
      city: addressInfo?.city || address?.city,
      zipcode: addressInfo?.zipcode || address?.zipcode,
    })
      .then((data) => {
        toggleHandler();
        console.log("> modfied address successfully ", data);
        setAddressInfo({
          recipient: "",
          address: "",
          city: "",
          zipcode: "",
        });
      })
      .catch((error) => {
        console.log("> modifying address error occurred :", error);
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
        <div className="flex flex-col">
          {address && address ? (
            <button
              className="btn-primary"
              disabled={
                addressInfo?.recipient ||
                addressInfo?.address ||
                addressInfo?.city ||
                addressInfo?.zipcode
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
                addressInfo?.zipcode
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
