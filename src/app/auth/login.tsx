import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import { signInWithEmail } from '../../queries/auth';

function LoginScreen() {
  const { dispatch, isLoading } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetAndPushToRouter = (path: string) => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace(path);
  };

  const signIn = async () => {
    const { error } = await signInWithEmail(dispatch, email, password);

    if (error) Alert.alert(error.message);
    else resetAndPushToRouter('/home');
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
      </View>
      <Link href="/auth/forgotPassword">Forgot password?</Link>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Log In" disabled={isLoading} onPress={signIn} />
      </View>
      <Link href="/auth/signup">Don&apos;t have an account? Sign Up</Link>
    </View>
  );
}

export default LoginScreen;
