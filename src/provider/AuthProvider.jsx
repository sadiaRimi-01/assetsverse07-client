
import { createContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());
    const logout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        return signOut(auth);
    };

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser?.email) localStorage.setItem("userEmail", currentUser.email);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = { user, setUser, loading, createUser, loginUser, googleLogin, logout };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
