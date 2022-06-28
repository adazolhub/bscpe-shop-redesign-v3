import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../lib/Auth";
import { fromUnixTime, formatDistanceToNow, formatRelative } from "date-fns";

const Profile = () => {
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full max-w-screen-sm px-4 mx-auto text-gray-600">
      <div className="grid place-items-center">
        <div className="w-32 h-32 overflow-hidden rounded-full pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
        </div>

        <h2>{currentUser?.displayName}</h2>
        <p className="text-xs">
          Account age:{" "}
          {formatDistanceToNow(
            fromUnixTime(currentUser?.metadata.createdAt / 1000)
          )}{" "}
          ago
        </p>
        <p className="text-xs">
          Last Sign in :{" "}
          {formatRelative(
            fromUnixTime(currentUser?.metadata.createdAt / 1000),
            new Date()
          )}
        </p>
      </div>

      <button className="btn-secondary"> Edit Profile</button>
      <button className="btn-secondary">Change Password</button>
      <button className="btn-secondary">Settings</button>
      <button onClick={handleLogout} className="btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Profile;
