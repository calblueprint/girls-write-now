import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import SplashScreen from '../components/SplashScreen/SplashScreen';
import { useSession } from '../utils/AuthContext';
import {
  useFonts,
  Manrope_700Bold,
  Manrope_400Regular,
  Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';

function StartPage() {
  const { session, isLoading } = useSession();
  const [delay, setDelay] = useState(true);
  let [fontsLoaded, fontError] = useFonts({
    'Manrope-Bold': Manrope_700Bold,
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Semibold': Manrope_600SemiBold,
  });

  useEffect(() => {
    if (!delay && !isLoading && fontsLoaded && !fontError) {
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
