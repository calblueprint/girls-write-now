import { Text, View, Pressable, ScrollView } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
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
        fetchUserStoriesFavorites(user?.id).then(favorites =>
          setFavoriteStories(favorites),
        ),
        fetchUserStoriesReadingList(user?.id).then(readingList => {
          console.log(readingList);
          setReadingListStories(readingList);
        }),
      ]);
    })();
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
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <View>
          {useMemo(() => {
            return (
              favoriteStories.map(story => (
                <PreviewCard
                  key={story.title}
                  storyId={story.id}
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
              )))
          }, [favoriteStories])}
        </View>

        <View>
          {useMemo(() => {
            return (
              readingListStories.map(story => (
                <PreviewCard
                  key={story.title}
                  storyId={story.id}
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
              )))
          }, [favoriteStories])}
        </View>
      </ScrollView>
    </View>
  );
}

export default LibraryScreen;
