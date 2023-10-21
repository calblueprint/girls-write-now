import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../styles/globalStyles';
import { useSession } from '../utils/AuthContext';

function SettingsScreen() {
  const { session, signOut } = useSession();

  const resetAndPushToRouter = (path: string) => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace(path);
  };

  useEffect(() => {
    if (!session) resetAndPushToRouter('/auth/login');
  }, [session]);

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
