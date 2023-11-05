import { Stack } from 'expo-router';

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="author" options={{ headerShown: false }} />
    </Stack>
  );
}

export default StackLayout;
