import { XIcon } from '@heroicons/react/outline'
import { KeyIcon } from '@heroicons/react/solid'
import React from 'react'
import { Modal } from '../../../../types'
import style from '../Modal.module.css'

const ModalStandard = ({ state, toggleStateHandler, icon, title} : Modal) => {
  return (
    <>
    {state && <button onClick={toggleStateHandler} className={style.backdrop} />}
    <div className={[style.modal_standard, state? style.modal_standard_active: '' ].join(" ")}>
      <nav>
        {title && <div className='inline-flex items-center gap-2'>
        {icon && <span>{icon}</span>}
        <span>{title}</span>
        </div>}
        <button><XIcon onClick={toggleStateHandler} /></button>
      </nav>

      <div className={style.modal_standard_content}>
        <div>Hello world</div>
        <div>Hello world</div>
        <div>Hello world</div>
        <div>Hello world</div>
        <div>Hello world</div>
        <div>Hello world</div>

      </div>

    </div>
    </>
  )
}

export default ModalStandard