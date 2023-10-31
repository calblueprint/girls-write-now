import { SearchBar } from '@rneui/themed';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchCard from '../../../components/SearchCard/SearchCard';
import { fetchAllStoryPreviews } from '../../../queries/stories';
import { StoryPreview } from '../../../queries/types';

function SearchScreen() {
  const [allStories, setAllStories] = useState<StoryPreview[]>([]);
  const [searchResults, setSearchResults] = useState<StoryPreview[]>([]);
  const [search, setSearch] = useState('');

  const searchFunction = (text: string) => {
    if (text === '') {
      setSearchResults(allStories);
      return;
    }
    const updatedData = allStories.filter((item: StoryPreview) => {
      const title = `${item.title.toUpperCase()})`;
      const author = `${item.author_name.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return title.indexOf(text_data) > -1 || author.indexOf(text_data) > -1;
    });
    setSearchResults(updatedData);
    setSearch(text);
  };

  useEffect(() => {
    (async () => {
      const data: StoryPreview[] = await fetchAllStoryPreviews();
      setAllStories(data);
    })();
  });

  return (
    <SafeAreaView style={tempStyles.container}>
      <SearchBar
        platform="default"
        searchIcon={false}
        clearIcon
        containerStyle={tempStyles.searchContainer}
        inputContainerStyle={tempStyles.inputContainer}
        inputStyle={{ color: 'black' }}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        placeholder="Search"
        placeholderTextColor="black"
        onChangeText={text => searchFunction(text)}
        value={search}
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
            pressFunction={() => null}
          />
        )}
      />
      <Link href="/search/story" asChild>
        <Button title="Story" />
      </Link>
    </SafeAreaView>
  );
}

export default SearchScreen;

const tempStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    gap: 14,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: 'transparent',
    padding: 0,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#D9D9D9',
    margin: 0,
    borderRadius: 10,
  },
});
