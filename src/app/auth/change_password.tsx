import { Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

function VerificationScreen() {
  const { updateUser, user } = useSession();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    setLoading(true);
    const { error } = await updateUser({ password });

    if (error) {
      console.error(error);
      Alert.alert('Updating password failed');
    } else {
      router.replace('/home');
    }

    setLoading(false);
  };

  if (!user) {
    <Redirect href="/auth/login" />;
  }

  return (
    <View style={globalStyles.auth_container}>
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
          disabled={loading}
          onPress={changePassword}
        />
      </View>
    </View>
  );
}

export default VerificationScreen;
