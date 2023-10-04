import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Account from '../../components/Account';
import Login from '../../components/Login';
import supabase from '../../utils/supabase';

function SignUpScreen() {
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

export default SignUpScreen;
