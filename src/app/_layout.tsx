import { Stack } from 'expo-router';
import { AuthContextProvider } from '../utils/AuthContext';

function StackLayout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </AuthContextProvider>
  );
}

export default StackLayout;
