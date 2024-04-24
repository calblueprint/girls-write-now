import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function VerificationScreen() {
  const { user, verifyOtp, resendVerification } = useSession();
  const [errorMessage, setErrorMessage] = useState('');
  const [showX, setShowX] = useState(false);
  const [userInput, setUserInput] = useState('');
  const params = useLocalSearchParams<{
    finalRedirect: string;
    userEmail: string;
  }>();
  const { finalRedirect, userEmail } = params;
  const email = user?.email ?? userEmail ?? '';

  const inputRef = useRef<OTPTextInput>(null);

  useEffect(() => {
    if (userInput.length === 6) {
      verifyCode();
    }
  }, [userInput]);

  const clearText = () => {
    inputRef.current?.clear();
  };

  const verifyCode = async () => {
    const { error } = await verifyOtp(email, userInput);

    console.log(error);
    if (error) {
      setShowX(true);
      setErrorMessage('Incorrect code. Please try again.');
    } else {
      router.replace('/auth/' + finalRedirect);
    }
  };

  const resendCode = async () => {
    clearText();

    const { error } = await resendVerification(email);

    if (error) {
      setShowX(false);
      setErrorMessage(
        'Please wait 1 minute for us to resend the verification code.',
      );
    } else {
      Toast.show({
        type: 'success',
        text1: `A new verification code has been sent to`,
        text2: `${blurrEmail()}.`,
        text2Style: globalStyles.subtextBold,
        text1Style: globalStyles.subtext,
        position: 'bottom',
      });
    }
  };

  const blurrEmail = () => {
    const length = email?.split('@')[0].length;
    return `${email?.substring(0, 2)}*****${email
      ?.split('@')[0]
      .substring(length - 1, length)}@${email?.split('@')[1]}`;
  };

  const renderBlurredEmail = () => {
    return <Text style={globalStyles.subtextBold}>{blurrEmail()}.</Text>;
  };

  if (email === '') {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView style={[globalStyles.authContainer, styles.container]}>
      <BackButton pressFunction={() => router.back()} />

      <Text style={[globalStyles.h1, styles.title]}>
        Enter Verification Code{' '}
      </Text>

      <Text style={[globalStyles.subtext, styles.sent]}>
        We have sent the verification code to {renderBlurredEmail()}
      </Text>

      <OTPTextInput
        ref={inputRef}
        inputCount={6}
        defaultValue={userInput}
        inputCellLength={1}
        handleTextChange={setUserInput}
        containerStyle={styles.otpContainerStyle}
        textInputStyle={styles.otpTextInputStyle}
        // isValid={!showErrorMessage}
        keyboardType="number-pad"
        autoFocus
        tintColor={colors.black}
        offTintColor={colors.black}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={globalStyles.subtext}>Didn't receive a code?</Text>
        <Text
          style={[globalStyles.subtextBold, styles.resendButton]}
          onPress={resendCode}
        >
          Resend Code
        </Text>
      </View>
      {errorMessage && (
        <View style={styles.errorContainer}>
          {showX && <Text style={styles.x}>x</Text>}
          <Text style={[globalStyles.errorMessage, styles.errorMessage]}>
            {errorMessage}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default VerificationScreen;
