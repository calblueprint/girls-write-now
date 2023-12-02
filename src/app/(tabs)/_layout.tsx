import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import Icon from '../../../assets/icons';
import colors from '../../styles/colors';

function HomeIcon({ color }: { color: string }) {
  return (
    <Icon
      type={color === colors.fadedBlack ? 'home_nav_bar' : 'home_nav_active'}
    />
  );
}

function SearchIcon() {
  return <Icon type="search_nav_bar" />;
}

function DocumentIcon() {
  return <Icon type="library_nav_bar" />;
}

// function HomeIcon({ color }: { color: string }) {
//   return <Ionicons name="home-outline" color={color} size={26} />;
// }
// function SearchIcon({ color }: { color: string }) {
//   return <Ionicons name="search-outline" color={color} size={26} />;
// }
// function DocumentIcon({ color }: { color: string }) {
//   return <Ionicons name="document-outline" color={color} size={26} />;
// }

function TabNav() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.citrus,
        tabBarInactiveTintColor: colors.fadedBlack,
        tabBarStyle: { paddingTop: 16, backgroundColor: colors.white }, //14 in design
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          // tabBarIcon: ({ color }) => HomeIcon({ color }),
          // tabBarLabelStyle: { borderTopWidth: 12, paddingTop: 12 },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          // tabBarIcon: SearchIcon,
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
          // tabBarIcon: DocumentIcon,
        }}
      />
    </Tabs>
  );
}

export default TabNav;
