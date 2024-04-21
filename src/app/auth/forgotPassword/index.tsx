import { router, Link } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';
import validator from 'validator';

import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';
import StyledButton from '../../../components/StyledButton/StyledButton';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import { queryEmailByUsername } from '../../../queries/auth';
import { isEmailTaken } from '../../../queries/profiles';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function ForgotPasswordScreen() {
  const { resetPassword } = useSession();
  const [email, setEmail] = useState('');
  const [emailToReset, setEmailToReset] = useState('');
  const [emailError, setEmailError] = useState('');
  const [value] = useDebounce(email, 250);
  const [validEmail, setValidEmail] = useState(false);

  const sendResetEmail = async () => {
    const { error } = await resetPassword(emailToReset);
    if (error)
      Alert.alert('Could not send a reset password email. Please try again.');
    else
      router.push({
        pathname: '/auth/verify',
        params: { finalRedirect: 'resetPassword', userEmail: emailToReset },
      });
  };

  useEffect(() => {
    checkEmailOrUsername(value);
  }, [value]);

  const checkEmailOrUsername = async (newEmail: string) => {
    setValidEmail(false);
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton pressFunction={() => router.back()} />
      <View style={styles.body}>
        <View>
          <Text style={[globalStyles.h1, styles.heading]}>
            Forgot Password?
          </Text>
          <UserStringInput
            placeholder="Email or account username"
            placeholderTextColor={colors.darkGrey}
            value={email}
            label="Email or account username"
            onChange={e => {
              setEmail(e);
            }}
          />
          <Text style={[globalStyles.errorMessage, styles.subtext]}>
            We'll email you a code to confirm your email.
          </Text>

          {email !== '' && (
            <Text style={[globalStyles.errorMessage]}>{emailError}</Text>
          )}
        </View>

        <View style={styles.button}>
          <StyledButton
            disabled={!validEmail || email !== value}
            text="Continue"
            onPress={sendResetEmail}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;
