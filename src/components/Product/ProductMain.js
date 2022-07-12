import { ArrowLeftIcon } from '@heroicons/react/outline'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { UserAuth } from '../../lib/Auth'
import ShopState from '../../lib/ShopState'
import RadioButtonGroup from '../UI/RadioButtonGroup'

const ProductMain = () => {
    let { list } = UserAuth()
    let { pathname } = useLocation()
    let navigate = useNavigate()
    let product = list.find(product => product.product_id === pathname.split('/')[2])

    let { products, addToCart, removeFromCart } = ShopState();
    let [isInCart, setIsInCart] = useState(false);

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
        };
        if (isInCart) {
            removeFromCart(prodItem);
        } else {
            addToCart(prodItem);
        }
    };

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
    return (
        <>
            {product && <div className='sticky top-0 w-full '>
                {/* <div className='px-4 py-4 bg-white'>
                <ArrowLeftIcon className="w-5 h-5" />
            </div> */}
                <div className='h-[86vh] overflow-y-scroll'>
                    <div className='w-full overflow-hidden images-carousel h-72'>
                        <div className='flex overflow-x-scroll'>
                            <img src={product?.product_image} alt={product?.product_name} className='object-cover w-screen h-72' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 m-4'>
                        <h1 className='text-2xl font-bold leading-6'>{product?.product_name}</h1>
                        <p className='text-xs font-thin'>SKU: {product?.product_id.toUpperCase()}</p>
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
                            <button className='w-full btn-secondary'
                                onClick={() => navigate('/')}
                            >Continue shopping</button>
                            <button className='w-full btn-primary'
                                onClick={() => {
                                    handleClick()
                                    navigate('/cart')
                                }}
                            >Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProductMain