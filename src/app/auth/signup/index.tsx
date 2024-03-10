import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Icon as RNEIcon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';

import styles from './styles';
import Icon from '../../../../assets/icons';
import StyledButton from '../../../components/StyledButton/StyledButton';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import supabase from '../../../utils/supabase';

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
  const lastUsernameCheck = useRef(Date.now());
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
    const start = Date.now();
    lastUsernameCheck.current = start;
    setUsername(newUsername);

    if (newUsername.length === 0) {
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

    if (lastUsernameCheck.current !== start) {
      return;
    }

    if (usernameIsTaken) {
      setUsernameError('That username is not available. Please try again.');
      return;
    }

    setUsernameError('');
  };

  const setAndCheckEmail = async (newEmail: string) => {
    setEmail(newEmail);
    if (newEmail.length === 0) {
      setEmailError('');
      return;
    }

    if (!validator.isEmail(newEmail)) {
      setEmailError('This email is not a valid email. Please try again.');
      return;
    }

    const { count } = await supabase
      .from('profiles')
      .select(`*`, { count: 'exact' })
      .limit(1)
      .eq('email', newEmail);
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
    <SafeAreaView
      style={[globalStyles.authContainer]}
      edges={['right', 'left', 'top']}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flex}
      >
        <View style={styles.inputs}>
          <Text style={[globalStyles.h1, styles.title]}>
            {'Read stories from \nyoung creators'}
          </Text>

          <UserStringInput
            placeholder="Username"
            label="Username"
            placeholderTextColor={colors.darkGrey}
            onChange={setAndCheckUsername}
            value={username}
          />
          {usernameError && (
            <Text style={[globalStyles.errorMessage, styles.inputError]}>
              {usernameError}
            </Text>
          )}

          <UserStringInput
            placeholder="First Name"
            label="First Name"
            placeholderTextColor={colors.darkGrey}
            onChange={setFirstName}
            value={firstName}
          />
          <UserStringInput
            placeholder="Last Name"
            label="Last Name"
            placeholderTextColor={colors.darkGrey}
            onChange={setLastName}
            value={lastName}
          />
          <UserStringInput
            placeholder="Email"
            label="Email"
            placeholderTextColor={colors.darkGrey}
            onChange={setAndCheckEmail}
            value={email}
            attributes={{
              textContentType: 'emailAddress',
              secureTextEntry: false,
            }}
          />
          {emailError && (
            <Text style={[globalStyles.errorMessage, styles.inputError]}>
              {emailError}
            </Text>
          )}

          <UserStringInput
            placeholder="Password"
            label="Password"
            placeholderTextColor={colors.darkGrey}
            onChange={text => {
              setPassword(text);
              checkPassword(text);
            }}
            value={password}
            attributes={{
              textContentType: 'password',
              secureTextEntry: passwordTextHidden,
            }}
          >
            <RNEIcon
              name={passwordTextHidden ? 'visibility-off' : 'visibility'}
              type="material"
              style={styles.icon}
              onPress={() => setPasswordTextHidden(!passwordTextHidden)}
            />
          </UserStringInput>
        </View>
        {password !== '' && (
          <View style={styles.passwordComplexity}>
            <Icon type={hasUppercase ? 'green_check' : 'grey_dot'} />
            <Text
              style={[
                globalStyles.errorMessage,
                styles.passwordErrorText,
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
                globalStyles.errorMessage,
                styles.passwordErrorText,
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
                globalStyles.errorMessage,
                styles.passwordErrorText,
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
                globalStyles.errorMessage,
                styles.passwordErrorText,
                hasLength
                  ? { color: colors.textGreen }
                  : { color: colors.textGrey },
              ]}
            >
              At least 8 characters
            </Text>
          </View>
        )}

        <View style={styles.navigation}>
          <View style={[styles.verticallySpaced, globalStyles.mt20]}>
            <StyledButton
              text="Sign Up"
              disabled={
                !passwordComplexity ||
                loading ||
                emailError !== '' ||
                usernameError !== '' ||
                email.length === 0 ||
                username.length === 0
              }
              onPress={signUpWithEmail}
            />
          </View>
          <Text style={[globalStyles.body1, styles.redirectText]}>
            Already have an account?{' '}
            <Link style={globalStyles.bodyBoldUnderline} href="/auth/login">
              Log In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUpScreen;
