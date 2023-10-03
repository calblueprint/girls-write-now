import { router } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';

function SignUpScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Sign Up</Text>
      <Button title="Sign Up" onPress={() => router.push('/auth/onboarding')} />
    </SafeAreaView>
  );
}

export default SignUpScreen;
