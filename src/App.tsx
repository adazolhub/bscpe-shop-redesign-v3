import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './style/App.css';
import NavHeader from './components/UI/Nav/NavHeader';
import  ModalSide from './components/UI/Modal/Side/ModalSide';
import {ShoppingBagIcon, BellIcon, ArrowNarrowRightIcon, ArrowDownIcon} from '@heroicons/react/outline'
import ModalIos from './components/UI/Modal/Ios/ModalIos';
import Home from './Home';
import { useSpring, animated} from 'react-spring'
import useMeasure from 'react-use-measure'
import { BrowserRouter, Link, matchRoutes, Route, Routes, useLocation, useResolvedPath, useRoutes } from 'react-router-dom';

import HomeSection from './components/Core/HomeSection';
import HomePage from './pages/Homepage';
import { routes } from './routes/RouterMain';

interface Navigation {
  to : string,
  exact? : boolean,
  className? : string,
  activeClassName? : string,
  inactiveClassName? : string,
  children?: any;
  onClick?: () => void
}

// JSX.Element | JSX.Element[] | JSX.IntrinsicAttributes | string  | null

export function NavLink({
  to,
  exact,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
} : Navigation) {
  let location = useLocation();
  let resolvedLocation = useResolvedPath(to);

  // console.log(resolvedLocation);
  let routeMatches = matchRoutes(routes, location);

  let isActive;

  if (exact) {
    isActive = location.pathname === resolvedLocation.pathname;
  } else {
    isActive = routeMatches?.some(
      (match) => match.pathname === resolvedLocation.pathname
    );
  }

  let allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
  return <Link className={allClassNames} to={to} {...rest} />;
}


function MainRoutes() {
  return( 
    <>
        <Routes>

        <Route path='/account'>

        </Route>
        <Route path='' element={<HomeSection />}>

        </Route>
        </Routes>
    </>
  )
}


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
    side_bar: false,
  })

  const setToggleStateHandler = (modal_type 
    : 'modal' | 'cart' | 'notification' | 'header_notify' | 'modal_ios' | 'modal_full' | 'modal_standard' | 'side_bar'
    ) => 
  setToggleState(prev => prev = {...prev, [modal_type] : !prev[modal_type]})


  //TESTING REACT SPRING ANIMATION
  const AnimatedHomeContent = animated(HomeContent)
  const [ref, { height, top }] = useMeasure()

    // let element = useRoutes(routes)

  return (
    <div  className='min-h-[200vh]'>
      <NavHeader toggleState={toggleState} toggleHandler={setToggleStateHandler}  />
      <div className='relative h-screen bg-gradient-to-t from-black to-black/30'>
        <img src="https://images.unsplash.com/photo-1657928196334-26146c4e5702?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="girl-texting-on-hod" className="object-cover w-full h-full mix-blend-color" />
        <AnimatedHomeContent setToggleStateHandler={setToggleStateHandler}/>
        
      </div>
      <div ref={ref}  className='bg-gray-500'>
      <div>
        Hwllo
      </div>
      <button onClick={() => setToggleStateHandler('modal_standard')}>Toggle Standard Modal</button>

      </div>

      
      {/* <MainRoutes /> */}
      {/* {element} */}
      <HomePage />

      <Home toggleState={toggleState} setToggleStateHandler={setToggleStateHandler}  />



    </div>
  );
}

interface Modal {
  setToggleStateHandler: (mode: 'modal' | 'cart' | 'notification' | 'header_notify' | 'modal_ios' | 'modal_full' | 'modal_standard' ) => void
}

function HomeContent({ setToggleStateHandler} : Modal) {

  const [ref, { height, top }] = useMeasure()
  const props = useSpring({ to: { opacity: 1, y: 0, height: height}, from : { opacity: 0, y: 50, height: 0}, config : { duration: 300 }})

  console.log(props.height.to(y => y.toFixed(0)))
  
  return ( 
  <animated.div style={props}   className='absolute bottom-0 m-5 text-sm text-gray-500 h-fit'>
    <div ref={ref} className='flex flex-col gap-6'>
          <div >
          <h1 className='text-4xl font-medium text-gray-200'>Hello world</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur explicabo labore assumenda amet placeat facere aspernatur. Provident ut, quo fuga recusandae ratione voluptate amet, assumenda sit nostrum voluptates debitis similique.</p>

          </div>
          <button onClick={() => setToggleStateHandler("modal_ios")} className='inline-flex items-center justify-center gap-4 px-6 py-3 text-white border rounded border-gray-300/40 bg-white/5 backdrop-blur'>Shop now <span><ArrowNarrowRightIcon className='animate-pulse' /></span> </button>


          <button onClick={() => setToggleStateHandler("modal_full")}  className='grid px-6 mx-auto mt-10 text-xs text-gray-500 animate-bounce place-items-center w-fit'>
            <span>Scroll</span>
            <ArrowDownIcon className="w-4"/>
          </button>

    </div>
  </animated.div>
  )
}

export default App;
