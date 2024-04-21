import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

import styles from './styles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
    </View>
  );
}
