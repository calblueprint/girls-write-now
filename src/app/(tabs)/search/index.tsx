import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import GenreCard from '../../../components/GenreCard/GenreCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import RecentSearchCard from '../../../components/RecentSearchCard/RecentSearchCard';
import { fetchGenres } from '../../../queries/genres';
import { fetchAllStoryPreviews } from '../../../queries/stories';
import {
  StoryPreview,
  RecentSearch,
  Genre,
  StoryPreviewWithPreloadedReactions,
} from '../../../queries/types';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import { GenreType } from '../genre';
import {
  FilterDropdown,
  FilterSingleDropdown,
} from '../../../components/FilterDropdown/FilterDropdown';
import { Icon } from 'react-native-elements';

const getRecentSearch = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('GWN_RECENT_SEARCHES_ARRAY');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error(error);
  }
};

const setRecentSearch = async (searchResult: RecentSearch[]) => {
  try {
    const jsonValue = JSON.stringify(searchResult);
    await AsyncStorage.setItem('GWN_RECENT_SEARCHES_ARRAY', jsonValue);
  } catch (error) {
    console.error(error);
  }
};

const getRecentStory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('GWN_RECENT_STORIES_ARRAY');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error(error);
  }
};

const setRecentStory = async (recentStories: StoryPreview[]) => {
  try {
    const jsonValue = JSON.stringify(recentStories);
    await AsyncStorage.setItem('GWN_RECENT_STORIES_ARRAY', jsonValue);
  } catch (error) {
    console.error(error);
  }
};

/*
 * This screen handles all the story searching. It initially loads all stories, and functions to filter the stories.
 * When the user first lands on the page, or if the "cancel" button on the search bar is clicked, all the genres tiles are shown. Using the genre dropdown is equivilent to clicking on a genre tile in this state.
 * When a genre tile is selected, the user is redirected to the genre screen.
 * When the user starts using the search bar, the stories are filtered based on the search. The user can further filter down the search based on the genre/topic/tone dropdowns. All filters must match for a story to be shown. Only genres/topics/tones that return results based on ONLY the text search are shown in the dropdown. Selected genre/topic/tone dropdowns will not affect the options in the dropdowns, only changing the search text. Selecting an option changes the color of the dropdown.
 * Stories are preloaded with reaction to reduce the amount of network requests sent to supabase.
 */
