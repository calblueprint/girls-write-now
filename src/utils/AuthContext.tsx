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
  | {
      type: 'SIGN_UP';
      email: string;
      password: string;
      error?: AuthError | null;
    }
  | {
      type: 'SIGN_IN_WITH_EMAIL';
      email: string;
      password: string;
      error?: AuthError | null;
    }
  | {
      type: 'VERIFY_OTP';
      email: string;
      token: string;
      error?: AuthError | null;
    }
  | { type: 'RESEND_VERIFICATION'; email: string; error?: AuthError | null }
  | { type: 'RESET_PASSWORD'; email: string; error?: AuthError | null }
  | {
      type: 'REFRESH_SESSION';
      session: Session | null;
      error?: AuthError | null;
    }
  | {
      type: 'UPDATE_USER';
      attributes: UserAttributes;
      error?: AuthError | null;
    }
  | { type: 'SIGN_OUT'; error?: AuthError | null };

export type AuthDispatch = React.Dispatch<AuthContextAction>;

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
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
            error: action.error ?? null,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            user: null,
            session: null,
            isLoading: false,
            error: action.error ?? null,
          };
        case 'REFRESH_SESSION':
          return {
            ...prevState,
            session: action.session,
            user: action.session ? action.session?.user : null,
            isLoading: false,
            error: action.error ?? null,
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
      error: null,
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

  function dispatchMiddleware(dispatch: AuthDispatch) {
    return (action: AuthContextAction) => {
      dispatch({ type: 'LOADING' });
      switch (action.type) {
        case 'SIGN_UP':
          signUp(action.email, action.password).then(({ error }) =>
            dispatch({ ...action, error }),
          );
          break;
        case 'SIGN_IN_WITH_EMAIL':
          signInWithEmail(action.email, action.password).then(({ error }) =>
            dispatch({ ...action, error }),
          );
          break;
        case 'VERIFY_OTP':
          verifyOtp(action.email, action.token).then(({ error }) =>
            dispatch({ ...action, error }),
          );
          break;
        case 'RESEND_VERIFICATION':
          resendVerification(action.email).then(({ error }) =>
            dispatch({ ...action, error }),
          );
          break;
        case 'RESET_PASSWORD':
          resetPassword(action.email).then(({ error }) =>
            dispatch({ ...action, error }),
          );
          break;
        case 'UPDATE_USER':
          updateUser(action.attributes).then(({ error }) =>
            dispatch({ ...action, error }),
          );
          break;
        case 'SIGN_OUT':
          signOut().then(({ error }) => dispatch({ ...action, error }));
          break;
        case 'REFRESH_SESSION':
        case 'CLEAR_ERROR':
        default:
          return dispatch(action);
      }
    };
  }

  const signInWithEmail = async (email: string, password: string) =>
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  const signUp = async (email: string, password: string) => {
    const value = await supabase.auth.signUp({
      email,
      password,
    });
    console.log(value);

    return value;
  };

  const signOut = async () => await supabase.auth.signOut();

  const verifyOtp = async (email: string, token: string) =>
    await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

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
      ...authState,
      dispatch: dispatchMiddleware(dispatch),
    }),
    [authState],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
