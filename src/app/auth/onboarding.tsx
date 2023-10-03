import { Link } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';

function OnboardingScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Onboarding</Text>
      <Link href="/home" asChild>
        <Button title="Update Profile" />
      </Link>
    </SafeAreaView>
  );
}

export default OnboardingScreen;
