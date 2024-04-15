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
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import { fetchGenreStoryById } from '../../../queries/genres';
import { fetchStoryPreviewByIds } from '../../../queries/stories';
import { StoryPreview, GenreStories } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

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

  useEffect(() => {
    const checkTopic = (preview: StoryPreview): boolean => {
      if (preview?.topic == null) return false;
      if (selectedTopicsForFiltering.length == 0) return true;
      else
        return selectedTopicsForFiltering.every(t => preview.topic.includes(t));
    };
    const checkTone = (preview: StoryPreview): boolean => {
      if (preview?.tone == null) return false;
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
        setSelectedSubgenre('All'); //if user clicks see all, selected should be 'ALL'
        setGenreStoryIds(getAllStoryIds(genreStoryData));
      } else if (genreType == GenreType.SUBGENRE) {
        setSelectedSubgenre(genreName || ''); //if user clicks a specific genre, selected should be genreName

        const filteredStoryIds = filterStoriesBySubgenreName(
          genreName || '',
          genreStoryData,
        );
        setGenreStoryIds(filteredStoryIds);

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
            style={{ paddingHorizontal: 20, paddingTop: 5 }}
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
    return (
      <View>
        <Text style={globalStyles.h1}>
          {selectedSubgenre === 'All' ? mainGenre : selectedSubgenre}
        </Text>
        {/* <Text style={[globalStyles.subHeading1]}> */}
        {/* {' '} */}
        {/* Subheading about{' '} */}
        {/* {selectedSubgenre === 'All' ? mainGenre : selectedSubgenre} */}
        {/* ...Include Later? */}
        {/* </Text> */}
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
    <SafeAreaView
      style={[globalStyles.tabBarContainer, { paddingHorizontal: 0 }]}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BackButton pressFunction={() => router.back()} />

          {useMemo(renderGenreHeading, [selectedSubgenre, mainGenre])}
          {useMemo(renderGenreScrollSelector, [subgenres, selectedSubgenre])}
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
