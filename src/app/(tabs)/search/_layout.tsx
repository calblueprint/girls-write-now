import { Stack } from 'expo-router';

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="story" options={{ headerShown: false }} />
    </Stack>
  );
}

export default StackLayout;
