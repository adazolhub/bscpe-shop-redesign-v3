const Trending = () => {
  console.log("trending rending...");
  return (
    <>
      <aside className="p-2 overflow-hidden lg:overflow-visible lg:order-1 lg:col-end-1 lg:row-start-5">
        <div className="hidden w-full h-24 px-2 mb-4 text-xl text-white bg-gray-800 rounded-lg lg:grid place-content-center lg:h-32 xl:h-32 lg:col-span-1 lg:row-span-1">
          <h1>Coupon 20% off</h1>
        </div>
        <div className="sticky top-11">
          <p className="py-2 text-xs font-light text-gray-400">Trending</p>
          <div className="flex gap-2 lg:gap-4 py-4 overflow-x-auto flex-nowrap container-snap lg:flex-col   lg:overflow-y-auto lg:h-[80vh] lg:items-center">
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group md:w-3/4 lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=741&q=80"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=741&q=80"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full">
              <img
                className="object-cover w-full h-full transition-all delay-100 opacity-50 group-hover:opacity-100 bg-blend-multiply hover:scale-110"
                src="https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                alt="sweeter"
              />
            </div>
            <div className="card flex-[0_0_auto] grid place-content-center rounded-lg h-[160px] bg-gray-900 w-32 overflow-hidden group lg:w-full text-yellow-300 text-lg">
              <h2>See more</h2>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Trending;
