import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthContextProvider } from '../utils/AuthContext';
import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import colors from '../styles/colors';

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
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.white }}
      renderLeadingIcon={() => (
        <Icon
          name="check-circle"
          type="octicon"
          color={colors.lime}
          style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}
        />
      )}
    />
  ),
};

export default StackLayout;
