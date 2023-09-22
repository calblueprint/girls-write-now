import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>The Girls Write Now Team!</Text>
      <Text>Akshay</Text>
      <Text>Brenda</Text>
      <Text>Emily</Text>
      <Text>...</Text>
      <Text>...</Text>
      <Text>...</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
