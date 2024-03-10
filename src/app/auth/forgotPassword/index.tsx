import { router, Link } from 'expo-router';
import { useState, useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import validator from 'validator';
// import { Mutex } from 'async-mutex';

import styles from './styles';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { isEmailTaken } from '../../../queries/profiles';
import { queryEmailByUsername } from '../../../queries/auth';
import colors from '../../../styles/colors';

function ForgotPasswordScreen() {
  const { updateUser, signOut, resetPassword, verifyOtp } = useSession();
  const [email, setEmail] = useState('');
  const [emailToReset, setEmailToReset] = useState('');
  const [emailError, setEmailError] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  // const mutex = useRef(new Mutex());

  const sendResetEmail = async () => {
    const { error } = await resetPassword(emailToReset);
    if (error)
      Alert.alert('Could not send a reset password email. Please try again.');
    else router.replace('auth/signup');
  };

  const setAndCheckEmailOrUsername = async (newEmail: string) => {
    setEmail(newEmail);
    // const release = await mutex.current.acquire();

    try {
      if (validator.isEmail(newEmail)) {
        if (newEmail.length === 0) {
          setEmailError('');
          return;
        }
        const emailIsTaken = await isEmailTaken(newEmail);
        if (!emailIsTaken) {
          setEmailError(
            'An account with that email does not exist. Please try again.',
          );
          setValidEmail(false);
          return;
        }
        setEmailToReset(newEmail);
      } else {
        const { data, error } = await queryEmailByUsername(newEmail);

        if (data && data?.length > 0 && !error) {
          setValidEmail(true);
          setEmailToReset(data[0].email);
        } else {
          setEmailError(
            'An account with that username does not exist. Please try again.',
          );
          setValidEmail(false);
          return;
        }
      }
      setValidEmail(true);
      setEmailError('');
    } finally {
      // release();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Link href="/home" style={styles.back}>
          <Text>{'<Back'}</Text>
        </Link>
        <Text style={[globalStyles.h1, styles.heading]}>Forgot Password?</Text>
        <UserStringInput
          placeholder="Email or account username"
          placeholderTextColor={colors.darkGrey}
          value={email}
          label="Email or account username"
          onChange={setAndCheckEmailOrUsername}
        />
        <Text style={[globalStyles.errorMessage, styles.subtext]}>
          We'll email you a code to confirm your email.
        </Text>

        {email !== '' && (
          <Text style={[globalStyles.errorMessage]}>{emailError}</Text>
        )}
      </View>

      <View>
        <StyledButton
          disabled={!validEmail}
          text="Continue"
          onPress={sendResetEmail}
        />
      </View>
    </View>
  );
}

export default ForgotPasswordScreen;
