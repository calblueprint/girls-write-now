import { Redirect, router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../styles/globalStyles';
import { useSession } from '../utils/AuthContext';

function SettingsScreen() {
  const { session, signOut } = useSession();

  if (!session) return <Redirect href="/auth/login" />;
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Settings</Text>
      <View>
        <Button
          title="Update Profile"
          onPress={() => router.push('/auth/onboarding')}
        />
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
