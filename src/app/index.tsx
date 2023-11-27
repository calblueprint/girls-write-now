import * as Font from 'expo-font';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import SplashScreen from '../components/SplashScreen/SplashScreen';
import { useSession } from '../utils/AuthContext';

async function loadResourcesAsync() {
  await Promise.all([
    // Pre-load other resources (i.e. images) here
    Font.loadAsync({
      'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
      'Manrope-Regular': require('../../assets/fonts/Manrope-Regular.ttf'),
      'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
    }),
  ]).then(() => {
    console.log('loaded fontsnpm');
  });
}

function StartPage() {
  const { session, isLoading } = useSession();
  const [delay, setDelay] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadResourcesAsync();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        // Tell the application to render
        setResourcesLoaded(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (!delay && !isLoading && resourcesLoaded) {
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
