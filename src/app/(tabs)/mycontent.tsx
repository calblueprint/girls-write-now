import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../styles/globalStyles';

function MyContentScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>My Content</Text>
    </SafeAreaView>
  );
}

export default MyContentScreen;
