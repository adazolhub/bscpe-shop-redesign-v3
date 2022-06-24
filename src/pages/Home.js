import { useState } from "react"
import Heading from "../components/Heading"
import HomeSection from "../components/HomeSection"
import Sidebar from "../components/Sidebar"

const Home = () => {
  const [isOpen, setOpen] = useState(false)


  return (
    <>
      <Heading setOpen={setOpen} />
      <main className="box-border w-full scroll-smooth">
        <HomeSection />


      </main>
      {/* <Navigation/> */}
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}


export default Home