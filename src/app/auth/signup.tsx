import React, { useEffect, useState } from 'react';
import { Redirect, Link, router } from 'expo-router';
import { Alert, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSession } from '../../utils/AuthContext';
import styles from '../../styles/globalStyles';

function SignUpScreen() {
  const { session, signUp, signInWithEmail } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  if (session) {
    return <Redirect href="/home" />;
  }

  const signIn = async () => {
    setLoading(true);
    const { error } = await signInWithEmail(email, password);

    if (error) Alert.alert(error.message);
    else router.replace('/auth/onboarding');

    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) Alert.alert(error.message);
    else {
      Alert.alert(
        'Please follow the instructions in your email to verify your account, then login',
      );
      setSignedUp(true);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
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
      {signedUp ? (
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Log In" disabled={loading} onPress={signIn} />
        </View>
      ) : (
        <>
          <Link href="/auth/login">Already have an account? Log In</Link>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title="Sign Up"
              disabled={loading}
              onPress={signUpWithEmail}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default SignUpScreen;
