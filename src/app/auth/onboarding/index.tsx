import { Redirect, router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View,
  Pressable,
  Appearance,
} from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import colors from '../../../styles/colors';
import StyledButton from '../../../components/StyledButton/StyledButton';
import UserSelectorInput from '../../../components/UserSelectorInput/UserSelectorInput';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import supabase from '../../../utils/supabase';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function OnboardingScreen() {
  const { session, user } = useSession();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthdayExists, setBirthdayExists] = useState(false);
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date(2000, 0));
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(
          `first_name, last_name, username, pronouns, birthday, gender, race_ethnicity`,
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
        setPronouns(data.pronouns || pronouns);
        if (data.birthday) {
          setBirthday(
            new Date(data.birthday).toLocaleDateString('en-US', {
              timeZone: 'UTC',
            }) || birthday,
          );
          setBirthdayExists(true);
        }
        setGender(data.gender || gender);
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

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const updateProfileAndGoHome = async () => {
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

      Alert.alert('Succesfully updated user!');
      router.replace('/home');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onConfirmDate = (date: Date) => {
    setBirthday(date.toLocaleDateString());
    setDisplayDate(date);
    setBirthdayExists(true);
    setShowDatePicker(false);
  };

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={onConfirmDate}
          onCancel={() => setShowDatePicker(false)}
          date={displayDate}
          display="inline"
          isDarkModeEnabled={isDark}
          themeVariant={isDark ? 'dark' : 'light'}
        />
        <Text style={[globalStyles.h1, styles.h1]}>
          Welcome, {user?.user_metadata.username}
        </Text>
        <Text style={[globalStyles.body1, styles.body1]}>
          Input your profile information below.
        </Text>
        <View style={styles.info}>
          <Icon type="material" name="info-outline" color="#797979" />
          <Text style={[globalStyles.subtext, styles.subtext]}>
            This information is only used for outreach efforts, and will not be
            visible to other users on the app.
          </Text>
        </View>

        <View style={styles.datePickerButton}>
          <Pressable
            onPress={() => {
              setShowDatePicker(!showDatePicker);
            }}
          >
            <View pointerEvents="none">
              <UserStringInput
                placeholderTextColor={colors.darkGrey}
                placeholder="Select Date"
                label="Birthday"
                value={birthday}
              />
            </View>
          </Pressable>
        </View>

        <UserSelectorInput
          options={['Female', 'Male', 'Prefer Not to Disclose', 'Other']}
          label="Gender"
          value={gender}
          setValue={setGender}
        />
        <UserSelectorInput
          options={['she/her', 'he/him', 'they/them', 'Other']}
          label="Pronouns"
          value={pronouns}
          setValue={setPronouns}
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
          setValue={setRaceEthnicity}
        />
      </View>
      <View>
        <StyledButton
          text={loading ? 'Loading ...' : 'Update Profile'}
          onPress={updateProfileAndGoHome}
          disabled={loading}
        />
        <StyledButton
          text="Skip"
          onPress={() => router.replace('/home')}
          disabled={false}
        />
      </View>
    </ScrollView>
  );
}

export default OnboardingScreen;
