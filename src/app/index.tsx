import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import SplashScreen from '../components/SplashScreen/SplashScreen';
import { useSession } from '../utils/AuthContext';

function StartPage() {
  const { session, isLoading } = useSession();
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    if (!delay && !isLoading) {
      if (session) {
        router.replace('/home');
      } else {
        router.replace('/auth/login');
      }
    }
    const timer = setTimeout(() => {
      setDelay(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return <SplashScreen />;
}

export default StartPage;
