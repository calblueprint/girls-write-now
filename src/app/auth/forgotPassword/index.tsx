import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import styles from './styles';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function ForgotPasswordScreen() {
  const { updateUser, signOut, resetPassword, verifyOtp } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setCode] = useState<string>('');
  const [changingPassword, setChangingPassword] = useState(false);

  const sendResetEmail = async () => {
    const { error } = await resetPassword(email);
    if (error)
      Alert.alert('Could not send a reset password email. Please try again.');
    else
      Alert.alert(
        'Enter the verification code from your email to change your password',
      );
  };
  const verifyCode = async () => {
    setLoading(true);

    if (email && verificationCode) {
      const { error } = await verifyOtp(email, verificationCode);

      if (error) {
        Alert.alert(error.message);
        setChangingPassword(false);
      } else {
        router.push('auth/resetPassword');
      }
    } else if (!verificationCode) {
      Alert.alert(`Please enter a verification code`);
    } else {
      Alert.alert(`Please sign up again.`);
    }

    setLoading(false);
  };

  const changePassword = async () => {
    setLoading(true);
    const { error } = await updateUser({ password });

    if (error) {
      Alert.alert('Updating password failed');
    } else {
      await signOut();
      router.replace('/auth/login');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Send" disabled={loading} onPress={sendResetEmail} />
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCode}
        placeholder="Verification Code"
        value={verificationCode}
        maxLength={6}
      />

      <View style={[styles.verticallySpaced, globalStyles.mt20]}>
        <Button title="Verify" disabled={loading} onPress={verifyCode} />
      </View>

      {changingPassword && (
        <>
          <View style={styles.verticallySpaced}>
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

          <View style={[styles.verticallySpaced, globalStyles.mt20]}>
            <Button
              title="Change Password"
              disabled={loading}
              onPress={changePassword}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default ForgotPasswordScreen;
