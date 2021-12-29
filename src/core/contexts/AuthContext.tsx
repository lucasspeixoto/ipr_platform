import { IUser } from '@core/types/IUser.model';
import { createContext, useState, useEffect } from 'react';

import { auth as fireauth, firebase, firestore } from '@services/Firebase';
import { IAuthContextType } from '@core/types/IAuthContext';

export const AuthContext = createContext({} as IAuthContextType);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  const setUserData = async (userId: string) => {
    const result = firestore.collection('users');
    const data = await result.get();
    setIsLogged(true);
    data.docs.forEach((item) => {
      const loggedUser = item.data().auth;

      if (loggedUser.userId === userId) {
        setUser(loggedUser);
        setIsLogged(true);
        setIsLoading(false);
      }
    });
  };

  //* Observar se houve alteração no estado de autenticação do usuário
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = fireauth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        setIsLogged(true);
        setIsLoading(false);
        const { uid } = loggedUser;
        setUserData(uid);
      } else {
        setIsLoading(false);
        setIsLogged(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [isLogged]);

  const registerUser = async (loggedUser: IUser) => {
    if (loggedUser) {
      const url = `users/${loggedUser.userId}`;
      const authRef = firestore.doc(url);
      const addAuth = { auth: { ...loggedUser } };
      await authRef.set(addAuth, { merge: true });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = fireauth.signInWithPopup(provider);

    result
      .then((data) => {
        if (data.user) {
          const { displayName, email, photoURL, uid } = data.user;

          const loggedUser: IUser = {
            userId: uid,
            name: displayName,
            email: email,
            photoUrl: photoURL
          };

          setUser(loggedUser);
          setIsLogged(true);
          registerUser(loggedUser);
        }
      })
      .catch(() => {
        setIsLogged(false);
        setIsLoading(false);
      });
  };

  const signInWithEmailAndPassword = (email: string, password: string) => {
    const result = fireauth.signInWithEmailAndPassword(email, password);
    return result;
  };

  const createUserWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    const result = fireauth.createUserWithEmailAndPassword(email, password);

    result
      .then((data) => {
        if (data.user) {
          data.user.sendEmailVerification();
          const { email, uid } = data.user;

          const loggedUser: IUser = {
            userId: uid,
            name: name,
            email: email,
            photoUrl: '',
            admin: false
          };

          setUser(loggedUser);
          setIsLogged(true);
          registerUser(loggedUser);
        }
      })
      .catch(() => {
        setIsLogged(false);
        setIsLoading(false);
      });
  };

  const sendPasswordResetEmail = (email: string) => {
    const result = fireauth.sendPasswordResetEmail(email);
    return result;
  };

  const logout = async () => {
    setIsLoading(true);
    await fireauth.signOut();
    setIsLogged(false);
    setIsLoading(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isLoading,
        setIsLoading,
        user,
        signInWithGoogle,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
