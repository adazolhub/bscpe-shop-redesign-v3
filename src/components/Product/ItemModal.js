import { ArrowRightIcon, ChevronRightIcon, MinusIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShopState from "../../lib/ShopState";
import MenuModal from "../Overlay/MenuModal";
import RadioButtonGroup from "../UI/RadioButtonGroup";

const ItemModal = ({ toggleItem, toggleItemHandler, product }) => {

  let navigate = useNavigate()

  let [quantity, setQuantity] = useState(1)


  let addQuantity = () => {
    setQuantity(count => count + 1)
  }
  let minusQuantity = () => {
    setQuantity(count => count - 1)
    if (quantity < 2) {
      setQuantity(1)
    }
  }

  let colors = [
    {
      option: "red",
      label: "R",
      className: "w-3 h-3 rounded-full bg-rose-300/80",
      activeClass: 'ring-2 ring-offset-4 ring-rose-600'
    }, {
      option: "blue",
      label: "B",
      className: "w-3 h-3 rounded-full bg-blue-300/80",
      activeClass: 'ring-2 ring-offset-4 ring-blue-600'
    }, {
      option: "green",
      label: "G",
      className: "w-3 h-3 rounded-full bg-emerald-300/80 ",
      activeClass: 'ring-2 ring-offset-4 ring-emerald-600'
    }]
  let size = [
    {
      option: "small",
      label: "S",
      className: "grid w-6 h-6 border rounded place-items-center",
      activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
    }, {
      option: "medium",
      label: "M",
      className: "grid w-6 h-6 border rounded place-items-center",
      activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
    }, {
      option: "large",
      label: "L",
      className: "grid w-6 h-6 border rounded place-items-center ",
      activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
    }, {
      option: "extra-large",
      label: "XL",
      className: "grid w-6 h-6 border rounded place-items-center",
      activeClass: 'ring-2 text-gray-100 bg-gray-400 ring-offset-2 ring-gray-400'
    }]

  let [selectedColorOption, setSelectedColorOption] = useState(colors[0]?.option)
  let [selectedSizeOption, setSelectedSizeOption] = useState(size[0]?.option)

  let { products, addToCart, removeFromCart } = ShopState();
  let [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    let productIsInCart = products.find((item) => item.name === product?.product_name);

    if (productIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [products, product]);

  let handleClick = () => {
    let prodItem = {
      product_id: product?.product_id,
      name: product?.product_name,
      image: product?.product_image,
      price: Math.floor(product?.product_price - (product?.product_price * 0.4)),
      color: selectedColorOption,
      size: selectedSizeOption,
      quantity

    };
    if (isInCart) {
      removeFromCart(prodItem);
    } else {
      addToCart(prodItem);
    }
  };

  let handleChange = (event) => {
    setQuantity(event?.target?.value)
  }

  return (
    <>
      <MenuModal modalToggle={toggleItem} modalToggleHandler={toggleItemHandler}>
        <div className="mb-2 space-y-4">
          <div className="gap-4 mb-4 space-y-2">
            <div className="flex items-end justify-between text-gray-500">
              <div className="flex gap-1">

                <span className="px-2 py-[3px] rounded-md text-emerald-600 font-medium text-[0.6em] bg-emerald-200/40 w-fit mb-1">New</span>
                <span className="px-2 py-[3px] rounded-md text-blue-600 font-medium text-[0.6em] bg-blue-200/40 w-fit mb-1">Sale</span>
              </div>
              <button className='flex items-center gap-2 px-4 py-2 text-xs text-gray-600 border border-dashed rounded-md border-gray-400/60 whitespace-nowrap'
                onClick={() => {
                  toggleItemHandler()
                  navigate(`product/${product?.product_id}`)
                }}
              >Product details <span><ChevronRightIcon className="w-4 h-4" /></span></button>
            </div>
            <p>{product?.product_name}</p>

          </div>

          <div className="grid grid-cols-3 gap-2">
            <img src={product?.product_image} alt={product?.product_name}
              className="object-cover w-full col-span-2 rounded-md h-52"
            />
            <div className="col-start-3 overflow-hidden overflow-y-scroll h-52">
              <div className='flex flex-col w-full gap-2'>
                <div className="w-full h-16 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply"
                  />
                </div>
                <div className="w-full h-16 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>
                <div className="w-full h-16 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>
                <div className="w-full h-16 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>
                <div className="w-full h-16 overflow-hidden bg-gray-600 rounded-md">
                  <img src={product?.product_image} alt={product?.product_name}
                    className="object-cover w-full h-full mix-blend-multiply "
                  />
                </div>

              </div>

            </div>
          </div>
          <div
            className="grid grid-cols-2 gap-4 text-xs"
          >
            <div>
              <p className="text-gray-400/80">Size</p>
              <ul className="flex gap-3 mt-2">
                <RadioButtonGroup type="Size" values={size} selectedOption={selectedSizeOption} setSelectedOption={setSelectedSizeOption} />

              </ul>
            </div>
            <div>
              <p className="text-gray-400/80">Color</p>
              <ul className="flex gap-4 mt-3">
                <RadioButtonGroup type="Color" values={colors} selectedOption={selectedColorOption} setSelectedOption={setSelectedColorOption} />

              </ul>
            </div>
          </div>

          <div className="inline-flex items-center w-full gap-4">
            <div className="inline-flex">

              <button className="px-2 py-4 text-white bg-gray-400 rounded-l-md" onClick={() => minusQuantity()}>

                <MinusIcon className="w-6 h-6" />

              </button>
              <div className="relative grid w-10 p-2 border border-gray-400 h-14 place-content-center">
                <span className="">
                  {quantity}

                </span>
              </div>
              {/* <input type="number" name="quantity" maxLength={2} max={2} pattern="[0-9]{2}" value={quantity} onChange={handleChange} className='w-[6ch] border rounded-sm text-center py-2 px-0' /> */}

              <button className="px-2 py-4 text-white bg-gray-400 rounded-r-md" onClick={() => addQuantity()}>

                <PlusIcon className="w-6 h-6" />
              </button>

            </div>
            <button className='w-full btn-primary'
              onClick={() => {
                handleClick()
                toggleItemHandler()
              }}
            >{isInCart ? "Remove to cart" : "Add to cart"}</button>
          </div>
          <button className="w-full btn-link" onClick={toggleItemHandler}>Close</button>

        </div>
      </MenuModal>
    </>
  );
};

export default ItemModal;
