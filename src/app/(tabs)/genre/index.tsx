import { useLocalSearchParams, router } from 'expo-router';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import styles from './styles';
// eslint-disable-next-line import/no-duplicates
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import { fetchGenreStoryPreviews } from '../../../queries/genres';
import { fetchStoryPreviewById } from '../../../queries/stories';
import { GenreStories } from '../../../queries/types';
// eslint-disable-next-line import/no-duplicates
import { StoryPreview } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

function GenreScreen() {
  const [genreStoryInfo, setGenreStoryInfo] = useState<GenreStories>();
  const [genreStoryIds, setGenreStoryIds] = useState<string[]>([]);
  const [allStoryPreviews, setAllStoryPreviews] = useState<StoryPreview[]>();
  const params = useLocalSearchParams<{ genreId: string }>();
  const { genreId } = params;

  console.log('passing in genreId params:', genreId);
  //sets genreStoryInfo to main genre
  useEffect(() => {
    const getGenre = async () => {
      const genreStoryPreviewData: GenreStories = await fetchGenreStoryPreviews(
        parseInt(genreId as string, 10),
      );
      try {
        setGenreStoryInfo(genreStoryPreviewData[0]);
        setGenreStoryIds(genreStoryPreviewData[0]?.genre_story_previews);
        console.log(
          'Testing overall genre Story Info:',
          genreStoryPreviewData[0],
        );
        console.log(
          'testing story id from query:',
          genreStoryPreviewData[0]?.genre_story_previews,
        );
      } catch (error) {
        console.log(
          `There was an error while trying to output authorinfo ${error}`,
        );
      }
    };
    getGenre();
  }, [genreId]);

  //setting storyPreview usestate with all the usestates that should be rendered on the screen
  //TODO: wrap this function to an async awaits for the useeffect before this?
  useEffect(() => {
    const testingFunction2 = () => {
      // eslint-disable-next-line @typescript-eslint/no-for-in-array
      for (const idString in genreStoryIds) {
        const id = parseInt(idString, 10);
        // eslint-disable-next-line no-unused-expressions
        async () => {
          try {
            const storyPreview: StoryPreview = await fetchStoryPreviewById(id);
            setAllStoryPreviews(prevData => prevData?.concat(storyPreview));
            console.log('testing storyPreview outputs:', storyPreview);
          } catch (error) {
            console.log(
              `There was an error while trying to fetch a story preview by id ${error}`,
            );
          }
        };
      }
    };
    testingFunction2();
  }, [genreStoryIds]);

  return (
    <SafeAreaView style={[globalStyles.container, { marginHorizontal: -8 }]}>
      {genreStoryIds.map(id => (
        <Text>{id}</Text>
      ))}
    </SafeAreaView>
  );
}

export default GenreScreen;
