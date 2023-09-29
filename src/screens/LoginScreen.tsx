import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import { View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import Login from '../components/Login';
import Account from '../components/Account';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Login />
      )}
    </View>
  );
}
