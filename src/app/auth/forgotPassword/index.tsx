import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import validator from 'validator';

import styles from './styles';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import StyledButton from '../../../components/StyledButton/StyledButton';
import { isEmailTaken } from '../../../queries/profiles';

function ForgotPasswordScreen() {
  const { updateUser, signOut, resetPassword, verifyOtp } = useSession();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const sendResetEmail = async () => {
    const { error } = await resetPassword(email);
    if (error)
      Alert.alert('Could not send a reset password email. Please try again.');
    else
      Alert.alert(
        'Enter the verification code from your email to change your password',
      );
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

    const emailIsTaken = await isEmailTaken(newEmail);
    if (emailIsTaken) {
      setEmailError(
        'An account with that email does not exist. Please try again.',
      );
      return;
    }
    setEmailError('');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[globalStyles.h1]}>Forgot Password?</Text>
        <UserStringInput
          placeholder="Email or account username"
          placeholderTextColor="#797979"
          value={email}
          label="Email or account username"
          onChange={setAndCheckEmail}
        />
        <Text style={[globalStyles.errorMessage, styles.subtext]}>
          We'll email you a code to confirm your email.
        </Text>
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
