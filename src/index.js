import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Overlay/Modal";
import { ToggleStateProvider } from "./lib/ToggleState";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToggleStateProvider>
        <Home />
        {/* <Modal /> */}
      </ToggleStateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
