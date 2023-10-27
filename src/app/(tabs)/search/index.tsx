import { SearchBar } from '@rneui/themed';
import { Link } from 'expo-router';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Button, ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchCard from '../../../components/SearchCard/SearchCard';
import jsonStory from '../../../database/story.json';

function SearchScreen() {
  const [allStories, setAllStories] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);

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

  useEffect(() => {
    // setAllStories(jsonStory);
    // fetch all stories from Supabase, and set allStories to
    // the returned list of stories.
  });

  return (
    <SafeAreaView style={tempStyles.container}>
      <SearchBar
        platform="default"
        searchIcon={false}
        clearIcon
        containerStyle={{
          backgroundColor: 'transparent',
          borderRadius: 10,
          borderColor: 'transparent',
          padding: 0,
          marginBottom: 16,
        }}
        inputContainerStyle={{
          backgroundColor: '#D9D9D9',
          margin: 0,
          borderRadius: 10,
        }}
        inputStyle={{ color: 'black' }}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        placeholder="Search"
        placeholderTextColor="black"
        onChangeText={text => searchFunction(text)} // do u have to updateSearch(search)
        value={searchResults} // value from the search bar
      />
      <ScrollView>
        <Text>Stories go here ...</Text>
        {/* {jsonStory.map(story => (
          <SearchCard
            key={story.title}
            title={story.title}
            author={story.author}
            image={story.featured_media}
            authorImage={story.author}
            tags={story.genre_medium}
            pressFunction={() => null}
          />
        ))} // makes a searchcard for every item in the list. as it iterates through it, story is the name of each item. */}
      </ScrollView>
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
    paddingTop: 48,
  },
});
