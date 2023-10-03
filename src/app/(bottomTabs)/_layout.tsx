import Tabs from 'expo-router/tabs';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="search" />
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
