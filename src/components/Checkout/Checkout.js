import {
  CashIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentAddIcon,
  MapIcon,
  PencilAltIcon,
  PhoneIcon,
  TruckIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccountState from "../../lib/AccountState";
import ShopState from "../../lib/ShopState";
import ScrollToTop from "../../utils/ScrollToTop";
import VirtualCard from "../UserProfile/VirtualCreditCard/VirtualCard";

const Checkout = () => {
  let { payment } = AccountState();
  let navigate = useNavigate();

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

        <div className="relative bottom-0 flex flex-col w-full gap-2 p-2 text-xs bg-white">
          <button className="flex-1 btn-primary whitespace-nowrap">
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
    </>
  );
};

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
                <div className="w-10 h-10">
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
                  <p>
                    {" "}
                    <span className="font-bold text-gray-600">
                      PHP {product?.price}.00
                    </span>{" "}
                    x 1
                  </p>
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

export default Checkout;
