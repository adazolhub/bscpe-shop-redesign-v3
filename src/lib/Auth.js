import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '../auth/firebase'
import {
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN UP)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //EMAIL AND PASSWORD FIREBASE AUTH PROVIDER (SIGN IN)
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //LOGOUT FIREBASE AUTH
    const logout = () => {
        return signOut(auth);
    }

    //FIREBASE CURRENT LOGGED USER OBSERVER
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return () => {
            unsubscribe()
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                createUser,
                logout,
                signin
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () => {
    return useContext(AuthContext)
}