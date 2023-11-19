import { UserAttributes } from '@supabase/supabase-js';
import supabase from '../utils/supabase';
import { AuthDispatch, useAuthReducer } from '../utils/AuthContext';

export const signInWithEmail = async (
  dispatch: AuthDispatch,
  email: string,
  password: string,
) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  dispatch({ type: 'SIGN_IN_WITH_EMAIL' });
  return value;
};

export const signUp = async (
  dispatch: AuthDispatch,
  email: string,
  password: string,
) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.signUp({
    email,
    password,
  });
  dispatch({ type: 'SIGN_UP' });

  return value;
};

export const signOut = async (dispatch: AuthDispatch) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.signOut();
  dispatch({ type: 'SIGN_OUT' });

  return value;
};

export const verifyOtp = async (
  dispatch: AuthDispatch,
  email: string,
  token: string,
) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });
  dispatch({ type: 'VERIFY_OTP' });

  return value;
};

export const resendVerification = async (
  dispatch: AuthDispatch,
  email: string,
) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  dispatch({ type: 'VERIFY_OTP' });

  return value;
};

export const resetPassword = async (dispatch: AuthDispatch, email: string) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.resetPasswordForEmail(email);
  dispatch({ type: 'RESET_PASSWORD' });

  return value;
};

export const updateUser = async (
  dispatch: AuthDispatch,
  attributes: UserAttributes,
) => {
  dispatch({ type: 'LOADING' });
  const value = await supabase.auth.updateUser(attributes);
  dispatch({ type: 'UPDATE_USER', user: value.data?.user });

  return value;
};
