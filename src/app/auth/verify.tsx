import React, { useState } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSession } from '../../utils/AuthContext';
import globalStyles from '../../styles/globalStyles';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

function VerificationScreen() {
  const { user, verifyEmail } = useSession();
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
    }

    setLoading(false);
  };

  const resendCode = async () => {
    setLoading(true);
    // Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <View style={globalStyles.auth_container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCode}
        value={verificationCode}
        maxLength={6}
      />

      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}></View>
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
