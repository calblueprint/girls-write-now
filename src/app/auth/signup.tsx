import React, { useState } from 'react';
import { Redirect, Link } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
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
  const sessionHandler = useSession();

  if (sessionHandler.session) {
    return <Redirect href={'/home'} />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await sessionHandler.signUp(email, password);

    if (error) Alert.alert(error.message);
    else
      Alert.alert(
        'Please follow the instructions in your email to verify your account',
      );
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
        <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </View>
  );
}

export default SignUpScreen;
