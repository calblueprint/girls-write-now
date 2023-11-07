import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
    </View>
  );
}
