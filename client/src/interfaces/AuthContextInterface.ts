import { User as fUser } from '@firebase/auth-types';

export interface AuthContextType {
  currentUser: fUser | null | undefined;
  // sendVerification: (email:string) => Promise<void>,
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}