import Profile from "../components/UserProfile/Profile";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../lib/Auth";
const UserProfile = ({ user }) => {
  const { logout } = UserAuth();
  // if (!!user) return <Navigate to='/' replace />


  return (
    <div className="w-full min-h-[calc(100vh-12em)]">
      <Profile />
    </div>
  );
};

export default UserProfile;
