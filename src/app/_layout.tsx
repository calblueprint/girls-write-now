import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContextProvider } from '../utils/AuthContext';
import { BooleanPubSubProvider } from '../utils/PubSubContext';
import ToastComponent from '../components/Toast/Toast';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function StackLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <AuthContextProvider>
          <BooleanPubSubProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
            </Stack>
          </BooleanPubSubProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
      <ToastComponent />
    </SafeAreaProvider>
  );
}

export default StackLayout;
