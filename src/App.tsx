import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavHeader from './components/UI/Nav/NavHeader';
import  ModalSide from './components/UI/Modal/Side/ModalSide';
import {ShoppingBagIcon, BellIcon, ArrowNarrowRightIcon, ArrowDownIcon} from '@heroicons/react/outline'
import ModalIos from './components/UI/Modal/Ios/ModalIos';

interface State {
  modal: boolean;
  notification: boolean,
  cart: boolean
}


function App() {

  //Internal state management (test only)

  const [toggleState, setToggleState] = useState({
    modal: false,
    notification: false,
    cart: false,
    modal_ios: false,
  })

  console.log(process.env.REACT_APP_API)

  const setToggleStateHandler = (modal_type : 'modal' | 'cart' | 'notification' | 'modal_ios') => 
  setToggleState(prev => prev = {...prev, [modal_type] : !prev[modal_type]})

  
  return (
    <div className='min-h-[200vh]'>
      <NavHeader toggleHandler={setToggleStateHandler}  />


      <div className='h-screen bg-gradient-to-t from-black to-black/30 relative'>
        <img src="https://images.unsplash.com/photo-1657928196334-26146c4e5702?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="girl-texting-on-hod" className="w-full h-full object-cover mix-blend-color" />

        <div className='absolute bottom-0 m-5 text-gray-500 text-sm flex flex-col gap-6'>
          <div>
          <h1 className='text-gray-200 font-medium text-4xl'>Hello world</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur explicabo labore assumenda amet placeat facere aspernatur. Provident ut, quo fuga recusandae ratione voluptate amet, assumenda sit nostrum voluptates debitis similique.</p>

          </div>
          <button onClick={() => setToggleStateHandler("modal_ios")} className='px-6 py-3 border border-gray-300/40 rounded text-white bg-white/5 backdrop-blur inline-flex justify-center items-center gap-4'>Shop now <span><ArrowNarrowRightIcon className='animate-pulse' /></span> </button>


          <button  className='animate-bounce grid place-items-center text-xs w-fit mx-auto mt-10 px-6 text-gray-500'>
            <span>Scroll</span>
            <ArrowDownIcon className="w-4"/>
          </button>
        </div>
      </div>

      <div>
        <ModalSide 
          title={'Cart'}
          icon={<ShoppingBagIcon />}
          state={toggleState['cart']}
          scrollable={false}
          enableFooter
          footer={
            <div className='h-fit flex flex-col gap-1'>
              <div>
                <table className='table-fixed border-separate border-spacing-2 w-full'>
                  <tbody className='w-full'>
                    <tr className='text-sm text-gray-500'>
                      <td>Quantity</td>
                      <td className='text-end'>123</td>
                    </tr>

                    <tr className='text-sm text-gray-500' >
                      <td>Discount</td>
                      <td className='text-end'>123</td>
                    </tr>

                    <tr className=' text-lg font-medium'>
                      <td>Total ammount</td>
                      <td className='text-end'>P 4535.54</td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <button className='p-4 bg-black/90 text-gray-200 w-full'>Submit</button>
              <button className='p-4 bg-transparent w-full'>Cancel</button>
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

        <ModalIos state={toggleState["modal_ios"]}   toggleStateHandler={() => setToggleStateHandler("modal_ios")} />
      </div>


    </div>
  );
}


export default App;
