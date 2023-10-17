import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../styles/globalStyles';

function SettingsScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Settings</Text>
    </SafeAreaView>
  );
}

export default SettingsScreen;
