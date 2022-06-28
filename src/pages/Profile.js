
import Profile from "../components/UserProfile/Profile";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../lib/Auth";
const UserProfile = ({ user }) => {
    const { logout } = UserAuth();
    // if (!!user) return <Navigate to='/' replace />
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/')
            console.log('logged out')
        } catch (error) {
            console.log(error.code)
        }

    }

    return (
        <div className='w-full min-h-[calc(100vh-6rem)] mt-12'>
            <Profile />
        </div>
    );
}

export default UserProfile;
