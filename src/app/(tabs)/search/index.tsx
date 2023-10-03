import { Text, Button } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../../globalStyles';

function SearchScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Search</Text>
      <Link href="/search/story" asChild>
        <Button title="Story" />
      </Link>
    </SafeAreaView>
  );
}

export default SearchScreen;
