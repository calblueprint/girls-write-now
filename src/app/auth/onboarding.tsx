import { View } from 'react-native';

import Account from '../../components/Account';
import Login from '../../components/Login';
import { useSession } from '../../utils/AuthContext';

function OnboardingScreen() {
  const { session } = useSession();

  return (
    <View>{session?.user ? <Account key={session.user.id} /> : <Login />}</View>
  );
}

export default OnboardingScreen;
