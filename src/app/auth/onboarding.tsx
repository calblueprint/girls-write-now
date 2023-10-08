import { View } from 'react-native';
import Login from '../../components/Login';
import Account from '../../components/Account';
import { useSession } from '../../utils/AuthContext';

function OnboardingScreen() {
  const { session } = useSession();

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} /> : <Login />}
    </View>
  );
}

export default OnboardingScreen;
