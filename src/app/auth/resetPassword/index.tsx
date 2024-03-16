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
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [isDifferent, setIsDifferent] = useState(true);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (hasUppercase && hasLowercase && hasLength && hasNumber && isDifferent) {
      setPasswordIsValid(true);
    }
  }, [hasUppercase, hasLowercase, hasLength, hasNumber, isDifferent]);

  const checkPassword = (text: string) => {
    if (text !== '') {
      setHasUppercase(text !== text.toLowerCase());
      setHasLowercase(text !== text.toUpperCase());
      setHasNumber(/[0-9]/.test(text));
      setHasLength(text.length >= 8);
      //need to check that it is different from old password
    }
  };

  const checkPasswordMatchesConfirmPassword = (text: string) => {
    if (text !== '') {
      setIsMatching(text == confirmPassword);
    } else {
      setIsMatching(false);
    }
  };

  const checkConfirmPasswordMatchesPassword = (text: string) => {
    if (text !== '') {
      setIsMatching(text == password);
    } else {
      setIsMatching(false);
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
              checkPasswordMatchesConfirmPassword(text);
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

        <PasswordComplexityText
          condition={hasUppercase}
          message="At least 1 uppercase letter"
        />

        <PasswordComplexityText
          condition={hasLowercase}
          message="At least 1 lowercase letter"
        />

        <PasswordComplexityText
          condition={hasNumber}
          message="At least 1 number"
        />

        <PasswordComplexityText
          condition={hasLength}
          message="At least 8 characters"
        />

        {/* functionality for this has not been implemented */}
        <PasswordComplexityText
          condition={isDifferent}
          message="Must be different than your old password"
        />

        {passwordIsValid && (
          <View>
            <View style={styles.newPassword}>
              <UserStringInput
                placeholder="Confirm Password"
                label="Confirm password"
                placeholderTextColor={colors.darkGrey}
                onChange={text => {
                  setConfirmPassword(text);
                  checkConfirmPasswordMatchesPassword(text);
                }}
                value={confirmPassword}
                attributes={{
                  textContentType: 'password',
                  secureTextEntry: confirmPasswordTextHidden,
                }}
              >
                <RNEIcon
                  name={
                    confirmPasswordTextHidden ? 'visibility-off' : 'visibility'
                  }
                  type="material"
                  style={styles.icon}
                  onPress={() =>
                    setConfirmPasswordTextHidden(!confirmPasswordTextHidden)
                  }
                />
              </UserStringInput>
            </View>

            <View>
              {password !== '' && (
                <PasswordComplexityText
                  condition={isMatching}
                  message="Inputs must match"
                />
              )}
            </View>
          </View>
        )}
      </View>
      <View>
        <StyledButton
          disabled={
            !hasLength ||
            !isMatching ||
            !hasLowercase ||
            !hasNumber ||
            !hasUppercase ||
            !isDifferent
          }
          onPress={changePassword}
          text="Update Password"
        />
      </View>
    </View>
  );
}

export default ResetPasswordScreen;
