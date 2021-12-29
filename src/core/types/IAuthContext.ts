import { IUser } from './IUser.model';

import { firebase } from '@services/Firebase';
import { Dispatch, SetStateAction } from 'react';

export interface IAuthContextType {
  isLogged: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user: IUser | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  createUserWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}
