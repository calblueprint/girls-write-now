import { SearchBar } from '@rneui/themed';
import { Link } from 'expo-router';
import React, { SetStateAction, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '../../../styles/globalStyles';

function SearchScreen() {
  const [search, setSearch] = useState('');
  const [allStories, setAllStories] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const searchFunction = (text: string) => {
    if (text === '') {
      setSearchResults(allStories);
    }
    // We want to filter our full list of stories so that it contains only those
    // that match our input text.
    const updatedData = allStories.filter((item: any) => {
      // Make the story's title uppercase
      const title = `${item.title.toUpperCase()})`;
      // Make the story's author uppercase
      const author = `${item.author.toUpperCase()})`;
      // Make the input text uppercase
      const text_data = text.toUpperCase();
      // This basically means that if the title or the author contains the
      // input text, we want to include this story in updatedData
      return title.indexOf(text_data) > -1 || author.indexOf(text_data) > -1;
    });
    setSearchResults(updatedData);
  };

  return (
    <SafeAreaView>
      <SearchBar
        platform="default"
        searchIcon={false}
        clearIcon
        round
        containerStyle={{ backgroundColor: 'red', margin: 20 }}
        inputContainerStyle={{ backgroundColor: '#D9D9D9' }}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        placeholder="Search"
        placeholderTextColor="black"
        onChangeText={newVal => setSearch(newVal)}
        value={search}
      />
      <ScrollView>
        <Text>placeholder</Text>
        {/* <SearchCard />
        <SearchCard />
        ... */}
      </ScrollView>
      <Link href="/search/story" asChild>
        <Button title="Story" />
      </Link>
    </SafeAreaView>
  );
}

export default SearchScreen;
