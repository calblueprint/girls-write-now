import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../../styles/globalStyles';

function SearchScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <Text style={globalStyles.h1}>Welcome, name</Text>
      </View>
      <Link href="/search/story" asChild>
        <Button title="Story" />
      </Link>
    </SafeAreaView>
  );
}

export default SearchScreen;