function SearchScreen() {
  const [allStories, setAllStories] = useState<
    StoryPreviewWithPreloadedReactions[]
  >([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [searchResults, setSearchResults] = useState<
    StoryPreviewWithPreloadedReactions[]
  >([]);
  const [unfilteredSearchResults, setUnfilteredSearchResults] = useState<
    StoryPreviewWithPreloadedReactions[]
  >([]);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showGenreCarousals, setShowGenreCarousals] = useState(true);
  const [showRecents, setShowRecents] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<StoryPreview[]>([]);
  const genreColors = [colors.citrus, colors.lime, colors.lilac];
  const [toneFilterOptions, setToneFilterOptions] = useState<string[]>([]);
  const [topicFilterOptions, setTopicFilterOptions] = useState<string[]>([]);
  const [genreFilterOptions, setGenreFilterOptions] = useState<string[]>([]);
  const [selectedTonesForFiltering, setSelectedTonesForFiltering] = useState<
    string[]
  >([]);
  const [selectedTopicsForFiltering, setSelectedTopicsForFiltering] = useState<
    string[]
  >([]);
  const [
    selectedMultipleGenresForFiltering,
    setSelectedMultipleGenresForFiltering,
  ] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const populateFilterDropdowns = (stories: StoryPreview[]) => {
    const tones: string[] = stories
      .reduce((acc: string[], current: StoryPreview) => {
        return acc.concat(current.tone);
      }, [] as string[])
      .filter(tone => tone !== null);
    const topics: string[] = stories
      .reduce((acc: string[], current: StoryPreview) => {
        return acc.concat(current.topic);
      }, [] as string[])
      .filter(topic => topic !== null);
    const genres: string[] = stories
      .reduce((acc: string[], current: StoryPreview) => {
        return acc.concat(current.genre_medium);
      }, [] as string[])
      .filter(genre => genre !== null);

    setGenreFilterOptions([...new Set(genres)]);
    setTopicFilterOptions([...new Set(topics)]);
    setToneFilterOptions([...new Set(tones)]);
  };

  useEffect(() => {
    (async () => {
      fetchAllStoryPreviews().then(
        (stories: StoryPreviewWithPreloadedReactions[]) => {
          setAllStories(stories);
          const tones: string[] = stories
            .reduce((acc: string[], current: StoryPreview) => {
              return acc.concat(current.tone);
            }, [] as string[])
            .filter(tone => tone !== null);
          const topics: string[] = stories
            .reduce((acc: string[], current: StoryPreview) => {
              return acc.concat(current.topic);
            }, [] as string[])
            .filter(topic => topic !== null);

          setTopicFilterOptions([...new Set(topics)]);
          setToneFilterOptions([...new Set(tones)]);
        },
      );

      fetchGenres().then((genres: Genre[]) => {
        setAllGenres(genres);
        const genreOptions: string[] = genres
          .reduce((acc: string[], current: Genre) => {
            return acc.concat(
              current.parent_name,
              current.subgenres.map(subgenre => subgenre.name),
            );
          }, [] as string[])
          .filter(genre => genre !== null);
        setGenreFilterOptions([...new Set(genreOptions)]);
      });
      getRecentSearch().then((searches: RecentSearch[]) =>
        setRecentSearches(searches),
      );
      getRecentStory().then((viewed: StoryPreview[]) =>
        setRecentlyViewed(viewed),
      );
    })().then(() => {});
  }, []);

  useEffect(() => {
    search.length > 0
      ? populateFilterDropdowns(searchResults)
      : populateFilterDropdowns(allStories);
  }, [search]);

  useEffect(() => {
    if (selectedGenre) {
      if (search.length === 0) {
        const subgenreNames = allGenres
          .reduce((acc: string[], current: Genre) => {
            return acc.concat(current.subgenres.map(subgenre => subgenre.name));
          }, [] as string[])
          .filter(genre => genre !== null);

        if (subgenreNames.includes(selectedGenre)) {
          const genre = allGenres.filter(genre =>
            genre.subgenres
              .map(subgenre => subgenre.name)
              .includes(selectedGenre),
          )[0];
          router.push({
            pathname: '/genre',
            params: {
              genreId: genre.parent_id.toString(),
              genreType: GenreType.SUBGENRE,
              genreName: selectedGenre,
            },
          });
        } else {
          const genre = allGenres.filter(
            genre => genre.parent_name === selectedGenre,
          )[0];
          router.push({
            pathname: '/genre',
            params: {
              genreId: genre.parent_id.toString(),
              genreType: GenreType.PARENT,
              genreName: genre.parent_name,
            },
          });
        }
      }
    }
  }, [selectedGenre]);

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
    const checkGenre = (preview: StoryPreview): boolean => {
      if (preview == null || preview.genre_medium == null) return false;
      if (selectedMultipleGenresForFiltering.length == 0) return true;
      else
        return selectedMultipleGenresForFiltering.every(t =>
          preview.genre_medium.includes(t),
        );
    };

    const filteredPreviews = unfilteredSearchResults.filter(
      preview =>
        checkTopic(preview) && checkTone(preview) && checkGenre(preview),
    );
    setSearchResults(filteredPreviews);
  }, [
    selectedTopicsForFiltering,
    selectedTonesForFiltering,
    selectedMultipleGenresForFiltering,
  ]);

  const getColor = (index: number) => {
    return genreColors[index % genreColors.length];
  };

  const searchFunction = (text: string) => {
    if (text === '') {
      setSearch(text);
      setSearchResults([]);
      setUnfilteredSearchResults([]);
      return;
    }

    const updatedData = allStories.filter(item => {
      const title = `${item.title.toUpperCase()})`;
      const author = `${item.author_name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return title.indexOf(text_data) > -1 || author.indexOf(text_data) > -1;
    });

    setSearch(text);
    setSearchResults(updatedData);
    setUnfilteredSearchResults(updatedData);
    setShowGenreCarousals(false);
  };

  const handleCancelButtonPress = () => {
    setSearchResults([]);
    setUnfilteredSearchResults([]);
    setShowGenreCarousals(true);
    setShowRecents(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    setRecentSearch([]);
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    setRecentStory([]);
  };

  const clearFilters = () => {
    setSelectedMultipleGenresForFiltering([]);
    setSelectedTonesForFiltering([]);
    setSelectedTopicsForFiltering([]);
  };

  const searchResultStacking = (
    searchString: string,
    searchResults: number,
  ) => {
    if (searchString !== '') {
      const maxArrayLength = 5;

      const newRecentSearches = [...recentSearches];

      for (let i = 0; i < recentSearches.length; i++) {
        if (searchString === recentSearches[i].value) {
          newRecentSearches.splice(i, 1);
          break;
        }
      }

      if (newRecentSearches.length >= maxArrayLength) {
        newRecentSearches.splice(-1, 1);
      }

      const result: RecentSearch = {
        value: searchString,
        numResults: searchResults,
      };

      newRecentSearches.splice(0, 0, result);

      setRecentSearch(newRecentSearches);
      setRecentSearches(newRecentSearches);
    }
  };

  const recentlyViewedStacking = (story: StoryPreview) => {
    const maxArrayLength = 5;
    const newRecentlyViewed = [...recentlyViewed];

    for (let i = 0; i < recentlyViewed.length; i++) {
      if (story.id === recentlyViewed[i].id) {
        newRecentlyViewed.splice(i, 1);
        break;
      }
    }

    if (newRecentlyViewed.length >= maxArrayLength) {
      newRecentlyViewed.splice(-1, 1);
    }

    newRecentlyViewed.splice(0, 0, story);

    setRecentStory(newRecentlyViewed);
    setRecentlyViewed(newRecentlyViewed);
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.tabBarContainer,
        showGenreCarousals
          ? { marginLeft: -8, marginRight: -32 }
          : { marginHorizontal: -8 },
      ]}
    >
      <View style={[filterVisible ? styles.greyOverlay : styles.noOverlay]} />
      <View style={styles.container}>
        <SearchBar
          platform="ios"
          onCancel={() => handleCancelButtonPress()}
          onFocus={() => {
            setShowRecents(true);
            setShowGenreCarousals(false);
          }}
          searchIcon={
            Platform.OS === 'ios' ? (
              <Icon name="search" color={colors.grey} />
            ) : undefined
          }
          clearIcon={false}
          cancelButtonProps={{
            buttonTextStyle: [globalStyles.body1Bold, styles.cancelButton],
          }}
          containerStyle={[
            styles.searchContainer,
            showGenreCarousals && { marginRight: 24 },
          ]}
          inputContainerStyle={styles.inputContainer}
          inputStyle={globalStyles.body1Bold}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          placeholder="What do you want to read?"
          placeholderTextColor="grey"
          onChangeText={text => searchFunction(text)}
          value={search}
          onSubmitEditing={searchString => {
            searchResultStacking(
              searchString.nativeEvent.text,
              searchResults.length,
            );
          }}
        />

        {(search || showGenreCarousals) && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.dropdownContainer]}
          >
            {search ? (
              <FilterDropdown
                placeholder="Genre"
                value={selectedMultipleGenresForFiltering}
                data={genreFilterOptions}
                setter={setSelectedMultipleGenresForFiltering}
                selectedBorderColor={colors.gwnOrange}
              />
            ) : (
              <FilterSingleDropdown
                placeholder="Genre"
                value={selectedGenre}
                data={genreFilterOptions}
                setter={setSelectedGenre}
              />
            )}

            <FilterDropdown
              placeholder="Topic"
              value={selectedTopicsForFiltering}
              data={topicFilterOptions}
              setter={setSelectedTopicsForFiltering}
              selectedBorderColor={colors.lime}
            />
            <FilterDropdown
              placeholder="Tone"
              value={selectedTonesForFiltering}
              data={toneFilterOptions}
              setter={setSelectedTonesForFiltering}
              selectedBorderColor={colors.lilac}
            />
          </ScrollView>
        )}

        {showRecents &&
          (search && searchResults.length > 0 ? (
            <View style={styles.resultCounter}>
              <Text style={[globalStyles.subHeading1Bold, styles.numDisplay]}>
                Showing results 1-{searchResults.length}
              </Text>

              <TouchableOpacity
                style={styles.clearFiltersButton}
                onPress={() => clearFilters()}
              >
                <Text style={[globalStyles.bodyUnderline, styles.clearFilters]}>
                  Clear Filters
                </Text>
              </TouchableOpacity>
            </View>
          ) : search && searchResults.length === 0 ? (
            <View style={styles.emptySearch}>
              <View style={{ paddingBottom: 16 }}>
                <Text style={[globalStyles.h3, { textAlign: 'center' }]}>
                  There are no stories
                </Text>
                <Text style={[globalStyles.h3, { textAlign: 'center' }]}>
                  for "{search}".
                </Text>
              </View>
              <Text style={[globalStyles.subHeading2, { textAlign: 'center' }]}>
                Try searching by title or author,{' '}
                <Text
                  onPress={clearFilters}
                  style={[globalStyles.bodyUnderline, styles.clearFilters]}
                >
                  clearing filters
                </Text>
                ,
              </Text>
              <Text style={[globalStyles.subHeading2, { textAlign: 'center' }]}>
                or check if your spelling is correct.
              </Text>
            </View>
          ) : recentSearches.length > 0 || recentlyViewed.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.recentSpacing}>
                <Text style={globalStyles.subHeading1Bold}>
                  Recent Searches
                </Text>
                <Pressable onPress={clearRecentSearches}>
                  <Text
                    style={[
                      globalStyles.subHeading2Bold,
                      { color: colors.gwnOrange },
                    ]}
                  >
                    Clear All
                  </Text>
                </Pressable>
              </View>
              <View style={styles.contentContainerRecents}>
                {recentSearches.map(item => (
                  <RecentSearchCard
                    key={item.value}
                    value={item.value}
                    numResults={item.numResults}
                    pressFunction={() => {
                      searchFunction(item.value);
                      searchResultStacking(item.value, item.numResults);
                    }}
                  />
                ))}
              </View>

              <View style={styles.recentSpacing}>
                <Text style={globalStyles.subHeading1Bold}>
                  Recently Viewed
                </Text>
                <Pressable onPress={clearRecentlyViewed}>
                  <Text
                    style={[
                      globalStyles.subHeading2Bold,
                      { color: colors.gwnOrange },
                    ]}
                  >
                    Clear All
                  </Text>
                </Pressable>
              </View>
              <View style={styles.contentContainerRecents}>
                {recentlyViewed.map(item => (
                  <PreviewCard
                    key={item.title}
                    storyId={item.id}
                    title={item.title}
                    image={item.featured_media}
                    author={item.author_name}
                    authorImage={item.author_image}
                    excerpt={item.excerpt}
                    tags={item.genre_medium}
                    pressFunction={() => {
                      recentlyViewedStacking(item);
                      router.push({
                        pathname: '/story',
                        params: { storyId: item.id.toString() },
                      });
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptySearch}>
              <View style={{ paddingBottom: 16 }}>
                <Text style={globalStyles.h3}>
                  Find stories from young creators.
                </Text>
              </View>
              <Text style={globalStyles.subHeading2}>
                Search for stories, authors, or collections.
              </Text>
            </View>
          ))}

        {showGenreCarousals ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            {allGenres.map((genre, index) => (
              <View key={index}>
                <View style={styles.genreText}>
                  <Text style={globalStyles.h3}>{genre.parent_name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '/genre',
                        params: {
                          genreId: genre.parent_id.toString(),
                          genreType: GenreType.PARENT,
                          genreName: genre.parent_name,
                        },
                      });
                    }}
                  >
                    <Text style={globalStyles.bodyUnderline}>See All</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ marginBottom: 32 }}
                >
                  {genre.subgenres.map(subgenre => (
                    <GenreCard
                      key={subgenre.id}
                      subgenres={subgenre.name}
                      subgenre_id={subgenre.id}
                      cardColor={getColor(index)}
                      pressFunction={() => {
                        router.push({
                          pathname: '/genre',
                          params: {
                            genreId: genre.parent_id.toString(),
                            genreType: GenreType.SUBGENRE,
                            genreName: subgenre.name,
                          },
                        });
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResults}
            contentContainerStyle={styles.contentCotainerStories}
            renderItem={({ item }) => (
              <PreviewCard
                key={item.id}
                storyId={item.id}
                title={item.title}
                image={item.featured_media}
                reactions={item.reactions}
                author={item.author_name}
                authorImage={item.author_image}
                excerpt={item.excerpt}
                tags={item.genre_medium}
                pressFunction={() => {
                  recentlyViewedStacking(item);
                  router.push({
                    pathname: '/story',
                    params: { storyId: item.id.toString() },
                  });
                }}
              />
            )}
          />
        )}

        {/* <FilterModal */}
        {/*   isVisible={filterVisible} */}
        {/*   setIsVisible={setFilterVisible} */}
        {/*   title="Genre" */}
        {/* /> */}
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
