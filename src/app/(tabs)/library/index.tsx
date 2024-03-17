import { Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';

import globalStyles from '../../../styles/globalStyles';
import styles from './styles';
import LibraryHeader from '../../../components/LibraryHeader/LibraryHeader';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import FavouritesList from './favoritesList';
import ReadingList from './readingList';
import {
  fetchUserStoriesFavorites,
  fetchUserStoriesReadingList,
} from '../../../queries/savedStories';

function LibraryScreen() {
  const [favoritesSelected, setFavoritesSelected] = useState(true);
  const [readingSelected, setReadingSelected] = useState(false);

  const favoritesPressed = () => {
    setFavoritesSelected(true);
    setReadingSelected(false);
  };

  const readingPressed = () => {
    setFavoritesSelected(false);
    setReadingSelected(true);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <LibraryHeader />
      </View>
      <View style={styles.selector}>
        <View style={favoritesSelected && styles.selectedButton}>
          <Pressable onPress={favoritesPressed}>
            <Text
              style={[
                globalStyles.subHeading1,
                favoritesSelected ? styles.selectedText : styles.unselectedText,
              ]}
            >
              Favorites
            </Text>
          </Pressable>
        </View>

        <View style={readingSelected && styles.selectedButton}>
          <Pressable onPress={readingPressed}>
            <View>
              <Text
                style={[
                  globalStyles.subHeading1,
                  readingSelected ? styles.selectedText : styles.unselectedText,
                ]}
              >
                Reading List
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {favoritesSelected && <FavouritesList />}
        {readingSelected && <ReadingList />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default LibraryScreen;
