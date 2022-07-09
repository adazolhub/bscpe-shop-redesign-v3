import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  let { pathname } = useLocation();
  if (
    pathname === "/account" ||
    pathname === "/cart" ||
    pathname === "/notifications" ||
    pathname === "/checkout"
  ) {
    window.scrollTo(0, 0);
    console.log("scrolled");
  }

  return <> {children}</>;
};

export default ScrollToTop;
