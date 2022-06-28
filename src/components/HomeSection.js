import HomeCarousel from "./Carousel/HomeCarousel";
import ListGrid from "./ListGrid";
import Trending from "./Trending";

const HomeSection = () => {
  return (
    <div className="container gap-4 mx-auto mt-12 min-h-fit" id="home">
      <div className="grid w-full mx-auto sm:container lg:gap-4 lg:grid-cols-main-aside lg:grid-rows-main-aside">
        <HomeCarousel />
        {/* <div className="sticky hidden w-full h-24 px-2 mb-4 text-xl text-white bg-gray-800 rounded-lg lg:grid place-content-center lg:h-32 xl:h-32 lg:col-span-1 lg:row-span-1 top-12">
                    <h1>Coupon 20% off</h1>
                </div> */}
        <Trending />
        {/* <User /> */}
        <ListGrid />
      </div>
    </div>
  );
};

export default HomeSection;
