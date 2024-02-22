import DateTimePicker from '@react-native-community/datetimepicker';
import { Redirect, router, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Alert, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import AccountDataDisplay from '../../components/AccountDataDisplay/AccountDataDisplay';
import StyledButton from '../../components/StyledButton/StyledButton';
import UserSelectorInput from '../../components/UserSelectorInput/UserSelectorInput';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import supabase from '../../utils/supabase';

function SettingsScreen() {
  const { session, signOut } = useSession();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');

  const [showSaveEdits, setShowSaveEdits] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const wrapInDetectChange = (onChange: (_: any) => any) => {
    return (value: any) => {
      setShowSaveEdits(true);
      return onChange(value);
    };
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(
          `first_name, last_name, username, birthday, gender, race_ethnicity`,
        )
        .eq('user_id', session?.user.id)
        .single();

      if (error && status !== 406 && error instanceof Error) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name || firstName);
        setLastName(data.last_name || lastName);
        setUsername(data.username || username);

        if (data.birthday) {
          setBirthday(new Date(data.birthday));
          setShowDatePicker(false);
        } else {
          setShowDatePicker(true);
        }

        setGender(data.gender || gender);
        // setPronouns(data.pronouns || pronouns);
        setRaceEthnicity(data.race_ethnicity || raceEthnicity);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(`Get profile error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetAndPushToRouter = (path: string) => {
    while (router.canGoBack()) {
      router.back();
    }
    router.replace(path);
  };

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  useEffect(() => {
    if (!session) resetAndPushToRouter('/auth/login');
  }, [session]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      // Only update values that are not blank
      const updates = {
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName }),
        ...(gender && { gender }),
        ...(pronouns && { pronouns }),
        ...(raceEthnicity && { race_ethnicity: raceEthnicity }),
        ...(birthday && { birthday }),
      };

      // Check if user exists
      const { count } = await supabase
        .from('profiles')
        .select(`*`, { count: 'exact' })
        .eq('user_id', session?.user.id);

      if (count && count >= 1) {
        // Update user if they exist
        const { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('user_id', session?.user.id)
          .select('*');

        if (error && error instanceof Error) throw error;
      } else {
        // Create user if they don't exist
        const { error } = await supabase.from('profiles').insert(updates);

        if (error && error instanceof Error) throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      setShowSaveEdits(false);
    }
  };

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Link href="/home" style={styles.back}>
        <Text>{'<Back'}</Text>
      </Link>

      <ScrollView bounces={false} contentContainerStyle={styles.main}>
        <View>
          <Text style={styles.heading}>Settings</Text>
          <Text style={styles.subheading}>Account</Text>

          <View style={styles.staticData}>
            <AccountDataDisplay label="First Name" value={firstName} />
            <AccountDataDisplay label="Last Name" value={lastName} />
            <AccountDataDisplay label="Username" value={username} />
            <AccountDataDisplay
              label="Birthday"
              value={
                showDatePicker ? (
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={birthday}
                      mode="date"
                      onChange={date => {
                        setShowDatePicker(Platform.OS === 'ios');
                        if (date.nativeEvent.timestamp) {
                          setBirthday(new Date(date.nativeEvent.timestamp));
                        }
                      }}
                    />
                    {Platform.OS !== 'ios' && (
                      <Button
                        title="Change Birthday"
                        onPress={() => setShowDatePicker(true)}
                      />
                    )}
                  </View>
                ) : (
                  birthday.toLocaleDateString().toString()
                )
              }
            />
          </View>

          <UserSelectorInput
            options={['Female', 'Male', 'Prefer Not to Disclose', 'Other']}
            label="Gender"
            value={gender}
            setValue={wrapInDetectChange(setGender)}
          />
          <UserSelectorInput
            options={['she/her', 'he/him', 'they/them', 'Other']}
            label="Pronouns"
            value={pronouns}
            setValue={wrapInDetectChange(setPronouns)}
          />
          <UserSelectorInput
            options={[
              'American Indian/Alaska Native',
              'Asian',
              // 'Black or African American',
              'Native Hawaiian or other Pacific Islander',
              'White',
              'Prefer Not to Disclose',
            ]}
            label="Race/Ethnicity"
            value={raceEthnicity}
            setValue={wrapInDetectChange(setRaceEthnicity)}
          />
        </View>
        <View style={styles.button}>
          {showSaveEdits ? (
            <StyledButton
              text="Save Edits"
              onPress={updateProfile}
              disabled={loading}
            />
          ) : (
            <StyledButton
              text="Sign Out"
              onPress={signOut}
              disabled={loading}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;
