import { Redirect, Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import validator from 'validator';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import supabase from '../../utils/supabase';
import UserStringInput from '../../components/UserStringInput';
import StyledButton from '../../components/StyledButton';

function SignUpScreen() {
  const { session, signUp } = useSession();

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const initialLoadEmail = useRef(true);
  const initialLoadUsername = useRef(true);
  const validUsernameCharacters = /^\w+$/g;

  const setAndCheckUsername = async (newUsername: string) => {
    setUsername(newUsername);
    const usernameCharactersValid =
      newUsername.length <= 12 &&
      newUsername.match(validUsernameCharacters) !== null;

    if (!usernameCharactersValid) {
      setUsernameError(
        'Usernames must be 12 characters or less and may contain letters, numbers, or underscores.',
      );
      return;
    }

    const { count } = await supabase
      .from('profiles')
      .select(`*`, { count: 'exact' })
      .limit(1)
      .eq('username', newUsername);
    const usernameIsTaken = (count ?? 0) >= 1;

    if (usernameIsTaken) {
      setUsernameError('That username is not available. Please try again.');
      return;
    }

    setUsernameError('');
  };

  const setAndCheckEmail = async (newEmail: string) => {
    setEmail(newEmail);
    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    const { count } = await supabase
      .from('profiles')
      .select(`*`, { count: 'exact' })
      .limit(1)
      .eq('email', email);
    const emailIsTaken = (count ?? 0) >= 1;

    if (emailIsTaken) {
      setEmailError('That email is not available. Please try again.');
      return;
    }

    setEmailError('');
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    if (usernameError) {
      Alert.alert('Invalid username');
      return;
    }

    const { error } = await signUp(email, password, {
      username,
      first_name: firstName,
      last_name: lastName,
    });

    if (error) Alert.alert(error.message);
    else router.replace('/auth/verify');

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.h4, globalStyles.mt20]}>
        Read stories from young creators
      </Text>

      <UserStringInput
        placeholder="Username"
        onChange={setAndCheckUsername}
        value={username}
        attributes={{}}
      >
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      </UserStringInput>

      <UserStringInput
        placeholder="First Name"
        onChange={setFirstName}
        value={firstName}
        attributes={{}}
      />
      <UserStringInput
        placeholder="Last Name"
        onChange={setLastName}
        value={lastName}
        attributes={{}}
      />
      <UserStringInput
        placeholder="Email"
        onChange={setAndCheckEmail}
        value={email}
        attributes={{
          textContentType: 'emailAddress',
        }}
      >
        {emailError && <Text style={styles.error}>{emailError}</Text>}
      </UserStringInput>

      <UserStringInput
        placeholder="Password"
        onChange={setPassword}
        value={password}
        attributes={{
          textContentType: 'password',
          // secureTextEntry: passwordTextHidden,
        }}
      />

      <Link href="/auth/login">Already have an account? Log In</Link>
      <StyledButton
        text="Sign Up"
        disabled={loading || emailError != '' || usernameError != ''}
        onPress={signUpWithEmail}
      />
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
  container: {
    paddingVertical: 63,
    paddingLeft: 43,
    paddingRight: 44,
  },
  button: {
    backgroundColor: 'gray',
  },
  error: {
    color: 'red',
  },
});
