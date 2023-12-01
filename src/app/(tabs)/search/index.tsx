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

function SearchScreen() {
  const [allStories, setAllStories] = useState<StoryPreview[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [searchResults, setSearchResults] = useState<StoryPreview[]>([]);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [showGenreCarousals, setShowGenreCarousals] = useState(true);
  const [showRecents, setShowRecents] = useState(false);

  const getRecentSearch = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('GWN_RECENT_SEARCHES_ARRAY');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
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

  useEffect(() => {
    (async () => {
      const data: StoryPreview[] = await fetchAllStoryPreviews();
      setAllStories(data);
      const genreData: Genre[] = await fetchGenres();
      setAllGenres(genreData);
      setRecentSearches(await getRecentSearch());
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

  const clearRecentSearches = () => {
    setRecentSearches([]);
    setRecentSearch([]);
  };

  const searchResultStacking = (searchString: string) => {
    if (searchString !== '') {
      const maxArrayLength = 5;

      const newRecentSearches = recentSearches;

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
        numResults: searchResults.length,
      };

      newRecentSearches.splice(0, 0, result);

      setRecentSearch(newRecentSearches);
      setRecentSearches(newRecentSearches);
    }
  };

  const handleCancelButtonPress = () => {
    setSearchResults([]);
    setShowGenreCarousals(true);
    setShowRecents(false);
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
        <View style={styles.default}>
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
              showGenreCarousals && { marginRight: 16 },
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
              searchResultStacking(searchString.nativeEvent.text);
            }}
          />
        </View>

        {search && (
          <View style={styles.default}>
            <Button
              title="Show Filter Modal"
              onPress={() => setFilterVisible(true)}
            />
          </View>
        )}

        {showRecents && (
          <>
            {search ? (
              <View style={styles.default}>
                <Text style={[styles.searchText, styles.numDisplay]}>
                  {searchResults.length}{' '}
                  {searchResults.length === 1 ? 'Story' : 'Stories'}
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.recentSpacing}>
                  <Text style={styles.searchText}>Recent Searches</Text>
                  <Pressable onPress={clearRecentSearches}>
                    <Text style={styles.clearAll}>Clear All</Text>
                  </Pressable>
                </View>
                <FlatList
                  contentContainerStyle={styles.contentContainerRecents}
                  showsVerticalScrollIndicator={false}
                  data={recentSearches}
                  renderItem={({ item }) => (
                    <RecentSearchCard
                      key={item.value}
                      value={item.value}
                      numResults={item.numResults}
                      pressFunction={() => null}
                    />
                  )}
                />
              </>
            )}
          </>
        )}

        {showGenreCarousals ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            {allGenres.map((genre, index) => (
              <>
                <View style={styles.genreText}>
                  <Text style={styles.parentName}>{genre.parent_name}</Text>
                  <Text style={styles.seeAll}>See All</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ marginBottom: 32 }}
                >
                  {genre.subgenres.map(subgenre => (
                    <GenreCard
                      subgenres={subgenre.name}
                      cardColor={getColor(index)}
                      pressFunction={() => null}
                    />
                  ))}
                </ScrollView>
              </>
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
                pressFunction={() =>
                  router.push({
                    pathname: '/story',
                    params: { storyId: item.id.toString() },
                  })
                }
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
