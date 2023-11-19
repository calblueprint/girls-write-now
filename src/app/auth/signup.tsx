import { Redirect, Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

function SignUpScreen() {
  const { session, dispatch, isLoading, error } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const attemptedSignUp = useRef(false);

  if (session) {
    return <Redirect href="/home" />;
  }

  const signUpWithEmail = async () => {
    dispatch({ type: 'SIGN_UP', email, password });
    attemptedSignUp.current = true;
  };

  useEffect(() => {
    if (!attemptedSignUp.current) return;

    if (error) Alert.alert(error.message);
    else router.replace('/auth/verify');
  }, [error]);

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

        <Link href="/auth/login">Already have an account? Log In</Link>
        <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
          <Button
            title="Sign Up"
            disabled={isLoading}
            onPress={signUpWithEmail}
          />
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;
