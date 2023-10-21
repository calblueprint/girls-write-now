import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
});

function VerificationScreen() {
  const { user, verifyEmail, resendVerification } = useSession();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setCode] = useState<string>('');

  const verifyAccount = async () => {
    setLoading(true);
    console.log(user);

    if (user?.email && verificationCode) {
      const { error, data } = await verifyEmail(user.email, verificationCode);

      console.log(data);
      if (error) Alert.alert(error.message);
      else router.replace('/home');
    } else if (!user?.email) {
      Alert.alert(`Please sign up again.`);
    } else {
      Alert.alert(`Please enter a verification code`);
    }

    setLoading(false);
  };

  const resendCode = async () => {
    setLoading(true);

    if (user?.email) {
      const { error, data } = await resendVerification(user.email);

      console.log(data);
      if (error) Alert.alert(error.message);
      else Alert.alert(`Verification email sent to ${user.email}.`);
    } else {
      Alert.alert(`Please sign up again.`);
    }

    setLoading(false);
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
        <Button title="Resend code" disabled={loading} onPress={resendCode} />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button
          title="Verify Account"
          disabled={loading}
          onPress={verifyAccount}
        />
      </View>
    </View>
  );
}

export default VerificationScreen;
