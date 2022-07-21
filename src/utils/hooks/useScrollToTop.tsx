import { useLocation } from "react-router-dom";
import { TypeJSX } from "../../types";

const ScrollToTop = ({ children } : TypeJSX) => {
  let { pathname } = useLocation();
  if (
    pathname === "/account" ||
    pathname === "/cart" ||
    pathname === "/notifications" ||
    pathname === "/checkout" ||
    pathname === "/product"
  ) {
    window.scrollTo(0, 0);
  }

  return <> {children}</>;
};

export default ScrollToTop;
