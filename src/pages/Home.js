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
        <section className="min-h-[calc(100vh-48px)] grid place-content-center">
          <h1 className="text-3xl font-thin">Hello world</h1>
        </section>
        <section className="min-h-[calc(100vh-48px)] grid place-content-center">
          <h1 className="text-3xl font-thin">Hello world</h1>
        </section>

      </main>
      {/* <Navigation/> */}
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}


export default Home