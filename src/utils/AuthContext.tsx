import { Session } from '@supabase/supabase-js';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import supabase from './supabase';

export interface AuthState {
  session: Session | null;
  isLoading: boolean;
}
enum AuthActionType {
  SIGN_IN,
  SIGN_OUT,
}
type AuthContextAction =
  | { type: AuthActionType.SIGN_IN; session: Session }
  | { type: AuthActionType.SIGN_OUT };

const AuthContext = createContext({} as AuthState);

const useAuthReducer = () =>
  useReducer(
    (prevState: AuthState, action: AuthContextAction) => {
      switch (action.type) {
        case AuthActionType.SIGN_IN:
          return {
            session: action.session,
            isLoading: false,
          };
        case AuthActionType.SIGN_OUT:
          return {
            session: null,
            isLoading: false,
          };
        default:
          return prevState;
      }
    },
    { session: null, isLoading: false },
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
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      if (newSession) {
        dispatch({ type: AuthActionType.SIGN_IN, session: newSession });
      }
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession) {
        dispatch({ type: AuthActionType.SIGN_IN, session: newSession });
      }
    });
  }, []);

  const authContextValue = useMemo(
    () => ({
      ...authState,
      dispatch,
    }),
    [authState, dispatch],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
