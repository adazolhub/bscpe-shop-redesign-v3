import { Suspense } from "react"
import { UserAuth } from "../lib/Auth"
import ListGrid from "./ListGrid"
import Spinner from "./Spinner"
import Trending from "./Trending"
import User from "./User"
const HomeSection = () => {

    const { currentUser } = UserAuth();
    
    console.log(currentUser)

    return (
        <div className="container gap-4 mx-auto mt-12 min-h-fit" id='home'>
            <div className="grid w-full mx-auto sm:container lg:gap-4 lg:grid-cols-main-aside lg:grid-rows-main-aside">

                <div className="w-full h-48 px-2 mb-4 md:h-60 lg:col-span-3 lg:row-span-1">
                    <img className="object-cover w-full h-full rounded-b-lg lg:rounded-lg" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="clothes" />
                </div>
                {/* <div className="sticky hidden w-full h-24 px-2 mb-4 text-xl text-white bg-gray-800 rounded-lg lg:grid place-content-center lg:h-32 xl:h-32 lg:col-span-1 lg:row-span-1 top-12">
                    <h1>Coupon 20% off</h1>
                </div> */}
                <Trending />
                <Suspense fallback={<Spinner />}>

                    <User />
                </Suspense>
                <ListGrid />

            </div>

        </div>
    )
}


export default HomeSection