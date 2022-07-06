import { memo, Suspense } from "react";
import Footer from "../components/Footer";
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
import PrivateRoute, { LoggedOutUser } from "../components/PrivateRoute";
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

const NotFound = () => {
  return (
    <>
      <div className="grid w-full min-h-[calc(100vh-10em)] place-content-center">
        {" "}
        <h2 className="font-medium text-center text-gray-600 text-8xl">404</h2>
        <p className="text-lg font-thin text-center text-gray-500">
          {" "}
          Page not found
        </p>
      </div>
      <div className="flex w-full pb-8">
        <a href="/#list" className="mx-auto btn-secondary">
          {" "}
          Go back
        </a>
      </div>
    </>
  );
};

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

const Home = memo(() => {
  let element = useRoutes(routes);

  return (
    <>
      <>
        <Heading />
        <main className="relative top-0 h-full">
          {element}
          <CartWrapper />
        </main>

        {/* <Footer /> */}
      </>
    </>
  );
});

const routes = [
  {
    path: "/",
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
    path: "cart",
    element: (
      <>
        <ShoppingCart />
      </>
    ),
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
  {
    path: "/account",
    element: (
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    ),
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
          { path: "account-ownership-and-control", element: <SubSettings /> },
          { path: "about", element: <SubSettings /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <LoggedOutUser>
        <LoginPage />
      </LoggedOutUser>
    ),
  },
  {
    path: "/register",
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
    path: "/about",
    element: <About />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

export default Home;
