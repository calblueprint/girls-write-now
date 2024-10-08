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
import { Channel, usePubSub } from '../../../utils/PubSubContext';

/*
 * This screen displays the user's saved and favorited stories.
 * The screen recieves updates from PreviewCard and ContentCard from the PubSubContext via the usePubSub hook. If a story is favorited, the channel will be updated, and a useEffect is triggered. The screen is updated after 4 seconds of the update. This is to give the user time to resave a story on the library page if they accidently unsave it.
 */
function LibraryScreen() {
  const { user, guest } = useSession();
  const [favoritesSelected, setFavoritesSelected] = useState(true);
  const [readingSelected, setReadingSelected] = useState(false);
  const [favoriteStories, setFavoriteStories] = useState<StoryPreview[]>([]);
  const [readingListStories, setReadingListStories] = useState<StoryPreview[]>(
    [],
  );
  const { channels } = usePubSub();
  let updateReadingListTimeout: NodeJS.Timeout | null = null;
  let updateFavoritesListTimeout: NodeJS.Timeout | null = null;

  const favoritesPressed = () => {
    setFavoritesSelected(true);
    setReadingSelected(false);
  };

  const readingPressed = () => {
    setFavoritesSelected(false);
    setReadingSelected(true);
  };

  const renderItem = ({ item }: { item: StoryPreview }) => {
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
          tags={item.genre_medium.concat(item.tone).concat(item.topic)}
          pressFunction={() =>
            router.push({
              pathname: '/story',
              params: { storyId: item.id.toString() },
            })
          }
        />
      </View>
    );
  };

  useEffect(() => {
    if (guest) return;
    if (updateFavoritesListTimeout) {
      clearTimeout(updateFavoritesListTimeout);
    }

    updateFavoritesListTimeout = setTimeout(
      () =>
        fetchUserStoriesFavorites(user?.id).then(favoriteStories => {
          setFavoriteStories(favoriteStories);
        }),
      4000,
    );
  }, [channels[Channel.FAVORITES]]);

  useEffect(() => {
    if (guest) return;
    if (updateReadingListTimeout) {
      clearTimeout(updateReadingListTimeout);
    }

    updateReadingListTimeout = setTimeout(
      () =>
        fetchUserStoriesReadingList(user?.id).then(readingList => {
          setReadingListStories(readingList);
        }),
      4000,
    );
  }, [channels[Channel.SAVED_STORIES]]);

  useEffect(() => {
    if (guest) return;

    (async () => {
      await Promise.all([
        fetchUserStoriesFavorites(user?.id).then(favorites =>
          setFavoriteStories(favorites),
        ),
        fetchUserStoriesReadingList(user?.id).then(readingList => {
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
        {favoritesSelected &&
          (favoriteStories.length > 0 ? (
            <FlatList
              data={favoriteStories}
              renderItem={obj => renderItem(obj as any)}
            />
          ) : (
            <View style={{ paddingBottom: 16 }}>
              <Text style={[globalStyles.h3, { textAlign: 'center' }]}>
                {guest ? 'Sign in' : 'Favorited stories'}
              </Text>
              <Text style={[globalStyles.h3, { textAlign: 'center' }]}>
                {guest ? 'to favorite stories.' : 'will appear here.'}
              </Text>
            </View>
          ))}

        {readingSelected &&
          (readingListStories.length > 0 ? (
            <FlatList
              data={readingListStories}
              renderItem={obj => renderItem(obj as any)}
            />
          ) : (
            <View style={{ paddingBottom: 16 }}>
              <Text style={[globalStyles.h3, { textAlign: 'center' }]}>
                {guest}
                {guest ? 'Sign in' : 'Saved stories'}
              </Text>
              <Text style={[globalStyles.h3, { textAlign: 'center' }]}>
                {guest ? 'to save stories.' : 'will appear here.'}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
}

export default LibraryScreen;
