const HomeSection = () => {



    return (
        <section className="min-h-[calc(100vh-48px)] grid place-content-start gap-4 w-full mx-auto">
            <div className="w-full h-48">
                <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="clothes" />
            </div>
            <div className="p-2 overflow-hidden">
                <p className="">Trending</p>
                <div className="flex gap-2 py-2 overflow-x-auto flex-nowrap container-snap">
                    <div className="card flex-[0_0_auto] rounded-lg h-[160px] w-32 overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80" alt="sweeter" />
                    </div>
                    <div className="card flex-[0_0_auto] rounded-lg h-[160px] w-32 overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="sweeter" />
                    </div>
                    <div className="card flex-[0_0_auto] rounded-lg h-[160px] w-32 overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=741&q=80" alt="sweeter" />
                    </div>
                    <div className="card flex-[0_0_auto] rounded-lg h-[160px] w-32 overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80" alt="sweeter" />
                    </div>
                    <div className="card flex-[0_0_auto] rounded-lg h-[160px] w-32 overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="sweeter" />
                    </div>
                    <div className="card flex-[0_0_auto] rounded-lg h-[160px] w-32 overflow-hidden grid place-content-center bg-gray-200">
                        <h2>
                            See more ...

                        </h2>
                    </div>
                </div>
            </div>
            <div>

                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px font-thin">
                        <li className="mr-2">
                            <button href="#" className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                Men</button>
                        </li>
                        <li className="mr-2">
                            <button href="#" className="inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">
                                Women</button>
                        </li>
                        <li className="mr-2">
                            <button href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Kids</button>

                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 md:grid-cols-4 place-items-center">

                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">
                        1
                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">
                        2
                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">
                        3
                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">
                        4
                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">

                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">

                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">

                    </div>
                    <div className="grid w-40 bg-gray-300 rounded-lg h-44 place-content-center">

                    </div>
                </div>
            </div>

        </section>
    )
}


export default HomeSection