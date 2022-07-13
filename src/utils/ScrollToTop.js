import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
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
