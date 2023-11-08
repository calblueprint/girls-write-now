import { Redirect, Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import validator from 'validator';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import supabase from '../../utils/supabase';

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

  const checkUsername = async () => {
    const usernameCharactersValid =
      username.length <= 12 && username.match(validUsernameCharacters) !== null;

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
      .eq('username', username);
    const usernameIsTaken = (count ?? 0) >= 1;

    if (usernameIsTaken) {
      setUsernameError('That username is not available. Please try again.');
      return;
    }

    setUsernameError('');
  };

  const checkEmail = async () => {
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

  useEffect(() => {
    // don't show error when the user first gets on the page
    if (!initialLoadEmail.current) {
      checkEmail();
    } else {
      initialLoadEmail.current = false;
    }
  }, [email]);

  useEffect(() => {
    // don't show error when the user first gets on the page
    if (!initialLoadUsername.current) {
      checkUsername();
    } else {
      initialLoadUsername.current = false;
    }
  }, [username]);

  const signUpWithEmail = async () => {
    setLoading(true);
    if (usernameError) {
      Alert.alert('Invalid username');
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
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
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
      {emailError && <Text style={styles.error}>{emailError}</Text>}

      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          style={styles.inputField}
          placeholder="Enter Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
        />
      </View>

      <Link href="/auth/login">Already have an account? Log In</Link>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button
          title="Sign Up"
          disabled={loading || emailError != '' || usernameError != ''}
          onPress={signUpWithEmail}
        />
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
  error: {
    color: 'red',
  },
});
