import { Stack } from 'expo-router';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function StackLayout() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="verify" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgotPassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
}

export default StackLayout;
