import { BadgeCheckIcon } from "@heroicons/react/solid";

function PasswordRequirementInfo({
  passLength,
  passLowerCase,
  passUpperCase,
  passNumber,
  passNotMatch,
}: {
  passLength: boolean;
  passLowerCase: boolean;
  passUpperCase: boolean;
  passNumber: boolean;
  passNotMatch: boolean;
}) {
  return (
    <>
      <div className="px-4 py-2 text-[0.62em] border border-gray-300 border-dashed rounded-md text-gray-400 w-full mt-4">
        <h3>Password requirement</h3>
        <div className="text-[0.9em] text-black/60 px-2 font-light mt-1">
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              className={[
                "w-3",
                passLowerCase ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain lowercase/small characters</p>
          </div>
          <div className="flex items-center gap-2 leading-3">
            <BadgeCheckIcon
              className={[
                "w-3",
                passUpperCase ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain uppercase/capital characters</p>
          </div>
          <div className="flex items-center gap-2 leading-3">
            <BadgeCheckIcon
              className={[
                "w-3",
                passNumber ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain at least 1 numeric value</p>
          </div>
          <div className="flex items-center gap-2 leading-3">
            <BadgeCheckIcon
              className={[
                "w-3",
                passLength ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain at least 8 or more characters</p>
          </div>
          <div className="flex items-center gap-2 leading-3">
            <BadgeCheckIcon
              className={[
                "w-3",
                passNotMatch ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Password match</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordRequirementInfo;
