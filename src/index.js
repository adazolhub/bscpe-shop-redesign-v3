import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Overlay/Modal";
import { ToggleStateProvider } from "./lib/ToggleState";
import { AuthProvider } from "./lib/Auth";
import { ShopStateProvider } from "./lib/ShopState";
import Loader from "./components/Loader";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ToggleStateProvider>
          <AuthProvider>
            <ShopStateProvider>
              <Home />
            </ShopStateProvider>
          </AuthProvider>
        </ToggleStateProvider>
      </Suspense>
    </BrowserRouter>
  </>
);
