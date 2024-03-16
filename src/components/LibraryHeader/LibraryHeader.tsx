import { View, Text, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Icon from '../../../assets/icons';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import colors from '../../styles/colors';
import { useSession } from '../../utils/AuthContext';

export default function LibraryHeader() {
  const { user } = useSession();
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <View style={styles.textContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/logo.png')}
          />
          <View style={styles.username}>
            <Text style={globalStyles.h1}>
              {user?.user_metadata.username}{' '}
            </Text>
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

      <View style={{ flex: 1 }}>
        <Pressable>
          <Text>favorites</Text>
        </Pressable>
      </View>
    </View>
  );
}
