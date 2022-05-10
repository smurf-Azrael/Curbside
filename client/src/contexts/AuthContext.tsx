import { createContext, useState, useContext, useEffect } from "react";
import { User as fUser } from '@firebase/auth-types';
import { auth } from '../firebase';
import { AuthContextType } from '../interfaces/AuthContextInterface';
import { sendEmailVerification } from 'firebase/auth';

const AuthContext = createContext<any | undefined>(undefined);
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: any }) {

  const [currentUser, setCurrentUser] = useState<fUser | null>(); // React.useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [userFirebase, setUserFirebase] = useState<any>();

  // function setAsyncState(newState: any):Promise<void> {
  //   return new Promise((resolve) => {console.log('inPromise'); return setUserFirebase(newState)})
  // }


  async function signUp(email: string, password: string): Promise<any> {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    // setUserFirebase(userCredential);

    //console.log('signUp / pre setstate')
    // setAsyncState(userCredential)
    //   .then(() => {console.log('userFirebase', userFirebase); sendVerificationAgain()})
    //   .catch(e => console.log('error in promise', e))
    (async () => new Promise(resolve => setUserFirebase(userCredential)))()
      .then(() => {console.log('userFirebase', userFirebase); sendVerificationAgain()})

    console.log('signUp / post setstate')
    // await sendVerificationAgain();

    return userCredential;
  }
  
  async function sendVerificationAgain(): Promise<any> {
    console.log('sendVerificationAgain')
    console.log(userFirebase)
    console.log(userFirebase.user)
    if (userFirebase.user) {
      await sendEmailVerification(userFirebase.user)
        .then(() => console.log('email sent'))
        .catch(e => console.log('email not sent', e))
    }
  }

  async function logIn(email: string, password: string): Promise<any> {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    setUserFirebase(userCredential);
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

  const value: AuthContextType = {
    currentUser,
    sendVerificationAgain,
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
