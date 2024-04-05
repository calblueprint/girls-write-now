import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState, useMemo, ReactNode } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';
import { fetchGenreStoryById } from '../../../queries/genres';
import { fetchStoryPreviewByIds } from '../../../queries/stories';
import { StoryPreview, GenreStories } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';

function GenreScreen() {
  const [genreStoryData, setGenreStoryData] = useState<GenreStories[]>();
  const [genreStoryIds, setGenreStoryIds] = useState<string[]>([]);
  const [subgenres, setSubgenres] = useState<string[]>([]);
  const [allStoryPreviews, setAllStoryPreviews] = useState<StoryPreview[]>([]);
  const [filteredStoryPreviews, setFilteredStoryPreviews] = useState<
    StoryPreview[]
  >([]);
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>('');
  const [mainGenre, setMainGenre] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [toneFilterOptions, setToneFilterOptions] = useState<string[]>([]);
  const [topicFilterOptions, setTopicFilterOptions] = useState<string[]>([]);
  const [selectedTonesForFiltering, setSelectedTonesForFiltering] = useState<
    string[]
  >([]);
  const [selectedTopicsForFiltering, setSelectedTopicsForFiltering] = useState<
    string[]
  >([]);
  const { genreId, genreType, genreName } = useLocalSearchParams<{
    genreId: string;
    genreType: GenreType;
    genreName: string;
  }>();

  // console.log('passing in genreId params:', genreId);
  // console.log('testing passing in genreType', genreType);
  // console.log('testing genreName', genreName);
  useEffect(() => {
    console.log(`Rendering: ${genreId}, ${genreType}, ${genreName}`);
  }, []);

  useEffect(() => {
    const checkTopic = (preview: StoryPreview): boolean => {
      if (preview == null || preview.topic == null) return false;
      if (selectedTopicsForFiltering.length == 0) return true;
      else
        return selectedTopicsForFiltering.every(t => preview.topic.includes(t));
    };
    const checkTone = (preview: StoryPreview): boolean => {
      if (preview == null || preview.tone == null) return false;
      if (selectedTonesForFiltering.length == 0) return true;
      else
        return selectedTonesForFiltering.every(t => preview.tone.includes(t));
    };

    const filteredPreviews = allStoryPreviews.filter(
      preview => checkTopic(preview) && checkTone(preview),
    );
    setFilteredStoryPreviews(filteredPreviews);
  }, [selectedTopicsForFiltering, selectedTonesForFiltering]);

  function getAllStoryIds(genreStories: GenreStories[]): string[] {
    return genreStories
      .map(story => story.genre_story_previews)
      .flat()
      .filter(story => story !== null);
  }

  function filterStoriesBySubgenreName(
    subgenreName: string,
    stories: GenreStories[],
  ): string[] {
    const matchingGenreStory = stories.find(
      subgenre => subgenre.subgenre_name === subgenreName,
    );

    return matchingGenreStory?.genre_story_previews ?? [];
  }

  function getSubgenres(stories: GenreStories[]): string[] {
    const subgenres = stories.map(subgenre => subgenre.subgenre_name);
    return ['All', ...subgenres];
  }

  function filterBySubgenre(subgenre: string) {
    setLoading(true);
    setSelectedSubgenre(subgenre);
    if (!genreStoryData) {
      setLoading(false);
      return [];
    }

    if (subgenre === 'All') {
      setGenreStoryIds(getAllStoryIds(genreStoryData));
    } else {
      const filteredStoryIds = filterStoriesBySubgenreName(
        subgenre,
        genreStoryData,
      );

      setGenreStoryIds(filteredStoryIds);
      setToneFilterOptions([]);
      setTopicFilterOptions([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    const getGenre = async () => {
      setLoading(true);

      const genreStoryData: GenreStories[] = await fetchGenreStoryById(
        parseInt(genreId as string, 10),
      );

      setGenreStoryData(genreStoryData);
      setMainGenre(genreStoryData[0].parent_name);
      setSubgenres(getSubgenres(genreStoryData));

      if (genreType == GenreType.PARENT) {
        console.log(
          'running if check on genreType, populating usestate with all data',
        );
        const allStoryIds = getAllStoryIds(genreStoryData);
        setGenreStoryIds(allStoryIds);
        setSelectedSubgenre('All'); //if user clicks see all, selected should be 'ALL'
      } else if (genreType == GenreType.SUBGENRE) {
        const filteredStoryIds = filterStoriesBySubgenreName(
          genreName || '',
          genreStoryData,
        );
        setGenreStoryIds(filteredStoryIds);
        setSelectedSubgenre(genreName || ''); //if user clicks a specific genre, selected should be genreName

        setLoading(false);
      }
    };
    getGenre();
  }, [genreName]);

  useEffect(() => {
    const showAllStoryPreviews = async () => {
      setLoading(true);

      const previews: StoryPreview[] = await fetchStoryPreviewByIds(
        genreStoryIds as any,
      );

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

      setAllStoryPreviews(previews.flat());
      setFilteredStoryPreviews(previews.flat());
      setTopicFilterOptions([...new Set(topics)]);
      setToneFilterOptions([...new Set(tones)]);

      setLoading(false);
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
            key={index}
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
    console.log(`Selected: ${selectedSubgenre}, mainGenre: ${mainGenre}`);

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

  const renderFilterDropdown = (
    placeholder: string,
    value: string[],
    data: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
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
        renderSelectedItem={() => <View />}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        renderRightIcon={() => <Icon name="arrow-drop-down" type="material" />}
        onChange={item => {
          if (item) {
            setter(item);
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
        data={filteredStoryPreviews}
        style={styles.flatListStyle}
        renderItem={({ item }) => (
          <PreviewCard
            key={item.id}
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
    <SafeAreaView style={[globalStyles.container, { paddingHorizontal: 0 }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BackButton
            pressFunction={() =>
              router.push({
                pathname: '/search',
              })
            }
          />

          {useMemo(renderGenreHeading, [selectedSubgenre, mainGenre])}
          {useMemo(renderGenreScrollSelector, [subgenres])}
        </View>

        <View style={[styles.dropdownContainer, styles.firstDropdown]}>
          {renderFilterDropdown(
            'Tone',
            selectedTonesForFiltering,
            toneFilterOptions,
            setSelectedTonesForFiltering,
          )}
          {renderFilterDropdown(
            'Topic',
            selectedTopicsForFiltering,
            topicFilterOptions,
            setSelectedTopicsForFiltering,
          )}
        </View>

        {genreStoryIds.length === 0 && !isLoading ? (
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

export enum GenreType {
  PARENT = 'parent',
  SUBGENRE = 'subgenre',
}

export default GenreScreen;
