import {
  AuthError,
  AuthResponse,
  Session,
  User,
  UserAttributes,
  UserResponse,
} from '@supabase/supabase-js';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import supabase from './supabase';

export interface AuthState {
  session: Session | null;
  guest: boolean; // apple wants us to allow users to use the app without an account
  proceedAsGuest: () => void;
  user: User | null;
  isLoading: boolean;
  signIn: (newSession: Session | null) => void;
  signUp: (
    email: string,
    password: string,
    options: object,
  ) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  verifyOtp: (email: string, token: string) => Promise<AuthResponse>;
  resendVerification: (email: string) => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<
    | {
        data: object;
        error: null;
      }
    | {
        data: null;
        error: AuthError;
      }
  >;
  updateUser: (attributes: UserAttributes) => Promise<UserResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthState);

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error(
        'useSession must be wrapped in a <AuthContextProvider />',
      );
    }
  }

  return value;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [guest, setGuest] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: newSession } }) => {
        setSession(newSession);
        setUser(newSession ? newSession.user : null);
        if (newSession) {
          setGuest(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        setGuest(false);
      }
    });
  }, []);

  const signIn = (newSession: Session | null) => {
    setSession(newSession);
  };

  const proceedAsGuest = async () => {
    setGuest(true);
    setSession(null);
    setUser(null);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const value = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger the use effect to update the session

    setUser(value.data.user);
    if (value.data.user) setGuest(false);
    return value;
  };

  const signUp = async (email: string, password: string, metaData: object) => {
    const value = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...metaData,
        },
      },
    });

    setUser(value.data.user);
    if (value.data.user) setGuest(false);
    return value;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setGuest(false);
  };

  const verifyOtp = async (email: string, token: string) => {
    const value = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    // if (value.data.user) setUser(value.data.user);
    return value;
  };

  const resendVerification = async (email: string) =>
    await supabase.auth.resend({
      type: 'signup',
      email,
    });

  const resetPassword = async (email: string) =>
    await supabase.auth.resetPasswordForEmail(email);

  const updateUser = async (attributes: UserAttributes) =>
    await supabase.auth.updateUser(attributes);

  const authContextValue = useMemo(
    () => ({
      user,
      guest,
      session,
      isLoading,
      signUp,
      signIn,
      signInWithEmail,
      signOut,
      verifyOtp,
      proceedAsGuest,
      updateUser,
      resetPassword,
      resendVerification,
    }),
    [session, user, isLoading, guest],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
