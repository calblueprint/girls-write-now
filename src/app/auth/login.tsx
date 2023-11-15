import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, Alert, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import validator from 'validator';

import StyledButton from '../../components/StyledButton';
import UserStringInput from '../../components/UserStringInput';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import supabase from '../../utils/supabase';

function LoginScreen() {
  const sessionHandler = useSession();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTextHidden, setPasswordTextHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetAndPushToRouter = (path: string) => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace(path);
  };

  const signIn = async () => {
    setLoading(true);
    let email;
    if (validator.isEmail(emailOrUsername)) {
      email = emailOrUsername;
    } else {
      const { data, error } = await supabase
        .from('profiles')
        .select(`email`)
        .limit(1)
        .eq('username', emailOrUsername);

      if (data && data?.length > 0 && !error) {
        email = data[0].email;
      } else {
        Alert.alert(`Username "${emailOrUsername}" does not exist`);
        setLoading(false);
        return;
      }
    }

    const { error } = await sessionHandler.signInWithEmail(email, password);
    if (error) Alert.alert(error.message);
    else resetAndPushToRouter('/home');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.h4, globalStyles.mt20]}>
        Read stories from young creators
      </Text>

      <UserStringInput
        placeholder="Email or Username"
        onChange={setEmailOrUsername}
        value={emailOrUsername}
        attributes={{
          textContentType: 'emailAddress',
        }}
      />
      <UserStringInput
        placeholder="Password"
        onChange={setPassword}
        value={password}
        attributes={{
          textContentType: 'password',
          secureTextEntry: passwordTextHidden,
        }}
      />
      <Link style={styles.forgotPassword} href="/auth/forgotPassword">
        Forgot password?
      </Link>
      <View style={styles.justifyBottom}>
        <StyledButton
          text="Log In"
          disabled={loading || emailOrUsername == '' || password == ''}
          onPress={signIn}
        />
        <Link href="/auth/signup">Don&apos;t have an account? Sign Up</Link>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 63,
    paddingLeft: 43,
    paddingRight: 44,
    flex: 1,
    flexDirection: 'column',
  },
  forgotPassword: {
    fontSize: 12,
    textDecorationLine: 'underline',
    paddingTop: 18,
    paddingBottom: 16,
    fontWeight: '400',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  justifyBottom: {
    justifyContent: 'flex-end',
  },
  logIn: {},
});
