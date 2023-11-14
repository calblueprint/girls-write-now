import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import Icon from '../../../../assets/icons';
import HorizontalLine from '../../../components/HorizontalLine/HorizontalLine';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import {
  fetchAuthor,
  fetchAuthorStoryPreviews,
} from '../../../queries/authors';
import { Author, StoryPreview } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

function AuthorScreen() {
  const [authorInfo, setAuthorInfo] = useState<Author>();
  const [authorStoryPreview, setAuthorStoryPreview] =
    useState<StoryPreview[]>();
  const [isLoading, setLoading] = useState(true);
  const params = useLocalSearchParams<{ author: string }>();
  const { author } = params;

  useEffect(() => {
    (async () => {
      const storyData: StoryPreview[] = await fetchAuthorStoryPreviews(
        parseInt(author as string, 10),
      );
      const authorData: Author = await fetchAuthor(
        parseInt(author as string, 10),
      );
      try {
        setAuthorInfo(authorData);
        console.log('TESTING AUTHOR INFO QUERY OUTPUT:', authorInfo);
      } catch (error) {
        console.log(
          `There was an error while trying to output authorinfo ${error}`,
        );
      }
      try {
        setAuthorStoryPreview(storyData);
        console.log('TESTING STORY PREVIEW INFO QUERY OUTPUT:', storyData);
      } catch (error) {
        console.log(
          `There was an error while trying to output author story preview info ${error}`,
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.backButton}>
            <Icon type="back_icon" />
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Text>BACK</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.authorCardContainer}>
            <Image
              style={styles.image}
              source={{ uri: authorInfo ? authorInfo.image : '' }}
            />
            <View style={styles.authorTextContainer}>
              <Text style={styles.name}>
                {authorInfo ? authorInfo.name : ''}
              </Text>
              <Text style={styles.pronouns}>
                {authorInfo ? authorInfo.pronouns : ' '}
              </Text>
            </View>
            <HorizontalLine />

            <Text style={styles.bioText}>
              {authorInfo ? authorInfo.bio : ''}
            </Text>

            <HorizontalLine />

            <View style={styles.authorStatementContainer}>
              <Text style={styles.authorStatementTitle}>
                Artist's Statement
              </Text>
              <Text style={styles.authorStatement}>
                {authorInfo ? authorInfo.artist_statement : ''}
              </Text>
            </View>
            <HorizontalLine />
          </View>
          <View />

          <Text style={styles.storyCountText}>
            {authorStoryPreview?.length + ' '}
            {authorStoryPreview
              ? authorStoryPreview?.length > 1
                ? 'Stories'
                : 'Story'
              : ''}
          </Text>

          {authorStoryPreview
            ? authorStoryPreview.map(story => (
                <PreviewCard
                  key={story.title}
                  title={story.title}
                  image={story.featured_media}
                  author={story.author_name}
                  authorImage={story.author_image}
                  excerpt={story.excerpt}
                  tags={story.genre_medium
                    .concat(story.tone)
                    .concat(story.topic)}
                  pressFunction={() =>
                    router.push({
                      pathname: '/story',
                      params: { storyId: story.id.toString() },
                    })
                  }
                />
              ))
            : ''}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AuthorScreen;
