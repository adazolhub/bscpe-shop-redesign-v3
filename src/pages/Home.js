import { Suspense, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import HomeSection from "../components/HomeSection";
import { Routes, Route } from "react-router-dom";

import About from "./About";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import Loader from "../components/Loader";
import UserProfile from "./Profile";
import { AuthProvider, UserAuth } from "../lib/Auth";
import PrivateRoute, { LoggedOutUser } from "../components/PrivateRoute";
import Dashboard from "./Dashboard";
import CartOverlay from "../components/Overlay/CartOverlay";

const Home = () => {
  // let user = suspend(getInitialAuthState, 'initialState');
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  // const [isOpen, setOpen] = useState(false)
  return (
    <>
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <Heading />
          <Routes>
            <Route
              path="/"
              element={
                <div className="box-border w-full scroll-smooth container-snap">
                  <HomeSection user={user} />
                </div>
              }
            />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <LoggedOutUser>
                  <LoginPage />
                </LoggedOutUser>
              }
            />
            <Route
              path="/register"
              element={
                <LoggedOutUser>
                  <SignUpPage />
                </LoggedOutUser>
              }
            />

            <Route path="/about" element={<About />} />
            <Route
              path="/*"
              element={
                <>
                  <div className="grid w-full min-h-[calc(100vh-10em)] place-content-center">
                    {" "}
                    <h2 className="font-medium text-center text-gray-600 text-8xl">
                      404
                    </h2>
                    <p className="text-lg font-thin text-center text-gray-500">
                      {" "}
                      Page not found
                    </p>
                  </div>
                  <div className="flex w-full pb-8">
                    <a href="/" className="mx-auto btn-secondary">
                      {" "}
                      Go back
                    </a>
                  </div>
                </>
              }
            />
          </Routes>
        </AuthProvider>
      </Suspense>

      {/* <Sidebar isOpen={isOpen} setOpen={setOpen} /> */}
      {/* <CartOverlay /> */}
      <Footer />
      {/* <Navigation/> */}
    </>
  );
};

export default Home;
