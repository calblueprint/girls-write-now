import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '../../../assets/icons';
import colors from '../../styles/colors';

function HomeIcon({ color }: { color: string }) {
  return (
    <Icon
      type={color === colors.fadedBlack ? 'home_inactive' : 'home_active'}
    />
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <Icon
      type={color === colors.fadedBlack ? 'search_inactive' : 'search_active'}
    />
  );
}

function LibraryIcon({ color }: { color: string }) {
  return (
    <Icon
      type={color === colors.fadedBlack ? 'library_inactive' : 'library_active'}
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
          paddingBottom:
            Platform.OS === 'ios' ? insets.bottom : insets.bottom + 8,
          height: 68 + insets.bottom,
          backgroundColor: colors.white,
          position: 'absolute',
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
      <Tabs.Screen
        name="genre"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}

export default TabNav;
