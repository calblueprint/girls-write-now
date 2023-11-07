import React from 'react';
import { View, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image
        style={{ width: 200, height: 106.81 }}
        source={require('../../assets/logo.png')}
      />
    </View>
  );
}
