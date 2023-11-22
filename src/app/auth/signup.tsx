import { Redirect, Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import { signUp } from '../../queries/auth';

function SignUpScreen() {
  const { session, isLoading, dispatch } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    return <Redirect href="/home" />;
  }

  const signUpWithEmail = async () => {
    const { error } = await signUp(dispatch, email, password);

    if (error) Alert.alert(error.message);
    else router.replace('/auth/verify');
  };

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
