import { auth, db } from "../auth/firebase";
import { sendEmailVerification, updateProfile, fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useState } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../lib/Auth";

const SignUpPage = () => {
  // console.log(createUserWithEmailAndPassword, 'hello')
  // suspend(getInitialAuthState, ['initialAuthState'])

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //global context state
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  //password basic compare validation
  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const register = async (e) => {
    e.preventDefault();
    setError("");

    if (validatePassword()) {
      try {
        const user = await createUser(email, password);
        updateProfile(user?.user, {
          displayName: username,
        });
        // console.log(user);

        //change from addDoc to setDoc to manualy set root ID or UID of the document
        await setDoc(doc(db, "users", user?.user?.uid), {
          uid: user?.user.uid,
          authProvider: "local",
          email,
          isSeller: false,
          cart: [],
        });
        navigate("/account");
      } catch (error) {
        console.log(error.code);
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
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
        <div className="flex flex-col justify-between items-center min-h-[calc(100vh-6em)] w-[calc(100vw-2em)] md:w-[calc(90%-2em)] lg:max-w-md mx-auto">
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

function Input({ type, name, placeholder, icon, setter, ...props }) {
  return (
    <input
      type={type}
      className="text-field placeholder:text-gray-300"
      name={name}
      placeholder={placeholder}
      {...props}
      onChange={(event) => {
        setter(event.target.value);
      }}
    />
  );
}

export default SignUpPage;
