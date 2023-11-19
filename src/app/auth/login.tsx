import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

function LoginScreen() {
  const { dispatch, isLoading, session, error } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetAndPushToRouter = (path: string) => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace(path);
  };

  const signInWithEmail = async () => {
    dispatch({ type: 'SIGN_IN_WITH_EMAIL', email, password });
  };

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    console.log(session);
    if (session) {
      resetAndPushToRouter('/home');
    }
  }, [session]);

  return (
    <View style={globalStyles.auth_container}>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={globalStyles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <Link href="/auth/forgotPassword">Forgot password?</Link>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Log In" disabled={isLoading} onPress={signInWithEmail} />
      </View>
      <Link href="/auth/signup">Don&apos;t have an account? Sign Up</Link>
    </View>
  );
}

export default LoginScreen;
