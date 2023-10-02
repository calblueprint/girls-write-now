import { Tabs } from 'expo-router/tabs';

export default function AppLayout() {
  return (
    <Tabs>
    <Tabs.Screen
        // Name of the dynamic route.
        name="search"
        options={{
          // Ensure the tab always links to the same href.
          href: '/search',
          // OR you can use the Href object:
        }}
      />
    </Tabs>
  );
}