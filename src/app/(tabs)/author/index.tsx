import { useLocalSearchParams, router } from 'expo-router';
import { decode } from 'html-entities';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import BackButton from '../../../components/BackButton/BackButton';
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
    setLoading(true);
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
    })().then(() => {
      setLoading(false);
    });
  }, [author]);

  return (
    <SafeAreaView style={[globalStyles.container, { marginHorizontal: -8 }]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          <BackButton pressFunction={() => router.back()} />

          <View style={styles.authorCardContainer}>
            {authorInfo?.image && (
              <Image style={styles.image} source={{ uri: authorInfo.image }} />
            )}

            {authorInfo?.name && (
              <View style={styles.authorTextContainer}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={2}
                  style={styles.name}
                >
                  {authorInfo.name}
                </Text>
                {authorInfo?.pronouns && (
                  <Text style={styles.pronouns}>{authorInfo.pronouns}</Text>
                )}
              </View>
            )}
          </View>

          <HorizontalLine />

          {authorInfo?.bio && (
            <>
              <Text style={styles.bioText}>{decode(authorInfo.bio)}</Text>
              <HorizontalLine />
            </>
          )}

          {authorInfo?.artist_statement && (
            <>
              <Text style={styles.authorStatementTitle}>
                Artist's Statement
              </Text>
              <Text style={styles.authorStatement}>
                {decode(authorInfo.artist_statement)}
              </Text>
              <HorizontalLine />
            </>
          )}

          {authorStoryPreview && (
            <Text style={styles.storyCountText}>
              {authorStoryPreview.length + ' '}
              {authorStoryPreview?.length > 1 ? 'Stories' : 'Story'}
            </Text>
          )}

          {authorStoryPreview?.map(story => (
            <PreviewCard
              key={story.title}
              title={story.title}
              image={story.featured_media}
              author={story.author_name}
              authorImage={story.author_image}
              excerpt={story.excerpt}
              tags={story.genre_medium.concat(story.tone).concat(story.topic)}
              pressFunction={() =>
                router.push({
                  pathname: '/story',
                  params: { storyId: story.id.toString() },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AuthorScreen;
