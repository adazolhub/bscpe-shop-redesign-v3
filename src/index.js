import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { ToggleStateProvider } from "./lib/ToggleState";
import { AuthProvider } from "./lib/Auth";
import { ShopStateProvider } from "./lib/ShopState";
import Loader from "./components/Loader";
import { AccountStateProvider } from "./lib/AccountState";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <AccountStateProvider>
        <AuthProvider>
          <Suspense fallback={<Loader />}>
            <ShopStateProvider>
              <ToggleStateProvider>

                <Home />
              </ToggleStateProvider>
            </ShopStateProvider>
          </Suspense>
        </AuthProvider>
      </AccountStateProvider>
    </BrowserRouter>
  </>
);
