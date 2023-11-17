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
  useReducer,
  useState,
} from 'react';

import supabase from './supabase';

type AuthContextAction =
  | { type: 'LOADING' }
  | { type: 'SIGN_UP'; email: string; password: string }
  | { type: 'SIGN_IN_WITH_EMAIL'; email: string; password: string }
  | { type: 'VERIFY_OTP'; email: string; token: string }
  | { type: 'RESEND_VERIFICATION'; email: string }
  | { type: 'RESET_PASSWORD'; email: string }
  | { type: 'UPDATE_USER'; attributes: UserAttributes }
  | { type: 'SIGN_OUT' };

export type AuthDispatch = React.Dispatch<AuthContextAction>;

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  dispatch: AuthDispatch;
}

const AuthContext = createContext({} as AuthState);

export const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case 'SIGN_UP':
        case 'SIGN_IN_WITH_EMAIL':
        case 'VERIFY_OTP':
        case 'RESEND_VERIFICATION':
        case 'RESET_PASSWORD':
          return { ...prevState, isLoading: false };
        case 'UPDATE_USER':
          return { ...prevState, isLoading: false };
        case 'SIGN_OUT':
          return { ...prevState, user: null, session: null, isLoading: false };
        case 'LOADING':
          return { ...prevState, isLoading: true };
        default:
          return prevState;
      }
    },
    {
      session: null,
      isLoading: false,
      user: null,
      dispatch: () => null,
    },
  );

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
  const [authState, dispatch] = useAuthReducer();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session: newSession } }) => {
        setSession(newSession);
        setUser(newSession ? newSession.user : null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
  }, []);

  function dispatchMiddleware(dispatch: AuthDispatch) {
    return (action: AuthContextAction) => {
      switch (action.type) {
        case 'SIGN_UP':
          signUp(action.email, action.password).then(() => dispatch(action));
          break;
        case 'SIGN_IN_WITH_EMAIL':
          signInWithEmail(action.email, action.password).then(() =>
            dispatch(action),
          );
          break;
        case 'VERIFY_OTP':
          verifyOtp(action.email, action.token).then(() => dispatch(action));
          break;
        case 'RESEND_VERIFICATION':
          resendVerification(action.email).then(() => dispatch(action));
          break;
        case 'RESET_PASSWORD':
          resetPassword(action.email).then(() => dispatch(action));
          break;
        case 'UPDATE_USER':
          updateUser(action.attributes).then(() => dispatch(action));
          break;
        case 'SIGN_OUT':
          signOut().then(() => dispatch(action));
          break;
        default:
          return dispatch(action);
      }
    };
  }

  const signInWithEmail = async (email: string, password: string) => {
    const value = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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

  const updateUser = async (attributes: UserAttributes) => {
    const {
      data: { user },
    } = await supabase.auth.updateUser(attributes);

    setUser(user);
  };

  const authContextValue = useMemo(
    () => ({
      user,
      session,
      isLoading,
      dispatch: dispatchMiddleware(dispatch),
    }),
    [session, user, isLoading],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
