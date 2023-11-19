import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import { resendVerification, verifyOtp } from '../../queries/auth';

function VerificationScreen() {
  const { user, dispatch, isLoading } = useSession();
  const [verificationCode, setCode] = useState<string>('');

  const verifyAccount = async () => {
    if (user?.email && verificationCode) {
      const { error } = await verifyOtp(dispatch, user.email, verificationCode);

      if (error) Alert.alert(error.message);
      else router.replace('/auth/onboarding');
    } else if (!verificationCode) {
      Alert.alert(`Please enter a verification code`);
    } else {
      Alert.alert(`Please sign up again.`);
    }
  };

  const resendCode = async () => {
    if (user?.email) {
      const { error, data } = await resendVerification(dispatch, user.email);

      console.log(data);
      if (error) Alert.alert(error.message);
      else Alert.alert(`Verification email sent to ${user.email}.`);
    } else {
      Alert.alert(`Please sign up again.`);
    }
  };

  return (
    <View style={globalStyles.auth_container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCode}
        placeholder="Verification Code"
        value={verificationCode}
        maxLength={6}
      />

      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]} />
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Resend code" disabled={isLoading} onPress={resendCode} />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button
          title="Verify Account"
          disabled={isLoading}
          onPress={verifyAccount}
        />
      </View>
    </View>
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
});
