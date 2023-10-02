import { Tabs } from 'expo-router/tabs';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the dynamic route.
        name="home?"
        options={{
          // Ensure the tab always links to the same href.
          href: '/home',
          // OR you can use the Href object:
        }}
      />
    </Tabs>
  );
}