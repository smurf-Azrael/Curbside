// @ts-nocheck
import { createContext, useState, useContext, useEffect } from "react";
import { User as fUser } from '@firebase/auth-types';
import { auth } from '../firebase';

interface AuthContextType {
  currentUser: fUser | null | undefined;
  // currentMongoUser: User | null | undefined;
  // setCurrentMongoUser: Dispatch<SetStateAction<User | null | undefined>>;
  // userSigningUp: fUser | null | undefined;
  signUp: (email: string, password: string) => Promise<void>;
  // signIn: (email: string, password: string, cb: VoidFunction) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  // loading: boolean;
}


const AuthContext = createContext<any | undefined >(undefined);
// const AuthContext = React.createContext<AuthContextType | undefined >();

export function useAuth() {
  return useContext(AuthContext);
}


export default function AuthProvider({ children }: {children: any}) {

  const [currentUser, setCurrentUser ] = useState<fUser | null>(); // React.useState<string | undefined>(undefined);
  const [userSigningUp, setUserSigningUp] = useState<fUser | null>();

  async function signUp(email: string, password: string): any {
    const userCredential = auth.createUserWithEmailAndPassword( email, password);
    setUserSigningUp(userCredential.user);
  }

  async function signIn(email: string, password: string): any {
    await auth.signInWithEmailAndPassword(email, password);
  }

  async function logOut() {
    await auth.signOut();
    localStorage.removeItem('user');
    setCurrentUser(null);
  };



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // setCurrentUser(user);

    })
    return unsubscribe
  }, [])

  const value: any = {
    currentUser,
      signUp,
      signIn,
      logOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
