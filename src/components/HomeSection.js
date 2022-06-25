import List from "./List"
import Trending from "./Trending"

const HomeSection = () => {

    return (
        <div className=" mt-12 gap-4 container mx-auto min-h-fit">
            <div className="w-full mx-auto sm:container grid lg:gap-4 lg:grid-cols-main-aside lg:grid-rows-main-aside">

                <div className="w-full h-48 px-2 mb-4 lg:h-64 xl:h-96 lg:col-span-3 lg:row-span-1">
                    <img className="object-cover w-full h-full rounded-b-lg lg:rounded-lg" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="clothes" />
                </div>
                {/* <div className="hidden lg:grid place-content-center w-full h-24 px-2 mb-4 lg:h-32 xl:h-32 lg:col-span-1 lg:row-span-1 bg-gray-800 text-white rounded-lg text-xl sticky top-12">
                    <h1>Coupon 20% off</h1>
                </div> */}

                <Trending />
                <List />

            </div>

        </div>
    )
}


export default HomeSection