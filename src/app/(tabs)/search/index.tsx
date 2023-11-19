import { SearchBar } from '@rneui/themed';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import FilterModal from '../../../components/FilterModal/FilterModal';
import LandingCard from '../../../components/LandingCard/LandingCard';
import LandingScrollView from '../../../components/LandingScrollView/LandingScrollView';
import SearchCard from '../../../components/PreviewCard/PreviewCard';
import { fetchGenres } from '../../../queries/genres';
import { fetchAllStoryPreviews } from '../../../queries/stories';
import { StoryPreview, Genre } from '../../../queries/types';

function SearchScreen() {
  const [allStories, setAllStories] = useState<StoryPreview[]>([]);
  const [allGenres, setAllGenres] = useState<Genre>();
  const [searchResults, setSearchResults] = useState<StoryPreview[]>([]);
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

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

  useEffect(() => {
    (async () => {
      const data: StoryPreview[] = await fetchAllStoryPreviews();
      setAllStories(data);
      const genreData: Genre = await fetchGenres();
      setAllGenres(genreData);
    })();
  }, []);

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
        loadingProps={{}}
        placeholder="Search"
        placeholderTextColor="black"
        onChangeText={text => searchFunction(text)}
        value={search}
      />
      <Button
        title="Show Filter Modal"
        onPress={() => setFilterVisible(true)}
      />

      <LandingScrollView main_genre="Fiction">
        <LandingCard cardColor="lime" />
        <LandingCard cardColor="lime" />
        <LandingCard cardColor="lime" />
      </LandingScrollView>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.scrollView}
      >
        <LandingCard genre_medium="Childrens Fiction" cardColor="lime" />
        <LandingCard genre_medium="Childrens Fiction" />
        <LandingCard genre_medium="Childrens Fiction" />
        <LandingCard genre_medium="Childrens Fiction" />
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.scrollView}
      >
        <LandingCard genre_medium="Childrens Fiction" />
        <LandingCard genre_medium="Childrens Fiction" />
        <LandingCard />
      </ScrollView> */}

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
