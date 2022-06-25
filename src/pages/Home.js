import { useState } from "react"
import Footer from "../components/Footer"
import Heading from "../components/Heading"
import HomeSection from "../components/HomeSection"
import Sidebar from "../components/Sidebar"

const Home = () => {
  const [isOpen, setOpen] = useState(false)


  return (
    <>
      <Heading setOpen={setOpen} />
      <div className="box-border w-full scroll-smooth container-snap">
        <HomeSection />


      </div>
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <Footer />
      {/* <Navigation/> */}
    </>
  )
}


export default Home