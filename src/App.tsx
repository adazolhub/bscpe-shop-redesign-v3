import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavHeader from './components/UI/Nav/NavHeader';
import  ModalSide from './components/UI/Modal/Side/ModalSide';
import {ShoppingBagIcon, BellIcon, ArrowNarrowRightIcon, ArrowDownIcon} from '@heroicons/react/outline'
import ModalIos from './components/UI/Modal/Ios/ModalIos';
import Home from './Home';



function App() {

  //Internal state management (test only)


  const [toggleState, setToggleState] = useState({
    modal: false,
    notification: false,
    cart: false,
    modal_ios: false,
    modal_full: false,
    modal_standard: false,
    header_notify: true,
  })

  const setToggleStateHandler = (modal_type 
    : 'modal' | 'cart' | 'notification' | 'header_notify' | 'modal_ios' | 'modal_full' | 'modal_standard'
    ) => 
  setToggleState(prev => prev = {...prev, [modal_type] : !prev[modal_type]})

  
  return (
    <div className=''>
      <NavHeader toggleState={toggleState} toggleHandler={setToggleStateHandler}  />



      <div className='relative h-screen bg-gradient-to-t from-black to-black/30'>
        <img src="https://images.unsplash.com/photo-1657928196334-26146c4e5702?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="girl-texting-on-hod" className="object-cover w-full h-full mix-blend-color" />

        <div className='absolute bottom-0 flex flex-col gap-6 m-5 text-sm text-gray-500'>
          <div>
          <h1 className='text-4xl font-medium text-gray-200'>Hello world</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur explicabo labore assumenda amet placeat facere aspernatur. Provident ut, quo fuga recusandae ratione voluptate amet, assumenda sit nostrum voluptates debitis similique.</p>

          </div>
          <button onClick={() => setToggleStateHandler("modal_ios")} className='inline-flex items-center justify-center gap-4 px-6 py-3 text-white border rounded border-gray-300/40 bg-white/5 backdrop-blur'>Shop now <span><ArrowNarrowRightIcon className='animate-pulse' /></span> </button>


          <button onClick={() => setToggleStateHandler("modal_full")}  className='grid px-6 mx-auto mt-10 text-xs text-gray-500 animate-bounce place-items-center w-fit'>
            <span>Scroll</span>
            <ArrowDownIcon className="w-4"/>
          </button>
        </div>
      </div>
      <div className='bg-gray-500'>
      <div>
        Hwllo
      </div>
      <button onClick={() => setToggleStateHandler('modal_standard')}>Toggle Standard Modal</button>

      </div>


      <Home toggleState={toggleState} setToggleStateHandler={setToggleStateHandler}  />



    </div>
  );
}


export default App;
