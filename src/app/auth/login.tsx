import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, Alert, View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import validator from 'validator';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import { TextInput } from 'react-native-paper';
import supabase from '../../utils/supabase';

function LoginScreen() {
  const sessionHandler = useSession();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={globalStyles.auth_container}>
      <Text style={[globalStyles.h3, globalStyles.mt20]}>
        Read stories from young creators
      </Text>

      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setEmailOrUsername(text)}
          value={emailOrUsername}
          style={styles.inputField}
          placeholder="Email or Username"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.inputField}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType={'password'}
        />
      </View>
      <Link href="/auth/forgotPassword">Forgot password?</Link>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Log In" disabled={loading} onPress={signIn} />
      </View>
      <Link href="/auth/signup">Don&apos;t have an account? Sign Up</Link>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'gray',
  },
});
