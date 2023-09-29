import { useState, useEffect, SetStateAction } from 'react';
import { supabase } from '../lib/supabase';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Session } from '@supabase/supabase-js';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
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
        .select(
          `username, first_name, last_name, birthday, gender, race_ethnicity`,
        )
        .eq('user_id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(`user data on sign in: ${data}`);
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setBirthday(data.birthday);
        setGender(data.gender);
        setRaceEthnicity(data.race_ethnicity);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedInfo: {
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    gender: string | undefined;
    birthday: Date | undefined;
    raceEthnicity: string | undefined;
  }) => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      console.log(session?.user);

      const updates = {
        user_id: session?.user.id,
        first_name: firstName,
        last_name: lastName,
        race_ethnicity: raceEthnicity,
        birthday,
        gender,
      };

      console.log(`updates: ${JSON.stringify(updates)}`);
      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        console.error(error);
        throw error;
      }
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

      <UserStringInput label="Username" value={username} set={setUsername} />
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

      {/* <View style={styles.verticallySpaced}> */}
      {/*   <Input */}
      {/*     label="Birthday" */}
      {/*     value={birthday.toString() || ''} */}
      {/*     onChangeText={date => setBirthday(date)} */}
      {/*   /> */}
      {/* </View> */}

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({
              username,
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
