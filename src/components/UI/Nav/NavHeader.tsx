import React from 'react'
import { ShoppingBagIcon, FireIcon } from '@heroicons/react/solid'
import { ShoppingBagIcon as ShoppingBagIconOutline, BellIcon as BellIconOutline, XIcon } from '@heroicons/react/outline'
import style from './NavHeader.module.css'


interface Modal {
  toggleState: { 
    [key : string]: boolean;
 } ;
  toggleHandler: (type: 'modal' | 'cart' | 'notification' | 'header_notify' ) => void
}

const NavHeader = ({ toggleState, toggleHandler } : Modal) => {
  return (
    <header className={style.nav_header + " "}>
      {toggleState['header_notify'] && <div className='flex items-center justify-between px-6 py-1 text-xs text-white bg-gradient-to-br from-emerald-600 to-emerald-900'> 
      <div>Helo</div>
      <button onClick={() => toggleHandler('header_notify')}><XIcon className='w-4 h-4 text-white brightness-100' /></button>
      </div>}
      <nav>
        <div className='flex gap-4'>

        <FireIcon />
        <span>BSCPE Store</span>
        </div>
        <div className={style.nav_header_list + " "}>
            <button>Home</button>
            <button>About</button>
            <button>Home</button>
            <button>Home</button>
        </div>
        <div className={style.nav_header_list_mobile + " "}>
            <button className='btn_icon' onClick={() => toggleHandler('notification')}>

            <BellIconOutline />
            </button>

            <button className='btn_icon' onClick={() => toggleHandler('cart')}>

            <ShoppingBagIconOutline />
            </button>
        </div>
      </nav>
    </header>
  )
}

export default NavHeader