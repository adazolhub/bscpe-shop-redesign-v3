import { ArrowLeftIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { UserAuth } from '../../lib/Auth'
import ShopState from '../../lib/ShopState'
import ScrollToTop from '../../utils/ScrollToTop'
import RadioButtonGroup from '../UI/RadioButtonGroup'


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

const ProductMain = () => {
    let { list } = UserAuth()
    let { pathname } = useLocation()
    let navigate = useNavigate()
    let product = list.find(product => product.product_id === pathname.split('/')[2])

    let { products, addToCart, removeFromCart } = ShopState();
    let [isInCart, setIsInCart] = useState(false);

    let [quantity, setQuantity] = useState(1)

    let [selectedColorOption, setSelectedColorOption] = useState(colors[0]?.option)
    let [selectedSizeOption, setSelectedSizeOption] = useState(size[0]?.option)


    let addQuantity = () => {
        setQuantity(count => count + 1)
    }
    let minusQuantity = () => {
        setQuantity(count => count - 1)
        if (quantity < 2) {
            setQuantity(1)
        }
    }

    useEffect(() => {
        let productIsInCart = products.find((item) => item.name === product.product_name);

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


    return (
        <>
            <ScrollToTop />
            {product &&
                <div className='sticky top-0 '>
                    {/* <div className='px-4 py-4 bg-white'>
                <ArrowLeftIcon className="w-5 h-5" />
            </div> */}
                    <div className='h-[86vh] overflow-y-scroll flex flex-col w-full md:flex-row'>
                        <div className='w-full overflow-hidden images-carousel h-72 md:p-4'>
                            <div className='flex overflow-x-scroll'>
                                <img src={product?.product_image} alt={product?.product_name} className='object-cover w-screen h-72' />
                            </div>
                            <div>
                                hello
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 m-4'>
                            <p className='text-xs font-thin text-gray-400'>SKU: {product?.product_id.toUpperCase()}</p>
                            <h1 className='text-2xl font-bold leading-6'>{product?.product_name}</h1>
                            <div className='grid grid-cols-3 gap-1 py-4 text-sm'>
                                <div>
                                    <h3 className='font-medium '>Category:</h3>
                                    <p className='font-thin text-gray-500'>{product?.product_category.toUpperCase()}</p>
                                </div>
                                <div>
                                    <h3 className='font-medium '>Stocks:</h3>
                                    <p className='font-thin text-gray-500'>{product?.product_quantity}</p>
                                </div>
                                <div>
                                    <h3 className='font-medium '>Color:</h3>
                                    <div className='flex gap-4 p-2 font-thin text-gray-500'>
                                        <RadioButtonGroup type="Color" values={colors} selectedOption={selectedColorOption} setSelectedOption={setSelectedColorOption} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className='font-medium '>Price:</h3>
                                    <p className='py-1 text-lg font-medium text-amber-600'>P {product?.product_price.toString()}</p>
                                </div>
                                <div>
                                    <h3 className='font-medium '>Size:</h3>
                                    <div className='flex gap-3 p-2 text-xs font-thin text-gray-500'>
                                        <RadioButtonGroup type="Size" values={size} selectedOption={selectedSizeOption} setSelectedOption={setSelectedSizeOption} />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className='text-sm'>
                                <h3 className='font-medium'>Description</h3>
                                <p className='mt-2 text-gray-500'>{product?.product_description}</p>
                            </div>
                            <div className='flex gap-4'>
                                <div className="inline-flex items-center">

                                    <button className="px-2 py-3 text-white bg-gray-400 rounded-l-md" onClick={() => minusQuantity()}>

                                        <MinusIcon className="w-6 h-6" />

                                    </button>
                                    <div className="relative grid w-10 h-12 p-4 border border-gray-400 place-content-center">
                                        <span className="">
                                            {quantity}
                                        </span>
                                    </div>
                                    {/* <input type="number" name="quantity" maxLength={2} max={2} pattern="[0-9]{2}" value={quantity} onChange={handleChange} className='w-[6ch] border rounded-sm text-center py-2 px-0' /> */}

                                    <button className="px-2 py-3 text-white bg-gray-400 rounded-r-md" onClick={() => addQuantity()}>

                                        <PlusIcon className="w-6 h-6" />
                                    </button>

                                </div>

                                <button className='w-full btn-primary'
                                    onClick={() => {
                                        handleClick()
                                        navigate('/cart')
                                    }}
                                >Add to cart</button>
                            </div>
                            <button className='w-full btn-secondary'
                                onClick={() => navigate('/')}
                            >Continue shopping</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default ProductMain