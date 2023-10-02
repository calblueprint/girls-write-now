import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import StoryScreen from './src/screens/StoryScreen';
import ToastScreen from './src/screens/ToastScreen';
import { RootStackParamsList } from './src/types/types';

const Tab = createMaterialBottomTabNavigator<RootStackParamsList>();

function HomeIcon({ color }: { color: string }) {
  return <Ionicons name="home-outline" color={color} size={26} />;
}

function StoryIcon({ color }: { color: string }) {
  return <Ionicons name="document-outline" color={color} size={26} />;
}

function ToastIcon({ color }: { color: string }) {
  return <Ionicons name="notifications-outline" color={color} size={26} />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#E5E4E2' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name="Story"
          component={StoryScreen}
          options={{
            tabBarLabel: 'Story',
            tabBarIcon: StoryIcon,
          }}
        />
        <Tab.Screen
          name="Toast"
          component={ToastScreen}
          options={{
            tabBarLabel: 'Toast',
            tabBarIcon: ToastIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
