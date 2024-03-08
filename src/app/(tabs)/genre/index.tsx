import { useLocalSearchParams, router } from 'expo-router';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';
import GenreStoryPreviewCard from '../../../components/GenreStoryPreviewCard/GenreStoryPreviewCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import { fetchGenreStoryPreviews, fetchGenres } from '../../../queries/genres';
import { fetchStoryPreviewById } from '../../../queries/stories';
import { StoryPreview, GenreStories, Genre } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

//TODO: Create a storyPreview query function that returns a story or list of stories based on a subgenre rather than main genre

function GenreScreen() {
  const [genreStoryInfo, setGenreStoryInfo] = useState<GenreStories[]>();
  const [genreStoryIds, setGenreStoryIds] = useState<string[]>([]);
  const [subgenres, setSubgenres] = useState<string[]>([]);
  const [allStoryPreviews, setAllStoryPreviews] = useState<StoryPreview[]>([]);
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>('');
  const [mainGenre, setMainGenre] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const params = useLocalSearchParams<{ genreId: string }>();
  const params2 = useLocalSearchParams<{ genreType: string }>();
  const params3 = useLocalSearchParams<{ genreName: string }>();
  const { genreId } = params;
  const { genreType } = params2;
  const { genreName } = params3;

  console.log('passing in genreId params:', genreId);
  console.log('testing passing in genreType', genreType);
  console.log('testing genreName', genreName);

  async function getAllStoryIds(
    genreStories: GenreStories[],
  ): Promise<string[]> {
    const allStoryIds: string[] = [];
    for (const subgenre of genreStories) {
      if (subgenre.genre_story_previews[0] != null) {
        subgenre.genre_story_previews.forEach(id => {
          allStoryIds.push(id);
        });
      }
    }
    return allStoryIds;
  }

  async function findStoryIdsByName(
    subgenre_name: string,
    genreStories: GenreStories[],
  ): Promise<string[]> {
    const filteredStoryIds: string[] = [];
    const matchingGenreStory = genreStories.find(
      subgenre => subgenre.subgenre_name === subgenre_name,
    );
    if (matchingGenreStory?.genre_story_previews[0] != null) {
      matchingGenreStory.genre_story_previews.forEach(id => {
        filteredStoryIds.push(id);
      });
    } else {
      setLoading(false);
      return [];
    }
    console.log('testing find story IDs by Name Function:', filteredStoryIds);
    return filteredStoryIds;
  }

  async function getSubgenres(genreStories: GenreStories[]): Promise<string[]> {
    const subGenres: string[] = [];
    subGenres.push('All');
    for (const subgenre of genreStories) {
      subGenres.push(subgenre.subgenre_name);
    }
    return subGenres;
  }

  useEffect(() => {
    const getGenre = async () => {
      const genreStoryPreviewData: GenreStories[] =
        await fetchGenreStoryPreviews(parseInt(genreId as string, 10));
      const getGenres: string[] = await getSubgenres(genreStoryPreviewData);
      setSubgenres(getGenres);
      setGenreStoryInfo(genreStoryPreviewData);
      setMainGenre(genreStoryPreviewData[0].parent_name);
      if (genreType === 'parent_genre') {
        console.log(
          'running if check on genreType, populating usestate with all data',
        );
        const allStoryIds = await getAllStoryIds(genreStoryPreviewData);
        setGenreStoryIds(allStoryIds);
        setSelectedSubgenre('All'); //if user clicks see all, selected should be 'ALL'
      } else if (genreType === 'subgenre') {
        const filteredStoryIds = await findStoryIdsByName(
          genreName || '',
          genreStoryPreviewData,
        );
        setGenreStoryIds(filteredStoryIds);
        setSelectedSubgenre(genreName || ''); //if user clicks a specific genre, selected should be genreName
      }
    };
    getGenre();
  }, [genreName]);

  async function filterBySubgenre(filter_name: string) {
    setLoading(true);
    setSelectedSubgenre(filter_name);
    if (!genreStoryInfo) {
      return [];
    }
    if (filter_name === 'All') {
      const storyIds = await getAllStoryIds(genreStoryInfo);
      setGenreStoryIds(storyIds);
    } else {
      const filteredStoryIds = await findStoryIdsByName(
        filter_name,
        genreStoryInfo,
      );
      setGenreStoryIds(filteredStoryIds);
      setLoading(false);
    }
  }

  useEffect(() => {
    const showAllStoryPreviews = async () => {
      if (genreStoryIds.length > 0) {
        setLoading(true);
        const previews: StoryPreview[] = [];
        for (const idString of genreStoryIds) {
          const id = parseInt(idString, 10);
          try {
            const storyPreview: StoryPreview = await fetchStoryPreviewById(id);
            previews.push(storyPreview);
            console.log('testing storyPreview outputs:', storyPreview);
          } catch (error) {
            console.log(
              `There was an error while trying to fetch a story preview by id: ${error}`,
            );
          }
        }
        setAllStoryPreviews(previews.flat());
        setLoading(false);
      } else {
        setLoading(false); //if there are no story IDs, we cannot load anything, there are no results
      }
    };

    if (genreStoryIds.length > 0) {
      showAllStoryPreviews();
    }
  }, [genreStoryIds]);

  return (
    <SafeAreaView style={[globalStyles.container, { marginHorizontal: -8 }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BackButton
            pressFunction={() =>
              router.push({
                pathname: '/search',
              })
            }
          />
          <View>
            <Text style={[globalStyles.h1, { marginTop: 15 }]}>
              {selectedSubgenre === 'All' ? mainGenre : selectedSubgenre}
            </Text>
            <Text style={[globalStyles.subHeading1]}>
              {' '}
              Subheading about{' '}
              {selectedSubgenre === 'All' ? mainGenre : selectedSubgenre}
              ...Include Later?
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={styles.scrollViewContainer}
          >
            {subgenres.map((subgenre, index) => (
              <TouchableOpacity
                onPress={() => filterBySubgenre(subgenre)}
                style={{ marginRight: 40 }}
              >
                <Text
                  style={
                    selectedSubgenre === subgenre ? styles.textSelected : null
                  }
                  key={index}
                >
                  {subgenre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {genreStoryIds.length === 0 ? ( // Check if there are no story IDs
          <View>
            <Text style={styles.noStoriesText}>Sorry!</Text>
            <Text style={styles.noStoriesText2}>
              There are no stories under this Genre or Subgenre. Please continue
              to search for other stories
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.renderStories}>
              {isLoading ? (
                <View>
                  <ActivityIndicator />
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={allStoryPreviews}
                  style={styles.flatListStyle}
                  renderItem={({ item }) => (
                    <GenreStoryPreviewCard
                      key={item.title}
                      topic={item.topic}
                      tone={item.tone}
                      genreMedium={item.genre_medium}
                      authorName={item.author_name}
                      storyImage={item.featured_media}
                      authorImage={item.author_image}
                      storyTitle={item.title}
                      excerpt={item.excerpt}
                      pressFunction={() => {
                        router.push({
                          pathname: '/story',
                          params: { storyId: item.id.toString() },
                        });
                      }}
                    />
                  )}
                />
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default GenreScreen;
