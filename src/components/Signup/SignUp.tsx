import { Link, Outlet } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="grid w-full place-content-center md:place-content-start md:grid-cols-3 lg:grid-cols-2">
      {/* IMAGE ON WIDER SCREEN */}
      <div className="h-[calc(100%-3em)] my-12 bg-blend-overlay relative  rounded-md overflow-hidden hidden md:block">
        <img
          className="absolute top-0 left-0 hidden object-cover w-full h-full mb-5 opacity-100 md:block"
          src="https://images.unsplash.com/photo-1546241183-0ed3f8a4a824?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="register"
        />
        <div className="absolute top-0 left-0 hidden w-full h-full bg-gray-900 bg-blend-overlay opacity-60 md:block"></div>
      </div>
      {/* LOGIN FORM */}
      <div className="flex col-span-2 lg:col-span-1">
        <div className="flex flex-col justify-between items-center min-h-[calc(100vh-8em)] w-[calc(100vw-2em)] md:w-[calc(90%-2em)] lg:max-w-md mx-auto">
          <div className="flex flex-col w-full p-4 mx-auto rounded-lg">
            <h1 className="mb-8 text-2xl font-thin text-center text-gray-400">
              Create a new account
            </h1>

            <Outlet />
          </div>

          <p className="py-4 text-xs text-center text-gray-400/70">
            Already a member?{" "}
            <Link className="text-gray-500 btn-link" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
