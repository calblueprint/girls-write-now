import { router } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../styles/globalStyles';

function LoginScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Auth</Text>
      <Button title="Login" onPress={() => router.push('/auth/onboarding')} />
      <Button title="Sign Up" onPress={() => router.push('/auth/signup')} />
      <Button title="[temp] Home" onPress={() => router.push('/home')} />
    </SafeAreaView>
  );
}

export default LoginScreen;
