import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import {
  resetPassword,
  signOut,
  updateUser,
  verifyOtp,
} from '../../queries/auth';

function ForgotPasswordScreen() {
  const { dispatch, isLoading } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setCode] = useState<string>('');
  const [changingPassword, setChangingPassword] = useState(false);

  const sendResetEmail = async () => {
    const { error } = await resetPassword(dispatch, email);
    if (error)
      Alert.alert('Could not send a reset password email. Please try again.');
    else
      Alert.alert(
        'Enter the verification code from your email to change your password',
      );
  };
  const verifyCode = async () => {
    if (email && verificationCode) {
      const { error } = await verifyOtp(dispatch, email, verificationCode);

      if (error) {
        Alert.alert(error.message);
        setChangingPassword(false);
      } else {
        setChangingPassword(true);
      }
    } else if (!verificationCode) {
      Alert.alert(`Please enter a verification code`);
    } else {
      Alert.alert(`Please sign up again.`);
    }
  };

  const changePassword = async () => {
    const { error } = await updateUser(dispatch, { password });

    if (error) {
      console.error(error);
      Alert.alert('Updating password failed');
    } else {
      await signOut(dispatch);
      router.replace('/auth/login');
    }
  };

  return (
    <View style={globalStyles.auth_container}>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Send" disabled={isLoading} onPress={sendResetEmail} />
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCode}
        placeholder="Verification Code"
        value={verificationCode}
        maxLength={6}
      />

      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Verify" disabled={isLoading} onPress={verifyCode} />
      </View>

      {changingPassword && (
        <>
          <View style={globalStyles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
            />
          </View>

          <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
            <Button
              title="Change Password"
              disabled={isLoading}
              onPress={changePassword}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
});
