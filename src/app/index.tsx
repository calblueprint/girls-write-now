import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import SplashScreen from '../components/SplashScreen/SplashScreen';
import { useSession } from '../utils/AuthContext';

function StartPage() {
  const { session, isLoading } = useSession();
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDelay(false);
    }, 750);
  }, []);

  if (delay) {
    return <SplashScreen />;
  } else {
    if (isLoading) {
      return <SplashScreen />;
    } else if (session) {
      router.replace('/home');
    } else {
      router.replace('/auth/login');
    }
  }
}

export default StartPage;
