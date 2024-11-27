'use client';

import { createUser, getUserData, signIn, signOut } from '@/services/user';
import { UserInterface } from '@/types/user.interface';
import { getCookie } from 'cookies-next';

import { ReactNode, createContext, useEffect, useState } from 'react';

export interface AuthContextProps {
  user: UserInterface | undefined;
  makeSignUp: (signupFields: UserInterface) => Promise<void>;
  makeSignIn: (email: string, password: string) => Promise<void>;
  makeSignOut: () => Promise<void>;
}
export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | undefined>();

  useEffect(() => {
    const tokenExists = getCookie('auth-token');
    if (!user && tokenExists) {
      const userId = getCookie('user-id');
      (async () => {
        try {
          const user = await getUserData(String(userId));
          setUser(user);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [user]);

  const makeSignUp = async (signupFields: UserInterface) => {
    try {
      const userData = await createUser(signupFields);
      setUser(userData);
    } catch (e) {
      console.log(e);
    }
  };

  const makeSignIn = async (email: string, password: string) => {
    try {
      const userData = await signIn(email, password);
      setUser(userData);
    } catch (e) {
      console.log(e);
    }
  };

  const makeSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, makeSignUp, makeSignIn, makeSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
