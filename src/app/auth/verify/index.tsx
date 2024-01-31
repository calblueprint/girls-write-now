import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { Alert, TextInput, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import OTPTextInput from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function VerificationScreen() {
  const { user, verifyOtp, resendVerification } = useSession();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setCode] = useState<string>(''); // actual code

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [otpInput, setOtpInput] = useState<string>(''); // user enters

  const inputRef = useRef<OTPTextInput>(null);

  const clearText = () => {
    inputRef.current?.clear();
  };

  const setText = () => {
    setShowErrorMessage(false);
    inputRef.current?.setValue(otpInput);
  };

  const resetAndPushToRouter = (path: string) => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace(path);
  };

  const verifyAccount = async () => {
    setLoading(true);

    if (user?.email && verificationCode) {
      const { error } = await verifyOtp(user.email, verificationCode);

      if (error) {
        setErrorMessage(
          'Please wait 1 minute for us to send the verification code.',
        );
        setShowErrorMessage(true);
      } else if (otpInput !== verificationCode) {
        setErrorMessage('Incorrect code. Please try again.');
        setShowErrorMessage(true);
        clearText();
      } else {
        router.replace('/auth/onboarding');
      }
    }
    setLoading(false);
  };

  // const verifyAccount = async () => {
  //   setLoading(true);
  //   if (user?.email && verificationCode) {
  //     const { error } = await verifyOtp(user.email, verificationCode);
  //     if (error) {
  //       Alert.alert(error.message);
  //       setErrorMessage(
  //         'Please wait 1 minute for us to resend the verification code.',
  //       );
  //       setShowErrorMessage(true);
  //     } else router.replace('/auth/onboarding');
  //   } else if (!verificationCode && otpInput.length === 6) {
  //     setErrorMessage('Please enter a verification code');
  //     clearText();
  //   } else if (otpInput.length === 6) {
  //     setErrorMessage('Please sign up again');
  //     clearText();
  //   }
  //   setLoading(false);
  // };

  const resendCode = async () => {
    setLoading(true);
    clearText();

    if (user?.email) {
      const { error } = await resendVerification(user.email);

      if (error) {
        setErrorMessage(
          'Please wait 1 minute for us to resend the verification code.',
        );
        setShowErrorMessage(true);
      } else {
        setErrorMessage('Verification email sent to ${user.email}.');
      }
    }

    setLoading(false);
  };

  // const resendCode = async () => {
  //   setLoading(true);
  //   if (user?.email) {
  //     const { error } = await resendVerification(user.email);
  //     if (error) Alert.alert(error.message);
  //     else Alert.alert(`Verification email sent to ${user.email}.`);
  //   } else {
  //     Alert.alert(`Please sign up again.`);
  //   }
  //   setLoading(false);
  // };

  return (
    <SafeAreaView style={[globalStyles.authContainer, styles.container]}>
      {/* <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCode}
        placeholder="Verification Code"
        value={verificationCode}
        maxLength={6}
      /> */}

      <Button
        title="< Back"
        titleStyle={styles.backButton}
        type="clear"
        onPress={() => resetAndPushToRouter('/auth')}
      />

      <Text style={globalStyles.h1}> Enter Verification Code </Text>

      <Text style={globalStyles.body1}>
        We have sent the verification code to {}.
      </Text>

      <OTPTextInput
        ref={inputRef}
        inputCount={6}
        defaultValue={verificationCode}
        inputCellLength={1}
        handleTextChange={verifyAccount}
        containerStyle={styles.otpContainerStyle}
        textInputStyle={styles.otpTextInputStyle}
        // isValid={!showErrorMessage}
        keyboardType="number-pad"
        // returnKeyType="done"
        autoFocus={false}
        tintColor={colors.citrus}
        offTintColor={colors.darkGrey}
      />

      <View style={[styles.verticallySpaced, globalStyles.mt20]} />
      <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Text> Didn't receive a code? </Text>
        <Button
          title="Resend code"
          disabled={loading}
          onPress={resendCode}
          // buttonStyle={styles.resendButton}
        />
      </View>
      {otpInput.length === 6 && showErrorMessage && (
        <Text> {errorMessage} </Text>
      )}
      {/* <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Button
          title="Verify Account"
          disabled={loading}
          onPress={verifyAccount}
        />
      </View> */}
    </SafeAreaView>
  );
}

export default VerificationScreen;
