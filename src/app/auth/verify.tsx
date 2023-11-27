import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

function VerificationScreen() {
  const { user, verifyOtp, resendVerification } = useSession();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setCode] = useState<string>('');

  // let otpInput = useRef(null);

  // const clearText = () => {
  //   otpInput.current.clear();
  // }

  // const setText = () => {
  //   otpInput.current.setValue("1234");
  // }

  const verifyAccount = async () => {
    setLoading(true);

    if (user?.email && verificationCode) {
      const { error } = await verifyOtp(user.email, verificationCode);

      if (error) Alert.alert(error.message);
      else router.replace('/auth/onboarding');
    } else if (!verificationCode) {
      Alert.alert(`Please enter a verification code`);
    } else {
      Alert.alert(`Please sign up again.`);
    }

    setLoading(false);
  };

  const resendCode = async () => {
    setLoading(true);

    if (user?.email) {
      const { error } = await resendVerification(user.email);

      if (error) Alert.alert(error.message);
      else Alert.alert(`Verification email sent to ${user.email}.`);
    } else {
      Alert.alert(`Please sign up again.`);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={[globalStyles.authContainer, styles.container]}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCode}
        placeholder="Verification Code"
        value={verificationCode}
        maxLength={6}
      />

      <View style={[styles.verticallySpaced, globalStyles.mt20]} />
      <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Resend code" disabled={loading} onPress={resendCode} />
      </View>
      <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Button
          title="Verify Account"
          disabled={loading}
          onPress={verifyAccount}
        />
      </View>
    </SafeAreaView>
  );
}

export default VerificationScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  container: {
    justifyContent: 'flex-start',
  },
});
