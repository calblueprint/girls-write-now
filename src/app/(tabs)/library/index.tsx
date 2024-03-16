import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../../styles/globalStyles';
import LibraryHeader from '../../../components/LibraryHeader/LibraryHeader';

function LibraryScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ flex: 1 }}>
        <LibraryHeader />
      </View>
    </SafeAreaView>
  );
}

export default LibraryScreen;
