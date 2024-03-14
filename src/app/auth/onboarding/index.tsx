import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, Redirect, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert, ScrollView, Platform, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import StyledButton from '../../../components/StyledButton/StyledButton';
import UserSelectorInput from '../../../components/UserSelectorInput/UserSelectorInput';
import UserStringInput from '../../../components/UserStringInput/UserStringInput';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';
import supabase from '../../../utils/supabase';
// import DatePicker from '../../../components/DatePicker/DatePicker';

function OnboardingScreen() {
  const { session, user } = useSession();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

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
        setBirthday('');
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

  // if (!session) {
  //   return <Redirect href="/auth/login" />;
  // }

  return (
    <ScrollView style={styles.container}>
      <Text style={globalStyles.h1}>
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
      <UserStringInput
        label="Birthday"
        placeholder="Select Date"
        // onChange={setBirthday}
        value={birthday}
        placeholderTextColor={colors.darkGrey}
        attributes={{ editable: false }}
      >
        <Icon
          name="calendar-outline"
          type="material-community"
          color={colors.darkGrey}
        />
      </UserStringInput>
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
      {/* Birthday Button Implementation */}
      {/* {showDatePicker && (
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
      )} */}
      <View style={styles.bottomContainer}>
        <View style={styles.updateProfileButton}>
          <StyledButton
            text={loading ? 'Loading ...' : 'Update profile'}
            onPress={updateProfileAndGoHome}
            disabled={
              loading ||
              (gender === '' && pronouns === '' && raceEthnicity === '')
            }
          />
        </View>
        <Link
          style={[globalStyles.bodyBoldUnderline, styles.skipButton]}
          href="/(tabs)/home"
        >
          Skip For Now
        </Link>
      </View>
    </ScrollView>
  );
}

export default OnboardingScreen;
