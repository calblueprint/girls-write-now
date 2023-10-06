import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../../globalStyles';

function StoryScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Story</Text>
    </SafeAreaView>
  );
}

export default StoryScreen;
