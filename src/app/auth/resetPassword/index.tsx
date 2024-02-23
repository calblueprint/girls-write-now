import { Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Icon as RNEIcon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';

import styles from './styles';
import Icon from '../../../../assets/icons';
import StyledButton from '../../../components/StyledButton/StyledButton';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import supabase from '../../../utils/supabase';

function ResetPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.h1]}>Create a New Password</Text>
      <Text style={[globalStyles.subtext, styles.newPassword]}>
        New password
      </Text>
      <UserStringInput placeholder="test" value={null} />
    </View>
  );
}

export default ResetPasswordScreen;
