import { useLocalSearchParams, router } from 'expo-router';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import styles from './styles';
import globalStyles from '../../../styles/globalStyles';
import { fetchGenreStoryPreviews } from '../../../queries/genres';
import { fetchStoryPreviewById } from '../../../queries/stories';
import { GenreStories } from '../../../queries/types';

//for each
function GenreScreen() {
  const [genreStoryInfo, setGenreStoryInfo] = useState<GenreStories>();
  const [genreStoryIds, setGenreStoryIds] = useState<string[]>([]);
  const params = useLocalSearchParams<{ genreId: string }>();
  const { genreId } = params;

  //sets genreStoryInfo to main genre
  useEffect(() => {
    async () => {
      const genreStoryPreviewData: GenreStories = await fetchGenreStoryPreviews(
        parseInt(genreId as string, 10),
      );
      try {
        setGenreStoryInfo(genreStoryPreviewData);
      } catch (error) {
        console.log(
          `There was an error while trying to output authorinfo ${error}`,
        );
      }
    };
  }, [genreId]);

  useEffect(() => {
    if (genreStoryInfo?.genre_story_previews) {
      setGenreStoryIds(genreStoryInfo.genre_story_previews);
    }
  }, [genreStoryInfo]);

  return null;
}

export default GenreScreen;
