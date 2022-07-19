import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../auth/firebase";
import Form from "../UI/Forms/Form";
import Input from "../UI/Forms/Input";
import OptionalSignUp from "./OptionalSignUp";

interface Steps {
  nextStep?: any;
  prevStep?: any;
  handleChange: (type: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  values?: any;
}

function EmailDetails({ nextStep, prevStep, handleChange, values }: Steps) {
  // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let navigate = useNavigate();

  let [error, setError] = useState<string | null | HTMLElement | JSX.Element>(
    null
  );
  let Continue = (e: any) => {
    e.preventDefault();

    if (values?.email.length < 1)
      return setError(<>Email required to continue</>);
    if (!regex.test(values?.email))
      return setError("Invalid email format. Please try again");

    /**
     * Firebase auth to check if email is already registered
     */
    fetchSignInMethodsForEmail(auth, values?.email)
      .then((ifEmailExist) => {
        if (ifEmailExist.length > 0)
          return setError(
            <>
              Email already registered.{" "}
              <span
                className="underline text-gray-40 w-fit"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </>
          );
        setError(null);
        return nextStep!();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email")
          return setError("Invalid email format. Please try again");
      });
  };
  return (
    <>
      <Form>
        <div className="h-3">
          {error && (
            <p className="text-rose-300 text-[0.68em] ">{<>{error}</>}</p>
          )}
        </div>
        <Input
          type={"email"}
          name="email"
          placeholder={"Email"}
          defaultValue={values.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setError(null);
            handleChange("email")(e);
          }}
          className={error ? "border-rose-400/60" : "border-gray-400/30"}
        />
        <div
          className={
            "flex flex-row-reverse items-center justify-between text-xs"
          }
        >
          <button className="w-full btn-primary" onClick={Continue}>
            Create an account
          </button>
        </div>
      </Form>
      <OptionalSignUp />
    </>
  );
}

export default EmailDetails;
