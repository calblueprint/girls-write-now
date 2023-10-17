import { AuthResponse, Session } from '@supabase/supabase-js';
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
  emailVerified: boolean;
  signIn: (newSession: Session | null) => void;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
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
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
    });

    supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(
        `Auth state change:  ${JSON.stringify({ event, newSession })}`,
      );
      if (event == 'INITIAL_SESSION') {
        setEmailVerified(true);
      }
      setSession(newSession);
    });
  }, []);

  const signIn = (newSession: Session | null) => {
    setSession(newSession);
  };

  const signInWithEmail = async (email: string, password: string) =>
    supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger the use effect to update the session

  const signUp = async (email: string, password: string) =>
    supabase.auth.signUp({
      email,
      password,
    }); // will trigger the use effect to update the session

  const signOut = () => {
    supabase.auth.signOut();
    setSession(null);
  };

  const authContextValue = useMemo(
    () => ({
      session,
      emailVerified,
      signUp,
      signIn,
      signInWithEmail,
      signOut,
    }),
    [session],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
