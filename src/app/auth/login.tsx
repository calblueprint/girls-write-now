import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { useSession } from '../../utils/AuthContext';
import { Button, Input } from 'react-native-elements';
import { Link } from 'expo-router';

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

function LoginScreen() {
  const sessionHandler = useSession();

  if (sessionHandler.session) {
    return <Redirect href={'/home'} />;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await sessionHandler.signInWithEmail(email, password);

    if (error) Alert.alert(error.message);
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

      <Link href={'/auth/signup'}>Don't have an account? Sign up</Link>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
      </View>
    </View>
  );
}

export default LoginScreen;
