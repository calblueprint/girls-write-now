import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

function HomeIcon({ color }: { color: string }) {
  return <Ionicons name="home-outline" color={color} size={26} />;
}

function SearchIcon({ color }: { color: string }) {
  return <Ionicons name="search-outline" color={color} size={26} />;
}

function DocumentIcon({ color }: { color: string }) {
  return <Ionicons name="document-outline" color={color} size={26} />;
}

function TabNav() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: SearchIcon,
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
          tabBarIcon: DocumentIcon,
        }}
      />
    </Tabs>
  );
}

export default TabNav;
