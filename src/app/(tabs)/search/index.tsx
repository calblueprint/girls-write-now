import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import FilterModal from '../../../components/FilterModal/FilterModal';
import SearchCard from '../../../components/PreviewCard/PreviewCard';
import RecentSearchCard from '../../../components/RecentSearchCard/RecentSearchCard';
import { fetchAllStoryPreviews } from '../../../queries/stories';
import { StoryPreview, RecentSearch } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

function SearchScreen() {
  const [allStories, setAllStories] = useState<StoryPreview[]>([]);
  const [searchResults, setSearchResults] = useState<StoryPreview[]>([]);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const focus = useIsFocused();

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

  const clearRecentSearches = () => {
    setRecentSearches([]);
    setRecentSearch([]);
  };

  const searchResultStacking = (searchString: string) => {
    if (searchString !== '') {
      const maxArrayLength = 5;
      setRecentSearches(recentSearches.reverse());
      for (let i = 0; i < recentSearches.length; i++) {
        if (searchString === recentSearches[i].value) {
          setRecentSearches(recentSearches.splice(i, 1));
          break;
        }
      }
      if (recentSearches.length >= maxArrayLength) {
        setRecentSearches(recentSearches.splice(0, 1));
      }

      const result: RecentSearch = {
        value: searchString,
        numResults: searchResults.length,
      };
      setRecentSearches(recentSearches.concat(result).reverse());
    }
  };

  // Gets the recentSearches (Set) from Async Storage
  const getRecentSearch = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log(error); // error reading value
    }
  };

  const setRecentSearch = async (searchResult: RecentSearch) => {
    try {
      const jsonValue = JSON.stringify(searchResult);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (error) {
      console.log(error); // saving error
    }
  };

  // UseEffect upon first rendering
  useEffect(() => {
    (async () => {
      const data: StoryPreview[] = await fetchAllStoryPreviews();
      setAllStories(data);

      setRecentSearches(await getRecentSearch());
    })();

    (async () => {
      setRecentSearches(await getRecentSearch());
    })();
  }, []);

  useEffect(() => {
    setRecentSearch(recentSearches);
  }, [focus]);

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
      />
      <Button
        title="Show Filter Modal"
        onPress={() => setFilterVisible(true)}
      />
      {search ? (
        <Text>Showing Results {searchResults.length}</Text>
      ) : (
        <>
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <Text>Recent Searches</Text>
            <Button
              onPress={clearRecentSearches}
              title="Clear All"
              color="#EB563B"
            />
          </View>
          <FlatList
            style={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
            data={recentSearches}
            renderItem={({ item }) => (
              <RecentSearchCard
                key={item.value}
                value={item.value}
                numResults={item.numResults}
                pressFunction={() => null} // add functionality for each recentSearch
              />
            )}
          />
        </>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchResults}
        contentContainerStyle={{}}
        renderItem={({ item }) => (
          <SearchCard
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
      <FilterModal
        isVisible={filterVisible}
        setIsVisible={setFilterVisible}
        title="Genre"
      />
    </SafeAreaView>
  );
}

export default SearchScreen;
