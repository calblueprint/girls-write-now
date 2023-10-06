import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { fontSize: 14 },
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
        name="mycontent"
        options={{
          headerShown: false,
          tabBarLabel: 'My Content',
          tabBarIcon: DocumentIcon,
        }}
      />
    </Tabs>
  );
}

export default TabNav;
