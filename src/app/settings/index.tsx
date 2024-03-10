import { Redirect, router, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Alert, Platform, Pressable } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-neat-date-picker';
import { Icon } from 'react-native-elements';

import styles from './styles';
import colors from '../../styles/colors';
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
  const [birthday, setBirthday] = useState('');
  const [birthdayExists, setBirthdayExists] = useState(false);
  const [birthdayChanged, setBirthdayChanged] = useState(false);
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');

  const [showSaveEdits, setShowSaveEdits] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
          setBirthday(data.birthday);
          setBirthdayExists(true);
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

  const onConfirmDate = (output: any) => {
    setBirthday(
      new Date(output.dateString).toLocaleDateString('en-US', {
        timeZone: 'UTC',
      }),
    );
    setShowDatePicker(false);
    setShowSaveEdits(true);
    setBirthdayChanged(true);
  };

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView
      style={globalStyles.container}
      edges={['right', 'left', 'top']}
    >
      <ScrollView bounces={false} contentContainerStyle={styles.main}>
        <View>
          <Link href="/home" style={styles.back}>
            <Text>{'<Back'}</Text>
          </Link>
          <View style={styles.datePicker}>
            <DatePicker
              isVisible={showDatePicker}
              mode={'single'}
              onCancel={() => {
                setShowDatePicker(false);
              }}
              onConfirm={onConfirmDate}
              // colorOptions={{headerColor: colors.darkGrey}}
            />
          </View>

          <Text style={[globalStyles.h1, styles.heading]}>Settings</Text>
          <Text style={[globalStyles.h2, styles.subheading]}>Account</Text>

          <View style={styles.staticData}>
            <AccountDataDisplay label="First Name" value={firstName} />
            <AccountDataDisplay label="Last Name" value={lastName} />
            <AccountDataDisplay label="Username" value={username} />
            <AccountDataDisplay
              label="Birthday"
              value={
                birthdayExists ? (
                  <View style={styles.dateButton}>
                    <Pressable
                      onPress={() => {
                        setShowDatePicker(true);
                      }}
                    >
                      <View style={styles.dateButtonText}>
                        <Text style={globalStyles.body1}>
                          {birthdayChanged ? birthday : 'Select Date'}
                        </Text>
                        <Icon
                          name="event"
                          type="material"
                          color={colors.darkGrey}
                          style={styles.icon}
                        ></Icon>
                      </View>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.dateButton}>
                    <Text style={globalStyles.body1}>{birthday}</Text>
                  </View>
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
          {birthdayChanged && (
            <View style={styles.info}>
              <Icon type="material" name="info-outline" color="#797979" />
              <Text style={[globalStyles.subtext, styles.subtext]}>
                You can only input your birthday once. Please make sure the date
                is correct before saving as you will not be able to change your
                birthday in the future.
              </Text>
            </View>
          )}
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
