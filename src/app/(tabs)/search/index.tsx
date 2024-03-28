import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import FilterModal from '../../../components/FilterModal/FilterModal';
import GenreCard from '../../../components/GenreCard/GenreCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import RecentSearchCard from '../../../components/RecentSearchCard/RecentSearchCard';
import { fetchGenres } from '../../../queries/genres';
import { fetchAllStoryPreviews } from '../../../queries/stories';
import { StoryPreview, RecentSearch, Genre } from '../../../queries/types';
import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

const getRecentSearch = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('GWN_RECENT_SEARCHES_ARRAY');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log(error);
  }
};

const setRecentSearch = async (searchResult: RecentSearch[]) => {
  try {
    const jsonValue = JSON.stringify(searchResult);
    await AsyncStorage.setItem('GWN_RECENT_SEARCHES_ARRAY', jsonValue);
  } catch (error) {
    console.log(error);
  }
};

const getRecentStory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('GWN_RECENT_STORIES_ARRAY');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log(error);
  }
};

const setRecentStory = async (recentStories: StoryPreview[]) => {
  try {
    const jsonValue = JSON.stringify(recentStories);
    await AsyncStorage.setItem('GWN_RECENT_STORIES_ARRAY', jsonValue);
  } catch (error) {
    console.log(error);
  }
};

function SearchScreen() {
  const [allStories, setAllStories] = useState<StoryPreview[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [searchResults, setSearchResults] = useState<StoryPreview[]>([]);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showGenreCarousals, setShowGenreCarousals] = useState(true);
  const [showRecents, setShowRecents] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<StoryPreview[]>([]);

  useEffect(() => {
    (async () => {
      const data: StoryPreview[] = await fetchAllStoryPreviews();
      setAllStories(data);
      const genreData: Genre[] = await fetchGenres();
      setAllGenres(genreData);
      setRecentSearches(await getRecentSearch());
      setRecentlyViewed(await getRecentStory());
    })();
  }, []);

  const getColor = (index: number) => {
    const genreColors = [colors.citrus, colors.lime, colors.lilac];
    return genreColors[index % genreColors.length];
  };

  const searchFunction = (text: string) => {
    if (text === '') {
      setSearch(text);
      setSearchResults([]);
      return;
    }
    const updatedData = allStories.filter((item: StoryPreview) => {
      const title = `${item.title.toUpperCase()})`;
      const author = `${item.author_name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return title.indexOf(text_data) > -1 || author.indexOf(text_data) > -1;
    });
    setSearch(text);
    setSearchResults(updatedData);
    setShowGenreCarousals(false);
  };

  const handleCancelButtonPress = () => {
    setSearchResults([]);
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
        globalStyles.container,
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
          searchIcon={false}
          clearIcon
          containerStyle={[
            styles.searchContainer,
            showGenreCarousals && { marginRight: 24 },
          ]}
          inputContainerStyle={styles.inputContainer}
          inputStyle={{ color: 'black' }}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          placeholder="Search"
          placeholderTextColor="black"
          onChangeText={text => searchFunction(text)}
          value={search}
          onSubmitEditing={searchString => {
            searchResultStacking(
              searchString.nativeEvent.text,
              searchResults.length,
            );
          }}
        />

        {search && (
          <View style={styles.default}>
            <Button
              title="Show Filter Modal"
              onPress={() => setFilterVisible(true)}
            />
          </View>
        )}

        {showRecents &&
          (search ? (
            <View style={styles.default}>
              <Text style={[styles.searchText, styles.numDisplay]}>
                {searchResults.length}{' '}
                {searchResults.length === 1 ? 'Story' : 'Stories'}
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View style={styles.recentSpacing}>
                <Text style={styles.searchText}>Recent Searches</Text>
                <Pressable onPress={clearRecentSearches}>
                  <Text style={styles.clearAll}>Clear All</Text>
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
                <Text style={styles.searchText}>Recently Viewed</Text>
                <Pressable onPress={clearRecentlyViewed}>
                  <Text style={styles.clearAll}>Clear All</Text>
                </Pressable>
              </View>
              <View style={styles.contentContainerRecents}>
                {recentlyViewed.map(item => (
                  <PreviewCard
                    key={item.title}
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
          ))}

        {showGenreCarousals ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            {allGenres.map((genre, index) => (
              <View key={index}>
                <View style={styles.genreText}>
                  <Text style={styles.parentName}>{genre.parent_name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: '/genre',
                        params: {
                          genreId: genre.parent_id.toString(),
                          genreType: 'parent_genre',
                          genreName: genre.parent_name,
                        },
                      });
                    }}
                  >
                    <Text style={styles.seeAll}>See All</Text>
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
                            genreType: 'subgenre',
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
                key={item.title}
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
            )}
          />
        )}

        <FilterModal
          isVisible={filterVisible}
          setIsVisible={setFilterVisible}
          title="Genre"
        />
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
