import { Link } from 'expo-router';
import React from 'react';
import { Button, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: 20 }}>
        <Link href="/(bottomTabs)" asChild>
          <Button title="HOME PAGE" />
        </Link>
      </View>
    </View>
  );
}
