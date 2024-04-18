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

      <View style={{ width: '100%', flex: 1, marginBottom: 100 }}>
        {favoritesSelected && (
          <FlatList
            data={favoriteStories}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: 24 }}>
                  <PreviewCard
                    key={item.title}
                    storyId={item.id}
                    title={item.title}
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
                </View>
              );
            }}
          />
        )}

        {readingSelected && (
          <FlatList
            data={readingListStories}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: 24 }}>
                  <PreviewCard
                    key={item.title}
                    storyId={item.id}
                    defaultSavedStoriesState={true}
                    title={item.title}
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
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

export default LibraryScreen;
