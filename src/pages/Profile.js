
import { signOut } from "firebase/auth";
import { suspend } from "suspend-react";
import { auth } from "../auth/firebase";
import Profile from "../components/UserProfile/Profile";
import { getInitialAuthState } from "../lib/AuthState";
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
            <Profile />
            <Profile />
            <Profile />
            <button className="btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserProfile;
