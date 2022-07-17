import { BellIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import ModalFull from './components/UI/Modal/Full/ModalFull';
import ModalIos from './components/UI/Modal/Ios/ModalIos'
import ModalSide from './components/UI/Modal/Side/ModalSide'
import ModalStandard from './components/UI/Modal/Standard/ModalStandard';

interface Modal {
    toggleState: { 
        [key : string]: boolean;
     } ;
    setToggleStateHandler: (mode: 'modal' | 'cart' | 'notification' | 'header_notify' | 'modal_ios' | 'modal_full' | 'modal_standard' ) => void
  }

const Home = ({ toggleState, setToggleStateHandler } : Modal) => {

  return (
    <div className='absolute bottom-0 overlay' role={'dialog'}>

        <ModalSide
          title={'Cart'}
          icon={<ShoppingBagIcon />}
          state={toggleState['cart']}
          scrollable={false}
          enableFooter
          footer={
            <div className='flex flex-col gap-1 h-fit'>
              <div>
                <table className='w-full border-separate table-fixed border-spacing-2'>
                  <tbody className='w-full'>
                    <tr className='text-sm text-gray-500'>
                      <td>Quantity</td>
                      <td className='text-end'>123</td>
                    </tr>
                    <tr className='text-sm text-gray-500' >
                      <td>Discount</td>
                      <td className='text-end'>123</td>
                    </tr>
                    <tr className='text-lg font-medium '>
                      <td>Total ammount</td>
                      <td className='text-end'>P 4535.54</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className='w-full p-4 text-gray-200 bg-black/90'>Submit</button>
              <button className='w-full p-4 bg-transparent'>Cancel</button>
            </div>
          }
          toggleStateHandler={() => setToggleStateHandler("cart")} >
            <div className='h-64'>
              Hello world
            </div>
        </ModalSide>
        
        <ModalSide
          title={'Notification'}
          icon={<BellIcon />}
          state={toggleState['notification']}
          toggleStateHandler={() => setToggleStateHandler("notification")} >
        
        </ModalSide>

        <ModalIos state={toggleState["modal_ios"]}   toggleStateHandler={() => setToggleStateHandler("modal_ios")} >
          <div>
            <nav className="inline-flex items-center gap-2 mb-2 text-sm text-gray-400">
              <span><ShoppingBagIcon className='w-5 h-5'/></span>
              <span >My cart</span>
            </nav>
            <div className="flex flex-col gap-2">
              <div className="p-2 border border-gray-400 border-dashed rounded">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae saepe, ratione dolorem quo ducimus voluptas animi nam iste sunt maiores officiis accusantium magnam amet minus? Fuga laborum consectetur minus.</p>
              </div>
              <button className='btn_primary'>Checkout</button>
              <button className="p-3 underline rounded underline-offset-2">Expand cart</button>
            </div>
          </div>
        </ModalIos>

        <ModalFull state={toggleState["modal_full"]} toggleStateHandler={() => setToggleStateHandler("modal_full")} />

        <ModalStandard  state={toggleState["modal_standard"]} toggleStateHandler={() => setToggleStateHandler("modal_standard")} />

    </div>
  )
}

export default Home