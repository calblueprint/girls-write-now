import { Redirect, Link, router } from 'expo-router';
import React, { useId, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import { TextInput } from 'react-native-paper';

function SignUpScreen() {
  const { session, signUp } = useSession();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
      <Text style={[globalStyles.h3, globalStyles.mt20]}>
        Read stories from young creators
      </Text>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.inputField}
          placeholder="Enter New Username"
          autoCapitalize="none"
        />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setFirstName(text)}
          value={firstName}
          style={styles.inputField}
          placeholder="First Name"
          autoCapitalize="none"
        />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setLastName(text)}
          value={lastName}
          style={styles.inputField}
          placeholder="Last Name"
          autoCapitalize="none"
        />
      </View>

      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.inputField}
          placeholder="Enter Email"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.inputField}
          placeholder="Enter Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType={'password'}
        />
      </View>

      <Link href="/auth/login">Already have an account? Log In</Link>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Sign Up" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </View>
  );
}

export default SignUpScreen;

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
