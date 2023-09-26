import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import StoryScreen from './src/screens/StoryScreen';
import ToastScreen from './src/screens/ToastScreen';
import { RootStackParamsList } from './src/types/types';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Toast" component={ToastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
