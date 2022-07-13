import Heading from "../components/Heading";
import HomeSection from "../components/HomeSection";
import {
  useLocation,
  matchRoutes,
  Link,
  useRoutes,
  useResolvedPath,
} from "react-router-dom";

import About from "./About";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import UserProfile from "./Profile";
import PrivateRoute, { LoggedOutUser } from "../utils/PrivateRoute";
import Dashboard from "./Dashboard";
import ProductDash, {
  ProductItem,
} from "../components/ProductPanel/ProductDash";
import NotificationPanel from "../components/Notification/NotificationPanel";
import ListGrid from "../components/ListGrid";
import Settings from "../components/UserProfile/Settings";
import SubSettings from "../components/UserProfile/SubSettings";
import ShoppingCart from "../components/Cart/ShoppingCart";
import Checkout from "../components/Checkout/Checkout";
import CartWrapper from "../components/Cart/CartWrapper";
import StepForm from "../components/Signup/StepForm";
import Completed from "../components/Signup/Completed";
import { getInitialAuthState } from "../lib/AuthState";
import { suspend } from "suspend-react";
import NotFound from "../components/PageNotFound/NotFound";
import ProductMain from "../components/Product/ProductMain";
import Footer from "../components/Footer"

export function NavLink({
  to,
  exact,
  className,
  activeClassName,
  inactiveClassName,
  ...rest
}) {
  let location = useLocation();
  let resolvedLocation = useResolvedPath(to);

  // console.log(resolvedLocation);
  let routeMatches = matchRoutes(routes, location);

  let isActive;

  if (exact) {
    isActive = location.pathname === resolvedLocation.pathname;
  } else {
    isActive = routeMatches.some(
      (match) => match.pathname === resolvedLocation.pathname
    );
  }

  let allClassNames =
    className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
  return <Link className={allClassNames} to={to} {...rest} />;
}

const Home = () => {
  let element = useRoutes(routes);
  suspend(getInitialAuthState, "initialUserState");

  return (
    <>
      <>
        <Heading />
        <main className="relative top-0 h-full">
          {element}
          <CartWrapper />
        </main>

        <Footer />
      </>
    </>
  );
};

const routes = [
  {
    path: "account",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <UserProfile />,
        children: [
          {
            path: "",
            element: <Settings />,
            children: [
              { path: "", element: <SubSettings /> },
              { path: "notification", element: <SubSettings /> },
              { path: "cart", element: <SubSettings /> },
              { path: "account-details", element: <SubSettings /> },
              { path: "payment-information", element: <SubSettings /> },
              { path: "shipping-address", element: <SubSettings /> },
              {
                path: "account-ownership-and-control",
                element: <SubSettings />,
              },
              { path: "about", element: <SubSettings /> },
            ],
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <ProductDash />,
            children: [{ path: ":id", element: <ProductItem /> }],
          },
          { path: "orders", element: <p>Orders</p> },
          { path: "history", element: <p>history</p> },
        ],
      },
    ],
  },
  {
    path: "cart",
    element: (
      <>
        <ShoppingCart />
      </>
    ),
  },
  {
    path: "product/:id",
    element: (
      <>
        <ProductMain />
      </>
    ),
  },

  // {
  //   path: "dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <Dashboard />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       path: "",
  //       element: <ProductDash />,
  //       children: [{ path: ":id", element: <ProductItem /> }],
  //     },
  //     { path: "orders", element: <p>Orders</p> },
  //     { path: "history", element: <p>history</p> },
  //   ],
  // },
  {
    path: "notifications",
    element: (
      <>
        <NotificationPanel />
      </>
    ),
  },
  {
    path: "checkout",
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
  },
  // {
  //   path: "/account",
  //   element: (
  //     <PrivateRoute>
  //       <UserProfile />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     {
  //       path: "",
  //       element: <Settings />,
  //       children: [
  //         { path: "", element: <SubSettings /> },
  //         { path: "notification", element: <SubSettings /> },
  //         { path: "cart", element: <SubSettings /> },
  //         { path: "account-details", element: <SubSettings /> },
  //         { path: "payment-information", element: <SubSettings /> },
  //         { path: "shipping-address", element: <SubSettings /> },
  //         { path: "account-ownership-and-control", element: <SubSettings /> },
  //         { path: "about", element: <SubSettings /> },
  //       ],
  //     },
  //   ],
  // },
  {
    path: "login",
    element: (
      <LoggedOutUser>
        <LoginPage />
      </LoggedOutUser>
    ),
  },
  {
    path: "register",
    element: (
      <LoggedOutUser>
        <SignUpPage />
      </LoggedOutUser>
    ),
    children: [
      {
        path: "",
        element: <StepForm />,
      },
      { path: "success", element: <Completed /> },
      { path: "2", element: <StepForm /> },
    ],
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "",
    element: <HomeSection />,
    children: [
      {
        path: "",
        element: <ListGrid />,
      },
      { path: "1", element: <ListGrid /> },
      { path: "2", element: <ListGrid /> },
      { path: "success", element: <Completed /> },
      {
        path: "carts",
        element: (
          <>
            <ListGrid />
          </>
        ),
      },
      {
        path: "notification",
        element: (
          <>
            <ListGrid />
          </>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

export default Home;
