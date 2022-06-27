import { Suspense, useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Heading from "../components/Heading"
import HomeSection from "../components/HomeSection"
import Sidebar from "../components/Sidebar"
import { Routes, Route, Navigate } from 'react-router-dom'

import About from "./About"
import LoginPage from "./LoginPage"
import SignUpPage from "./SignUpPage"

import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../auth/firebase'
import Spinner from "../components/Spinner"
import Loader from "../components/Loader"
import UserProfile from "./Profile"
import { suspend } from "suspend-react"
import { getInitialAuthState } from "../lib/AuthState"
import { AuthProvider } from "../lib/Auth"
import PrivateRoute from "../components/PrivateRoute"

const Home = () => {
  // let user = suspend(getInitialAuthState, 'initialState');
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, setUser)
  }, []);


  // const [isOpen, setOpen] = useState(false)
  return (
    <>
      <AuthProvider>
        <Heading />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={
              <div className="box-border w-full scroll-smooth container-snap">
                <HomeSection />
              </div>} />
            {/* <Route path="/user" element={<UserProfile />} /> */}
            <Route path="/user" element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            } />
            <Route path="/login" element={<LoginPage user={user} />} />
            <Route path="/register" element={<SignUpPage user={user} />} />

            <Route path="/about" element={<About />} />
            <Route path="/*" element={<div className="grid w-full min-h-screen place-content-center"> 404 not found</div>} />
          </Routes>

        </Suspense>
      </AuthProvider>

      {/* <Sidebar isOpen={isOpen} setOpen={setOpen} /> */}
      <Footer />
      {/* <Navigation/> */}
    </>
  )
}



export default Home