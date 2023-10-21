import { AuthResponse, Session, User } from '@supabase/supabase-js';
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
  user: User | null;
  signIn: (newSession: Session | null) => void;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  verifyEmail: (email: string, token: string) => Promise<AuthResponse>;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
    });

    supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
    });
  }, []);

  useEffect(() => {
    console.log(`User updated: ${JSON.stringify(user)}`);
  }, [user]);

  const signIn = (newSession: Session | null) => {
    setSession(newSession);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const value = await supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger the use effect to update the session

    setUser(value.data.user);
    return value;
  };

  const signUp = async (email: string, password: string) => {
    const value = await supabase.auth.signUp({
      email,
      password,
    }); // will trigger the use effect to update the session

    console.log(value);
    setUser(value.data.user);
    return value;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const verifyEmail = async (email: string, token: string) => {
    const value = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    setUser(value.data.user);
    return value;
  };

  const authContextValue = useMemo(
    () => ({
      user,
      session,
      signUp,
      signIn,
      signInWithEmail,
      signOut,
      verifyEmail,
    }),
    [session, user],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
