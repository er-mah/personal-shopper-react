import {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../config/firebase.js'

// Context
export const AuthContext = createContext({});

// Function that returns a context instance
export function useAuth() {
    return useContext(AuthContext);
}

// Provider
export const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)

    // Create a new user
    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        // We unsubscribe from the auth method when it's done loading the user
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
    }, []);


    // We share through the context the following items:
    // - The actual user
    // - The method that lets us create the user

    const value = {
        currentUser,
        signUp
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};