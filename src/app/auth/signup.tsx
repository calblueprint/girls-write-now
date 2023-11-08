import { Redirect, Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';

import Icon from '../../../assets/icons';
import color from '../../styles/colors';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';

function SignUpScreen() {
  const { session, signUp } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordComplexity, setPasswordComplexity] = useState(false);

  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLength, setHasLength] = useState(false);

  useEffect(() => {
    if (hasUppercase && hasLowercase && hasNumber && hasLength) {
      setPasswordComplexity(true);
    } else {
      setPasswordComplexity(false);
    }
  }, [hasUppercase, hasLowercase, hasNumber, hasLength]);

  if (session) {
    return <Redirect href="/home" />;
  }

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
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) Alert.alert(error.message);
    else router.replace('/auth/verify');

    setLoading(false);
  };

  return (
    <View style={globalStyles.auth_container}>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>

      <View style={globalStyles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => checkPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <View>
        {password !== '' && (
          <View style={globalStyles.passwordComplexity}>
            <Icon type={hasUppercase ? 'green_check' : 'red_x'} />
            <Text
              style={
                hasUppercase
                  ? { color: colors.textGreen }
                  : { color: colors.textRed }
              }
            >
              At least 1 uppercase letter.
            </Text>
          </View>
        )}
        {password !== '' && (
          <View style={globalStyles.passwordComplexity}>
            <Icon type={hasLowercase ? 'green_check' : 'red_x'} />
            <Text
              style={
                hasLowercase
                  ? { color: colors.textGreen }
                  : { color: colors.textRed }
              }
            >
              At least 1 lowercase letter.
            </Text>
          </View>
        )}
        {password !== '' && (
          <View style={globalStyles.passwordComplexity}>
            <Icon type={hasNumber ? 'green_check' : 'red_x'} />
            <Text
              style={
                hasNumber
                  ? { color: colors.textGreen }
                  : { color: colors.textRed }
              }
            >
              At least 1 number.
            </Text>
          </View>
        )}
        {password !== '' && (
          <View style={globalStyles.passwordComplexity}>
            <Icon type={hasLength ? 'green_check' : 'red_x'} />
            <Text
              style={
                hasLength
                  ? { color: colors.textGreen }
                  : { color: colors.textRed }
              }
            >
              At least 8 characters.
            </Text>
          </View>
        )}
      </View>

      <View>
        <Link href="/auth/login">Already have an account? Log In</Link>
        <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
          <Button
            title="Sign Up"
            disabled={!passwordComplexity || loading}
            onPress={signUpWithEmail}
          />
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;
