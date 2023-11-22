import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';

import StyledButton from '../../components/StyledButton/StyledButton';
import UserStringInput from '../../components/UserStringInput/UserStringInput';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import { isEmailUsed, queryEmailByUsername } from '../../queries/auth';
import { Icon } from 'react-native-elements';

function LoginScreen() {
  const sessionHandler = useSession();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTextHidden, setPasswordTextHidden] = useState(true);
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

      const used = await isEmailUsed(email);

      if (!used) {
        setError(
          'An account with that email does not exist. Please try again.',
        );
        setLoading(false);
        return;
      }
    } else {
      const { data, error } = await queryEmailByUsername(emailOrUsername);

      if (data && data?.length > 0 && !error) {
        email = data[0].email;
      } else {
        setError(
          'An account with that username does not exist. Please try again.',
        );
        setLoading(false);
        return;
      }
    }
    const { error } = await sessionHandler.signInWithEmail(email, password);

    if (error)
      setError('The username and/or password is incorrect. Please try again.');
    else resetAndPushToRouter('/home');

    setLoading(false);
  };

  return (
    <SafeAreaView style={[globalStyles.authContainer, styles.flex]}>
      <View>
        <Text style={styles.title}>{'Read stories from \nyoung creators'}</Text>

        <UserStringInput
          placeholder="Email or Username"
          label="Email or Username"
          onChange={setEmailOrUsername}
          value={emailOrUsername}
          attributes={{
            textContentType: 'emailAddress',
          }}
        />
        <UserStringInput
          label="Password"
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

        <Link style={styles.forgotPassword} href="/auth/forgotPassword">
          Forgot password?
        </Link>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View>
        <View>
          <StyledButton
            text="Log In"
            disabled={loading || emailOrUsername == '' || password == ''}
            onPress={signIn}
          />
        </View>

        <Text style={styles.redirectText}>
          Don&apos;t have an account?{' '}
          <Link style={styles.link} href="/auth/signup">
            Sign Up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  flex: {
    justifyContent: 'space-between',
  },
  forgotPassword: {
    fontSize: 12,
    textDecorationLine: 'underline',
    paddingTop: 18,
    paddingBottom: 16,
    fontWeight: '400',
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  redirectText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 64,
  },
  title: {
    lineHeight: 33,
    paddingTop: 64,
    marginBottom: 41,
    fontSize: 24,
    fontWeight: '700',
  },
  error: {
    color: 'red',
  },
  icon: {
    paddingRight: 10,
  },
});
