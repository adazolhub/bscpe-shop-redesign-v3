import {
  MinusSmIcon,
  PlusSmIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { ShoppingCartIcon as ShoppingCartIconFill } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCart, ProductList, StaticState } from "../../../types";
import ShopState from "../../../utils/lib/ShopState";
import { ToggleState } from "../../../utils/lib/ToggleState";
import RadioButtonGroup from "../Buttons/RadioButtonGroup";
import style from "./Card.module.css";
import { colors, size } from "./radiobuttondata";
import ModalMobile from "../Modal/Mobile/ModalMobile";
const ProductCardGrid = ({
  product,
  isInCart,
}: {
  product: ProductList;
  isInCart: boolean;
}) => {
  // let [isInCart, setIsInCart] = useState(false);
  let { toggleState, toggleStateHandler, selectedProduct, setSelectedProduct } =
    ToggleState() as StaticState;
  // console.log(selectedProduct);
  let navigate = useNavigate();
  return (
    <>
      <div
        className={`${style.product} hover:ring-1 hover:ring-black/5 hover:shadow-sm hover:bg-white`}
      >
        <div className={style.product__top}>
          <div className={`${style.product__image} group`}>
            <img
              src={product.product_image}
              alt="jacket"
              className="group-hover:scale-125 group-hover:grayscale-0 "
            />
            <span className={style.product__tag}>Sale</span>
          </div>
        </div>

        <div className={style.product__bottom}>
          <div className={style.product__details}>
            <h3
              onClick={() => navigate(`/product/${product.product_id}`)}
              className={style.product__title}
            >
              {product.product_name}
            </h3>
            <p className={style.product__price}>
              ₱ {(product.product_price * 0.6).toFixed(2)}
              <span className={style.product__original_price}>
                ₱ {product.product_price.toFixed(2)}
              </span>
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProduct(product);
              toggleStateHandler("modal_mobile");
            }}
            className={style.product__cart}
          >
            {isInCart ? <ShoppingCartIconFill /> : <ShoppingCartIcon />}
          </button>
        </div>
      </div>
    </>
  );
};

//MODAL
// export function AddToCart({ product }: { product: ProductList }) {
//   console.log(product);
//   let { toggleState, toggleStateHandler } = ToggleState() as StaticState;

//   let [quantity, setQuantity] = useState(1);

//   let addQuantity = () => {
//     setQuantity((count) => count + 1);
//   };
//   let minusQuantity = () => {
//     setQuantity((count) => count - 1);
//     if (quantity < 2) {
//       setQuantity(1);
//     }
//   };

//   let [selectedColorOption, setSelectedColorOption] = useState(
//     colors[0]?.option
//   );
//   let [selectedSizeOption, setSelectedSizeOption] = useState(size[0]?.option);

//   let { products, addToCart, removeFromCart }: any = ShopState();

//   let [isInCart, setIsInCart] = useState(false);

//   useEffect(() => {
//     let productIsInCart = products.find(
//       (item: any) => item.name === product?.product_name
//     );

//     if (productIsInCart) {
//       setIsInCart(true);
//     } else {
//       setIsInCart(false);
//     }
//   }, [products, product]);

//   let handleClick = () => {
//     let prodItem = {
//       product_id: product?.product_id,
//       name: product?.product_name,
//       image: product?.product_image,
//       price: (product?.product_price * 0.6).toFixed(2),
//       color: selectedColorOption,
//       size: selectedSizeOption,
//       quantity,
//     };
//     if (isInCart) {
//       removeFromCart(prodItem);
//       setQuantity(1);
//     } else {
//       addToCart(prodItem);
//     }
//   };
//   return (
//     <ModalMobile
//       state={toggleState["modal_mobile"]}
//       toggleStateHandler={() => toggleStateHandler("modal_mobile")}
//     >
//       <div className="flex flex-col gap-4 my-4">
//         <div className="flex gap-4">
//           <div>
//             <div className="overflow-hidden rounded-md w-36 h-36">
//               <img src={product.product_image} className="" />
//             </div>
//             <div className="flex h-12 gap-2 my-2 overflow-hidden">
//               <img
//                 src={product.product_image}
//                 className="object-cover w-12 h-full rounded"
//               />

//               <img
//                 src={product.product_image}
//                 className="object-cover w-12 h-full rounded"
//               />
//             </div>
//           </div>
//           <div>
//             <span className={style.modal_mobile_subtitle}>Name</span>
//             <p>{product.product_name}</p>

//             <span className={style.modal_mobile_subtitle}>Color</span>
//             <ul className="flex gap-4 mt-3">
//               <RadioButtonGroup
//                 type="Color"
//                 values={colors}
//                 selectedOption={selectedColorOption}
//                 setSelectedOption={setSelectedColorOption}
//               />
//             </ul>

//             <span className={style.modal_mobile_subtitle}>Size</span>
//             <ul className="flex gap-3 mt-2">
//               <RadioButtonGroup
//                 type="Size"
//                 values={size}
//                 selectedOption={selectedSizeOption}
//                 setSelectedOption={setSelectedSizeOption}
//               />
//             </ul>
//           </div>
//         </div>
//         <div className="grid place-items-center">
//           <span className={style.modal_mobile_subtitle}>Quantity</span>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={minusQuantity}
//               className="p-2 rounded-full bg-black/5"
//             >
//               <span>
//                 <MinusSmIcon />
//               </span>
//             </button>
//             <div className="w-12 text-center">
//               <p className="text-3xl font-bold">{quantity.toString()}</p>
//             </div>
//             <button
//               onClick={addQuantity}
//               className="p-2 rounded-full bg-black/5"
//             >
//               <span>
//                 <PlusSmIcon />
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={style.modal_mobile_footer}>
//         <button
//           onClick={() => {
//             handleClick();
//             toggleStateHandler("modal_mobile");
//           }}
//           className={style.modal_mobile_cart}
//         >
//           {" "}
//           {isInCart ? (
//             <>
//               <span>
//                 <ShoppingCartIconFill />
//               </span>
//               <span>Remove from cart</span>
//             </>
//           ) : (
//             <>
//               <span>
//                 <ShoppingCartIcon />
//               </span>
//               <span>Add to cart</span>
//             </>
//           )}
//         </button>
//       </div>
//     </ModalMobile>
//   );
// }

export default ProductCardGrid;
