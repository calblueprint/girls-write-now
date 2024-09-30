import { Tabs } from 'expo-router';
import { Alert, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon, { IconType } from '../../../assets/icons';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

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

function LibraryIcon({ color, guest }: { color: string; guest: boolean }) {
  let icon: IconType;
  if (guest) {
    icon = 'library_inactive';
  } else {
    icon = color === colors.fadedBlack ? 'library_inactive' : 'library_active';
  }
  return <Icon type={icon} />;
}

function TabNav() {
  const { guest } = useSession();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarLabelStyle: globalStyles.body1,
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
          tabBarIcon: ({ color }) => LibraryIcon({ color, guest }),
        }}
        listeners={{
          tabPress: e => {
            if (guest) {
              Alert.alert(
                'You are not signed in',
                'Sign in to access your library.',
              );

              e.preventDefault();
            }
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          href: null,
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
