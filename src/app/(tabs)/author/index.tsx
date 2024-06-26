import * as cheerio from 'cheerio';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { Image } from 'expo-image';
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

/*
 * This screen displays information about an author.
 * When redirecting to this page, you must supply the parameter `{ author: string }`, which is the string of a number representing the id of the author.
 * This id is parsed to get the integer id, used to fetch the author's data.
 */
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
      try {
        const storyData: StoryPreview[] = await fetchAuthorStoryPreviews(
          parseInt(author as string, 10),
        );
        const authorData: Author = await fetchAuthor(
          parseInt(author as string, 10),
        );

        // Assuming these setters do not throw, but if they do, they're caught by the catch block
        setAuthorInfo(authorData);
        setAuthorStoryPreview(storyData);
      } catch (error) {
        console.error('There was an error while fetching data:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [author]);

  const getTextFromHtml = (text: string) => {
    return cheerio.load(text).text().trim();
  };

  return (
    <SafeAreaView
      style={[globalStyles.tabBarContainer, { paddingHorizontal: 22 }]}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces
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
                  style={globalStyles.h1}
                >
                  {getTextFromHtml(authorInfo.name)}
                </Text>
                {authorInfo?.pronouns && (
                  <Text style={[globalStyles.subHeading2, styles.pronouns]}>
                    {authorInfo.pronouns}
                  </Text>
                )}
              </View>
            )}
          </View>

          <HorizontalLine />

          {authorInfo?.bio && (
            <>
              <Text style={globalStyles.body1}>
                {getTextFromHtml(authorInfo.bio)}
              </Text>
              <HorizontalLine />
            </>
          )}

          {authorInfo?.artist_statement && (
            <>
              <Text
                style={[globalStyles.body2Bold, styles.authorStatementTitle]}
              >
                Artist's Statement
              </Text>
              <Text style={globalStyles.body1}>
                {getTextFromHtml(authorInfo.artist_statement)}
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
              storyId={story.id}
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

          {/* View so there's space between the tab bar and the stories */}
          <View style={{ paddingBottom: 10 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AuthorScreen;
