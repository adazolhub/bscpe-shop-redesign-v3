import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { AccountStateProvider } from './utils/lib/AccountState';
import { AuthProvider } from './utils/lib/Auth';
import Loader from './components/Core/Loader';
import { ShopStateProvider } from './utils/lib/ShopState';
import { ToggleStateProvider } from './utils/lib/ToggleState';
import { BrowserRouter, Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AccountStateProvider>
    <AuthProvider>
    <Suspense fallback={<Loader />}>

    <ShopStateProvider>
    <ToggleStateProvider>
    <App />
    </ToggleStateProvider>
    </ShopStateProvider>

    </Suspense>
    </AuthProvider>

    </AccountStateProvider>
    </BrowserRouter>
  </React.StrictMode>
);

