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
  const { updateUser, signOut } = useSession();
  const [password, setPassword] = useState('');
  const [passwordTextHidden, setPasswordTextHidden] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTextHidden, setConfirmPasswordTextHidden] =
    useState(true);
  const [loading, setLoading] = useState(false);

  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [isDifferent, setIsDifferent] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const checkPassword = (text: string) => {
    setPassword(text);
    if (text !== '') {
      if (text !== text.toLowerCase()) {
        setHasUppercase(true);
      } else {
        setHasUppercase(false);
      }
      if (text !== text.toUpperCase()) {
        setHasLowercase(true);
      } else {
        setHasLowercase(false);
      }
      if (/[0-9]/.test(text)) {
        setHasNumber(true);
      } else {
        setHasNumber(false);
      }
      if (text.length >= 8) {
        setHasLength(true);
      } else {
        setHasLength(false);
      }
      //need to check that it is different from old password
    }
  };

  const checkConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== '') {
      if (text == password) {
        setIsMatching(true);
      } else {
        setIsMatching(false);
      }
    }
  };

  const changePassword = async () => {
    setLoading(true);
    const { error } = await updateUser({ password });

    if (error) {
      Alert.alert('Updating password failed');
    } else {
      await signOut();
      router.replace('/auth/login');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.h1]}>Create a New Password</Text>
      <View style = {styles.newPassword}> 
      <UserStringInput
        placeholder="Password"
        label="New password"
        placeholderTextColor={colors.darkGrey}
        onChange={text => {
          setPassword(text);
          checkPassword(text);
        }}
        value={password}
        attributes={{
          textContentType: 'password',
          secureTextEntry: passwordTextHidden,
        }}
      >
        <RNEIcon
          name={passwordTextHidden ? 'visibility-off' : 'visibility'}
          type="material"
          style={styles.icon}
          onPress={() => setPasswordTextHidden(!passwordTextHidden)}
        />
      </UserStringInput>
      </View>

      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasUppercase ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              globalStyles.errorMessage,
              styles.passwordErrorText,
              hasUppercase
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 1 uppercase letter
          </Text>
        </View>
      )}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasLowercase ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              globalStyles.errorMessage,
              styles.passwordErrorText,
              hasLowercase
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 1 lowercase letter
          </Text>
        </View>
      )}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasNumber ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              globalStyles.errorMessage,
              styles.passwordErrorText,
              hasNumber
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 1 number
          </Text>
        </View>
      )}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={hasLength ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              globalStyles.errorMessage,
              styles.passwordErrorText,
              hasLength
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            At least 8 characters
          </Text>
        </View>
      )}
      {/* functionality for this has not been implemented */}
      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={isDifferent ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              globalStyles.errorMessage,
              styles.passwordErrorText,
              isDifferent
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            Must be different than your old password
          </Text>
        </View>
      )}

      <View style = {styles.newPassword}>
        <UserStringInput
          placeholder="Confirm Password"
          label="Confirm password"
          placeholderTextColor={colors.darkGrey}
          onChange={text => {
            setConfirmPassword(text);
            checkConfirmPassword(text);
          }}
          value={confirmPassword}
          attributes={{
            textContentType: 'password',
            secureTextEntry: confirmPasswordTextHidden,
          }}
        >
          <RNEIcon
            name={confirmPasswordTextHidden ? 'visibility-off' : 'visibility'}
            type="material"
            style={styles.icon}
            onPress={() =>
              setConfirmPasswordTextHidden(!confirmPasswordTextHidden)
            }
          />
        </UserStringInput>
      </View>

      {password !== '' && (
        <View style={styles.passwordComplexity}>
          <Icon type={isMatching ? 'green_check' : 'grey_dot'} />
          <Text
            style={[
              globalStyles.errorMessage,
              styles.passwordErrorText,
              isMatching
                ? { color: colors.textGreen }
                : { color: colors.textGrey },
            ]}
          >
            Inputs must match
          </Text>
        </View>
      )}

      <View style={styles.updatePassword}>
        <StyledButton
          disabled={!hasLength || !isMatching}
          onPress={changePassword}
          text="Update Password"
        />
      </View>
    </View>
  );
}

export default ResetPasswordScreen;
