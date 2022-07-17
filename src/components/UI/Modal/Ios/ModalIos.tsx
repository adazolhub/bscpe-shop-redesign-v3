import React from 'react'
import style from '../Modal.module.css'
import {ShoppingBagIcon, XIcon} from '@heroicons/react/outline'

interface Modal {
  state: boolean;
  toggleStateHandler: () => void
}

const ModalIos = ({ state, toggleStateHandler } : Modal) => {
  return (
    <>
    {state && <button onClick={toggleStateHandler} tabIndex={-1} className={style.backdrop} />}
    <div className={[style.modal_ios, state? style.modal_ios_active : '' ].join(" ")}>
      <div className={style.modal_ios_content}>
        <div>
          <nav className="inline-flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span><ShoppingBagIcon className='w-5 h-5'/></span>
            <span >My cart</span>
          </nav>
          <div className="flex flex-col gap-2">
            <div className="p-2 border border-dashed border-gray-400 rounded">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae saepe, ratione dolorem quo ducimus voluptas animi nam iste sunt maiores officiis accusantium magnam amet minus? Fuga laborum consectetur minus.</p>

            </div>
            <button>Checkout</button>
            <button>Expand cart</button>
          </div>
        </div>
      </div>
      <button onClick={toggleStateHandler} className={style.modal_ios_close}>
        {/* <span><XIcon/></span>  */}
        Close
        </button>
    </div>
    </>
  )
}

export default ModalIos