import ShoppingCart from "../components/Cart/ShoppingCart";
import Checkout from "../components/Checkout/Checkout";
import ListGrid from "../components/Core/ListGrid";
import NotificationPanel from "../components/Notification/NotificationPanel";
import NotFound from "../components/PageNotFound/NotFound";
import Completed from "../components/Signup/Completed";
import StepForm from "../components/Signup/StepForm";
import About from "../pages/About";
import PrivateRoute, { LoggedOutUser } from "../utils/others/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import HomeSection from "../components/Core/HomeSection";
import Login from "../components/Signin/Login";
import SignUp from "../components/Signup/SignUp";
import ProductMain from "../components/Product/ProductMain";
import SubSettings from "../components/UserProfile/SubSettings";
import Settings from "../components/UserProfile/Settings";
import Profile from "../components/UserProfile/Profile";

function RouterMain() {
  return (
    <Routes>
      <Route path="/account" element={<PrivateRoute />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="" element={<HomeSection />}>
        <Route />
      </Route>
    </Routes>
  );
}

export default RouterMain;

export const routes: any = [
  {
    path: "account",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Profile />,
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
      //   // {
      //   //   path: "dashboard",
      //   //   element: <Dashboard />,
      //   //   children: [
      //   //     {
      //   //       path: "",
      //   //       element: <ProductDash />,
      //   //       children: [{ path: ":id", element: <ProductItem /> }],
      //   //     },
      //   //     { path: "orders", element: <p>Orders</p> },
      //   //     { path: "history", element: <p>history</p> },
      //   //   ],
      //   // },
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
    element: <>{<ProductMain />}</>,
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
        <Login />
      </LoggedOutUser>
    ),
  },
  {
    path: "register",
    element: (
      <LoggedOutUser>
        <SignUp />
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
    path: "/",
    element: <HomeSection />,
    children: [
      {
        path: "",
        element: <ListGrid />,
      },
      {
        path: "0",
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
