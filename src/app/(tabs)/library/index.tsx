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
  };

  const readingPressed = () => {
    setFavoritesSelected(false);
    setReadingSelected(true);
  };

  useEffect(() => {
    (async () => {
      const [favoriteStoriesResponse, readingListStoriesResponse] =
        await Promise.all([
          fetchUserStoriesFavorites(user?.id).catch(() => []),
          fetchUserStoriesReadingList(user?.id).catch(() => []),
        ]);
      setFavoriteStories(favoriteStoriesResponse);
      setReadingListStories(readingListStoriesResponse);
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
            {favoriteStories.map(story => (
              <PreviewCard
                key={story.title}
                title={story.title}
                image={story.featured_media}
                author={story.author_name}
                authorImage={story.author_image}
                excerpt={story.excerpt}
                tags={story.genre_medium.concat(story.tone).concat(story.topic)}
                pressFunction={() =>
                  router.push({
                    pathname: '/story',
                    params: { storyId: story.id.toString() },
                  })
                }
              />
            ))}
          </View>
        )}

        {readingSelected && readingListStories.length > 0 && (
          <View>
            {readingListStories.map(story => (
              <PreviewCard
                key={story.title}
                title={story.title}
                image={story.featured_media}
                author={story.author_name}
                authorImage={story.author_image}
                excerpt={story.excerpt}
                tags={story.genre_medium.concat(story.tone).concat(story.topic)}
                pressFunction={() =>
                  router.push({
                    pathname: '/story',
                    params: { storyId: story.id.toString() },
                  })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default LibraryScreen;
