import { ExclamationCircleIcon } from "@heroicons/react/outline";

function AdvisorySecurity() {
  return (
    <div className="px-2 py-4 space-y-2 text-xs text-gray-400 rounded-md bg-gradient-to-br from-gray-700 to-neutral-800 drop-shadow-md">
      <div className="flex gap-2 ">
        <div>
          <ExclamationCircleIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="mb-1">Data Privacy</h3>
          <p className="text-[0.8em] text-gray-400/40 leading-3 mb-3">
            We (the developer) will not collect sensitive information you will
            enter on above section (security section). The password you will
            enter on above field will fetch directly to google authentication
            provider <b>(Firebase Auth)</b>. We don't have full control over
            with the password of those credentials as those are managed by
            google authentication through firebase auth provider which secured
            by hash map and salting security.{" "}
            <span className="italic underline">See terms and conditions</span>
          </p>
          <label
            htmlFor="terms-and-conditions"
            className="flex items-center text-[0.7em] gap-2  text-gray-400/40"
          >
            <input
              type="checkbox"
              name="terms-and-conditions"
              id="terms-and-conditions"
              defaultChecked
              className="fill-slate-400 "
            />
            <p>
              I agree with{" "}
              <span className="underline ">terms and conditions</span>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdvisorySecurity;
