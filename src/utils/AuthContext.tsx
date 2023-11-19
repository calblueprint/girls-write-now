import {
  AuthError,
  Session,
  User,
  UserAttributes,
} from '@supabase/supabase-js';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import supabase from './supabase';

type AuthContextAction =
  | { type: 'LOADING' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SIGN_UP' }
  | { type: 'SIGN_IN_WITH_EMAIL' }
  | { type: 'VERIFY_OTP' }
  | { type: 'RESEND_VERIFICATION' }
  | { type: 'RESET_PASSWORD' }
  | { type: 'REFRESH_SESSION'; session: Session | null }
  | { type: 'UPDATE_USER'; user: User | null }
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
        case 'UPDATE_USER':
          return {
            ...prevState,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            user: null,
            session: null,
            isLoading: false,
          };
        case 'REFRESH_SESSION':
          return {
            ...prevState,
            session: action.session,
            user: action.session ? action.session?.user : null,
            isLoading: false,
          };
        case 'LOADING':
          console.log('loading');
          return { ...prevState, isLoading: true };
        case 'CLEAR_ERROR':
          return { ...prevState, error: null };
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

  useEffect(() => {
    console.log(`New auth session: ${JSON.stringify(authState)}`);
  }, [authState]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      dispatch({ type: 'REFRESH_SESSION', session: newSession });
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      dispatch({ type: 'REFRESH_SESSION', session: newSession });
    });
  }, []);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      dispatch,
    }),
    [authState],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
