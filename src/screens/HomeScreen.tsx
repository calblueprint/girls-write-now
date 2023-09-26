import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParamsList } from '../types/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;

export default function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>GIRLS WRITE NOW!</Text>
      <View style={{ padding: 20 }}>
        <Button title="Story Page" onPress={() => navigation.push('Story')} />
      </View>
      <View style={{ padding: 20 }}>
        <Button title="Login Page" onPress={() => navigation.push('Login')} />
      </View>
      <View style={{ padding: 20 }}>
        <Button title="Toast Page" onPress={() => navigation.push('Toast')} />
      </View>
    </View>
  );
}
