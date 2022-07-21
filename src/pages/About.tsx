import CardLarge from "../components/UI/Cards/CardLarge";
import ProductCardGrid from "../components/UI/Cards/ProductCardGrid";

const About = () => {
  return (
    <>
      <div className="grid w-full px-4 text-sm text-gray-400 place-content-center">
        <h1 className="text-3xl text-gray-500 font-extralight max-w-[12ch] mx-auto py-4 text-center">
          BSCPE STORE V2{" "}
          <span className="italic text-gray-400">(re-design)</span>
        </h1>
        <p>
          This web application is the re-design layout and structure of one of
          our project during college. A Project for Online Technology with
          Multimedia Subject (College Subject) with our Instructor Engr. Raven
          Tabiongan (College Subject Instructor).
        </p>
        <p>
          An online shopping app store (clothing), Web Application where user
          can add cart Items and buy
        </p>
        <p>
          The previous project link &gt;{" "}
          <a
            href="https://bscpe-store.firebaseapp.com/"
            target="_blank"
            className="hover:underline"
            rel="noreferrer"
          >
            {" "}
            BSCPE STORE{" "}
            <span className="text-blue-400 underline">
              (https://bscpe-store.firebaseapp.com)
            </span>
          </a>
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* <ProductCardGrid />
          <ProductCardGrid /> */}
          <CardLarge />
        </div>
      </div>
    </>
  );
};

export default About;
