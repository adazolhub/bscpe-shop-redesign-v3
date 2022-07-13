import {
  CashIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentAddIcon,
  InformationCircleIcon,
  MapIcon,
  PencilAltIcon,
  PhoneIcon,
  TruckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { BadgeCheckIcon, CheckCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountState from "../../lib/AccountState";
import ShopState from "../../lib/ShopState";
import ScrollToTop from "../../utils/ScrollToTop";
import MenuModalFull from "../Overlay/MenuModalFull";
import MiniModal from "../Overlay/MiniModal";
import Modal from "../Overlay/Modal";
import ModalFull from "../Overlay/ModalFull";
import VirtualCard from "../UserProfile/VirtualCreditCard/VirtualCard";

const Checkout = () => {
  let { payment, shipping } = AccountState();
  console.log("[type] >", shipping)
  let navigate = useNavigate();

  let [checkoutToggle, setCheckoutToggle] = useState(false)


  let checkoutToggleHandler = () => setCheckoutToggle(!checkoutToggle)


  return (
    <>
      <ScrollToTop />
      <div className="relative max-w-screen-sm mx-auto space-y-8 text-sm">
        <div className="mx-4 mt-2 space-y-1">
          <p className="text-gray-400 text-[0.8em]">Payment Method</p>
          <div className="p-2 space-y-2 border border-gray-300 border-dashed rounded-md">
            <PaymentMethod />
            <div
              className="mx-auto w-fit"
              onClick={() => {
                navigate("/account");
              }}
            >
              <VirtualCard
                type={payment?.defaultCard}
                bank={payment?.bank}
                card_number={payment?.cardNumber}
                card_holder={payment?.cardHolder}
                className={[
                  "w-64  snap-center scroll-px-4 fill-neutral-800 drop-shadow-md",
                ].join(" ")}
              />
            </div>
          </div>
        </div>
        <ShipTo />
        <div>
          <OrderSection />
        </div>

        <div className="relative bottom-0 flex flex-col w-full gap-2 p-2 text-xs bg-gray-100">
          <button className="flex-1 btn-primary whitespace-nowrap" onClick={checkoutToggleHandler}>
            Confirm checkout
          </button>
          <button
            className="flex-1 btn-secondary"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <ConfirmationModal checkoutToggle={checkoutToggle} checkoutToggleHandler={checkoutToggleHandler} />
    </>
  );
};

function ConfirmationModal({ checkoutToggle, checkoutToggleHandler }) {
  let { shipping } = AccountState();
  let navigate = useNavigate()
  return (

    <>
      {shipping ?
        <ModalFull title={"Order completed"} modalToggle={checkoutToggle} modalToggleHandler={checkoutToggleHandler}>
          <div className="grid min-h-screen lg:min-h-fit lg:w-[50em] place-content-start">
            <button className="p-2 w-fit"
              onClick={() => navigate("/")}
            >
              <span >
                <XIcon className="w-6 h-6" />

              </span>
            </button>

            <div className="grid gap-2 px-6 min-h-[calc(100vh-8em)] lg:min-h-0 w-full place-content-center place-items-center">
              <BadgeCheckIcon className="w-16 h-16 text-emerald-500" />
              <h1 className="text-xl">Congrats! Order completed.</h1>
              <p className="text-gray-500/70">
                You our order number of <span className="text-gray-600 underline underline-offset-2">#3434355</span> is being process for deliver. Expect for your package to be delived with<span className="text-gray-600"> 10-15 business day</span>
              </p>

              <div className="flex flex-col w-full">
                <button className="w-full btn-primary" onClick={() => { navigate('/account') }}>Check order status</button>
              </div>
            </div>
          </div>
        </ModalFull> :
        <MiniModal modalToggle={checkoutToggle} modalToggleHandler={checkoutToggleHandler}>
          <div className="flex items-start gap-2">
            <div>
              <InformationCircleIcon className="w-6 h-6 text-rose-400" />
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="flex justify-between w-full">
                <span className="text-sm text-rose-400">Missing shipping address</span>
                <button onClick={checkoutToggleHandler}>
                  <span>
                    <XIcon className="w-5 h-5" />
                  </span>
                </button>
              </div>
              <div className="w-[calc(100%-2.5em)] text-xs text-gray-400 space-y-2 mb-4">
                <p>Seems, you haven't setup your shipping address yet. A shipping details is required in order to complete your checkout.</p>
                <p>You can update or create your shipping details on your profile</p>
                <code className="block text-[0.8em] p-2 bg-gray-600 text-gray-200 rounded w-full mt-2">Profile {">"} Settings {">"}  Shipping address</code>
              </div>

              <div className="flex w-[calc(100%-2em)]">
                <button className="w-full btn-secondary whitespace-nowrap"
                  onClick={() => { navigate('/account') }}
                >Update Shipping address</button>
              </div>
            </div>
          </div>
        </MiniModal>
      }
    </>
  )
}

function PaymentMethod() {
  return (
    <div className="flex w-full gap-2 ">
      <div className=" items-center justify-between min-w-[6.2em] p-2 text-[0.85em] leading-4 bg-white rounded-md shadow border border-gray-400 relative">
        <CheckCircleIcon className="absolute w-4 h-4 -top-[0.4em] -right-[0.45em] " />
        <div className="grid place-items-center">
          <CreditCardIcon className="w-6 h-4 text-gray-500" />
          <div className="text-[0.8em] text-gray-400">
            <p>Credit Card</p>
          </div>
        </div>
      </div>
      <div className=" items-center justify-between min-w-[6.2em] p-2 text-[0.85em] leading-4 bg-gray-50 rounded-md shadow border border-transparent">
        <div className="grid place-items-center">
          <CurrencyDollarIcon className="w-6 h-4 text-gray-600" />
          <div className="text-[0.8em] text-gray-400">
            <p>Paypal</p>
          </div>
        </div>
      </div>
      <div className=" items-center justify-between min-w-[6.2em] p-2 text-[0.85em] leading-4 bg-gray-50 rounded-md shadow whitespace-nowrap border border-transparent">
        <div className="grid place-items-center">
          <CashIcon className="w-6 h-4 text-gray-600" />
          <div className="text-[0.8em] text-gray-400">
            <p>Cash On Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShipTo() {
  let { shipping } = AccountState();

  let navigate = useNavigate();
  return (
    <div className="mx-4 space-y-2">
      <p className="text-gray-400 text-[0.8em]">Shipping Address</p>
      <div className="p-2 border border-gray-300 border-dashed rounded-md">
        {shipping ? (
          <div className="flex items-center justify-between p-2 text-[0.85em] leading-4 bg-white rounded-md shadow">
            <div>
              <div className="flex text-[0.9em] gap-1 font-medium">
                <TruckIcon className="w-3" />
                <p>Ship to:</p>
                <p>{shipping?.recipient}</p>
              </div>
              <div className="text-[0.8em] flex gap-1 text-gray-400">
                <MapIcon className="w-3" />
                <p>Address:</p>
                <p>
                  {shipping?.address},{shipping?.city} {shipping?.zipcode}
                </p>
              </div>
              <div className="text-[0.8em] flex gap-1 text-gray-400">
                <PhoneIcon className="w-3" />
                <p>Contact:</p>
                <p>{shipping?.contact || "+639 5645 5466"}</p>
              </div>
            </div>
            <button
              className="text-gray-500"
              onClick={() => {
                navigate("/account/shipping-address");
              }}
            >
              <PencilAltIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center p-4 text-[0.85em] leading-4 bg-white rounded-md shadow gap-1 text-gray-500 cursor-pointer"
            onClick={() => {
              navigate("/account/shipping-address");
            }}
          >
            <p> No Shipping address setup yet</p>
            <p className="flex items-center gap-1 text-gray-400/80 text-[0.8em]">
              <DocumentAddIcon className="w-3 h-3" />
              Configure new shipping address
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderSection() {
  let { products } = ShopState();

  return (
    <>
      <div className="grid gap-2 py-2 mx-4">
        <p className="text-gray-400 text-[0.8em]">Order Summary</p>
        <hr />
        <div className="flex flex-col gap-1 px-2 my-2 overflow-hidden overflow-y-scroll max-h-64">
          {products.map((product) => {
            return (
              <div
                key={product?.product_id}
                className="flex gap-2 p-1 border border-gray-300 border-dashed rounded-md"
              >
                <div className="w-14 h-14">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 ">
                  <p className="text-xs font-thin text-gray-500 line-clamp-1">
                    {product?.name}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-[0.65em] text-gray-400">Price</span>
                      <p>
                        {" "}
                        <span className="text-xs font-medium text-gray-500">
                          ₱ {product?.price}.00
                        </span>{" "}
                        x {product?.quantity}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.65em] text-gray-400">Size</span>
                      <p>
                        <span className="font-medium text-gray-500">
                          {sizeFormater(product?.size)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.65em] text-gray-400 ">Color</span>
                      <p>
                        <span className="mt-2 font-medium text-gray-500">
                          {colorFormater(product?.color)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
      <AmountInfo />
    </>
  );
}

function AmountInfo() {
  let { total } = ShopState();
  return (
    <div className="grid gap-2 mx-6">
      <div>
        <div className="flex text-[0.8em] justify-between text-gray-500/80">
          <p>Delivery fee</p>
          <h3 className="font-medium text-gray-500/80 ">
            - FREE
            <span className="font-thin text-gray-400/80"> </span>
          </h3>
        </div>
        <div className="flex text-[0.8em] justify-between text-gray-500/80">
          <p>Discount</p>
          <h3 className="font-medium text-gray-500/80 ">
            - PHP 100 <span className="font-thin text-gray-400/80"> Promo</span>
          </h3>
        </div>
      </div>
      <hr />
      <div className="flex justify-between font-medium text-gray-600">
        <p>Total</p>
        <h3>PHP {total}.00</h3>
      </div>
    </div>
  );
}


export function sizeFormater(size = "") {

  let label = size?.toLowerCase() === 'small' ? "S"
    : size?.toLowerCase() === 'medium' ? "M"
      : size?.toLowerCase() === 'large' ? "L"
        : "XL"

  return (
    <div className="grid w-6 h-6 text-center border border-gray-300 rounded place-items-center">
      <span className="px-1 text-xs leading-4">{label}</span>
    </div>
  )
}

export function colorFormater(color = "") {

  let colorStype = color?.toLowerCase() === 'red' ? "bg-rose-400"
    : color?.toLowerCase() === 'blue' ? "bg-blue-400"
      : color?.toLowerCase() === 'green' ? "bg-emerald-400"
        : "bg-gray-400"

  return (
    <>
      <div className={["w-4 h-4 rounded-full m-1", colorStype].join(" ")} >{" "}</div>
    </>
  )
}


export default Checkout;
