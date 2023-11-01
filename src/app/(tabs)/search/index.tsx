import { Link } from 'expo-router';
import { useState } from 'react';
import { Button, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterModal from '../../../components/FilterModal/FilterModal';
import globalStyles from '../../../styles/globalStyles';

function SearchScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <SafeAreaView style={globalStyles.container}>
      {filterVisible && <SafeAreaView style={[styles.greyOverlay]} />}
      <Text style={globalStyles.h1}>Search</Text>
      <Link href="/search/story" asChild>
        <Button title="Story" />
      </Link>

      <Button
        title="Show Filter Modal"
        onPress={() => setFilterVisible(true)}
      />
      <FilterModal
        isVisible={filterVisible}
        setIsVisible={setFilterVisible}
        title="Genre"
      />
    </SafeAreaView>
  );
}

export default SearchScreen;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  greyOverlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    width,
    height,
    zIndex: 1,
  },
});
