import React, { useEffect, useState } from 'react';
import { Redirect, Link, router } from 'expo-router';
import { Alert, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSession } from '../../utils/AuthContext';
import globalStyles from '../../styles/globalStyles';

function SignUpScreen() {
  const { session, signUp } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) {
    return <Redirect href="/home" />;
  }

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) Alert.alert(error.message);
    else router.replace('/auth/verify');

    setLoading(false);
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
            disabled={loading}
            onPress={signUpWithEmail}
          />
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;
