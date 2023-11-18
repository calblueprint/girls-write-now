import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from '@rneui/themed';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import FilterModal from '../../../components/FilterModal/FilterModal';
import SearchCard from '../../../components/SearchCard/SearchCard';
import { fetchAllStoryPreviews } from '../../../queries/stories';
import { StoryPreview, RecentSearch } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

function SearchScreen() {
  const [allStories, setAllStories] = useState<StoryPreview[]>([]);
  const [searchResults, setSearchResults] = useState<StoryPreview[]>([]);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState(new Set<RecentSearch>());

  const searchFunction = (text: string) => {
    if (text === '') {
      setSearch(text);
      setSearchResults(allStories);
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
  };

  // Gets the recentSearches (Set) from Async Storage
  const getRecentSearch = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('GWN_RECENT_SEARCHES');
      return jsonValue != null
        ? JSON.parse(jsonValue)
        : new Set<RecentSearch>();
    } catch (error) {
      console.log(error); // error reading value
    }
  };

  // Sets the Async Storage to recentSearches (Set)
  const setRecentSearch = async (recentSearchesSet: Set<RecentSearch>) => {
    try {
      const jsonValue = JSON.stringify(recentSearchesSet);
      await AsyncStorage.setItem('GWN_RECENT_SEARCHES', jsonValue);
    } catch (error) {
      console.log(error); // saving error
    }
  };

  // UseEffect upon first rendering
  useEffect(() => {
    (async () => {
      const data: StoryPreview[] = await fetchAllStoryPreviews();
      setAllStories(data);
    })();

    // Testing to see if we can getRecentSearches() from Async Storage
    (async () => {
      // setRecentSearches(await getRecentSearch());
      console.log(getRecentSearch());
    })();
  }, []);

  // UseEffect upon change of recentSearches (Set)
  // EVENTUALLY FIX TO WHERE IT DOES IT BEFORE EXITING PAGE RATHER THAN EVERY ALTERATION OF SET (LIKE THIS FOR TESTING RN)
  useEffect(() => {
    setRecentSearch(recentSearches);

    // testing funcion getRecentSearch
    // (maybe check for null when first getting asyncStorage cuz it might be empty)
    // DELETE AFTER BUG FIXED
    (async () => {
      setRecentSearches(await getRecentSearch());
    })();
  }, [recentSearches]); // fix this useEffect to be when it switches page

  return (
    <SafeAreaView style={styles.container}>
      <View style={[filterVisible ? styles.greyOverlay : styles.noOverlay]} />
      <SearchBar
        platform="default"
        searchIcon={false}
        clearIcon
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{ color: 'black' }}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        placeholder="Search"
        placeholderTextColor="black"
        onChangeText={text => searchFunction(text)}
        value={search}
        onSubmitEditing={searchString => {
          const result: RecentSearch = {
            value: searchString.nativeEvent.text, // works
            numResults: searchResults.length, // works
          };

          setRecentSearches(
            previousSet => new Set<RecentSearch>([...previousSet, result]),
          );
        }}
      />
      <Button
        title="Show Filter Modal"
        onPress={() => setFilterVisible(true)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchResults}
        renderItem={({ item }) => (
          <SearchCard
            key={item.title}
            title={item.title}
            author={item.author_name}
            image={item.featured_media}
            authorImage={item.author_image}
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
      <FilterModal
        isVisible={filterVisible}
        setIsVisible={setFilterVisible}
        title="Genre"
      />
    </SafeAreaView>
  );
}

export default SearchScreen;
