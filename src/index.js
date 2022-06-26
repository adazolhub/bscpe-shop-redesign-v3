import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>
);

