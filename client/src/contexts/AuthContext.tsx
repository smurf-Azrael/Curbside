import { createContext, useState, useContext, useEffect } from "react";
import { auth } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContextType, User } from '../interfaces/AuthContextInterface';
import { useApi } from "./ApiProvider";
// import { sendEmailVerification } from 'firebase/auth';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: any }) {

  const api = useApi();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function signUp(email: string, password: string): Promise<any> {
    try {
      const fUser = await auth.createUserWithEmailAndPassword(email, password);
      //@ts-ignore
      const userData = fUser.user.multiFactor.user
      if (!userData) { throw new Error('Something went wrong.') }
      const body = {
        id: userData.uid,
        email: userData.email,
        emailVerified: true
      }
      const res = await api.post('/users', body);
      const user = {
        id: userData.uid,
        email: email
      }
      setCurrentUser(user);

      return { ok: res.ok, id: userData.uid }

    } catch (error) {
      return {
        ok: false,
        error: error
      }
    }
  }
  //! Verify email later
  // async function sendVerification(firebaseUser: any): Promise<any> {
  //   console.log('sendVerificationAgain')
  //   console.log(firebaseUser)
  //   console.log(firebaseUser.user)
  //   if (firebaseUser!.user) {
  //     await sendEmailVerification(firebaseUser.user)
  //       .then(() => console.log('email sent'))
  //       .catch(e => console.log('email not sent', e))
  //   }
  // }

  async function logIn(email: string, password: string): Promise<any> {
    try {
      const fUser = await auth.signInWithEmailAndPassword(email, password);
      //@ts-ignore
      const userData = fUser.user.multiFactor.user
      if (!userData) { throw new Error('Something went wrong.') }
      const user = {
        id: userData.uid,
        email: email
      }
      setCurrentUser(user);
      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        error: error
      }
    }
  }

  async function logOut() {
    await auth.signOut();
    setCurrentUser(null);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async () => {
      const res = await api.get('/login');
      if (res.ok){
        setCurrentUser(res.body.data.user)
      } else {
        console.log('no dice')
      }
    })
  }, [api])

  const value: AuthContextType = {
    currentUser,
    setCurrentUser,
    auth,
    // sendVerification,
    signUp,
    logIn,
    logOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
