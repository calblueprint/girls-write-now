import DateTimePicker from '@react-native-community/datetimepicker';
import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Alert, Platform } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserStringInput from '../components/UserStringInput';
import globalStyles from '../styles/globalStyles';
import { useSession } from '../utils/AuthContext';
import supabase from '../utils/supabase';
import StyledButton from '../components/StyledButton';

function SettingsScreen() {
  const { session, signOut } = useSession();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, birthday, gender, race_ethnicity`)
        .eq('user_id', session?.user.id)
        .single();

      if (error && status !== 406 && error instanceof Error) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name || firstName);
        setLastName(data.last_name || lastName);
        setBirthday(new Date(data.birthday) || birthday);
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

      Alert.alert('Succesfully updated account!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Settings</Text>
      <UserStringInput
        placeholder="Email"
        value={session?.user?.email ?? ''}
        attributes={{
          editable: false,
        }}
      />
      <UserStringInput
        placeholder="First Name"
        value={firstName}
        onChange={setFirstName}
      />
      <UserStringInput
        placeholder="Last Name"
        value={lastName}
        onChange={setLastName}
      />
      <UserStringInput
        placeholder="Gender"
        value={gender}
        onChange={setGender}
      />
      <UserStringInput
        placeholder="Race/Ethnicity"
        value={raceEthnicity}
        onChange={setRaceEthnicity}
      />

      {Platform.OS !== 'ios' && (
        <Button
          title="Change Birthday"
          onPress={() => setShowDatePicker(true)}
        />
      )}
      {showDatePicker && (
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
      )}
      <StyledButton
        text={loading ? 'Loading ...' : 'Update profile'}
        onPress={updateProfile}
        disabled={loading}
      />
      <StyledButton text={'Sign Out'} onPress={signOut} disabled={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
});

export default SettingsScreen;
