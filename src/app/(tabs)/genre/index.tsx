import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';
import { fetchGenreStoryPreviews, fetchGenres } from '../../../queries/genres';
import {
  fetchStoryPreviewById,
  fetchStoryPreviewByIds,
} from '../../../queries/stories';
import { StoryPreview, GenreStories, Genre } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';

//TODO figure out the logic for the tone and topic dropdowns, especially when we're dealing with multiselect on both parts

function GenreScreen() {
  const [genreStoryInfo, setGenreStoryInfo] = useState<GenreStories[]>();
  const [genreStoryIds, setGenreStoryIds] = useState<string[]>([]);
  const [subgenres, setSubgenres] = useState<string[]>([]);
  const [allStoryPreviews, setAllStoryPreviews] = useState<StoryPreview[]>([]);
  const [filteredStoryPreviews, setFilteredStoryPreviews] = useState<StoryPreview[]>([]);
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>('');
  const [mainGenre, setMainGenre] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [genreTones, setGenreTones] = useState<string[]>([]);
  const [genreTopics, setGenreTopics] = useState<string[]>([]);
  const [currentTones, setCurrentTones] = useState<string[]>([]);
  const [currentTopics, setCurrentTopics] = useState<string[]>([]);
  const [toneTopicFilters, setToneTopicFilters] = useState<string[]>([]);
  const { genreId, genreType, genreName } = useLocalSearchParams<{
    genreId: string;
    genreType: string;
    genreName: string;
  }>();

  // console.log('passing in genreId params:', genreId);
  // console.log('testing passing in genreType', genreType);
  // console.log('testing genreName', genreName);
  //
  useEffect(() => {
    const checkTopic = (preview: StoryPreview): boolean => {
      if (preview == null) return false;
      if (preview.topic == null) return false;
      if (currentTopics.length == 0) return true;
      else return currentTopics.every(t => preview.topic.includes(t));
    }
    const checkTone = (preview: StoryPreview): boolean => {
      if (preview == null) return false;
      if (preview.tone == null) return false;
      if (currentTones.length == 0) return true;
      else return currentTones.every(t => preview.tone.includes(t));
    }

    const filteredPreviews = allStoryPreviews.filter(preview => checkTopic(preview) && checkTone(preview));
    setFilteredStoryPreviews(filteredPreviews);
  }, [currentTopics, currentTones])

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

  async function filterBySubgenre(filterName: string) {
    setLoading(true);
    setSelectedSubgenre(filterName);
    if (!genreStoryInfo) {
      return [];
    }
    if (filterName === 'All') {
      const storyIds = await getAllStoryIds(genreStoryInfo);
      setGenreStoryIds(storyIds);
    } else {
      const filteredStoryIds = await findStoryIdsByName(
        filterName,
        genreStoryInfo,
      );
      setGenreStoryIds(filteredStoryIds);
      setLoading(false);
      setGenreTones([]);
      setGenreTopics([]);
    }
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

  useEffect(() => {
    const showAllStoryPreviews = async () => {
      setLoading(true);
      if (genreStoryIds.length > 0) {
        const previews: StoryPreview[] =
          await fetchStoryPreviewByIds(genreStoryIds as any);

        const tones: string[] = previews
          .reduce((acc: string[], current: StoryPreview) => {
            return acc.concat(current.tone);
          }, [] as string[])
          .filter(tone => tone !== null);
        const topics: string[] = previews
          .reduce((acc: string[], current: StoryPreview) => {
            return acc.concat(current.topic);
          }, [] as string[])
          .filter(topic => topic !== null)


        console.log('testing storyPreview outputs:', previews);
        setAllStoryPreviews(previews.flat());
        setFilteredStoryPreviews(previews.flat());
        setGenreTopics([...new Set(topics)]);
        setGenreTones([... new Set(tones)]);
        console.log('testing tone usestate');
        setLoading(false);
      } else {
        setLoading(false); //if there are no story IDs, we cannot load anything, there are no results
      }
    };

    if (genreStoryIds.length > 0) {
      showAllStoryPreviews();
    }
  }, [genreStoryIds]);

  const renderGenreScrollSelector = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.scrollViewContainer}
      >
        {subgenres.map((subgenre, index) => (
          <TouchableOpacity
            onPress={() => filterBySubgenre(subgenre)} //onPress will trigger the filterBySubgenre function
            style={{ marginRight: 40 }}
          >
            <Text
              style={selectedSubgenre === subgenre ? styles.textSelected : null}
              key={index}
            >
              {subgenre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderGenreHeading = () => {
    return (
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
    );
  };

  const renderFilterDropdown = (placeholder: string, value: string[], data: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    return (
      <MultiSelect
        mode="default"
        style={[styles.dropdown, styles.secondDropdown]}
        value={value}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={globalStyles.body1}
        inputSearchStyle={globalStyles.body1}
        itemTextStyle={globalStyles.body1}
        dropdownPosition="bottom"
        itemContainerStyle={styles.itemContainer}
        iconStyle={styles.iconStyle}
        data={data.map(topic => {
          return { label: topic, value: topic };
        })}
        renderSelectedItem={() => (< View />)}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        renderRightIcon={() => <Icon name="arrow-drop-down" type="material" />}
        onChange={item => {
          if (item) {
            setter(item); // Use the label property of the selected item
          }
        }}
      />
    );
  }

  const renderNoStoryText = () => {
    return (
      <View>
        <Text style={styles.noStoriesText}>Sorry!</Text>
        <Text style={styles.noStoriesText2}>
          There are no stories under this Genre or Subgenre. Please continue to
          search for other stories
        </Text>
      </View>
    );
  };

  const renderStories = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredStoryPreviews}
        style={styles.flatListStyle}
        renderItem={({ item }) => (
          <PreviewCard
            key={item.title}
            // topic={item.topic}
            // tone={item.tone}
            // genreMedium={item.genre_medium}
            tags={item.genre_medium.concat(item.tone).concat(item.topic)}
            author={item.author_name}
            image={item.featured_media}
            authorImage={item.author_image}
            title={item.title}
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
    );
  };

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

          {renderGenreHeading()}
          {renderGenreScrollSelector()}
        </View>

        <View style={[styles.dropdownContainer, styles.firstDropdown]}>
          {renderFilterDropdown("Tone", currentTones, genreTones, setCurrentTones)}
          {renderFilterDropdown("Topic", currentTopics, genreTopics, setCurrentTopics)}
        </View>

        {genreStoryIds.length === 0 ? ( // Check if there are no story IDs
          renderNoStoryText()
        ) : (
          <>
            <View style={styles.renderStories}>
              {isLoading ? (
                <View>
                  <ActivityIndicator />
                </View>
              ) : (
                renderStories()
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default GenreScreen;
