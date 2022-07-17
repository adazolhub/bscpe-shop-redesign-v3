import React from 'react'
import style from '../Modal.module.css'
import {ShoppingBagIcon, XIcon} from '@heroicons/react/outline'
import { Modal } from '../../../../types'

const ModalIos = ({ state, toggleStateHandler, children } : Modal) => {
  return (
    <>
    {state && <button onClick={toggleStateHandler} tabIndex={-1} className={style.backdrop} />}
    <div className={[style.modal_ios, state? style.modal_ios_active : '' ].join(" ")}>
      <div className={style.modal_ios_content}>
          {children}
      </div>
      <button onClick={toggleStateHandler} className={style.modal_ios_close}>
        {/* <span><XIcon/></span>  */}
        <span>
        Close
        </span>
        </button>
    </div>
    </>
  )
}

export default ModalIos