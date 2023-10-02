import { Link } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>GIRLS WRITE NOW!</Text>
      <Link href="/other" asChild>
        <View style={{ padding: 20 }}>
            <Button title="Story Page"/>
        </View>
      </Link>
    </View>
  );
}
