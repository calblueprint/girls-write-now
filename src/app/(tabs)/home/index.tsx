import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import ContentCard from '../../../components/ContentCard/ContentCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import { fetchUsername } from '../../../queries/profiles';
import {
  fetchFeaturedStoriesDescription,
  fetchFeaturedStoryPreviews,
  fetchNewStories,
  fetchRecommendedStories,
} from '../../../queries/stories';
import { StoryCard, StoryPreview } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function HomeScreen() {
  const { user } = useSession();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [featuredStories, setFeaturedStories] = useState<StoryPreview[]>([]);
  const [featuredStoriesDescription, setFeaturedStoriesDescription] =
    useState<string>('');
  const [recommendedStories, setRecommendedStories] = useState<StoryCard[]>([]);
  const [newStories, setNewStories] = useState<StoryCard[]>([]);

  useEffect(() => {
    (async () => {
      const [
        usernameResponse,
        featuredStoryResponse,
        featuredStoryDescriptionResponse,
        recommendedStoriesResponse,
        newStoriesResponse,
      ] = await Promise.all([
        fetchUsername(user?.id).catch(() => ''),
        fetchFeaturedStoryPreviews().catch(() => []),
        fetchFeaturedStoriesDescription().catch(() => ''),
        fetchRecommendedStories().catch(() => []),
        fetchNewStories().catch(() => []),
      ]);

      setUsername(usernameResponse);
      setFeaturedStories(featuredStoryResponse);
      setFeaturedStoriesDescription(featuredStoryDescriptionResponse);
      setRecommendedStories(recommendedStoriesResponse);
      setNewStories(newStoriesResponse);
    })().finally(() => {
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView
      style={[
        globalStyles.tabBarContainer,
        { marginLeft: -8, marginRight: -32 },
      ]}
    >
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <View style={styles.headerContainer}>
          <Text style={globalStyles.h1}>
            {username ? `Welcome, ${username}` : 'Welcome!'}
          </Text>
        </View>

        {featuredStories.length > 0 && (
          <View>
            <Text style={globalStyles.h3}>Featured Stories</Text>
            {featuredStoriesDescription.length > 0 && (
              <Text style={[globalStyles.body1, styles.featuredDescription]}>
                {featuredStoriesDescription}
              </Text>
            )}
            <View style={{ marginRight: 24, marginTop: 16 }}>
              {featuredStories.map(story => (
                <PreviewCard
                  key={story.id}
                  storyId={story.id}
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
              ))}
            </View>
          </View>
        )}
        {recommendedStories.length > 0 && (
          <View>
            <Text style={[globalStyles.h3, styles.subheading]}>
              Recommended For You
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              style={styles.scrollView1}
            >
              {recommendedStories.map(story => (
                <ContentCard
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
                  authorImage={story.author_image}
                  storyId={story.id}
                  pressFunction={() =>
                    router.push({
                      pathname: '/story',
                      params: { storyId: story.id.toString() },
                    })
                  }
                  image={story.featured_media}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {newStories.length > 0 && (
          <View>
            <Text style={[globalStyles.h3, styles.subheading]}>
              New Stories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              style={styles.scrollView2}
            >
              {newStories.map(story => (
                <ContentCard
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
                  authorImage={story.author_image}
                  storyId={story.id}
                  pressFunction={() =>
                    router.push({
                      pathname: '/story',
                      params: { storyId: story.id.toString() },
                    })
                  }
                  image={story.featured_media}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
