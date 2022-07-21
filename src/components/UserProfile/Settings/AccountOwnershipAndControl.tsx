import { FingerPrintIcon, TrashIcon } from "@heroicons/react/outline";

const AccountOwnershipAndControl = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-2 py-4">
        <ButtonWithIcon Icon={FingerPrintIcon}>Change password</ButtonWithIcon>
        <ButtonWithIconRed Icon={TrashIcon}>Delele account</ButtonWithIconRed>
      </div>
    </>
  );
};

function ButtonWithIcon({ children, Icon, ...props }: any) {
  return (
    <>
      <button
        className="flex items-center justify-between px-4 py-5 bg-white rounded-md shadow-sm hover:bg-gray-50 group"
        {...props}
      >
        <span className="inline-flex items-center gap-4">
          {Icon && (
            <Icon className="w-5 h-5 transition-all md:w-6 md:h-6 text-gray-400/70 group-hover:text-gray-400/50 group-hover:scale-95" />
          )}
          <p className="text-sm transition-all text-gray-500/90 group-hover:text-gray-500/50 md:text-base ">
            {children}
          </p>
        </span>
        {/* <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 text-gray-400/70" /> */}
      </button>
    </>
  );
}
function ButtonWithIconRed({ children, Icon, ...props }: any) {
  return (
    <>
      <button
        className="flex items-center justify-between px-4 py-5 border rounded-md shadow-sm bg-rose-50 hover:bg-rose-100 border-rose-300 group"
        {...props}
      >
        <span className="inline-flex items-center gap-4 ">
          {Icon && (
            <Icon className="w-5 h-5 transition-all md:w-6 md:h-6 text-rose-400/70 group-hover:text-rose-400/50 group-hover:scale-95" />
          )}
          <p className="text-sm transition-all text-rose-400/90 group-hover:text-rose-70 md:text-base ">
            {children}
          </p>
        </span>
        {/* <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 text-rose-400/70" /> */}
      </button>
    </>
  );
}

export default AccountOwnershipAndControl;
