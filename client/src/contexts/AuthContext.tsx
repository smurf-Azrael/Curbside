// @ts-nocheck
import { createContext, useState, useContext, useEffect } from "react";
import { User as fUser } from '@firebase/auth-types';
import { auth } from '../firebase';

interface AuthContextType {
  currentUser: fUser | null | undefined;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}


const AuthContext = createContext<any | undefined >(undefined);
// const AuthContext = React.createContext<AuthContextType | undefined >();

export function useAuth() {
  return useContext(AuthContext);
}


export default function AuthProvider({ children }: {children: any}) {

  const [currentUser, setCurrentUser ] = useState<fUser | null>(); // React.useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string): any {
      const userCredential = await auth.createUserWithEmailAndPassword( email, password);
      return userCredential;
  }

  async function logIn(email: string, password: string): any {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return userCredential;
  }

  async function logOut() {
    await auth.signOut();
    localStorage.removeItem('userToken');
    setCurrentUser(null);
  };



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  }, [])

  const value: any = {
    currentUser,
      signUp,
      logIn,
      logOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
