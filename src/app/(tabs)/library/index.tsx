import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../../styles/globalStyles';

function LibraryScreen() {
  return (
    <SafeAreaView style={globalStyles.tabBarContainer}>
      <Text style={globalStyles.h1}>Library</Text>
    </SafeAreaView>
  );
}

export default LibraryScreen;
