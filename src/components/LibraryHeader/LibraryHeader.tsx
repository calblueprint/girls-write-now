import { View, Text, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Icon from '../../../assets/icons';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import colors from '../../styles/colors';
import { useSession } from '../../utils/AuthContext';

/*
 * The header of the library screen
 * Displays the settings button, and the user's username
 */
export default function LibraryHeader() {
  const { user } = useSession();

  return (
    <View style={styles.horizontal}>
      <View style={styles.textContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/icon.png')}
        />
        <View style={styles.username}>
          <Text style={globalStyles.h1}>{user?.user_metadata.username} </Text>
        </View>
      </View>

      <View>
        <Pressable onPress={() => router.push('/settings')}>
          <View>
            <Icon type="settings_gear" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
