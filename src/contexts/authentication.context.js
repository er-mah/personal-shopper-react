import {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../config/firebase.js';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

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
    async function signUp(email, password, setError) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setCurrentUser(userCredential)
            }).catch((error) => {
                setError(error.message)
            })
    }

    // Log user in with credentials
    async function signIn(email, password, setError) {
        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setCurrentUser(userCredential)
            }).catch((error) => {
                setError(error.message)
            })
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

    const exportToContext = {
        currentUser,
        signUp,
        signIn
    }

    return (
        <AuthContext.Provider value={exportToContext}>
            {/* If it is not loading, we render the children */}
            {children}
        </AuthContext.Provider>
    );
};