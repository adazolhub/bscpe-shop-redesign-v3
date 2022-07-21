import { ExclamationCircleIcon } from "@heroicons/react/outline";

function Advisory() {
  return (
    <div className="flex gap-2 px-2 py-4 text-xs border border-dashed rounded-md text-black/80 bg-gradient-to-br from-white to-white/70 border-black/40">
      <div>
        <ExclamationCircleIcon className="w-4 h-4" />
      </div>
      <div>
        <h3 className="mb-1">Data Collection</h3>
        <p className="text-[0.8em] text-black/40 leading-3 mb-3">
          The information you may enter above will store to secured google
          firebase authentication and google firestore database to be able to
          fully utilize the functionally of the web app as their are users
          access control on some pages throughout this web application.{" "}
          <span className="underline underline-offset-2 text-black/40">
            See terms and conditions
          </span>
        </p>
        <label
          htmlFor="terms-and-conditions"
          className="flex items-center text-[0.75em] gap-2  text-black/40"
        >
          <input
            type="checkbox"
            name="terms-and-conditions"
            id="terms-and-conditions"
            defaultChecked
          />
          <p>
            I agre with{" "}
            <span className="underline underline-offset-2">
              terms and conditions
            </span>
          </p>
        </label>
      </div>
    </div>
  );
}

export default Advisory;
