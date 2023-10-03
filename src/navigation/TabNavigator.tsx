import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ReactElement } from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { RootStackParamsList } from '../types/navigation';
import MyContentStackNavigator from './stacks/MyContentStackNavigator';

function HomeIcon({ color }: { color: string }) {
  return <Ionicons name="home-outline" color={color} size={26} />;
}

function SearchIcon({ color }: { color: string }) {
  return <Ionicons name="search-outline" color={color} size={26} />;
}

function MyContentIcon({ color }: { color: string }) {
  return <Ionicons name="document-outline" color={color} size={26} />;
}

const Tab = createMaterialBottomTabNavigator<RootStackParamsList>();

function TabNavigator(): ReactElement {
  return (
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: SearchIcon,
        }}
      />
      <Tab.Screen
        name="Content"
        component={MyContentStackNavigator}
        options={{
          tabBarLabel: 'My Content',
          tabBarIcon: MyContentIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
