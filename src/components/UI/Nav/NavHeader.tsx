import React from 'react'
import { ShoppingBagIcon, FireIcon } from '@heroicons/react/solid'
import { ShoppingBagIcon as ShoppingBagIconOutline, BellIcon as BellIconOutline } from '@heroicons/react/outline'
import style from './NavHeader.module.css'


interface Modal {
  toggleHandler: (type: 'modal' | 'cart' | 'notification' ) => void
}

const NavHeader = ({ toggleHandler } : Modal) => {
  return (
    <header className={style.nav_header + " "}>
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