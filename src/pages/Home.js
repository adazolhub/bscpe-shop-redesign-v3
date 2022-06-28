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
import { AuthProvider } from "../lib/Auth";
import PrivateRoute, { LoggedOutUser } from "../components/PrivateRoute";
import Dashboard from "./Dashboard";

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
                  <HomeSection />
                </div>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
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
                <div className="grid w-full min-h-screen place-content-center">
                  {" "}
                  404 not found
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </Suspense>

      {/* <Sidebar isOpen={isOpen} setOpen={setOpen} /> */}
      <Footer />
      {/* <Navigation/> */}
    </>
  );
};

export default Home;
