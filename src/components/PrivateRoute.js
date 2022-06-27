import { Navigate } from "react-router-dom"
import { UserAuth } from "../lib/Auth"



function PrivateRoute({ children }) {

    const { currentUser } = UserAuth()
    
    if (!currentUser) return <Navigate to='/' />
    return children
}

export default PrivateRoute