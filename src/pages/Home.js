import Heading from "../components/Heading"
import Sidebar from "../components/Sidebar"

const Home = () => {

  return(
    <>
      <Heading/>
      <main className="min-h-[calc(100vh-48px)] grid place-content-center">
        <h1 className="text-3xl font-thin">Hello world</h1>

      </main>
      {/* <Navigation/> */}
      <Sidebar/>
    </>
  )
}


export default Home