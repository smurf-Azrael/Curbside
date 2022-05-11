import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { AuthContextType, User } from '../interfaces/AuthContextInterface';
import { useApi } from "./ApiProvider";
// import { sendEmailVerification } from 'firebase/auth';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: any }) {

  const api = useApi();
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function signUp(email: string, password: string): Promise<any> {
    try {
      const fUser = await auth.createUserWithEmailAndPassword(email, password); 
      //@ts-ignore
      const userData = fUser.user.multiFactor.user 
      if (!userData) { throw new Error('Something went wrong.') }
      const userToken = userData.accessToken;
      localStorage.setItem("userToken", userToken);
      const body = {
        id: userData.uid,
        email:userData.email,
        emailVerified: true
      }
      const res = await api.post('/users', body);
      const user = {
        id: userData.uid, 
        email: email
      }
      setCurrentUser(user);

      return { ok: res.ok }

    } catch (error) {
      return {
        ok: false,
        error:error
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
      const userToken = userData.accessToken;
      localStorage.setItem("userToken", userToken);
      const user = {
        id: userData.uid, 
        email: email
      }
      setCurrentUser(user);
      return {ok: true}
    } catch (error) {
      return {
        ok: false,
        error:error
      }
    }
  }

  async function logOut() {
    await auth.signOut();
    localStorage.removeItem('userToken');
    setCurrentUser(null);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const res = await api.get('/login');
      if (res.ok) {
        setCurrentUser(res.body.data.user);
      } 
    }
    verifyUser();
  }, [api, navigate])

  const value: AuthContextType = {
    currentUser,
    setCurrentUser,
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
