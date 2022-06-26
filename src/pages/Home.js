import { useState } from "react"
import Footer from "../components/Footer"
import Heading from "../components/Heading"
import HomeSection from "../components/HomeSection"
import Sidebar from "../components/Sidebar"
import { Routes, Route } from 'react-router-dom'
import About from "./About"
import LoginPage from "./LoginPage"
const Home = () => {
  const [isOpen, setOpen] = useState(false)


  return (
    <>
      <Heading setOpen={setOpen} />
      <Routes>
        <Route path="/" element={
          <div className="box-border w-full scroll-smooth container-snap">
            <HomeSection />
          </div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<div className="grid place-content-center w-full min-h-screen"> 404 not found</div>} />

      </Routes>

      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <Footer />
      {/* <Navigation/> */}
    </>
  )
}


export default Home