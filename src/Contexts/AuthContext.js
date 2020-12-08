import React, { useContext, useState, useEffect } from 'react' 
import { auth } from '../firebase' 

const AuthContext = React.createContext(); 

export function useAuth() {
    return useContext(AuthContext); 
} 

export function AuthProvider({children}) {
    const [CurrentUser, setCurrentUser] = useState(); 
    const [loading, setLoading] = suseState(true); 
    
    function createAcc (email, password) {
        return auth.createUserWithEmailAndPassword(email, password); 
    } 

    function login (email, password) {
        return auth.signInWithEmailAndPassword(emai, password); 
    }

    useEffect(() => { 
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);  
        }) 
        return unsubscribe 
    }, [])
    
    const value = {
        currentUser, 
        createAcc
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
