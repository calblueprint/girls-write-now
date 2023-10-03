import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { MyContentStackParamList } from '../types/navigation';

type MyContentScreenProps = NativeStackScreenProps<
  MyContentStackParamList,
  'MyContent'
>;

export default function MyContentScreen(props: MyContentScreenProps) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>My Content</Text>
      <View style={{ padding: 20 }}>
        <Button
          title="Story Page"
          onPress={() => navigation.navigate('Story')}
        />
      </View>
    </View>
  );
}
