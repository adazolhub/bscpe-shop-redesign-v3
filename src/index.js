import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Overlay/Modal";
import { ToggleStateProvider } from "./lib/ToggleState";
import { AuthProvider } from "./lib/Auth";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <ToggleStateProvider>
        <AuthProvider>
          <Home />
        </AuthProvider>
        {/* <Modal /> */}
      </ToggleStateProvider>
    </BrowserRouter>
  </React.Fragment>
);
