import { Redirect } from 'expo-router';

import { useSession } from '../utils/AuthContext';

function StartPage() {
  const { session } = useSession();

  if (!session) return <Redirect href="/auth/login" />;
  return <Redirect href="/home" />;
}

export default StartPage;
