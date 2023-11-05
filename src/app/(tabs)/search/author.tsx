import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import { AuthorInfo } from './types';
import SearchCard from '../../../components/SearchCard/SearchCard';
import {
  fetchAuthor,
  fetchAllAuthorStoryPreviews,
} from '../../../queries/authors';

const navigation = useNavigation();
const router = useRouter();
const params = useLocalSearchParams();
const { authorID } = params;

function AuthorScreen() {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo>();
  const [isLoading, setLoading] = useState(true);

  //useeffect should call fetchAuthor
  useEffect(() => {
    setAuthorInfo(fetchAuthor(params));
    setLoading(false);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View />
          <SearchCard />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AuthorScreen;
