import React from 'react'

import { createContext, useContext, useEffect, useState } from 'react'

import { app , db} from "./firebaseconfig";
import { getAuth } from 'firebase/auth';
import { addDoc, doc, collection } from 'firebase/firestore';

import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


// !creating context 
const AuthContext = createContext();

export const AuthContextProvider  = ({children}) => {
    let auth  = getAuth()

    // const collectionRef = collection(db, "users")

    const [user, setUser] = useState({})


    function signUp(email, password) {
            createUserWithEmailAndPassword(auth,email, password);
            addDoc(doc(db, 'users', email),{
                savedShows : []
            }
        )
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth,email, password ) 
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe()
        }
    });

  return (
    <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
        {children}
    </AuthContext.Provider>
  )
}

export function UserAuth(){
    return useContext(AuthContext)
}