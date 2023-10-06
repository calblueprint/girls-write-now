import { Link } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../globalStyles';

function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.h1}>Home</Text>
      <Link href="/settings" asChild>
        <Button title="Settings" />
      </Link>
    </SafeAreaView>
  );
}

export default HomeScreen;
