import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { db } from "../../auth/firebase";
import { UserAuth } from "../../utils/lib/Auth";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import Form from "../UI/Forms/Form";
import Input from "../UI/Forms/Input";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";
import AdvisorySecurity from "./AdvisorySecurity";
import PasswordRequirementInfo from "./PasswordRequirementInfo";

interface Steps {
  nextStep?: any;
  prevStep?: any;
  handleChange: (type: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  values?: any;
}

interface Steppers {
  setStepper: any;
}
function SecurityDetails({
  nextStep,
  prevStep,
  handleChange,
  values,
  setStepper,
}: Steps & Steppers) {
  let [error, setError] = useState({
    password: null,
    confirm_password: null,
  });
  const { createUser }: any = UserAuth();

  //Password regex format
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let number = /\d/g;

  //Password Validator
  let passLength = values?.password.length < 9;
  let passNotLower = !values?.password.match(lowerCaseLetters);
  let passNotUpper = !values?.password.match(upperCaseLetters);
  let passNotNumber = !values?.password.match(number);
  let passNotMatch = values?.password !== values?.confirm_password;

  let Continue = (e: any) => {
    e.preventDefault();

    if (values?.password === "")
      return setError(
        (prev: any) => (prev = { ...prev, password: "Password required" })
      );
    if (passLength)
      return setError(
        (prev: any) =>
          (prev = {
            ...prev,
            password: "Must contain at least 8 or more characters",
          })
      );
    if (passNotLower)
      return setError(
        (prev: any) =>
          (prev = {
            ...prev,
            password: "Must contain uppercase/capital characters",
          })
      );

    if (passNotUpper)
      return setError(
        (prev: any) =>
          (prev = {
            ...prev,
            password: "Must contain uppercase/capital characters",
          })
      );

    if (passNotNumber)
      return setError(
        (prev: any) =>
          (prev = {
            ...prev,
            password: "Must contain at least 1 numeric value",
          })
      );

    if (passNotMatch)
      return setError(
        (prev: any) =>
          (prev = { ...prev, confirm_password: "Password not match" })
      );
    setError((prev) => (prev = { password: null, confirm_password: null }));
    return register()
      .then((res) => console.log("registration success > ", res))
      .catch((error) => console.log("registration error >", error));
  };

  let Previous = (e: any) => {
    e.preventDefault();
    prevStep();
  };

  const register = async () => {
    try {
      const user = await createUser(values?.email, values?.password);
      updateProfile(user?.user, {
        displayName: values?.username,
      });

      /**
       * change from addDoc to setDoc to manualy set root ID or UID of the document
       */
      await setDoc(doc(db, "users", user?.user?.uid), {
        uid: user?.user.uid,
        authProvider: "local",
        email: values?.email,
        fullname: values?.fullname.trim(),
        isSeller: false,
        cart: [],
      });

      /**
       * 07.08.2022 - Added Virtual card to firestore database
       *
       * Virtual Card initial setup right after user created an account
       */

      await setDoc(
        doc(db, `${config.USER}${user?.user?.uid}${config.PAYMENT}`),
        {
          uid: user?.user.uid,
          cardNumber: "0000000000000000",
          cardHolder: values?.fullname.trim(),
          cardType: ["VISA", "Master Card", "AMEX"],
          defaultCard: "VISA",
          color: ["fill-neutral-800", "fill-amber-800", "fill-slate-700"],
          bank: "Development Bank of the Philippines",
        }
      );

      navigate("/success");
    } catch (error: any) {
      console.log(error.code);
    }

    setStepper(
      (prev: any) =>
        (prev = {
          step: 1,
          email: "",
          username: "",
          fullname: "",
          password: "",
          confirm_password: "",
        })
    );
  };

  let navigate = useNavigate();

  return (
    <>
      <Form>
        <div className="h-3 ">
          <p className="text-rose-300/70 text-[0.68em] ">
            {error?.password && error?.password}
          </p>
        </div>
        <Input
          type={"password"}
          name="password"
          placeholder={"Password"}
          defaultValue={values.password}
          autoFocus
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          className={
            error?.password
              ? "border-rose-500/30"
              : passLength || passNotLower || passNotUpper || passNotNumber
              ? "border-gray-400/30"
              : "border-emerald-600/30"
          }
          onChange={(e: any) => {
            setError((prev) => (prev = { ...prev, password: null }));
            handleChange("password")(e);
          }}
        />
        <div className="h-3 ">
          <p className="text-rose-300/70 text-[0.68em] ">
            {error?.confirm_password && error?.confirm_password}
          </p>
        </div>
        <Input
          type={"password"}
          name="confirm-password"
          placeholder={"Confirm Password"}
          defaultValue={values.confirm_password}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          className={
            error?.confirm_password
              ? "border-rose-400/30"
              : passNotMatch
              ? "border-gray-400/30"
              : "border-emerald-600/30"
          }
          onChange={(e: any) => {
            setError((prev) => (prev = { ...prev, confirm_password: null }));
            handleChange!("confirm_password")(e);
          }}
        />
        <PasswordRequirementInfo
          passLength={values?.password.length < 9}
          passLowerCase={!values?.password.match(lowerCaseLetters)}
          passUpperCase={!values?.password.match(upperCaseLetters)}
          passNumber={!values?.password.match(number)}
          passNotMatch={values?.password !== values?.confirm_password}
        />
        <div className="flex flex-row-reverse items-center justify-between my-2 text-xs">
          <button
            className="flex items-center gap-2 px-4 py-2 my-2 text-gray-200 bg-gray-600 rounded-md focus:outline focus:outline-1 focus:outline-offset-2 hover:bg-gray-500"
            onClick={Continue}
          >
            Complete Setup <ArrowNarrowRightIcon className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 my-2 border border-transparent rounded-md text-gray-500/70 bg-gray-200/40 hover:bg-gray-100 hover:border-gray-400"
            onClick={Previous}
          >
            <ArrowNarrowLeftIcon className="w-5" /> Back
          </button>
        </div>
      </Form>
      <AdvisorySecurity />
    </>
  );
}

export default SecurityDetails;
