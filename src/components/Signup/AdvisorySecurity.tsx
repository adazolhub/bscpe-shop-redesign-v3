import { ExclamationCircleIcon } from "@heroicons/react/outline";

function AdvisorySecurity() {
  return (
    <div className="px-2 py-4 space-y-2 text-xs border border-dashed rounded-md text-black/80 bg-gradient-to-br from-white to-white/80 border-black/30">
      <div className="flex gap-2 ">
        <div>
          <ExclamationCircleIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="mb-1">Data Privacy</h3>
          <p className="text-[0.8em] text-black/40 leading-3 mb-3">
            We (the developer) will not collect any sensitive information on
            above field (security section). The password you will enter above
            will fetch directly to google authentication provider{" "}
            <b>(Firebase Auth)</b>. We don't have full control over with those
            credentials as those are managed by google authentication through
            firebase auth provider which secured by hash map and salting
            security.{" "}
            <span className="underline underline-offset-2">
              See terms and conditions
            </span>
          </p>
          <label
            htmlFor="terms-and-conditions"
            className="flex items-center text-[0.7em] gap-2  text-black/40"
          >
            <input
              type="checkbox"
              name="terms-and-conditions"
              id="terms-and-conditions"
              defaultChecked
            />
            <p>
              I agree with{" "}
              <span className="underline underline-offset-2">
                terms and conditions
              </span>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdvisorySecurity;
