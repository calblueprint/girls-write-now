import { Link, router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { Icon } from 'react-native-elements';

function VerificationScreen() {
  const { user, verifyOtp, resendVerification } = useSession();
  const [errorMessage, setErrorMessage] = useState('');
  const [showX, setShowX] = useState(false);
  const [userInput, setUserInput] = useState('');

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
    if (user?.email) {
      const { error } = await verifyOtp(user.email, userInput);

      console.log(error);
      if (error) {
        setShowX(true);
        setErrorMessage('Incorrect code. Please try again.');
      } else {
        router.replace('/auth/onboarding');
      }
    }
  };

  const resendCode = async () => {
    clearText();

    if (user?.email) {
      const { error } = await resendVerification(user.email);

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
    }
  };

  const blurrEmail = () => {
    if (user?.email) {
      const length = user?.email?.split('@')[0].length;
      return `${user?.email?.substring(0, 2)}*****${user?.email
        ?.split('@')[0]
        .substring(length - 1, length)}@${user?.email?.split('@')[1]}`;
    }
    return 'your email';
  };

  const renderBlurredEmail = () => {
    return <Text style={globalStyles.subtextBold}>{blurrEmail()}.</Text>;
  };

  return (
    <SafeAreaView style={[globalStyles.authContainer, styles.container]}>
      <Link href="/auth/signup" style={[globalStyles.subtext, styles.back]}>
        <Text>{'<Back'}</Text>
      </Link>
      <View style={styles.marginHorizontal}>
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
          autoFocus={true}
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
      </View>
    </SafeAreaView>
  );
}

export default VerificationScreen;
