import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContextProvider } from '../utils/AuthContext';

function StackLayout() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

export default StackLayout;
