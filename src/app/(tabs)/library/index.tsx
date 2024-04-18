import { Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useSession } from '../../../utils/AuthContext';
import { router } from 'expo-router';

import globalStyles from '../../../styles/globalStyles';
import styles from './styles';
import LibraryHeader from '../../../components/LibraryHeader/LibraryHeader';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import { StoryPreview } from '../../../queries/types';
import {
  fetchUserStoriesFavorites,
  fetchUserStoriesReadingList,
} from '../../../queries/savedStories';
import { FlatList } from 'react-native-gesture-handler';

function LibraryScreen() {
  const { user } = useSession();
  const [favoritesSelected, setFavoritesSelected] = useState(true);
  const [readingSelected, setReadingSelected] = useState(false);
  const [favoriteStories, setFavoriteStories] = useState<StoryPreview[]>([]);
  const [readingListStories, setReadingListStories] = useState<StoryPreview[]>(
    [],
  );

  const favoritesPressed = () => {
    setFavoritesSelected(true);
    setReadingSelected(false);
    console.log(favoriteStories);
  };

  const readingPressed = () => {
    setFavoritesSelected(false);
    setReadingSelected(true);
    console.log(readingListStories);
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        fetchUserStoriesFavorites(user?.id).catch(favorites =>
          setFavoriteStories(favorites),
        ),
        fetchUserStoriesReadingList(user?.id).catch(readingList =>
          setReadingListStories(readingList),
        ),
      ]);
    })().finally(() => {});
  }, [user]);

  return (
    <View style={styles.container}>
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
        bounces={true}
        style={styles.scrollView}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {favoritesSelected && favoriteStories.length > 0 && (
          <View>
            <FlatList
              data={favoriteStories}
              renderItem={({ item }) => {
                return (
                  <PreviewCard
                    key={item.title}
                    title={item.title}
                    storyId={item.id}
                    image={item.featured_media}
                    author={item.author_name}
                    authorImage={item.author_image}
                    excerpt={item.excerpt}
                    tags={item.genre_medium
                      .concat(item.tone)
                      .concat(item.topic)}
                    pressFunction={() =>
                      router.push({
                        pathname: '/story',
                        params: { storyId: item.id.toString() },
                      })
                    }
                  />
                );
              }}
            />
          </View>
        )}

        {readingSelected && readingListStories.length > 0 && (
          <View>
            <FlatList
              data={readingListStories}
              renderItem={({ item }) => {
                return (
                  <PreviewCard
                    key={item.title}
                    title={item.title}
                    storyId={item.id}
                    image={item.featured_media}
                    author={item.author_name}
                    authorImage={item.author_image}
                    excerpt={item.excerpt}
                    tags={item.genre_medium
                      .concat(item.tone)
                      .concat(item.topic)}
                    pressFunction={() =>
                      router.push({
                        pathname: '/story',
                        params: { storyId: item.id.toString() },
                      })
                    }
                  />
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default LibraryScreen;
