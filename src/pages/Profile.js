import Profile from "../components/UserProfile/Profile";;
const UserProfile = ({ user }) => {

  // if (!!user) return <Navigate to='/' replace />


  return (
    <div className="w-full min-h-[calc(100vh-12em)]">
      <Profile />
    </div>
  );
};

export default UserProfile;
