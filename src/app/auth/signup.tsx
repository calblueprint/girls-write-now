import { Redirect, Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements'
import validator from 'validator';

import StyledButton from '../../components/StyledButton/StyledButton';
import UserStringInput from '../../components/UserStringInput/UserStringInput';

import Icon from '../../../assets/icons';
import colors from '../../styles/colors';
      
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
  
  const [passwordComplexity, setPasswordComplexity] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLength, setHasLength] = useState(false);

  useEffect(() => {
    if (hasUppercase && hasLowercase && hasNumber && hasLength) {
      setPasswordComplexity(true);
    } else {
      setPasswordComplexity(false);
    }
  }, [hasUppercase, hasLowercase, hasNumber, hasLength]);

  const setAndCheckUsername = async (newUsername: string) => {
    setUsername(newUsername);

    if (newUsername.length == 0) {
      setUsernameError('');
      return;
    }

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
    if (newEmail.length == 0) {
      setEmailError('');
      return;
    }

    if (!validator.isEmail(email)) {
      setEmailError('This email is not a valid email. Please try again.');
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

  const checkPassword = (text: string) => {
    setPassword(text);
    if (text !== '') {
      if (text !== text.toLowerCase()) {
        setHasUppercase(true);
      } else {
        setHasUppercase(false);
      }
      if (text !== text.toUpperCase()) {
        setHasLowercase(true);
      } else {
        setHasLowercase(false);
      }
      if (/[0-9]/.test(text)) {
        setHasNumber(true);
      } else {
        setHasNumber(false);
      }
      if (text.length >= 8) {
        setHasLength(true);
      } else {
        setHasLength(false);
      }
    }
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
        <Text style={styles.title}>{'Read stories from \nyoung creators'}</Text>
        <UserStringInput
          placeholder="Username"
          onChange={setAndCheckUsername}
          value={username}
        />
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
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
            secureTextEntry: false,
          }}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}
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
      <View style={globalStyles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => checkPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasUppercase ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              styles.errorText,
              hasUppercase
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 1 uppercase letter
          </Text>
        </View>
      )}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasLowercase ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              styles.errorText,
              hasLowercase
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 1 lowercase letter
          </Text>
        </View>
      )}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasNumber ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              styles.errorText,
              hasNumber
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 1 number
          </Text>
        </View>
      )}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasLength ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              styles.errorText,
              hasLength
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 8 characters
          </Text>
        </View>
      )}
      <View>
        <Link href="/auth/login">Already have an account? Log In</Link>
        <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
          <Button
            title="Sign Up"
            disabled={!passwordComplexity || loading ||
            emailError != '' ||
            usernameError != '' ||
            email.length == 0 ||
            username.length == 0}
            onPress={signUpWithEmail}
          />
        </View>
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
    marginTop: 8,
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
    fontSize: 24,
    paddingTop: 64,
    marginBottom: 23,
    fontWeight: '700',
  },
  icon: {
    marginRight: 10,
},
  passwordComplexity: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  errorText: {
    fontSize: 12,
    marginLeft: 8,
  },
});
