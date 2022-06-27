import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';
import Loader from './components/Loader';


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    {/* <Suspense fallback={<Loader />}> */}

    <BrowserRouter>
      <Home />
    </BrowserRouter>
    {/* </Suspense> */}
  </React.StrictMode>
);

