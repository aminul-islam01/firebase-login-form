import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';

const auth = getAuth(app)
export const UserContext = createContext(null);

const AuthProviders = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    const emailVerified = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const proFileUpdate = (loggedUser, name, photo) => {
        updateProfile(loggedUser, {
          displayName: name,
          photoURL: photo,
        })
          .then((result) => {
            console.log("profile updated");
          })
          .catch((error) => {
            console.log(error.message);
          });
      };

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
              setUser(user);
              setLoading(false)
          });
          return () => {
            return unsubscribe();
          }

    }, [])
    // console.log(user)
    const userInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        logOut,
        loading,
        emailVerified,
        proFileUpdate
    }

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthProviders;