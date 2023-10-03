import { Stack } from 'expo-router';

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

export default StackLayout;
