import {
  MinusSmIcon,
  PlusSmIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { ShoppingCartIcon as ShoppingCartIconFill } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { ProductList, StaticState } from "../../types";
import ShopState from "../../utils/lib/ShopState";
import { ToggleState } from "../../utils/lib/ToggleState";
import RadioButtonGroup from "../UI/Buttons/RadioButtonGroup";
import { colors, size } from "../UI/Cards/radiobuttondata";
import ModalMobile from "../UI/Modal/Mobile/ModalMobile";
import style from "./ListView.module.css";

const SelectedProduct = ({ product }: { product: ProductList }) => {
  let { toggleState, toggleStateHandler } = ToggleState() as StaticState;

  let [quantity, setQuantity] = useState(1);

  let addQuantity = () => {
    setQuantity((count) => count + 1);
  };
  let minusQuantity = () => {
    setQuantity((count) => count - 1);
    if (quantity < 2) {
      setQuantity(1);
    }
  };

  let [selectedColorOption, setSelectedColorOption] = useState<
    string | undefined
  >();
  let [selectedSizeOption, setSelectedSizeOption] = useState<
    string | undefined
  >();

  let { products, addToCart, removeFromCart }: any = ShopState();

  let [isInCart, setIsInCart] = useState(false);
  console.log(
    selectedColorOption === undefined && selectedSizeOption === undefined
  );

  useEffect(() => {
    let productIsInCart = products.find(
      (item: any) => item.name === product?.product_name
    );
    console.log(productIsInCart);

    if (productIsInCart) {
      setIsInCart(true);
      setQuantity(productIsInCart?.quantity);
    } else {
      setIsInCart(false);
    }

    return () => {
      if (productIsInCart) {
        setQuantity(productIsInCart?.quantity);
      } else {
        setQuantity(1);
        setSelectedColorOption(undefined);
        setSelectedSizeOption(undefined);
      }
    };
  }, [products, product, isInCart]);

  let handleClick = () => {
    let prodItem = {
      product_id: product?.product_id,
      name: product?.product_name,
      image: product?.product_image,
      price: (product?.product_price * 0.6).toFixed(2),
      color: selectedColorOption,
      size: selectedSizeOption,
      quantity,
    };
    if (isInCart) {
      removeFromCart(prodItem);
      setQuantity(1);
    } else {
      addToCart(prodItem);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-4 my-4">
        <div className="flex gap-4">
          <div>
            <div className="overflow-hidden rounded-md w-36 h-36">
              <img src={product.product_image} alt={product.product_name} />
            </div>
            {/* <div className="flex h-12 gap-2 my-2 overflow-hidden">
              <img
                src={product.product_image}
                className="object-cover w-12 h-full rounded"
              />

              <img
                src={product.product_image}
                className="object-cover w-12 h-full rounded"
              />
            </div> */}
          </div>
          <div className={style.modal_mobile_detail}>
            <p>{product.product_name}</p>

            <span className={style.modal_mobile_subtitle}>Color</span>
            <ul className="flex gap-4 mt-3">
              <RadioButtonGroup
                type="Color"
                values={colors}
                selectedOption={selectedColorOption}
                setSelectedOption={setSelectedColorOption}
              />
            </ul>

            <span className={style.modal_mobile_subtitle}>Size</span>
            <ul className="flex gap-3 mt-2">
              <RadioButtonGroup
                type="Size"
                values={size}
                selectedOption={selectedSizeOption}
                setSelectedOption={setSelectedSizeOption}
              />
            </ul>
          </div>
        </div>
        <div className="grid place-items-center">
          <span className={style.modal_mobile_subtitle}>Quantity</span>
          <div className={`flex items-center gap-2${"pointer-events-none"}`}>
            <button
              onClick={minusQuantity}
              className="p-2 rounded-full bg-black/5"
            >
              <span>
                <MinusSmIcon />
              </span>
            </button>
            <div className="w-12 text-center">
              <p className="text-3xl font-bold">{quantity.toString()}</p>
            </div>
            <button
              onClick={addQuantity}
              className="p-2 rounded-full bg-black/5"
            >
              <span>
                <PlusSmIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={style.modal_mobile_footer}>
        <button
          onClick={() => {
            handleClick();
            toggleStateHandler("modal_mobile");
          }}
          className={`${style.modal_mobile_cart} disabled:bg-black/30 disabled:text-white/30 disabled:cursor-not-allowed`}
          disabled={
            selectedColorOption === undefined &&
            selectedSizeOption === undefined
          }
        >
          {" "}
          {isInCart ? (
            <>
              <span>
                <ShoppingCartIconFill />
              </span>
              <span>Remove from cart</span>
            </>
          ) : (
            <>
              <span>
                <ShoppingCartIcon />
              </span>
              <span>Add to cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SelectedProduct;
