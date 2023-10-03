import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyContentScreen from '../../screens/MyContent';
import StoryScreen from '../../screens/StoryScreen';
import { MyContentStackParamList } from '../../types/navigation';

const MyContentStack = createStackNavigator<MyContentStackParamList>();

export default function MyContentStackNavigator() {
  return (
    <MyContentStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyContentStack.Screen name="MyContent" component={MyContentScreen} />
      <MyContentStack.Screen name="Story" component={StoryScreen} />
    </MyContentStack.Navigator>
  );
}
