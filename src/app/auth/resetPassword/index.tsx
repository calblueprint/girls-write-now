import { Link, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Icon as RNEIcon } from 'react-native-elements';

import styles from './styles';
import Icon from '../../../../assets/icons';
import StyledButton from '../../../components/StyledButton/StyledButton';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import PasswordComplexityText from '../../../components/PasswordComplexityText/PasswordComplexityText';
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
      setHasUppercase(text !== text.toLowerCase());
      setHasLowercase(text !== text.toUpperCase());
      setHasNumber(/[0-9]/.test(text));
      setHasLength(text.length >= 8);
      //need to check that it is different from old password
    }
  };

  const checkPasswordMatchConfirmPassword = (text: string) => {
    setPassword(text);
    if (text !== '') {
      setIsMatching(text == confirmPassword);
    }
  };

  const checkConfirmPasswordMatchPassword = (text: string) => {
    setConfirmPassword(text);
    if (text !== '') {
      setIsMatching(text == password);
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
      <View>
        <Text style={[globalStyles.h1]}>Create a New Password</Text>
        <View style={styles.newPassword}>
          <UserStringInput
            placeholder="Password"
            label="New password"
            placeholderTextColor={colors.darkGrey}
            onChange={text => {
              setPassword(text);
              checkPassword(text);
              checkPasswordMatchConfirmPassword(text);
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
          <PasswordComplexityText
            condition={hasUppercase}
            message="At least 1 uppercase letter"
          ></PasswordComplexityText>
        )}
        {password !== '' && (
          <PasswordComplexityText
            condition={hasLowercase}
            message="At least 1 lowercase letter"
          ></PasswordComplexityText>
        )}
        {password !== '' && (
          <PasswordComplexityText
            condition={hasNumber}
            message="At least 1 number"
          ></PasswordComplexityText>
        )}
        {password !== '' && (
          <PasswordComplexityText
            condition={hasLength}
            message="At least 8 characters"
          ></PasswordComplexityText>
        )}

        {/* functionality for this has not been implemented */}
        {password !== '' && (
          <PasswordComplexityText
            condition={isDifferent}
            message="Must be different than your old password"
          ></PasswordComplexityText>
        )}

        <View style={styles.newPassword}>
          <UserStringInput
            placeholder="Confirm Password"
            label="Confirm password"
            placeholderTextColor={colors.darkGrey}
            onChange={text => {
              setConfirmPassword(text);
              checkConfirmPasswordMatchPassword(text);
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
          <PasswordComplexityText
            condition={isMatching}
            message="Inputs must match"
          ></PasswordComplexityText>
        )}
      </View>
      <View>
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
