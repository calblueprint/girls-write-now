import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Session } from '@supabase/supabase-js';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [raceEthnicity, setRaceEthnicity] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
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

  const updateProfile = async ({
    firstName,
    lastName,
    gender,
    birthday,
    raceEthnicity,
  }: {
    firstName: string | undefined;
    lastName: string | undefined;
    gender: string | undefined;
    birthday: Date | undefined;
    raceEthnicity: string | undefined;
  }) => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      // Only update value that are not blank
      let updates = {
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
        let { error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('user_id', session?.user.id)
          .select('*');

        if (error) throw error;
      } else {
        // Create user if they don't exist
        let { error } = await supabase.from('profiles').insert(updates);

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
        set={setFirstName}
      />
      <UserStringInput label="Last Name" value={lastName} set={setLastName} />
      <UserStringInput label="Gender" value={gender} set={setGender} />
      <UserStringInput
        label="Race/Ethnicity"
        value={raceEthnicity}
        set={setRaceEthnicity}
      />

      <DateTimePicker
        testID="dateTimePicker"
        value={birthday}
        mode={'date'}
        onChange={date => {
          setBirthday(new Date(date.nativeEvent.timestamp));
        }}
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({
              firstName,
              lastName,
              gender,
              raceEthnicity,
              birthday,
            })
          }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </ScrollView>
  );
}

type UserDataInputProps = {
  label: string;
  value: string;
  set: React.Dispatch<React.SetStateAction<string>>;
};

const UserStringInput = ({ label, value, set }: UserDataInputProps) => {
  return (
    <View style={styles.verticallySpaced}>
      <Input
        label={label}
        value={value || ''}
        onChangeText={text => set(text)}
      />
    </View>
  );
};

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
