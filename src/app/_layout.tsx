import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContextProvider } from '../utils/AuthContext';
import ToastComponent from '../components/Toast/Toast';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

function StackLayout() {
  {
    /* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */
  }
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
      <ToastComponent />
    </SafeAreaProvider>
  );
  {
    /* </TouchableWithoutFeedback> */
  }
}

export default StackLayout;
