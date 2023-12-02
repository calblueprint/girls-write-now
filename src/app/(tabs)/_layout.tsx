import { Tabs } from 'expo-router';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import Icon from '../../../assets/icons';
import colors from '../../styles/colors';

function HomeIcon({ color }: { color: string }) {
  return (
    <Icon
      type={color === colors.fadedBlack ? 'home_nav_bar' : 'home_nav_active'}
    />
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <Icon
      type={
        color === colors.fadedBlack ? 'search_nav_bar' : 'search_nav_active'
      }
    />
  );
}

function LibraryIcon({ color }: { color: string }) {
  return (
    <Icon
      type={
        color === colors.fadedBlack ? 'library_nav_bar' : 'library_nav_active'
      }
    />
  );
}

function TabNav() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.citrus,
        tabBarInactiveTintColor: colors.fadedBlack,
        tabBarStyle: {
          paddingTop: 16,
          paddingBottom: insets.bottom,
          height: 68 + insets.bottom,
          backgroundColor: colors.white,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => HomeIcon({ color }),
          // tabBarLabelStyle: { borderTopWidth: 12, paddingTop: 12 },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => SearchIcon({ color }),
        }}
      />
      <Tabs.Screen
        name="author"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="story"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          headerShown: false,
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => LibraryIcon({ color }),
        }}
      />
    </Tabs>
  );
}

export default TabNav;
