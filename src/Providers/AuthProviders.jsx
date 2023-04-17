import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';

const auth = getAuth(app)
export const UserContext = createContext(null);

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const emailVerified = () => {
        return sendEmailVerification(auth.currentUser)
    }

    useEffect( () =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              setLoading(false)
            } else {
             setLoading(false)
            }
          });

    }, [])

    const userInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        logOut,
        loading,
        emailVerified
    }

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthProviders;