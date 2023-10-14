import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, ScrollView, Platform } from 'react-native';
import { Button, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import supabase from '../../utils/supabase';
import UserStringInput from '../../components/UserStringInput';
import { useSession } from '../../utils/AuthContext';
import { Redirect } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

function OnboardingScreen() {
  const { session, signOut } = useSession();

  if (!session) {
    return <Redirect href={'/auth/login'} />;
  }

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

      if (error && status !== 406) {
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

  useEffect(() => {
    if (session) getProfile();
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

        if (error) throw error;
      } else {
        // Create user if they don't exist
        const { error } = await supabase.from('profiles').insert(updates);

        if (error) throw error;
      }

      Alert.alert('Succesfully updated user!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <UserStringInput
        label="First Name"
        value={firstName}
        onChange={setFirstName}
      />
      <UserStringInput
        label="Last Name"
        value={lastName}
        onChange={setLastName}
      />
      <UserStringInput label="Gender" value={gender} onChange={setGender} />
      <UserStringInput
        label="Race/Ethnicity"
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={updateProfile}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </ScrollView>
  );
}

export default OnboardingScreen;
