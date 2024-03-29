import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
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
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>('');
  const [mainGenre, setMainGenre] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [genreTones, setgenreTones] = useState<string[]>([]);
  const [genreTopics, setgenreTopics] = useState<string[]>([]);
  const [currTone, setCurrTone] = useState<string>('');
  const [currTopic, setCurrTopic] = useState<string>('');
  const [toneTopicFilters, setToneTopicFilters] = useState<string[]>([]);
  const { genreId, genreType, genreName } = useLocalSearchParams<{
    genreId: string;
    genreType: string;
    genreName: string;
  }>();

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
      setgenreTones([]);
      setgenreTopics([]);
    }
  }

  //will be triggered when users click checkboxes, will concat all of these clicked and added to a usestate?
  //this concatted array will be passed into filterByToneAndTopic array which will go through, genreStoryInfo, and filter
  //out each story based on the array that is passed into this fu
  async function filterByToneAndTopic(filters: string[]) {
    setLoading(true);
    setToneTopicFilters(filters);
    if (!genreStoryInfo) {
      return [];
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
          await fetchStoryPreviewByIds(genreStoryIds);

        const tones: string[] = previews
          .reduce((acc: string[], current: StoryPreview) => {
            return acc.concat(current.tone);
          }, [] as string[])
          .filter(tone => tone !== null);
        const topics: string[] = previews
          .reduce((acc: string[], current: StoryPreview) => {
            return acc.concat(current.topic);
          }, [] as string[])
          .filter(topic => topic !== null);

        // for (const idString of genreStoryIds) {
        //   const id = parseInt(idString, 10);
        //   try {
        //     const storyPreview: StoryPreview[] =
        //       await fetchStoryPreviewById(id);
        //     previews.push(storyPreview[0]);
        //     storyPreview[0].tone.forEach(item => {
        //       tones.push(item);
        //     });
        //     storyPreview[0].topic.forEach(item => {
        //       topics.push(item);
        //     });
        //     console.log('testing storyPreview outputs:', storyPreview);
        //   } catch (error) {
        //     console.log(
        //       `There was an error while trying to fetch a story preview by id: ${error}`,
        //     );
        //   }
        // }
        // const filteredTopics: string[] = topics.filter(
        //   (item): item is string => item !== null,
        // );
        // const filteredTones: string[] = tones.filter(
        //   (item): item is string => item !== null,
        // );

        console.log('testing storyPreview outputs:', previews);
        setAllStoryPreviews(previews.flat());
        setgenreTopics(topics);
        setgenreTones(tones);
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

  const renderTopicDropdown = () => {
    return (
      <Dropdown
        mode="default"
        style={[styles.dropdown, styles.secondDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={globalStyles.body1}
        inputSearchStyle={globalStyles.body1}
        itemTextStyle={globalStyles.body1}
        dropdownPosition="bottom"
        itemContainerStyle={styles.itemContainer}
        iconStyle={styles.iconStyle}
        data={genreTopics.map(topic => {
          return { label: topic, value: topic };
        })}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder="Topic"
        renderRightIcon={() => <Icon name="arrow-drop-down" type="material" />}
        onChange={item => {
          if (item) {
            // Check if item is not null or undefined
            setCurrTopic(item.label); // Use the label property of the selected item
          }
        }}
      />
    );
  };

  const renderToneDropdown = () => {
    return (
      <Dropdown
        mode="default"
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={globalStyles.body1}
        inputSearchStyle={globalStyles.body1}
        itemTextStyle={globalStyles.body1}
        dropdownPosition="bottom"
        itemContainerStyle={styles.itemContainer}
        iconStyle={styles.iconStyle}
        data={genreTones.map(tone => {
          return { label: tone, value: tone };
        })}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder="Tone"
        renderRightIcon={() => <Icon name="arrow-drop-down" type="material" />}
        onChange={item => {
          if (item) {
            // Check if item is not null or undefined
            setCurrTone(item.label); // Use the label property of the selected item
          }
        }}
      />
    );
  };

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
        data={allStoryPreviews}
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
          {renderToneDropdown()}
          {renderTopicDropdown()}
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
