import React, { useEffect, useState } from 'react';
import { Redirect, Link, router } from 'expo-router';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { useSession } from '../../utils/AuthContext';
import { Button, Input } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

function SignUpScreen() {
  const { session, emailVerified, signUp, signInWithEmail } = useSession();

  if (session) {
    return <Redirect href={'/home'} />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);

  useEffect(() => {
    console.log(`update to session: ${session}`);
    if (session) router.push('/home');
  }, [session]);

  useEffect(() => {
    console.log(`update to emailVerified: ${emailVerified}`);
    if (emailVerified) {
      signInWithEmail(email, password).catch(console.error);
    }
  }, [emailVerified]);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) Alert.alert(error.message);
    else {
      setVerifyingEmail(true);
      Alert.alert(
        'Please follow the instructions in your email to verify your account',
      );
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
      <Link href={'/auth/login'}>Already have an account? Log In</Link>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign Up" disabled={loading} onPress={signUpWithEmail} />
      </View>
      {verifyingEmail && <Text>Waiting for email to be verified...</Text>}
    </View>
  );
}

export default SignUpScreen;
