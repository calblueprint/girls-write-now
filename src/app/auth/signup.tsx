import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import validator from 'validator';

import StyledButton from '../../components/StyledButton';
import UserStringInput from '../../components/UserStringInput';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import supabase from '../../utils/supabase';
import { Icon } from 'react-native-elements';

function SignUpScreen() {
  const { signUp } = useSession();

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTextHidden, setPasswordTextHidden] = useState(true);
  const [loading, setLoading] = useState(false);
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
    <SafeAreaView style={[globalStyles.authContainer, styles.flex]}>
      <View>
        <Text style={[globalStyles.h4, styles.title]}>
          Read stories from young creators
        </Text>
        <UserStringInput
          placeholder="Username"
          onChange={setAndCheckUsername}
          value={username}
        >
          {usernameError && <Text style={styles.error}>{usernameError}</Text>}
        </UserStringInput>
        <UserStringInput
          placeholder="First Name"
          onChange={setFirstName}
          value={firstName}
        />
        <UserStringInput
          placeholder="Last Name"
          onChange={setLastName}
          value={lastName}
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
            secureTextEntry: passwordTextHidden,
          }}
        >
          <Icon
            name={passwordTextHidden ? 'visibility-off' : 'visibility'}
            type="material"
            style={styles.icon}
            onPress={() => setPasswordTextHidden(!passwordTextHidden)}
          />
        </UserStringInput>
      </View>

      <View>
        <StyledButton
          text="Sign Up"
          disabled={
            loading ||
            emailError != '' ||
            usernameError != '' ||
            !email ||
            !username
          }
          onPress={signUpWithEmail}
        />

        <Text style={styles.redirectText}>
          Already have an account?{' '}
          <Link style={styles.link} href="/auth/login">
            Log In
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  flex: {
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  redirectText: {
    textAlign: 'center',
    marginBottom: 64,
    marginTop: 16,
  },
  title: {
    paddingTop: 64,
    marginBottom: 23,
  },
  icon: {
    marginRight: 10,
  },
});
