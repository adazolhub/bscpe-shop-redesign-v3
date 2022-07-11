import { UserAuth } from "../../lib/Auth";

const User = () => {
  const { currentUser } = UserAuth();

  return (
    <>
      <div>
        <div className="flex gap-2">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/bscpe-store-v2.appspot.com/o/profile%2Fdefault_profile.png?alt=media&token=60bbf95e-c1ad-4fb5-80a4-c81c07558fa4"
            alt=""
            className="w-10 h-10 border-2 border-gray-100 rounded-full"
          />
          <div>
            <p className="text-[0.65em] leading-snug font-thin text-gray-400">
              Good morning
            </p>
            <p className="font-medium text-gray-500">
              {currentUser?.displayName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
